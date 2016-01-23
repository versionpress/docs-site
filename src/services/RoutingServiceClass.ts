/// <reference path="../../typings/typings.d.ts" />
import fs = require("fs");
import * as path from 'path';
import {Route} from '../models/Route';
import {ConfigServiceClass} from '../services/ConfigServiceClass';

export class RoutingServiceClass {

    private static _instance:RoutingServiceClass = new RoutingServiceClass();

    private _routes:Array<Route> = new Array();

    private _languages: Array<string>;

    constructor() {
        if (RoutingServiceClass._instance) {
            throw new Error("Error: Instantiation failed: Use RoutingServiceClass.getInstance() instead of new.");
        }
        RoutingServiceClass._instance = this;
        this._init();
        console.log("RoutingServiceClass initialized");
    }

    public static getInstance():RoutingServiceClass {
        return RoutingServiceClass._instance;
    }




    private _init():void {
        const docs_root_folder = process.env.DOCS_SOURCE_FOLDER || '.';
        const lng = process.env.AVAILABLE_LANGUAGES || 'en';
        this._languages = lng.split(',');
        for (var language of this._languages) {
            this._initializeRoutes(docs_root_folder,language, ConfigServiceClass.getInstance().appConfig.displayVersion);
        }
    }

    get languages() {
        return this._languages;
    }

    public getRouteByUrl(url:string){
        console.log(" Searching for "+ url );
        var u = url.split("/");
        u = u.filter(function(v){return v!==''});
        console.log(u);
        return this._findRoute(u, this._routes);
    }

    private _findRoute(u:Array<String>, routes:Array<Route>){
                console.log(routes[0].name);
                for(var j=0;j<routes.length; j++) {
                    console.log(routes[j].name+" -- "+ u[0]);
                    if(routes[j].name===u[0]) {
                        if(routes[j]._routes.length!=0) {
                            u.shift();
                            if(typeof u[0]=="undefined") {
                                return routes[j];
                            }
                            console.log("Scanning subroutes -" + u[0]);
                            var routes = routes[j]._routes;
                            return this._findRoute(u,routes);
                        } else {
                            console.log("Route found "+routes[j].path);
                            return routes[j];
                        }
                    }
                }
            //console.log(u[i]+" "+(u.length-1));
        }


     public getRoutesForLanguage(language:string) {
         for(var i = 0; i<this._routes.length;i++) {
             if(this._routes[i].language===language) {
                 return this._routes[i];
             }
         }
    }

    private  _initializeRoutes(rootPath: string, language:string, version: string) {
        var path = rootPath +"/"+language;
        RoutingServiceClass._walkDir(path, path, null, version, language, (err,routes) => {
            if(!err) {
                this._routes.push(routes);
            }
        });
    }

    private static skipDir(dir:string, limitVersion:string){
        var configFile = path.resolve(dir,"config.yaml");
        if(fs.existsSync(configFile)) {
            var since = ConfigServiceClass.getDirConfig(configFile).since;
            if(Number(since)>Number(limitVersion)) {
                console.log("Skipping dir " + dir);
                return true;
            }
        }
        return false;
    }
    /**
     * Traverses directories and returns Route collection which are allowed for provided version
     * @param dir directory to scan
     * @param rootPath root path used as constant during traversing
     * @param version version stored into Route 0 if null provided
     * @param limitVersion version which should article match (be same or lower)
     * @param callback callback function
     * @private
     */
    private static _walkDir(dir: string, rootPath: string, version: string, limitVersion: string, language: string, callback: Function) {

        if(!RoutingServiceClass.skipDir(dir, limitVersion)) {
            fs.readdir(dir, function (err, list) {
                if (err) return callback(err);

                var since = '0';
                list.sort();
                var index = list.indexOf('_index.md');
                list.splice(index, 1);
                var file = dir + '/_index.md';
                var parentRoute = new Route(rootPath, file, since, language);
                var i = 0;
                (function next(parentRoute:Route) {
                    var file = list[i++];
                    if (!file) return callback(null, parentRoute);
                    file = dir + '/' + file;
                    fs.stat(file, function (err, stat) {
                        if (stat && stat.isDirectory()) {
                            RoutingServiceClass._walkDir(file, rootPath, since, limitVersion, language, function (err, res) {
                                parentRoute.addChilds(res);
                                next(parentRoute);
                            });
                        } else {
                            var fName = file.substr(file.lastIndexOf("/") + 1);

                            if (fName === 'config.yaml') {
                                console.log('skipping CONFIG ' + file);
                            } else {
                                var fMatter = ConfigServiceClass.getFrontMatter(file);
                                if (fMatter != null) {
                                    if (Number(fMatter.since) > Number(limitVersion)) {
                                        console.log("skipping file " + file);
                                    } else {
                                        parentRoute.addChild(new Route(rootPath, file, fMatter.since, language));
                                    }
                                } else {
                                    parentRoute.addChild(new Route(rootPath, file, since, language));
                                }
                            }
                            next(parentRoute);
                        }
                    });
                })(parentRoute);
            });
        } else {
            return callback(null, null);
        }
    }

}