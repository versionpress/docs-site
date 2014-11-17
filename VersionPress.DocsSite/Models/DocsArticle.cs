using CommonMark;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

        public FileInfo MarkdownSourceFile { get; set; }

        public string Html { 
            get {
                var output = CommonMarkConverter.Convert(File.ReadAllText(MarkdownSourceFile.FullName));
                return output;
            }
        }
    }
}