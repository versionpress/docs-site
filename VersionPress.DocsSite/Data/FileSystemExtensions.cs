using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace VersionPress.DocsSite.Data
{
    public static class FileSystemExtensions
    {

        private static readonly Regex cleanNamePattern = new Regex(@"(?:\d{2}-)?([^\.]*)(?:\.md)?");

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

    }
}