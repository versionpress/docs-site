using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VersionPress.DocsSite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Homepage",
                url: "",
                defaults: new { controller = "Home", action="HandleHomepage" }
                );

            routes.MapRoute(
                name: "CatchAll",
                url: "{*path}",
                defaults: new { controller = "Docs", action = "DisplayArticle" }
            );
        }
    }
}
