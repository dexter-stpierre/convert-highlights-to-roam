import { readFile, writeFile } from 'fs';
import * as Europa from 'node-europa';

import * as Parsers from './parsers';
console.log(Parsers);
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

const convertFile = async (parser, filePath: string): Promise<string> => {
  const fileContents = await openFile(filePath);
  const parsedData = parser(fileContents);
  const md = europa.convert(parsedData);
  return md;
}

interface commandlineOptions {
  filePath?: string;
  parser?: string;
}

(async function() {
  const args = process.argv.slice(2);
  const options: commandlineOptions = {};
  args.forEach(argument => {
    const [ key, value ] = argument.split('=');
    options[key] = value;
  })

  const parser = Parsers[options.parser];
  console.log(parser);
  const filePath: string = process.argv[2];
  const md = await convertFile(parser, filePath);
  writeFile(filePath.split('.html')[0]+'.md', md, (error) => {
    console.log(error);
  });
})()