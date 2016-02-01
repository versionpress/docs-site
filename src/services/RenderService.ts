/// <reference path="../../typings/typings.d.ts" />
//import * as Marked from 'marked';
var Markdown = require('markdowndeep');
import fs = require("fs");

module RenderService{

    var md = new Markdown.Markdown();
    md.ExtraMode = true;
    md.SafeMode = false;
    md.AutoHeadingIDs = true;
    md.MarkdownInHtml = true;
    export function renderDocument(file:string) {
         var output:string;
         var data = fs.readFileSync(file, 'utf8');
        output =  md.Transform(removeFrontMatter(data).toString());
        //console.log(output);
        return output;
    }

    function removeFrontMatter(data:string) {
        var lines = data.split("\n");
        var lnLength  = lines.length;
        if(lnLength>0) {
            if (lines[0]==='---') {
                lines.splice(0,1);
                var i = 1;
                while(i<lnLength) {
                    if(lines[0]==='---') {
                        lines.splice(0,1);
                        break;
                    }
                    lines.splice(0,1);
                    i++;
                }
            } 
        }
        return lines.join("\n");
    }

}
export = RenderService;