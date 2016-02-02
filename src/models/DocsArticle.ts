/// <reference path="Language.ts" />
export class DocsArticle{
  since:string;
  content:string;
  url:string;
  title:string;


  isValidForCurrentVersion(version:string):boolean {
    return Number(this.since) >= Number(version);
  }

}
