/// <reference path="../../typings/typings.d.ts" />
import * as Marked from 'marked';
import fs = require("fs");

module RenderService{

    export function renderDocument(file:string) {
         var output;
         var data = fs.readFileSync(file, 'utf8');
        output =  Marked(data.toString());
        //console.log(output);
        return output;
    }

}
export = RenderService;