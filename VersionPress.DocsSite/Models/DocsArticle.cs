using MarkdownDeep;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace VersionPress.DocsSite.Models
{
    public class DocsArticle
    {

        public DocsArticle(FileInfo sourceFile)
        {
            MarkdownSourceFile = sourceFile;
        }

        public string Title { get; set; }

        public FileInfo MarkdownSourceFile { get; set; }

        public string Html { 
            get {
                var md = new Markdown();
                md.ExtraMode = true;
                var output = md.Transform(File.ReadAllText(MarkdownSourceFile.FullName));
                return output;
            }
        }
    }
}