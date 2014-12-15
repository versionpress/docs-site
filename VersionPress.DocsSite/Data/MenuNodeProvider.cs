using MvcSiteMapProvider;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace VersionPress.DocsSite.Data
{
    public class MenuNodeProvider : DynamicNodeProviderBase 
    {

        /// <summary>
        /// Builds nodes of the navigation.
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public override IEnumerable<DynamicNode> GetDynamicNodeCollection(ISiteMapNode node)
        {

            var baseDir = new DirectoryInfo(HostingEnvironment.MapPath("~/App_Data/content/en"));

            var fileSystemInfos = baseDir.EnumerateFileSystemInfos()
                                         .Where(fsi => !fsi.IsIndexFile())
                                         .OrderBy(fsi => fsi.Name);
            var keyPrefix = "content_";
            var urlStart = "~/" + (HttpContext.Current.Items.Contains("displayVersion") ? HttpContext.Current.Items["displayVersion"] + "/" : "") + "en/";


            // The current implementation is a bit simplistic, only supporting single level
            // of directories. So e.g. inside a `xy-getting-started` directory, there can only
            // content files and no further nested directories.

            foreach (var fileSystemInfo in fileSystemInfos)
            {

                if (fileSystemInfo is DirectoryInfo)
                {

                    var directory = fileSystemInfo as DirectoryInfo;

                    if (!directory.IsValidForCurrentDocsVersion())
                    {
                        continue;
                    }

                    var dynamicNode = new DynamicNode();
                    dynamicNode.Title = directory.GetArticleTitle();
                    dynamicNode.Url = urlStart + directory.GetNameWithoutPrefix();
                    dynamicNode.Key = keyPrefix + directory.GetNameWithoutPrefix();
                    var parentKey = dynamicNode.Key;

                    yield return dynamicNode;

                    var files = directory.EnumerateFiles().Where(f => !f.IsIndexFile()).OrderBy(f => f.Name);

                    foreach (var file in files)
                    {

                        if (!file.ShouldAppearInMenu() || !file.IsValidForCurrentDocsVersion())
                        {
                            continue;
                        }

                        dynamicNode = new DynamicNode();
                        dynamicNode.Title = file.GetArticleTitle();
                        dynamicNode.Url = urlStart + directory.GetNameWithoutPrefix() + "/" + file.GetNameWithoutPrefix();
                        dynamicNode.ParentKey = parentKey;

                        yield return dynamicNode;
                    }
                }
                else
                {
                    var dynamicNode = new DynamicNode();
                    dynamicNode.Title = fileSystemInfo.GetArticleTitle();
                    dynamicNode.Url = "~/en/" + fileSystemInfo.GetNameWithoutPrefix();

                    yield return dynamicNode;

                }



            }


        }
    }
}