import { readFile, writeFileSync, opendirSync } from 'fs';
import * as Showdown from 'showdown';

import * as Parsers from './parsers';

const start = new Date();

const converter = new Showdown.Converter();

const openFile = (filePath: string): Promise<{name: string, contents: string}> => {
  return new Promise((resolve, reject) => {
    readFile(filePath, { encoding: "utf8" }, (error, data) => {
      if (error) return reject(error);
      resolve({name: filePath, contents: data});
    })
  });
};

const openFilesInFolder = async (folderPath: string): Promise<{name: string, contents: string}[]> => {
  const directory = opendirSync(folderPath);
  const files: {name: string, contents: string}[] = [];

  for await (const dirent of directory) {
    if (!dirent.name.includes('.html')) continue;
    const file = await openFile(`${directory.path}/${dirent.name}`);
    files.push(file);
  }

  return files;
}

export const convertHtmlToMarkdown = (html: string, parser: 'evernote' | 'notion' = 'evernote'): string => {
  const Parser = Parsers[parser];
  const parsedData = Parser(html);
  const md = converter.makeMarkdown(parsedData);
  return md;
}
