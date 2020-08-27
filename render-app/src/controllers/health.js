import {
  request,
  summary,
  tags,
  responses
} from 'koa-swagger-decorator'
const tag = tags(['Health'])

export default class HealthController {
  @request('get', '/health')
  @summary('Health check API')
  @tag
  @responses({
    200: {
      description: 'Service Survival',
      example: {
        message: 'Service Survival'
      }
    }
  })
  static async health(ctx) {
    ctx.status = 200
    ctx.body = {
      message: 'Service Survival'
    }
  }
}
