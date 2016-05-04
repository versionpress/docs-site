import fs = require('fs');
import {Page} from '../models/Page';
import {Route} from '../models/Route';
import {Response} from 'express';
import * as Marked from 'marked';

module RenderService {

  export function renderDocument(route: Route, page: Page, res: Response, callback: Function) {
    fs.readFile(route.path, (err, data) => {
      if (err) {
        throw err;
      }
      var output: string;
      if (route.content === '') {
        route.content = Marked.parse(removeFrontMatter(data.toString()));
      }
      page.docsArticle.content = route.content;
      callback(res, page);
    });
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
