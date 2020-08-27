'use strict'
import Koa from 'koa'
import cors from 'kcors'
import routers from './routers'
import bodyParser from 'koa-bodyparser'
import requestID from './middlewares/requestID'
import httpLogger from './middlewares/logger'
import errorHandler from './middlewares/errorHandler'
import responseHandler from './middlewares/responseHandler'
import koaBody from 'koa-body'
import config from './config'
import inspector from './inspector'
import { v4 as uuidV4 } from 'uuid'

inspector.check()
const app = new Koa()
app.use(errorHandler())
app.use(bodyParser())
app.use(requestID())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)
app.use(responseHandler())
app.use(httpLogger())

app.use(koaBody({
  multipart: true,
  formLimit: '1gb',
  formidable: {
    uploadDir: config.folder.upload,
    keepExtensions: false,
    onFileBegin: function (name, file) {
      const uuid = uuidV4()
      let type = file.type.replace(/.*\//, '')
      if (type === 'x-zip' || type === 'zip-compressed' || type === 'x-zip-compressed') {
        type = 'zip'
      }
      file.uuid = uuid
      file.path = `${config.folder.upload}/${uuid}.${type}`
    }
  }
}))

app.use(routers.routes()).use(routers.allowedMethods())
const server = app.listen(config.port, () => {
  console.log('service start')
})
server.setTimeout(0)
