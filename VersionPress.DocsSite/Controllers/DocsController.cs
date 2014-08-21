using System;
using System.Collections.Generic;
using System.IO;
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

            FileInfo markdownFile;
            try
            {
                markdownFile = DocsData.GetFileInfoForArticlePath(language + "/" + path);
            }
            catch (Exception e)
            {
                return HttpNotFound("Could not found documentation topic on " + path);
            }

            var article = new DocsArticle(markdownFile);

            return View(article);
        }
    }
}