using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VersionPress.DocsSite.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult HandleHomepage()
        {
            return RedirectPermanent("~/en");
        }
        
        public ActionResult HandleMedia(string path)
        {
            var fileSystemPath = "~/App_Data/content/media/" + path;
            var fileName = Path.GetFileName(fileSystemPath);

            return File(fileSystemPath, MimeMapping.GetMimeMapping(fileName));
        }
    }
}