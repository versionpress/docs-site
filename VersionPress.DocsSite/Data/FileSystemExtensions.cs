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
        /// <summary>
        /// Returns true if FileSystemInfo's name without the optional two-digit prefix
        /// and the `.md` extension matches the article name. For example, `02-getting-started.md`
        /// matches `getting-started`.
        /// </summary>
        public static bool MatchesArticlePathPart(this FileSystemInfo fileSystemInfo, string articlePathPart)
        {
            var fileSystemEntryName = fileSystemInfo.Name;
            var fileNamePattern = new Regex(@"(?:\d{2}-)?([^\.]*)(?:\.md)?");
            var match = fileNamePattern.Match(fileSystemEntryName);

            return match.Success && match.Groups[1].Value == articlePathPart;

        }

    }
}