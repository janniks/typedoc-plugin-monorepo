import { ExternalModuleMapPlugin } from "./external-module-map-plugin";
import {
  Application,
} from "typedoc";
import { InlineReferencesPlugin} from "./inline-references-plugin";

export function load (app: Application) {
  new ExternalModuleMapPlugin(app)
  new InlineReferencesPlugin(app)
}
