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
  constructor(props){
    super(props)
    this.state ={
      previewCutoff: false
    }
  }
  toggleCutoff =(event)=>{
    if (event){
      event.preventDefault()
    }
    this.setState({
      previewCutoff: !this.state.previewCutoff
    })
  }
  componentDidMount () {
    this.setState({
      previewCutoff: this.props.previewCutoff
    })
  }
  render () {
    const input = this.props.input ? this.props.input : this.props.children
    const previewClass = this.props.preview === true ? 'markdown-preview' : ''
    const largePreviewClass = this.props.largePreview === true ? 'markdown-large-preview' : ''
    const minHeightClass = this.props.minHeight ? 'srvup-markdown' : ''
    const previewCutoffClass = this.state.previewCutoff && 'markdown-preview-cutoff'
    const disallowed = []
    return (
      <div>
      <ReactMarkdown
          className={`${this.props.className} ${previewClass} ${largePreviewClass} ${minHeightClass} ${previewCutoffClass}`}
          source={input}
          disallowedTypes={disallowed}
          plugins={[shortcodes]}
          renderers={{
            blockquote: BlockquoteRender,
            code: CodeRender,
            text: emojiSupport,
            shortcode: ShortCodeRenderer}}
        />
      {this.props.previewCutoff && 
          <button className='btn btn-link p-0' onClick={this.toggleCutoff}>
          {this.state.previewCutoff === true ? 
              <span>More &darr;</span> : 
              <span>Less &uarr;</span> 
           }
          </button>
       }
      </div>
    )
  }
}

export {Markdown}
