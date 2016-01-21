/// <reference path="../../typings/typings.d.ts" />
import * as YAML from 'yamljs';
import * as path from 'path';
import fs = require("fs");
import readline = require("readline");


export class ConfigServiceClass {

     private static _instance:ConfigServiceClass = new ConfigServiceClass();

        private _appConfig: any;

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
    

        private _init():void {
            const docs_root_folder = process.env.DOCS_SOURCE_FOLDER || '.';
            this._appConfig = YAML.load(path.resolve(docs_root_folder,this._config_file_name));
        }

        get appConfig() {
            return this._appConfig;
        }
}