mimosa-minify-css
===========

# Overview

This is a CSS minification module for the Mimosa build tool. This tool utilizes [clean-css](https://github.com/jakubpawlowicz/clean-css) to perform the minification of CSS assets.

For more information regarding clean-css, see https://github.com/jakubpawlowicz/clean-css.

For more information regarding Mimosa, see http://mimosa.io.

# Usage

Add `'minify-css'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

# Functionality

When `mimosa watch` or `mimosa build` are executed with the `--optimize` or `--minify` flag, this module will minify any files identified as `.css` right before the output is written.  This includes plain `.css` files but also any files compiled by any of the Mimosa CSS compilers.

# Default Config

```javascript
minifyCSS: {
  exclude:[/\.min\./],
  options:{
    processImport: false
  }
}
```

#### `minifyCSS.exclude` array of strings/regex
Matches paths to exclude from minification. String paths can be either relative to the `watch.compiledDir` or absolute. String paths must include the file name. Any file possessing ".min." in its name, like `bootstrap.min.css`, is assumed to already be minified so it will be ignored by default.

#### `minifyCSS.options` object
This object is the options passed into CleanCSS when it is created.  For details on all the options available, see the [clean-css page and its list of options](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically).

#### `minifyCSS.options.processImport` boolean
This is a default setting for mimosa-minify-css' use of Clean-CSS that prevents `@import` statements from being removed. For details on the option, see the [clean-css page and its list of options](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically).

#### `minifyCSS.options.debug` boolean
This is a default setting for mimosa-minify-css' use of Clean-CSS.  It is set to `true` by default. For details on the option, see the [clean-css page and its list of options](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically).