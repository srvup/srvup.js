import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import shortcodes from 'remark-shortcodes'
import './markdown.css'

import {
  ShortCodeRenderer,
  BlockquoteRender,
  CodeRender,
  emojiSupport
} from './Renders'

class Markdown extends Component {
  render () {
    const input = this.props.input ? this.props.input : this.props.children
    const previewClass = this.props.preview === true ? 'markdown-preview' : ''
    const largePreviewClass = this.props.largePreview === true ? 'markdown-large-preview' : ''
    const minHeightClass = this.props.minHeight ? 'srvup-markdown' : ''
    const disallowed = []
    return (
      <ReactMarkdown
        className={`${this.props.className} ${previewClass} ${largePreviewClass} ${minHeightClass}`}
        source={input}
        disallowedTypes={disallowed}
        plugins={[shortcodes]}
        renderers={{
          blockquote: BlockquoteRender,
          code: CodeRender,
          text: emojiSupport,
          shortcode: ShortCodeRenderer}}
      />
    )
  }
}

export {Markdown}
