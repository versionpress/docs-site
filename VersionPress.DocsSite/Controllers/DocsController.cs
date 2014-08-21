using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VersionPress.DocsSite.Data;
using VersionPress.DocsSite.Models;

namespace VersionPress.DocsSite.Controllers
{

    [HandleError]
    public class DocsController : Controller
    {
        public ActionResult DisplayArticle(string language, string path)
        {
            var markdownFile = DocsData.GetFileInfoForArticlePath(language + "/" + path);
            var article = new DocsArticle(markdownFile);

            return View(article);
        }
    }
}