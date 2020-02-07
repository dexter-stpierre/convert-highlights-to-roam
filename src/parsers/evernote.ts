const extractBody = (html: string): string => {
  const [, withoutBeginning] = html.split('<div class="page-body">');
  return withoutBeginning;
}

const convertHighlights = (html: string): string => {
  const replacedHighlights = html.replace(/<span style="background-color: rgb\(\d*, \d*, \d*\);-evernote-highlight:true;">(.*?)<\/span>/g, '^^$1^^');
  return replacedHighlights;
}

export const evernoteParser = (html: string) => {
  console.log('evernote parser')
  const convertedHightlights = convertHighlights(html);
  return convertedHightlights;
}
