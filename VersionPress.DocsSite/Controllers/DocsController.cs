using MvcSiteMapProvider;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
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

            var versionMatch = new Regex(@"^(\d+\.[^\/]*)\/(.*)$").Match(path);
            if (versionMatch.Success)
            {
                ControllerContext.HttpContext.Items.Add("displayVersion", versionMatch.Groups[1].Value);
                path = versionMatch.Groups[2].Value;
            }


            FileInfo markdownFile;
            try
            {
                markdownFile = DocsData.GetFileInfoForArticlePath(path);
            }
            catch (Exception e)
            {
                return HttpNotFound("Could not find documentation topic on " + path);
            }

            var article = new DocsArticle(markdownFile);

            SiteMaps.ReleaseSiteMap();

            return View(article);
        }
    }
}