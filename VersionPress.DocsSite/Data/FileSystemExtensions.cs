using Semver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using YamlDotNet.Dynamic;

namespace VersionPress.DocsSite.Data
{
    public static class FileSystemExtensions
    {

        private static readonly Regex cleanNamePattern = new Regex(@"(?:\d{2}-)?(.+?)(?:\.md)?$");

        /// <summary>
        /// Returns true if FileSystemInfo's name without the optional two-digit prefix
        /// and the `.md` extension matches the article name. For example, `02-getting-started.md`
        /// matches `getting-started`.
        /// </summary>
        public static bool MatchesArticlePathPart(this FileSystemInfo fileSystemInfo, string articlePathPart)
        {
            var fileSystemEntryName = fileSystemInfo.Name;
            var match = cleanNamePattern.Match(fileSystemEntryName);

            return match.Success && match.Groups[1].Value == articlePathPart;

        }

        /// <summary>
        /// Returns the file name as suitable for URL. For example, `02-getting-started.md`
        /// becomes just `getting-started`.
        /// </summary>
        /// <param name="fileSystemInfo"></param>
        /// <returns></returns>
        public static string GetNameWithoutPrefix(this FileSystemInfo fileSystemInfo)
        {
            return cleanNamePattern.Match(fileSystemInfo.Name).Groups[1].Value;
        }

        public static string GetArticleTitle(this FileSystemInfo fileSystemInfo)
        {

            var markdownFile = GetMarkdownFile(fileSystemInfo);
            var titleLine = "";
            var titleLineRegex = new Regex(@"^(?:\#{1}\ *)(.+?)(?:\ *\#*)$");
            using (var streamReader = new StreamReader(markdownFile.OpenRead()))
            {
                var titleLineFound = false;
                while (!titleLineFound)
                {
                    titleLine = streamReader.ReadLine();
                    if (titleLine == null)
                    {
                        break;
                    }

                    if (titleLineRegex.IsMatch(titleLine))
                    {
                        titleLineFound = true;
                    }
                }

            }

            return titleLineRegex.Match(titleLine).Groups[1].Value;


        }

        public static dynamic GetFrontMatter(this FileSystemInfo fileSystemInfo)
        {
            var markdownFile = GetMarkdownFile(fileSystemInfo);
            var frontMatter = "";
            using (var streamReader = new StreamReader(markdownFile.OpenRead()))
            {

                var firstLine = streamReader.ReadLine();
                if (firstLine != "---")
                {
                    return null;
                } else
                {
                    var frontMatterEndReached = false;

                    while (!frontMatterEndReached)
                    {
                        var line = streamReader.ReadLine();
                        if (line == "---")
                        {
                            frontMatterEndReached = true;
                        } else
                        {
                            frontMatter += line + "\n";
                        }

                    }
                }

            }

            return frontMatter.ToDynamicYaml();
        }

        public static string GetMarkdownWithoutFrontMatter(this FileInfo fileInfo)
        {
            var wholeFile = File.ReadAllText(fileInfo.FullName);
            var whereH1Starts = wholeFile.IndexOf('#');
            return wholeFile.Substring(whereH1Starts);
        }


        /// <summary>
        /// Return Markdown file for the given file or directory. If it is a file,
        /// it returns the file itself. If it is a directory, it returns the nested `_index.md` file.
        /// </summary>
        /// <param name="fileSystemInfo"></param>
        /// <returns></returns>
        public static FileInfo GetMarkdownFile(this FileSystemInfo fileSystemInfo)
        {
            if (fileSystemInfo is FileInfo)
            {
                return fileSystemInfo as FileInfo;
            }
            else
            {
                return new FileInfo(Path.Combine(fileSystemInfo.FullName, "_index.md"));
            }
        }

        public static bool IsIndexFile(this FileSystemInfo fileSystemInfo)
        {
            return fileSystemInfo is FileInfo && fileSystemInfo.Name == "_index.md";
        }

        public static bool ShouldAppearInMenu(this FileSystemInfo fileSystemInfo)
        {
            return fileSystemInfo is FileInfo && !(new[] { "_index.md", "config.yaml" }.Contains(fileSystemInfo.Name));
        }

        public static bool IsValidForCurrentDocsVersion(this FileSystemInfo fileSystemInfo)
        {

            var displayedDocsVersion = SemVersion.Parse(DocsData.GetDocsVersion());

            if (fileSystemInfo is DirectoryInfo)
            {
                var configFile = Path.Combine(fileSystemInfo.FullName, "config.yaml");
                if (!File.Exists(configFile))
                {
                    return true;
                }
                else
                {
                    dynamic config = File.ReadAllText(configFile).ToDynamicYaml();
                    var validSince = (string)config.since;

                    return displayedDocsVersion >= validSince;
                }
            }

            if (fileSystemInfo is FileInfo)
            {
                dynamic frontMatter = fileSystemInfo.GetFrontMatter();
                if (frontMatter == null)
                {
                    return IsValidForCurrentDocsVersion(((FileInfo)fileSystemInfo).Directory);
                }

                var validSince = (string)frontMatter.since;
                if (validSince == null)
                {
                    return true;
                }

                return displayedDocsVersion >= validSince;


            }

            return false;

        }

    }
}