const extractBody = (html: string): string => {
  const [, withoutBeginning] = html.split('<div class="page-body">');
  return withoutBeginning;
}

const convertHighlights = (html: string): string => {
  const replacedBeginningHighlights = html.replace(/(<mark class="highlight-[a-z]+_background">)+/g, '^^');
  const replacedEndHighlights = replacedBeginningHighlights.replace(/(<\/mark>)+/g, '^^');
  return replacedEndHighlights;
}

export const notionParser = (html: string) => {
  const body = extractBody(html);
  const replacedHighlights = convertHighlights(body);
  return replacedHighlights;
}