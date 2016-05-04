import fs = require('fs');
import {Route} from '../models/Route';
import {ConfigService} from '../services/ConfigService';
import {SemVer} from 'semver';
import * as VersionUtils  from '../utils/VersionUtils';

export class RoutingService {

  private static _instance: RoutingService = new RoutingService();

  private _routes: Array<Route> = [];

  private _filteredRoutes: Array<Route> = [];

  private _flatRoutes: Array<String> = [];

  private _languages: Array<string>;

  constructor() {
    if (RoutingService._instance) {
      throw new Error('Error: Instantiation failed: Use RoutingService.getInstance() instead of new.');
    }
    RoutingService._instance = this;
    this._init();
    console.log('RoutingService initialized');
  }

  public static getInstance(): RoutingService {
    return RoutingService._instance;
  }

  /**
   * Traverses directories and returns Route collection which are allowed for provided version
   * @param dir directory to scan
   * @param rootPath root path used as constant during traversing
   * @param version version stored into Route '0' if null provided
   * @param limitVersion version which should article match (be same or lower)
   * @param callback callback function
   * @private
   */
  private static _walkDir(dir: string, rootPath: string, version: SemVer, limitVersion: SemVer, language: string, callback: Function) {
    fs.readdir(dir, function (err, list) {
      if (err) {
        return callback(err);
      }

      var since = ConfigService.getInstance().getVersionFromConfig(dir);
      list.sort();
      var index = list.indexOf('_index.md');
      list.splice(index, 1);
      var file = dir + '/_index.md';
      var parentRoute = new Route(rootPath, file, since, language);
      var i = 0;
      (function next(parentRoute: Route) {
        var file = list[i++];
        if (!file) {
          return callback(null, parentRoute);
        }
        file = dir + '/' + file;
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            RoutingService._walkDir(file, rootPath, since, limitVersion, language, function (err, res) {
              parentRoute.addChilds(res);
              next(parentRoute);
            });
          } else {
            var fName = file.substr(file.lastIndexOf('/') + 1);

            if (!fName.endsWith('.md')) {
              console.log('skipping not Markdown file - ' + file);
            } else {
              var fMatter = ConfigService.getFrontMatter(file);
              if (fMatter !== null) {
                var newRoute = new Route(rootPath, file, VersionUtils.toSemver(fMatter.since), language);
                parentRoute.addChild(newRoute);
              } else {
                var newRoute = new Route(rootPath, file, since, language);
                parentRoute.addChild(newRoute);
              }
            }
            next(parentRoute);
          }
        });
      })(parentRoute);
    });
  }

  get flatRoutes() {
    return this._flatRoutes;
  }

  get languages() {
    return this._languages;
  }

  public getRouteByUrl(url: string) {
    var u = url.split('/');
    u = u.filter(function (v) {
      return v !== '';
    });
    return this._findRoute(u, this._routes);
  }

  public shouldBeRedirected(url: string) {
    let redirectRules = ConfigService.getInstance().getRedirects();
    return (typeof redirectRules!== "undefined") && (typeof redirectRules[url] !== "undefined");
  }
  
  public getRedirectPath(url: string) {
    return ConfigService.getInstance().getRedirects()[url];
  }

  public getNext(url: string, language: string) {
    return this._findSibling(url, language, 1);
  }

  public getPrevious(url: string, language: string) {
    return this._findSibling(url, language, -1);
  }

  public getRoutesForLanguage(language: string) {
    for (var i = 0; i < this._routes.length; i++) {
      if (this._routes[i].language === language) {
        return this._routes[i];
      }
    }
  }

  public getRoutesForLngAndVersion(language: string) {
    for (var i = 0; i < this._filteredRoutes.length; i++) {
      if (this._filteredRoutes[i].language === language) {
        return this._filteredRoutes[i];
      }
    }
  }

  private _init(): void {
    var docsRootFolder = process.env.DOCS_SOURCE_FOLDER || '.';
    const lng = process.env.AVAILABLE_LANGUAGES || 'en';
    this._languages = lng.split(',');
    for (var language of this._languages) {
      this._initializeRoutes(docsRootFolder, language, ConfigService.getInstance().getSemverDisplayVersion());
    }
  }

  private _findRoute(u: Array<String>, routes: Array<Route>) {
    for (var j = 0; j < routes.length; j++) {
      if (routes[j].name === u[0]) {
        if (routes[j]._routes.length !== 0) {
          u.shift();
          if (typeof u[0] === 'undefined') {
            return routes[j];
          }
          routes = routes[j]._routes;
          return this._findRoute(u, routes);
        } else {
          return routes[j];
        }
      }
    }
  }

  private _findSibling(url: string, language: string, direction: number) {
    var routeUrl: string = '/' + language + '/' + this._flatRoutes[this._flatRoutes.indexOf(url) + direction];
    if (typeof routeUrl !== 'undefined') {

      return this.getRouteByUrl(routeUrl);
    }
    return null;
  }

  private flatten(routes: Array<Route>) {
    var flat = [];
    for (var i = 0; i < routes.length; i++) {
      if (routes[i]._routes.length !== 0) {
        flat.push(routes[i].url);
        flat.push.apply(flat, this.flatten(routes[i]._routes));
      } else {
        flat.push(routes[i].url);
      }
    }
    return flat;
  }

  private  _keepRouteInTree(route: Route) {
     return route.since.compare(ConfigService.getInstance().getSemverDisplayVersion()) <= 0;
  }

  private _filterRoutesForVersion(route: Route) {
    if (this._keepRouteInTree(route)) {
      var currentRoute = Route.newFromRoute(route);
      if (route._routes.length !== 0) {
        for (var i = 0; i < route._routes.length; i++) {
          var childRoute = this._filterRoutesForVersion(route._routes[i]);
          if (typeof childRoute !== 'undefined') {
            currentRoute.addChild(childRoute);
          }
        }
      }

      return currentRoute;
    }

  }

  private  _initializeRoutes(rootPath: string, language: string, version: SemVer) {
    var path = rootPath + '/' + language;
    RoutingService._walkDir(path, path, null, version, language, (err, routes) => {
      if (!err) {
        this._routes.push(routes);
        this._filteredRoutes.push(this._filterRoutesForVersion(routes));
        this._flatRoutes = this.flatten(this._filteredRoutes);
      }
    });
  }
}
