import React, { useState } from 'react'

import './App.css'
import { convertHtmlToMarkdown } from './lib/converter'

function App() {
  const [html, setHtml] = useState('<h1>Hello World</h1>')
  const [md, setMd] = useState('')
  const [parser, setParser] = useState<'evernote' | 'notion'>('evernote')

  const convertHtml = (html: string) => {
    const markdown = convertHtmlToMarkdown(html, parser)
    setMd(markdown)
  }

  const preventDefaultRunFunction = (fn: Function) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      fn()
    }
  }

  return (
    <div className='App'>
      <form onSubmit={preventDefaultRunFunction(() => convertHtml(html))}>
        <select
          value={parser}
          onChange={event =>
            setParser(event.target.value as 'evernote' | 'notion')
          }
        >
          <option value='evernote'>Evernote</option>
          <option value='notion'>Notion</option>
        </select>
        <textarea
          value={html}
          onChange={event => setHtml(event.target.value)}
        ></textarea>
        <button type='submit'>Convert</button>
        <textarea
          value={md}
          onChange={event => setMd(event.target.value)}
        ></textarea>
      </form>
    </div>
  )
}

export default App
