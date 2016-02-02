/// <reference path="DocsArticle.ts" />
/// <reference path="Route.ts" />
import {Route} from './Route';
import {DocsArticle} from './DocsArticle';
import {Language} from "./Language";

export class Page {

  version:string;
  docsArticle:DocsArticle;
  rootRoute:Route;
  previousRoute:Route;
  nextRoute:Route;
  language:Language;
  url:string;
  errorMessage:string;
  error:any;


  constructor(article:DocsArticle, version:string, rootRoute:Route) {
    this.docsArticle = article;
    this.version = version;
    this.rootRoute = rootRoute;
  }

}
