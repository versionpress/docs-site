using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Collections.Specialized;
using MvcSiteMapProvider.Web.Html;
using VersionPress.DocsSite.Models;

namespace VersionPress.DocsSite.HtmlHelpers
{
    /// <summary>
    /// Extension methods for previous node navigation
    /// </summary>
    public static class PreviousHelper
    {

        private const string PreviousText = "Previous:";

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper)
        {
            return Previous(helper, PreviousText, null, string.Empty);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, ISiteMapNode startingNode)
        {
            return Previous(helper, null, startingNode, new SourceMetadataDictionary());
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, object sourceMetadata)
        {
            return Previous(helper, PreviousText, null, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, SourceMetadataDictionary sourceMetadata)
        {
            return Previous(helper, null, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text)
        {
            return Previous(helper, text, string.Empty);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName)
        {
            return Previous(helper, text, templateName, string.Empty);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string templateName, object sourceMetadata)
        {
            return Previous(helper, PreviousText, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, object sourceMetadata)
        {
            return Previous(helper, text, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string templateName, SourceMetadataDictionary sourceMetadata)
        {
            return Previous(helper, PreviousText, templateName, string.Empty, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, SourceMetadataDictionary sourceMetadata)
        {
            return Previous(helper, text, templateName, string.Empty, sourceMetadata);
        }


        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey)
        {
            return Previous(helper, text, templateName, startingNodeKey, new SourceMetadataDictionary());
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey, object sourceMetadata)
        {
            return Previous(helper, text, templateName, startingNodeKey, new SourceMetadataDictionary(sourceMetadata));
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNodeKey">The key of the starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>SiteMap path for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, string startingNodeKey, SourceMetadataDictionary sourceMetadata)
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
            return Previous(helper, text, templateName, startingNode, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>Previous node for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string templateName, ISiteMapNode startingNode, SourceMetadataDictionary sourceMetadata)
        {
            return Previous(helper, PreviousText, templateName, startingNode, sourceMetadata);
        }

        /// <summary>
        /// Gets previous node in the document outline for the current request
        /// </summary>
        /// <param name="helper">MvcSiteMapHtmlHelper instance</param>
        /// <param name="text">The text to display for the node.</param>
        /// <param name="templateName">Name of the template.</param>
        /// <param name="startingNode">The starting node (the "current node" for the desired view).</param>
        /// <param name="sourceMetadata">User-defined meta data.</param>
        /// <returns>Previous node for the current request</returns>
        public static MvcHtmlString Previous(this MvcSiteMapHtmlHelper helper, string text, string templateName, ISiteMapNode startingNode, SourceMetadataDictionary sourceMetadata)
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
            ISiteMapNode previousNode = GetPreviousNode(startingNode, sourceMetadata);
            var model = new DocumentNavigationModel(previousNode, text);

            return model;
        }

        private static ISiteMapNode GetPreviousNode(ISiteMapNode startingNode, IDictionary<string, object> sourceMetadata)
        {
            ISiteMapNode previousNode = null;

            // Get the previous sibling
            var previousSibling = startingNode.PreviousSibling;
            if (previousSibling != null)
            {
                // If there are any children, go to the last descendant
                if (previousSibling.HasChildNodes)
                {
                    previousNode = previousSibling.Descendants.Last();
                }
                else
                {
                    // If there are no children, return the sibling.
                    previousNode = previousSibling;
                }
            }
            else
            {
                // If there are no more siblings before this one, go to the parent node
                previousNode = startingNode.ParentNode;
            }

            // If the node is not visible or accessible, run the operation recursively until a visible node is found
            if (previousNode != null && !(previousNode.IsVisible(sourceMetadata) || previousNode.IsAccessibleToUser()))
            {
                previousNode = GetPreviousNode(previousNode, sourceMetadata);
            }

            return previousNode;
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
                result.Add("HtmlHelper", typeof(PreviousHelper).FullName);
            return result;
        }
    }
}