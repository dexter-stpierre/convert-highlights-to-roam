const convertHighlights = (html: string): string => {
  const replacedHighlights = html.replace(/<span style="background-color: rgb\(\d*, \d*, \d*\);-evernote-highlight:true;">(.*?)<\/span>/g, '^^$1^^');
  return replacedHighlights;
}

export const evernoteParser = (html: string) => {
  const convertedHightlights = convertHighlights(html);
  return convertedHightlights;
}
