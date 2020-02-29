const extractBody = (html: string): string => {
  if (!html.includes('<div class="page-body">')) return html;
  const [, withoutBeginning] = html.split('<div class="page-body">');
  return withoutBeginning;
}

const convertHighlights = (html: string): string => {
  const replacedHighlights = html.replace(/<mark class="highlight-[a-z]+_background">(.*?)<\/mark>/g, '^^$1^^');
  return replacedHighlights;
}

export const notionParser = (html: string) => {

  const body = extractBody(html);
  const replacedHighlights = convertHighlights(body);
  return replacedHighlights;
}