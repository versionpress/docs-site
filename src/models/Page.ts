/// <reference path="DocsArticle.ts" />
import {BaseModel} from "./BaseModel";
import {DocsArticle} from './DocsArticle';
export class Page extends BaseModel{

    version: string;
    docsArticle: DocsArticle;

    constructor(article: DocsArticle, version: string) {
        super();
        this.docsArticle = article;
        this.version = version;
    }
}