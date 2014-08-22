# VersionPress Docs Site #

Site serving the [user documentation](https://bitbucket.org/agilio/versionpress-docs).

## Versions of the documentation ##

There is currently only one version supported at a time, its string is rendered by the `DocsVersion()` helper method, see `_Layout.cshtml`.

## How to build and deploy ##

1. Open in Visual Studio
2. Compile style-base.less (e.g. open in Web Essentials and save)
3. Copy the content files to App_Data\content
4. Run locally / deploy to Azure