"use strict";

exports.defaults = function() {
  return {
    minifyCSS: {
      exclude:[/\.min\./]
    }
  };
};


exports.placeholder = function () {
  var ph = "\n  minifyCSS:                    # Configuration for minifying/cleaning css using the\n" +
     "                                # --minify flag\n" +
     "    exclude:[/\\.min\\./]         # List of string paths and regexes to match files to exclude\n" +
     "                                # when running minification. Any path with \".min.\" in its name,\n" +
     "                                # is assumed to already be minified and is ignored by default.\n" +
     "                                # Paths can be relative to the watch.compiledDir, or absolute. \n" +
     "                                # Paths are to compiled files,  so '.css' rather than '.styl'\n\n";

  return ph;
};

exports.validate = function( config, validators )  {
  var errors = [];
  if ( validators.ifExistsIsObject( errors, "minifyCSS config", config.minifyCSS ) ) {
    validators.ifExistsFileExcludeWithRegexAndString( errors, "minifyCSS.exclude", config.minifyCSS, config.watch.compiledDir );
  }
  return errors;
};
