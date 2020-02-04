# convert-highlights-to-roam

At the end of December I joined the #RoamCult. I was previously using Notion to house everything, including a large library of articles that I had clipped from the web and highlighted. When exporting as markdown the highlights were ignored, and Roam doesn't allow importing html files, which preserve highlights when exporting from Notion. So I wrote up a quick converter to change the `mark` elements in the export to Roam's `^^` hightlighting syntax and then convert the html to markdown

Currently the script only works on a single file. I plan to update it to be able to target a directory of files. Feel free to submit an issue for any features you believe this should have or to submit a PR with changes

## Prerequisites:

- https://nodejs.org/en/

## Use:

1. Export the page from Notion as html
2. Clone this repo
3. Navigate to the root directory of the project
4. Run `npm i`
5. Run `npm run build`
6. Run `node converter.js FILEPATH` replacing `FILEPATH` with the path to your file
