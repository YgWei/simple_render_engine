export class EngineNotExist extends Error {
  constructor(message) {
    super()
    this.status = 400
    this.name = 'EngineNotExist'
    this.message = message || 'Engine is not exist, Please input a correct engine to render'
    this.stack = (new Error()).stack
  }
}

export class PageNotFound extends Error {
  constructor(message) {
    super()
    this.status = 404
    this.name = 'PageNotFound'
    this.message = message || 'Page is not found!'
    this.stack = (new Error()).stack
  }
}

export class RenderFail extends Error {
  constructor(message) {
    super()
    this.status = 500
    this.name = 'RenderFail'
    this.message = message || 'Render Fail!'
    this.stack = (new Error()).stack
  }
}

export class NotZipFile extends Error {
  constructor(message) {
    super()
    this.status = 400
    this.name = 'NotZipFile'
    this.message = message || 'Uploaded file is not a zip!'
    this.stack = (new Error()).stack
  }
}

export class ZipFileUnrenderable extends Error {
  constructor(message) {
    super()
    this.status = 400
    this.name = 'ZipFileUnrenderable'
    this.message = message || 'Zip is unrenderable, Please input the correct one!'
    this.stack = (new Error()).stack
  }
}

export class InsertFail extends Error {
  constructor(message) {
    super()
    this.status = 500
    this.name = 'RenderFail'
    this.message = message || 'Insert fail!.'
    this.stack = (new Error()).stack
  }
}
