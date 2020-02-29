import { readFile, writeFileSync, opendirSync } from 'fs';
import * as Showdown from 'showdown';

import * as Parsers from '../lib/parsers';

const helpDocumentation = `Usage: node ${process.argv[1]} [filePath|folderPath]=PATH [FLAG=VALUE]
Flags:
  parser: evernote|notion
`;
interface commandlineOptions {
  filePath?: string;
  parser: 'evernote' | 'notion';
  folderPath?: string;
  [key: string]: string | undefined;
}

const args = process.argv.slice(2);
const options: commandlineOptions = {
  parser: 'evernote',
};
args.forEach(argument => {
  const [ key, value ] = argument.split('=');
  options[key] = value;
})

// Make sure we got a filename on the command line.
if (!options.folderPath && !options.filePath) {
  console.error('filePath or folderPath required');
  console.log(helpDocumentation);
  process.exit(1);
}

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

const convertFileContents = (parser: (html: string) => string, fileContents: string): string => {
  const parsedData = parser(fileContents);
  const md = converter.makeMarkdown(parsedData);
  return md;
}

(async function() {
  const parser = Parsers[options.parser];
  let files: {name: string, contents: string}[];

  if (options.filePath) {
    files = [ await openFile(options.filePath) ];
  } else if (options.folderPath) {
    files = await openFilesInFolder(options.folderPath);
  } else {
    files = [];
  }

  const convertedFiles = files.map((file) => {
    const contents = convertFileContents(parser, file.contents);
    return {...file, contents: contents};
  });

  for await (const file of convertedFiles) {
    await writeFileSync(file.name.split('.html')[0]+'.md', file.contents);
  }

  console.log('Runtime: ', new Date().valueOf() - start.valueOf());
})();