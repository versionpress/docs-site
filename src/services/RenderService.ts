/// <reference path="../../typings/typings.d.ts" />
var markdown = require('markdowndeep');
import fs = require('fs');
import {Page} from '../models/Page';
import {Route} from '../models/Route';
import {Response} from 'express';

module RenderService {

  var md = new markdown.Markdown();
  md.ExtraMode = true;
  md.SafeMode = false;
  md.AutoHeadingIDs = true;
  md.MarkdownInHtml = true;

  export function renderDocument(route: Route, page: Page, res: Response, callback: Function) {
    fs.readFile(route.path, (err, data) => {
      if (err) {
        throw err;
      }
      var output: string;
      if (route.content === '') {
        output = md.Transform(removeVersionInvalidSections(removeFrontMatter(data.toString()), page.version));
        route.content = output;
      }
      page.docsArticle.content = route.content;
      callback(res, page);
    });
  }

  function removeVersionInvalidSections(data: string, version: string) {
    // Regexp example and tests https://regex101.com/r/oU1qT5/5
    var versionedRegex = new RegExp('^(--- ([\\d|.]*))((.|\\r\\n?|\\n)*?)(---)$','mg');
    var m;
    while ((m = versionedRegex.exec(data)) !== null) {
      if (m.index === versionedRegex.lastIndex) {
        versionedRegex.lastIndex++;
      }
      console.log(m);
    }
    return data;
  }

  function removeFrontMatter(data: string) {
    var lines = data.split('\n');
    var lnLength = lines.length;
    if (lnLength > 0) {
      if (lines[0] === '---') {
        lines.splice(0, 1);
        var i = 1;
        while (i < lnLength) {
          if (lines[0] === '---') {
            lines.splice(0, 1);
            break;
          }
          lines.splice(0, 1);
          i++;
        }
      }
    }
    return lines.join('\n');
  }

}
export = RenderService;
