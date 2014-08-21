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
        public ActionResult DisplayArticle(string path)
        {

            if (path == null)
            {
                path = "en";
            }

            FileInfo markdownFile;
            try
            {
                markdownFile = DocsData.GetFileInfoForArticlePath(path);
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