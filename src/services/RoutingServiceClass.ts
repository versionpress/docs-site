/// <reference path="../../typings/typings.d.ts" />
import {ConfigServiceClass} from '../services/ConfigServiceClass';

export class RoutingServiceClass {

    private static _instance:RoutingServiceClass = new RoutingServiceClass();

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
        const lng = process.env.AVAILABLE_LANGUAGES || 'en';
        this._languages = lng.split(',');
    }

    get languages() {
        return this._languages;
    }



}