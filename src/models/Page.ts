import { Route } from './Route';
import { Language } from './Language';

export class Page {

  displayVersion: string;
  rootRoute: Route;
  previousRoute: Route;
  nextRoute: Route;
  language: Language;
  url: string;
  errorMessage: string;
  error: any;
  title: string;
  content: string;

  constructor(displayVersion: string, rootRoute: Route) {
    this.displayVersion = displayVersion;
    this.rootRoute = rootRoute;
  }

}
