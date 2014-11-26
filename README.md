# VersionPress Docs Site #

Site serving the [user documentation](https://bitbucket.org/agilio/versionpress-docs). Deployed as [docs.versionpress.net](http://docs.versionpress.net/).


## How to build and deploy ##

1. Open in Visual Studio (2015 recommended, as it supports Gulp and can build LESS files automatically)
2. Build project – should compile both TypeScript and LESS files
3. Copy the content files to App_Data\content
4. Run locally / deploy to Azure

For detailed instructions see [docs content README](https://bitbucket.org/agilio/versionpress-docs/src/master/README.md).


## Versions of the documentation ##

There is currently only one version supported at a time, its string is rendered by the `DocsVersion()` helper method, see `_Layout.cshtml`.