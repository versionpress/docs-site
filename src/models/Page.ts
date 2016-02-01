/// <reference path="DocsArticle.ts" />
/// <reference path="Route.ts" />
import {BaseModel} from "./BaseModel";
import {Route} from './Route';
import {DocsArticle} from './DocsArticle';
import {Language} from "./Language";

export class Page extends BaseModel {

    version:string;
    docsArticle:DocsArticle;
    rootRoute:Route;
    previousRoute:Route;
    nextRoute:Route;
    language:Language;
    url:string;

    constructor(article:DocsArticle, version:string, rootRoute:Route) {
        super();
        this.docsArticle = article;
        this.version = version;
        this.rootRoute = rootRoute;
    }

}