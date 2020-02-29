import * as Showdown from 'showdown'

import * as Parsers from './parsers'

const converter = new Showdown.Converter()

export const convertHtmlToMarkdown = (
  html: string,
  parser: 'evernote' | 'notion' = 'evernote',
): string => {
  const Parser = Parsers[parser]
  const parsedData = Parser(html)
  const md = converter.makeMarkdown(parsedData)
  return md
}
