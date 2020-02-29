import React, {useState} from 'react';
import './App.css';
import { convertHtmlToMarkdown } from './lib/converter';

function App() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');
  const [md, setMd] = useState('');
  const [parser, setParser] = useState<'evernote'| 'notion'>('evernote');

  const convertHtml = (html: string) => {
    const markdown = convertHtmlToMarkdown(html, parser);
    setMd(markdown);
  }

  return (
    <div className="App">
        <select value={parser} onChange={(event) => setParser(event.target.value as 'evernote' | 'notion')}>
          <option value="evernote">Evernote</option>
          <option value="notion">Notion</option>
        </select>
        <textarea value={html} onChange={(event) => setHtml(event.target.value)}></textarea>
        <button onClick={() => convertHtml(html)}>Convert</button>
        {md}
    </div>
  );
}

export default App;
