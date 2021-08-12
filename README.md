## @strictsoftware/typedoc-plugin-monorepo

### What

A plugin for [TypeDoc](http://typedoc.org)

When trying to unify documentation for multiple modules residing inside a shared source repository, the default way TypeDoc assignes top-level module names might not satisfy.

This plugin allows you to specify a regular expression with a capture group. This is then used to collect related items into one module.

This plugin is inspired by, and based on, [asgerjensen/typedoc-plugin-external-module-map](https://github.com/asgerjensen/typedoc-plugin-external-module-map). However, this plugin will automagically rename top-level modules discovered to a new "Package" type, and auto-discover and display READMEs for the individual packages. Furthermore, these packages are used as top-level entries in the table of contents.

This plugin is intended for monorepos that deliver more than one NPM package in a single Git repository.

Suppose you have

```
packages/@namespace/package-1/index.ts
packages/@namespace/package-1/src/otherfiles.ts
packages/@namespace/package-2/index.ts
packages/@namespace/package-2/src/otherfiles.ts
```

TypeDoc will create four "Modules", named for each .ts file.

- "@namespace/package-1/index"
- "@namespace/package-1/src/otherfiles"
- "@namespace/package-2/index"
- "@namespace/package-2/src/otherfiles"

This plugin allows each file to specify the TypeDoc Module its code should belong to. If multiple files belong to the same module, they are merged.

This allows more control over the modules that TypeDoc generates.
Instead of the four modules above, we could group them into two:

- @namespace/package-1
- @namespace/package-2

In addition to grouping these modules, the plugin will attempt to discover README files in each module root to display with the documented package. In this plugin, top-level typedoc "modules" are renamed to the more semantic name "packages" in generated documentation.

### Installing

TypeDoc >=0.11 has the ability to discover and load typedoc plugins found in node_modules.
Simply install the plugin and run typedoc.

```
npm install --save @strictsoftware/typedoc-plugin-monorepo
typedoc
```

### Using

This plugin adds some new options

#### --external-modulemap
```
--external-modulemap  ".*packages\/(@namespace\/[^\/]+)\/.*"
```

If you specify it from the command line, be sure to escape the input string so bash doesn't expand it.

It is probably easier to create a typedoc options file (typedoc.json) and add it there:

```
{
  "name": "My Library",
  "out": "doc",
  "theme": "default",
  "preserveConstEnums": "true",
  "exclude": "*.spec.ts",
  "external-modulemap": ".*packages\/(@namespace\/[^\/]+)\/.*",
  "excludeExternals": false
}
```

#### --inline-references

Replace references with actual target declarations in output project symbols. This is required
when re-exports with same name are presented in project files because this will lead to collisions in output
symbols map and references links would target to nowhere.
