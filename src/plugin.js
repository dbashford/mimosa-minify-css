"use strict";

var clean  = require('clean-css')();
var logger = null;

var _minifyCSS = function( config, options, next ) {
  var hasFiles = options.files && options.files.length > 0;
  if ( !hasFiles ) {
    return next();
  }

  options.files.forEach( function ( file, i ) {
    var fileName = file.outputFileName;
    var text = file.outputFileText;
    if ( config.minifyCSS.excludeRegex && fileName.match( config.minifyCSS.excludeRegex ) ) {
      logger.debug( "Not going to minify [[ " + fileName + " ]], it has been excluded with a regex." );
    } else if ( config.minifyCSS.exclude.indexOf( fileName ) > -1 ) {
      logger.debug( "Not going to minify [[ " + fileName + " ]], it has been excluded with a string path." );
    } else {
      logger.debug( "Running minification on [[ " + fileName + " ]]" );
      file.outputFileText = clean.minify( text );
    }

    if ( i === options.files.length-1 ) {
      next();
    }

  });
};

exports.registration = function ( config, register ) {
  if ( config.isOptimize || config.isMinify ) {
    logger = config.log;
    var e = config.extensions;
    register( ['add','update','buildExtension', 'buildFile'], 'beforeWrite', _minifyCSS, e.css );
  }
};