'use strict'
import dotenv from 'dotenv'
import fs from 'fs-extra'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const baseEnginesConfig = JSON.parse(fs.readFileSync('config/engine.json'))

const configs = {
  base: {
    baseEnginesConfig,
    logger: {
      fileName: process.env.LOG_FILENAME || 'render_test_platform_app',
      directory: process.env.LOG_DIRECTORY || 'logs',
      level: process.env.LOG_LEVEL || 'info'
    },
    folder: {
      upload: process.env.UPLOAD_PATH || 'uploads'
    },
    deployServer: {
      protocol: process.env.DEPLOY_SERVER_PROTOCOL || 'https',
      host: process.env.DEPLOY_SERVER_HOST || '0.0.0.0',
      port: Number.parseInt(process.env.DEPLOY_SERVER_PORT) || 8080
    },
    render: {
      retryTimer: Number.parseInt(process.env.RENDER_RETRY_TIMER) || 2000,
      retryCount: Number.parseInt(process.env.RENDER_RETRY_COUNT) || 5
    },
    port: process.env.APP_PORT || 8080
  },
  production: {
  },
  development: {
  },
  test: {
  }
}
const config = Object.assign(configs.base, configs[env])

export default config
