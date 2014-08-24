using MvcSiteMapProvider;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
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

            // Possibly invalidate navigation cache
            var changeFile = new FileInfo(HostingEnvironment.MapPath("~/App_Data/content/.changed"));
            if (changeFile.Exists)
            {
                SiteMaps.ReleaseSiteMap();
                changeFile.Delete();
            }


            return View(article);
        }
    }
}