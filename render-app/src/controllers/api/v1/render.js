'use strict'
import {
  tags,
  request,
  summary,
  responses,
  formData,
  middlewares
} from 'koa-swagger-decorator'
import validatorMiddleware from '../../../middlewares/validator'
import * as renderSchema from '../../../schema/render'
import { SUCCESS } from '../../../constants'
import RenderService from '../../../services/render'
import logger from '../../../logger/system'

/**
 * @typedef {import("koa").Context} Context
 */

const tag = tags(['Render'])

export default class RenderController {
  /**
   * get all engines
   * @param {Context} ctx
   */
  @request('get', '/render/engines')
  @summary('Get all engines')
  @tag
  @responses(renderSchema.getEnginesResponses)
  static async getAllEngines(ctx) {
    const renderService = new RenderService()
    try {
      const data = await renderService.getEngines()
      return ctx.res.ok(data, SUCCESS.message)
    } catch (err) {
      ctx.throw(500, err.message)
    }
  }

  /**
   * Accept formdata, render it using engine which selected and give pdf buffer as response
   * @param {Context} ctx
   */
  @request('post', '/render/webpage')
  @summary('render html, give pdf buffer as response')
  @formData(renderSchema.postWebPageBody)
  @middlewares(validatorMiddleware(renderSchema.postWebPageSchema))
  @tag
  @responses(renderSchema.renderResponses)
  static async renderWebPage(ctx) {
    const renderService = new RenderService()
    const body = ctx.request.body
    const file = ctx.request.files.file
    try {
      const data = await renderService.renderPDF(body, file)
      ctx.body = data
      ctx.status = 200
      ctx.set('Content-disposition', 'attachment')
      ctx.set('Content-type', 'application/pdf')
    } catch (err) {
      logger.error(err.message)
      ctx.throw(err.statusCode, err.name)
    }
  }
}
