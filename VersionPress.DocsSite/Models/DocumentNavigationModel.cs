using System;
using MvcSiteMapProvider;

namespace VersionPress.DocsSite.Models
{
    /// <summary>
    /// Based on https://github.com/NightOwl888/MvcSiteMapProvider_363
    /// </summary>
    public class DocumentNavigationModel
    {
        public DocumentNavigationModel(ISiteMapNode node, string text)
        {
            if (string.IsNullOrEmpty(text))
                throw new ArgumentNullException("text");

            this.Node = node;
            this.Text = text;
        }

        /// <summary>
        /// Node to be rendered as the navigation node
        /// </summary>
        public ISiteMapNode Node { get; private set; }

        /// <summary>
        /// Text to display in HTML helper.
        /// </summary>
        public string Text { get; private set; }
    }
}