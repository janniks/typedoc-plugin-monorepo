import { TocModulesPlugin } from "./toc-modules-plugin";
import { ExternalModuleMapPlugin } from "./external-module-map-plugin";
import { ParameterType, PluginHost } from "typedoc/dist/lib/utils";
import { initInlineReferencesPlugin } from "./inline-references-plugin";

module.exports = function (PluginHost: PluginHost) {
  const app = PluginHost.owner;

  app.options.addDeclaration({
    name: "external-modulemap",
    type: ParameterType.String,
    help: "Regular expression to capture the module names.",
  });

  app.options.addDeclaration({
    name: "inline-references",
    type: ParameterType.Boolean,
    defaultValue: false,
    help: "Inline references with target declarations",
  });

  // @ts-ignore
  app.converter.addComponent("external-module-map", ExternalModuleMapPlugin);
  // @ts-ignore
  app.renderer.addComponent("toc-modules-plugin", TocModulesPlugin);

  initInlineReferencesPlugin(app)
};
