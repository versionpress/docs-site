import fs = require('fs');
import * as VersionUtils  from '../utils/VersionUtils';
import {SemVer} from 'semver';

export class Route {

  'use strict';

  language: string;
  title: string;
  since: SemVer;
  url: string;
  path: string;
  file: string;
  level: number;
  name: string;
  content: string;
  _routes: Array<Route>;
  lastModified: Date;

  constructor(rootPath: string, file: string, since: SemVer, language: string) {
    this.since = since;
    this.content = '';
    let relativePath = file.replace(rootPath, '');
    let pathComponents = relativePath.split('/');
    pathComponents.shift();
    this.file = pathComponents[pathComponents.length - 1];
    this.url = this.getUrl(pathComponents);
    this.level = pathComponents.length - 1;
    this.path = file;
    this.language = language;
    var u = this.url.split('/');
    if (this.file === '_index.md') {
      if (this.level === 0) {
        this.name = this.language;
      } else {
        this.name = u[this.level - 1];
      }

    } else {
      this.name = u[u.length - 1];
    }
    if (file !== '') {
      this.title = this._getRouteTitle(file);
      this.lastModified = this._getFileMTime(this.path);
    }
    this._routes = [];

  }

  public static newFromRoute(route: Route) {
    var newRoute = new Route('', '', VersionUtils.toSemver('0'), '');
    newRoute.since = route.since;
    newRoute.file = route.file;
    newRoute.url = route.url;
    newRoute.level = route.level;
    newRoute.path = route.path;
    newRoute.language = route.language;
    newRoute.name = route.name;
    newRoute.content = route.content;
    newRoute.title = route.title;
    newRoute._routes = [];
    newRoute.lastModified = route.lastModified;
    return newRoute;
  }

  public isValidForCurrentVersion(version: SemVer): boolean {
    return this.since.compare(version) <= 0;
  }

  public get routes() {
    return this._routes;
  }

  public set routes(routes: Array<Route>) {
    this._routes = routes;
  }

  public addChild(route: Route) {
    this._routes.push(route);
  }

  public addChilds(routes: Array<Route>) {
    this._routes = this._routes.concat(routes).filter(n => n !== null);
  }

  private _getFileMTime(path: string) {
    var stats = fs.statSync(path);
    return stats.mtime;
  }

  private getUrl(pathComponents) {
    var urlComponents: Array<number> = pathComponents.map(function (component) {
      return component.substr(component.indexOf('-') + 1);
    });
    var url = urlComponents.join('/');
    url = url.substr(0, url.lastIndexOf('.'));
    url = url.replace('_index', '');
    return this._stripTailingSlash(url);
  }

  private _stripTailingSlash(str) {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }
    return str;
  }

  private _getRouteTitle(file: string) {
    var re = new RegExp('^(?:\\#{1}\\ *)(.+?)(?:\\ *\\#*)$', 'g');
    var match;
    var data = fs.readFileSync(file, 'utf8');
    var lines = data.split('\n');
    if (lines.length > 0) {
      for (var i = 0, iMax = lines.length; i < iMax; i++) {
        match = re.exec(lines[i].trim().toString());
        if (match !== null) {
          return match[1];
        }
      }
    }
    return null;

  }
}
