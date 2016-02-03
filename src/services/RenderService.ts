/// <reference path="../../typings/typings.d.ts" />
var Markdown = require('markdowndeep');
import fs = require("fs");
import {Page} from '../models/Page';
import {Response} from 'express';

module RenderService {

  var md = new Markdown.Markdown();
  md.ExtraMode = true;
  md.SafeMode = false;
  md.AutoHeadingIDs = true;
  md.MarkdownInHtml = true;

  export function renderDocumentAsync(file:string, page:Page,res:Response, callback:Function) {
    fs.readFile(file, (err, data) => {
      if (err) throw err;
      var output:string;
      output = md.Transform(removeFrontMatter(data.toString()));
      page.docsArticle.content = output;
      callback(res, page);
    });
  }

  function removeFrontMatter(data:string) {
    var lines = data.split("\n");
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
    return lines.join("\n");
  }

}
export = RenderService;
