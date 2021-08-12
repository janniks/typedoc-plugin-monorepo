// Based on https://www.npmjs.com/package/typedoc-plugin-remove-references and issue https://github.com/TypeStrong/typedoc/issues/1271
import {Application, ReferenceReflection, ReflectionKind} from 'typedoc'
import { Converter } from 'typedoc/dist/lib/converter'
import { Context } from "typedoc/dist/lib/converter/context";

export function initInlineReferencesPlugin(application: Application) {
    let inlineReferences: boolean
    application.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context: Context) => {
        if (inlineReferences === undefined) {
            inlineReferences = application.options.getValue('inline-references') as boolean
        }

        if (inlineReferences) {
            for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Reference) as ReferenceReflection[]) {
                const targetReflection = reflection.tryGetTargetReflection()
                if (targetReflection) {
                    context.project.removeReflection(reflection)
                    context.project.registerReflection(targetReflection)
                }
            }
        }
    })
}

