import {BaseModel} from "./BaseModel";
import fs = require("fs");

export class Route extends BaseModel {


  constructor(rootPath:string, file:string, since:string, language:string) {
    super();
    this.since = since;
    let relativePath = file.replace(rootPath, "");
    let pathComponents = relativePath.split("/");
    pathComponents.shift();
    this.file = pathComponents[pathComponents.length - 1];
    this.url = this.getUrl(pathComponents);
    this.level = pathComponents.length - 1;
    this.path = file;
    this.language = language;
    var u = this.url.split("/");
    if (this.file === "_index.md") {
      if (this.level == 0) {
        this.name = this.language;
      } else {
        this.name = u[this.level - 1];
      }

    } else {
      this.name = u[u.length - 1];
    }
    this.title = this.getRouteTitle(file);
    this._routes = new Array();
    this.lastModified = this._getFileMTime(this.path);

  }

  language:string;
  title:string;
  since:string;
  url:string;
  path:string;
  file:string;
  level:number;
  name:string;
  _routes:Array<Route>;
  lastModified:Date;


  private _getFileMTime(path:string) {
    var stats = fs.statSync(path);
    return stats.mtime;
  }


  private getUrl(pathComponents) {
    var urlComponents:Array<number> = pathComponents.map(function (component) {
      return component.substr(component.indexOf("-") + 1);
    });
    var url = urlComponents.join("/");
    url = url.substr(0, url.lastIndexOf("."));
    url = url.replace("_index", "");
    return this.stripTailingSlash(url);
  }

  private stripTailingSlash(str) {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }
    return str;
  }

  public get routes() {
    return this._routes;
  }


  public set routes(routes:Array<Route>) {
    this._routes = routes;
  }

  public addChild(route:Route) {
    this._routes.push(route);
  }

  public addChilds(routes:Array<Route>) {
    this._routes = this._routes.concat(routes).filter(n => n != null);
  }

  private getRouteTitle(file:string) {
    var re = new RegExp("^(?:\\#{1}\\ *)(.+?)(?:\\ *\\#*)$", "g");
    var match;
    var data = fs.readFileSync(file, 'utf8');
    var lines = data.split("\n");
    if (lines.length > 0) {
      //console.log(lines[0]);
      for (var i = 0, iMax = lines.length; i < iMax; i++) {
        //console.log(lines[0]+"...");
        match = re.exec(lines[i].trim().toString());
        if (match != null) {
          //console.log(match[1]);
          return match[1];
        }
      }
    }
    return null;

  }
}
