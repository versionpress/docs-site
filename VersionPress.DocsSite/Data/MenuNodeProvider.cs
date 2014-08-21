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
        public override IEnumerable<DynamicNode> GetDynamicNodeCollection(ISiteMapNode node)
        {

            var baseDir = new DirectoryInfo(HostingEnvironment.MapPath("~/App_Data/content/en"));

            var directories = baseDir.EnumerateDirectories().OrderBy(dir => dir.Name);
            var keyPrefix = "content_";

            foreach (var directory in directories)
            {

                var indexFile = new FileInfo(Path.Combine(directory.FullName, "_index.md"));
                var frontMatter = indexFile.YamlHeader();

                var dynamicNode = new DynamicNode();
                dynamicNode.Title = (string)frontMatter["sectionTitle"];
                dynamicNode.Url = "/en/" + directory.GetNameWithoutPrefix();
                dynamicNode.Key = keyPrefix + directory.GetNameWithoutPrefix();
                var parentKey = dynamicNode.Key;

                yield return dynamicNode;

                var files = directory.EnumerateFiles().Where(f => f.Name != "_index.md").OrderBy(f => f.Name);

                foreach (var file in files)
                {
                    frontMatter = file.YamlHeader();

                    dynamicNode = new DynamicNode();
                    dynamicNode.Title = (string)frontMatter["title"];
                    dynamicNode.Url = "/en/" + directory.GetNameWithoutPrefix() + "/" + file.GetNameWithoutPrefix();
                    dynamicNode.ParentKey = parentKey;

                    yield return dynamicNode;
                }


            }


        }
    }
}