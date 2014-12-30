"use strict";

var logger = null
  , clean = null;

var _minifyCSS = function( mimosaConfig, options, next ) {

  if ( options.files && options.files.length ) {

    if ( !clean ) {
      var CleanCSS  = require( "clean-css" );
      clean = new CleanCSS( mimosaConfig.minifyCSS.options );
    }

    options.files.forEach( function ( file, i ) {
      var fileName = file.outputFileName
        , text = file.outputFileText;

      if ( text ) {
        if ( mimosaConfig.minifyCSS.excludeRegex && fileName.match( mimosaConfig.minifyCSS.excludeRegex ) ) {
          logger.debug( "Not going to minify [[ " + fileName + " ]], it has been excluded with a regex." );
        } else if ( mimosaConfig.minifyCSS.exclude.indexOf( fileName ) > -1 ) {
          logger.debug( "Not going to minify [[ " + fileName + " ]], it has been excluded with a string path." );
        } else {
          if ( logger.isDebug() ) {
            logger.debug( "Running minification on [[ " + fileName + " ]]" );
          }
          var minified = clean.minify( text );
          file.outputFileText = minified.styles;
          if ( minified.stats ) {
            var sizeDiff = minified.stats.originalSize - minified.stats.minifiedSize;
            if ( sizeDiff ) {
              var pcnt = Math.round( ( sizeDiff / minified.stats.originalSize  ) * 100 );
              logger.info( "minify-css saved [[ " + sizeDiff + " (" + pcnt + "%) ]] characters for file [[ " + fileName + " ]]");
            }
          }
        }
      }

      if ( i === options.files.length - 1 ) {
        next();
      }

    });
  } else {
    next();
  }
};

exports.registration = function ( mimosaConfig, register ) {
  if ( mimosaConfig.isOptimize || mimosaConfig.isMinify ) {
    logger = mimosaConfig.log;
    register(
      ["add","update","buildExtension", "buildFile"],
      "beforeWrite",
      _minifyCSS, mimosaConfig.extensions.css );
  }
};
