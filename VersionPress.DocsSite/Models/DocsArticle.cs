using MarkdownDeep;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using VersionPress.DocsSite.Data;

namespace VersionPress.DocsSite.Models
{
    public class DocsArticle
    {

        public DocsArticle(FileInfo sourceFile)
        {
            MarkdownSourceFile = sourceFile;
            Title = sourceFile.GetArticleTitle();
        }

        public string Title { get; set; }

        public bool IsValidForCurrentVersion { get; set; }

        public FileInfo MarkdownSourceFile { get; set; }

        public string Html { 
            get {
                var md = new Markdown();
                md.ExtraMode = true;
                md.SafeMode = false;
                md.AutoHeadingIDs = true;
                md.MarkdownInHtml = true;
                var output = md.Transform(MarkdownSourceFile.GetMarkdownWithoutFrontMatter());

                // custom to-do handler
                output = Regex.Replace(output, @"(\[TODO[^\[]*\])", "<span class=\"todo\">$1</span>");

                return output;
            }
        }
    }
}