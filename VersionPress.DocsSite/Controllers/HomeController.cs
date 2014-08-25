using System;
using System.Collections.Generic;
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
    }
}