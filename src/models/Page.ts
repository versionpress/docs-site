/// <reference path="DocsArticle.ts" />
/// <reference path="Route.ts" />
import {BaseModel} from "./BaseModel";
import {Route} from './Route';
import {DocsArticle} from './DocsArticle';

export class Page extends BaseModel{

    version: string;
    docsArticle: DocsArticle;
    rootRoute: Route;
    previousRoute: Route;
    nextRoute: Route;

    constructor(article: DocsArticle, version: string, rootRoute:Route) {
        super();
        this.docsArticle = article;
        this.version = version;
        this.rootRoute = rootRoute;
    }

}