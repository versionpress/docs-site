import {BaseModel} from "./BaseModel";
import {Language} from "./Language";
export class DocsArticle extends BaseModel{
    since: string;
    content: string;
    sourceFile: string;
    nextPage: DocsArticle;
    previousPage: DocsArticle;
    parentPage: DocsArticle;
    url: string;
    title: string;
    order: number;
    language: Language;


    defaults() {
        return {
            language: Language.en,
            parentPage:null
        }
    }
}