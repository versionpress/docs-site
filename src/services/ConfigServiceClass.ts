/// <reference path="../../typings/typings.d.ts" />
import * as YAML from 'yamljs';
import * as path from 'path';
import fs = require("fs");
import readline = require("readline");


export class ConfigServiceClass {

  private static _instance:ConfigServiceClass = new ConfigServiceClass();

  private _appConfig:any;

  private _docsDir:string;

  private _siteRoot:string;

  private _config_file_name = "config.yaml";

  constructor() {
    if (ConfigServiceClass._instance) {
      throw new Error("Error: Instantiation failed: Use ConfigServicClass.getInstance() instead of new.");
    }
    ConfigServiceClass._instance = this;
    console.log("ConfigServiceClass initialized");
    this._init();
  }

  public static getInstance():ConfigServiceClass {
    return ConfigServiceClass._instance;
  }

  public static getDirConfig(file:string) {
    return YAML.load(file);
  }

  public static getFrontMatter(file:string) {
    var data = fs.readFileSync(file, 'utf8');
    var lines = data.split("\n");
    var fMatter = "";
    if (lines.length > 0) {
      if (lines[0] === '---') {
        for (var i = 1, iMax = lines.length; i < iMax; i++) {
          if (lines[i] === '---') {
            break;
          }
          fMatter += lines[i];
        }
        return YAML.parse(fMatter);
      } else {
        return null;
      }
    }
  }

  private _init():void {
    this._docsDir = process.env.DOCS_SOURCE_FOLDER || '.';
    this._appConfig = YAML.load(path.resolve(this._docsDir, this._config_file_name));
    this._siteRoot = process.env.WEBSITE_ROOT;
  }

  get docsDir() {
    return this._docsDir;
  }

  get siteRoot() {
    return this._siteRoot;
  }


  get appConfig() {
    return this._appConfig;
  }
}
