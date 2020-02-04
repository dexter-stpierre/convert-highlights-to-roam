import { readFile, writeFile } from 'fs';
import * as Europa from 'node-europa';

import { notionParser } from './parsers/notion';

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILEPATH');
  process.exit(1);
}

const europa = new Europa({inline: true});

const openFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filePath, { encoding: "utf8" }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    })
  });
};

const extractBody = (html: string): string => {
  const [, withoutBeginning] = html.split('<div class="page-body">');
  return withoutBeginning;
}

const convertHighlights = (html: string): string => {
  const replacedBeginningHighlights = html.replace(/(<mark class="highlight-[a-z]+_background">)+/g, '^^');
  const replacedEndHighlights = replacedBeginningHighlights.replace(/(<\/mark>)+/g, '^^');
  return replacedEndHighlights;
}

const convertFile = async (filePath: string): Promise<string> => {
  const fileContents = await openFile(filePath);
  const parsedData = notionParser(fileContents);
  const md = europa.convert(parsedData);
  return md;
}

(async function() {
  const filePath: string = process.argv[2];
  const md = await convertFile(filePath);
  writeFile(filePath.split('.html')[0]+'.md', md, (error) => {
    console.log(error);
  });
})()