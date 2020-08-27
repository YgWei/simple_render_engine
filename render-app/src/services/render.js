'use strict'
import config from '../config'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'
import request from 'request-promise'
import logger from '../logger/system'
import path from 'path'
import HtmlUtil from '../util/html'
import { EngineNotExist, PageNotFound, NotZipFile, RenderFail, ZipFileUnrenderable, InsertFail } from '../exception/render'

const baseEnginesConfig = config.baseEnginesConfig
const deployServerConfig = config.deployServer
const deployServerBaseURL = `${deployServerConfig.protocol}://${deployServerConfig.host}:${deployServerConfig.port}`
const uploads = config.folder.upload

export default class RenderService {
  async getEngines() {
    const enginesBody = []
    for (const engineValue of Object.values(baseEnginesConfig)) {
      enginesBody.push({
        name: engineValue.name,
        value: engineValue.value
      })
    }

    return enginesBody
  }

  async renderPDF(body, file) {
    try {
      if (path.extname(file.path) !== '.zip') {
        throw new NotZipFile()
      }

      const zip = new AdmZip(file.path)
      zip.extractAllTo(`${uploads}/${file.uuid}`, true)

      if (!baseEnginesConfig[body.engine]) {
        throw new EngineNotExist()
      }

      if (!fs.existsSync(`${uploads}/${file.uuid}/index.html`)) {
        throw new ZipFileUnrenderable()
      }

      const engineServerURL = baseEnginesConfig[body.engine].url
      const isUsePaged = baseEnginesConfig[body.engine].paged
      const deployPagePath = file.uuid

      if (isUsePaged) {
        try {
          const htmlData = fs.readFileSync(`${uploads}/${file.uuid}/index.html`, 'utf8')
          const htmlUtil = new HtmlUtil()

          const insertContent = '<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>'
          const fixHtml = await htmlUtil.insertHead(insertContent, htmlData)

          await fs.moveSync(`${uploads}/${file.uuid}/index.html`, `${uploads}/${file.uuid}/index_backup.html`)
          await fs.writeFileSync(`${uploads}/${file.uuid}/index.html`, fixHtml)
        } catch (err) {
          throw new InsertFail(err.message)
        }
      }

      await testUrl(deployPagePath)
      const result = await generatePDFContent(engineServerURL, deployPagePath)
      return result
    } finally {
      try {
        await fs.remove(`${uploads}/${file.uuid}`)
        await fs.remove(file.path)
      } catch (err) {
        logger.warn('files are not found, remove failed')
      }
    }
  }
}

async function generatePDFContent(engineServerURL, deployPagePath) {
  const options = {
    method: 'POST',
    url: engineServerURL,
    encoding: null,
    body: {
      url: `${deployServerBaseURL}/${deployPagePath}`
    },
    json: true
  }
  try {
    const res = await request(options)
    return res
  } catch (err) {
    throw new RenderFail(err.message)
  }
}

async function testUrl(renderUrl) {
  let counter = 0
  const maxRetryCount = config.render.retryCount
  const retryTimer = config.render.retryTimer
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  while (counter < maxRetryCount) {
    try {
      await sleep(retryTimer)
      counter++
      const testOptions = {
        method: 'GET',
        url: `${deployServerBaseURL}/${renderUrl}`
      }
      await request(testOptions)
      return true
    } catch (err) {
      if (err.statusCode !== 404) {
        logger.info('Test url status code return is not 404.')
      }
      logger.info(`Counter = ${counter}, Page is still not deploy`)
    }
  }
  throw new PageNotFound()
}
