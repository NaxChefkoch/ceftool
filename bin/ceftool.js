#!/usr/bin/env node

/**
 * Thanks to express as template.
 */

//Dependencies
var mkdirp = require('mkdirp'),
	program = require('commander'),
	fs = require('fs'),
	os = require('os'),
	pkg = require('../package.json'),
	version = pkg.version;

//CLI
program
	.version(version)
	.usage('[options] <Projectpath>')
	.option('-b, --binaries', 'Add binaries to project.')
	.option('-f, --force', 'force on non-empty directory');

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ ceftool --binaries MyCEFProject');
  console.log('    $ ceftool -bf ../../MyOtherCEFProject');
  console.log('');
});

program.parse(process.argv);

if (program.binaries) console.log('  - binaries');
if (program.force) console.log('  - force');

// Path
var path = program.args.shift() || '.';
var projectname = path.split('/')[path.split('/').length-1];
console.log(projectname);
console.log(path);

//process.exit(1);
// end-of-line code
var eol = os.EOL

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */
function createApplicationAt(path) {
  console.log();

  process.on('exit', function(){
    console.log();
    console.log('   On Mac open Xcode Project and Run.');
    console.log();
    console.log('   On Windows open SLN Project with Visual Studio and Run.');
    console.log();
  });

  mkdir(path, function(){
  	
  	/*
    mkdir(path + '/public');
    mkdir(path + '/public/javascripts');
    mkdir(path + '/public/images');
    mkdir(path + '/public/stylesheets', function(){
      switch (program.css) {
        case 'less':
          write(path + '/public/stylesheets/style.less', less);
          break;
        case 'stylus':
          write(path + '/public/stylesheets/style.styl', stylus);
          break;
        default:
          write(path + '/public/stylesheets/style.css', css);
      }
    });

    mkdir(path + '/routes', function(){
      write(path + '/routes/index.js', index);
      write(path + '/routes/user.js', users);
    });

    mkdir(path + '/views', function(){
      switch (program.template) {
        case 'ejs':
          write(path + '/views/index.ejs', ejsIndex);
          break;
        case 'jade':
          write(path + '/views/layout.jade', jadeLayout);
          write(path + '/views/index.jade', jadeIndex);
          break;
        case 'jshtml':
          write(path + '/views/layout.jshtml', jshtmlLayout);
          write(path + '/views/index.jshtml', jshtmlIndex);
          break;
        case 'hjs':
          write(path + '/views/index.hjs', hoganIndex);
          break;

      }
    });
	*/
    
  });
}


// Generate application
(function createApplication(path) {
  emptyDirectory(path, function(empty){
    if (empty || program.force) {
      createApplicationAt(path);
    } else {
      program.confirm('destination is not empty, continue? ', function(ok){
        if (ok) {
          process.stdin.destroy();
          createApplicationAt(path);
        } else {
          abort('aborting');
        }
      });
    }
  });
})(path);


/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */
function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str) {
  fs.writeFile(path, str);
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

/**
 * Exit with the given `str`.
 *
 * @param {String} str
 */

function abort(str) {
  console.error(str);
  process.exit(1);
}
