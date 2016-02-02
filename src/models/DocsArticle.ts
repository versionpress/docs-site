/// <reference path="Language.ts" />
import {BaseModel} from "./BaseModel";
export class DocsArticle extends BaseModel {
  since:string;
  content:string;
  url:string;
  title:string;


  isValidForCurrentVersion(version:string):boolean {
    return Number(this.since) >= Number(version);
  }

}
