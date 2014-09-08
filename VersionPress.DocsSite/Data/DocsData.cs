using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using YamlDotNet.RepresentationModel;

namespace VersionPress.DocsSite.Data
{
    public class DocsData
    {

        /// <summary>
        /// For something like 'intro/getting-started', finds the physical path, e.g.,
        /// '01-intro/03-getting-started.md'
        /// </summary>
        /// <param name="ArticlePath"></param>
        /// <returns></returns>
        public static FileInfo GetFileInfoForArticlePath(string articlePath)
        {

            var currentDir = new DirectoryInfo(HostingEnvironment.MapPath("~/App_Data/content"));

            var pathParts = articlePath.Split('/');
            foreach (var pathPart in pathParts)
            {

                var matchingFile = currentDir.EnumerateFiles().Where(file => file.MatchesArticlePathPart(pathPart)).FirstOrDefault();

                if (matchingFile != null)
                {
                    return matchingFile;
                }
                else
                {
                    var matchingDir = currentDir.EnumerateDirectories().Where(dir => dir.MatchesArticlePathPart(pathPart)).FirstOrDefault();
                    if (matchingDir != null)
                    {
                        currentDir = matchingDir;
                    }
                    else
                    {
                        throw new Exception("Couldn't find " + articlePath);
                    }
                }


            }

            var indexFile = new FileInfo(Path.Combine(currentDir.FullName, "_index.md"));
            if (indexFile.Exists)
            {
                return indexFile;
            }
            else
            {
                throw new Exception("Couldn't find " + articlePath);
            }

        }

        public static string GetDocsVersion()
        {
            var config = new StringReader(File.ReadAllText(HostingEnvironment.MapPath("~/App_Data/content/config.yaml")));
            var yaml = new YamlStream();
            yaml.Load(config);

            var root = yaml.Documents[0].RootNode;
            var docsVersion = (root as YamlMappingNode).Children[new YamlScalarNode("version")];
            return docsVersion.ToString();
        }


    }
}