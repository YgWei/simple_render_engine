'use strict'

export default class HtmlUtil {
  /**
   * Insert content into head block.
   * @param {string} insertContent Html content which want to insert into head.
   * @param {string} originContent Original html content. Have to start with <html> tag.
   */
  async insertHead(insertContent, originContent) {
    if (!insertContent.startsWith('<') || !insertContent.endsWith('>')) {
      throw new Error('Insert content must be start with \'<\' and closure')
    }

    const lowerCaseData = originContent.toLowerCase()
    const htmlTagStartIndex = lowerCaseData.indexOf('<html')
    if (htmlTagStartIndex === -1) {
      throw new Error('Original html content not include <html> tag')
    }
    const htmlTagEndIndex = lowerCaseData.indexOf('>', htmlTagStartIndex)
    if (htmlTagEndIndex === -1) {
      throw new Error('Original html content \'html\' tag not closure.')
    }

    const emptyHeadIndex = lowerCaseData.indexOf('<head/>')
    const isEmptyHead = (emptyHeadIndex !== -1)

    const headTagStartIndex = isEmptyHead ? -1 : lowerCaseData.indexOf('<head')
    const headTagEndIndex = isEmptyHead ? -1 : lowerCaseData.indexOf('>', headTagStartIndex)

    // real insert content
    let fixInsertContent = ''
    if (isEmptyHead || headTagStartIndex === -1) {
      fixInsertContent = `<head>${insertContent}</head>`
    } else {
      fixInsertContent = insertContent
    }

    // insert
    let fixHtml = ''
    if (isEmptyHead) {
      fixHtml = originContent.substring(0, emptyHeadIndex) + fixInsertContent + originContent.substring(emptyHeadIndex + 7)
    } else if (headTagEndIndex !== -1) {
      fixHtml = originContent.substring(0, headTagEndIndex + 1) + fixInsertContent + originContent.substring(headTagEndIndex + 1)
    } else { // no head
      fixHtml = originContent.substring(0, htmlTagEndIndex + 1) + fixInsertContent + originContent.sub(htmlTagEndIndex + 1)
    }

    return fixHtml
  }
}
