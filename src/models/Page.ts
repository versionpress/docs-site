/// <reference path="DocsArticle.ts" />
/// <reference path="Route.ts" />
import {Route} from './Route';
import {DocsArticle} from './DocsArticle';
import {Language} from './Language';

export class Page {

  displayVersion: string;
  docsArticle: DocsArticle;
  rootRoute: Route;
  previousRoute: Route;
  nextRoute: Route;
  language: Language;
  url: string;
  errorMessage: string;
  error: any;

  constructor(article: DocsArticle, displayVersion: string, rootRoute: Route) {
    this.docsArticle = article;
    this.displayVersion = displayVersion;
    this.rootRoute = rootRoute;
  }

}
