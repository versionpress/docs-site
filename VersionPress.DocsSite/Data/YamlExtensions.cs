using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using YamlDotNet.Dynamic;
using YamlDotNet.RepresentationModel;

namespace VersionPress.DocsSite.Data
{
    public static class YamlExtensions
    {

        /// <summary>
        /// Returns the first YAML document from the string as a dynamic object
        /// </summary>
        /// <param name="yamlAsString"></param>
        /// <returns></returns>
        public static DynamicYaml ToDynamicYaml(this string yamlAsString)
        {
            var yaml = new YamlStream();
            yaml.Load(new StringReader(yamlAsString));
            dynamic root = new DynamicYaml(yaml.Documents[0].RootNode);
            return root;
        }

    }
}