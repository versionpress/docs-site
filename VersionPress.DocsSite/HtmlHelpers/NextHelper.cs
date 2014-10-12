using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Collections.Specialized;
using MvcSiteMapProvider.Web.Html;
using VersionPress.DocsSite.Models;

namespace VersionPress.DocsSite.HtmlHelpers
{
    /// <summary>
    /// Extension methods for next node navigation.
    /// </summary>
    public static class NextHelper
    {

        private const string NextText = "Next:";

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper)
        {
            return Next(helper, NextText, null, string.Empty);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, ISiteMapNode startingNode)
        {
            return Next(helper, null, startingNode, new SourceMetadataDictionary());
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, object sourceMetadata)
        {
            return Next(helper, NextText, null, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, SourceMetadataDictionary sourceMetadata)
        {
            return Next(helper, null, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text)
        {
            return Next(helper, text, string.Empty);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName)
        {
            return Next(helper, text, templateName, string.Empty);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string templateName, object sourceMetadata)
        {
            return Next(helper, NextText, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, object sourceMetadata)
        {
            return Next(helper, text, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string templateName, SourceMetadataDictionary sourceMetadata)
        {
            return Next(helper, NextText, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, SourceMetadataDictionary sourceMetadata)
        {
            return Next(helper, text, templateName, string.Empty, sourceMetadata);
        }


        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey)
        {
            return Next(helper, text, templateName, startingNodeKey, new SourceMetadataDictionary());
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey, object sourceMetadata)
        {
            return Next(helper, text, templateName, startingNodeKey, new SourceMetadataDictionary(sourceMetadata));
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey, SourceMetadataDictionary sourceMetadata)
        {
            ISiteMapNode startingNode;
            if (string.IsNullOrEmpty(startingNodeKey))
            {
                startingNode = helper.SiteMap.CurrentNode;
            }
            else
            {
                startingNode = helper.SiteMap.FindSiteMapNodeFromKey(startingNodeKey);
            }
            return Next(helper, text, templateName, startingNode, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>Next node for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string templateName, ISiteMapNode startingNode, SourceMetadataDictionary sourceMetadata)
        {
            return Next(helper, NextText, templateName, startingNode, sourceMetadata);
        }

        /// <summary>
        /// Gets next node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>Next node for the current request</returns>
        public static MvcHtmlString Next(this MvcSiteMapHtmlHelper helper, string text, string templateName, ISiteMapNode startingNode, SourceMetadataDictionary sourceMetadata)
        {
            var model = BuildModel(helper, text, GetSourceMetadata(sourceMetadata), startingNode);
            return helper
                .CreateHtmlHelperForModel(model)
                .DisplayFor(m => model, templateName);
        }

        /// <summary>
        /// Builds the model.
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <param name="startingNode">The starting node.</param>
        /// <returns>The model.</returns>
        private static DocumentNavigationModel BuildModel(MvcSiteMapHtmlHelper helper, string text, SourceMetadataDictionary sourceMetadata, ISiteMapNode startingNode)
        {
            ISiteMapNode nextNode = GetNextNode(startingNode, sourceMetadata);
            var model = new DocumentNavigationModel(nextNode, text);

            return model;
        }

        private static ISiteMapNode GetNextNode(ISiteMapNode startingNode, IDictionary<string, object> sourceMetadata)
        {
            ISiteMapNode nextNode = null;
            if (startingNode.HasChildNodes)
            {
                // Get the first child node
                nextNode = startingNode.ChildNodes[0];
            }
            else if (startingNode.ParentNode != null)
            {
                // Get the next sibling node
                nextNode = startingNode.NextSibling;
                if (nextNode == null)
                {
                    // If there are no more siblings, the next position
                    // should be the parent's next sibling
                    var parent = startingNode.ParentNode;
                    if (parent != null)
                    {
                        nextNode = parent.NextSibling;
                    }
                }
            }

            // If the node is not visible or accessible, run the operation recursively until a visible node is found
            if (nextNode != null && !(nextNode.IsVisible(sourceMetadata) || nextNode.IsAccessibleToUser()))
            {
                nextNode = GetNextNode(nextNode, sourceMetadata);
            }

            return nextNode;
        }

        /// <summary>
        /// Gets the source meta data for the current context.
        /// </summary>
        /// <param name="sourceMetadata">User-defined metadata.</param>
        /// <returns>SourceMetadataDictionary for the current request.</returns>
        private static SourceMetadataDictionary GetSourceMetadata(IDictionary<string, object> sourceMetadata)
        {
            var result = new SourceMetadataDictionary(sourceMetadata);
            if (!result.ContainsKey("HtmlHelper"))
                result.Add("HtmlHelper", typeof(NextHelper).FullName);
            return result;
        }
    }
}