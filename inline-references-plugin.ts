// Based on https://www.npmjs.com/package/typedoc-plugin-remove-references and issue https://github.com/TypeStrong/typedoc/issues/1271
import {Application, ParameterType, ReferenceReflection, ReflectionKind} from 'typedoc'
import { Converter } from 'typedoc'
import { Context } from "typedoc";

export class InlineReferencesPlugin {
    app: Application
    inlineReferences?: boolean

    constructor(app: Application) {
        this.app = app

        app.options.addDeclaration({
            name: "inline-references",
            type: ParameterType.Boolean,
            defaultValue: false,
            help: "Inline references with target declarations",
        });

        app.converter.on(Converter.EVENT_RESOLVE_BEGIN, this.onResolveBegin.bind(this))
    }

    onResolveBegin(context: Context) {
        if (this.inlineReferences === undefined) {
            this.inlineReferences = this.app.options.getValue('inline-references') as boolean
        }

        if (this.inlineReferences) {
            for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Reference) as ReferenceReflection[]) {
                const targetReflection = reflection.tryGetTargetReflection()
                if (targetReflection) {
                    context.project.removeReflection(reflection)
                    context.project.registerReflection(targetReflection)
                }
            }
        }
    }
}
