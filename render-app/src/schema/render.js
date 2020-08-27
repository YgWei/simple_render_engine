'use strict'
import Joi from '@hapi/joi'

export const renderResponses = {
  200: {
    description: 'Success rendering uploaded file'
  },
  400: {
    description: 'Bad request',
    example: {
      err: 'error message'
    }
  },
  500: {
    description: 'Unexpected error',
    example: {
      err: 'error message'
    }
  }
}

export const postWebPageSchema = {
  body: Joi.object({
    engine: Joi.string().required()
  }),
  files: Joi.object({
    file: Joi.any().meta({ swaggerType: 'file' })
      .description('file to upload')
      .required()
  })
}

export const postWebPageBody = {
  engine: {
    type: 'string',
    required: true
  },
  file: {
    type: 'file',
    required: true,
    description: 'upload file'
  }
}

export const getEnginesResponses = {
  200: {
    description: 'Success get all engines'
  },
  404: {
    description: 'Path Not Found',
    example: {
      err: 'Path not Found'
    }
  },
  500: {
    description: 'Unexpected error',
    example: {
      err: 'error message'
    }
  }
}
