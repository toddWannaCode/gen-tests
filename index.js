#!/usr/bin/env node

const chalk       = require('chalk'),
      clear       = require('clear'),
      figlet      = require('figlet'),
      inquirer    = require('inquirer'),
      path        = require('path'),
      fs          = require('fs'),
      emoji       = require('node-emoji'),
      argv        = require('yargs')
                      .alias('v', 'version')
                      .version(function() { return require('./package.json').version; })
                      .describe('v', 'show version information')
                      .usage( `Usage: $0 [-d/--dir "directory"] [-f/--file "file to be parsed"] [-t/--test "test file to be produced"] [-a/--all]` )
                      .option( "d", { alias: "dir", demand: false, describe: "Directory", type: "string" } )
                      .option( "f", { alias: "file", demand: false, describe: "File To Be Parsed", type: "string" } )
                      .option( "t", { alias: "test", describe: "File to be produced", type: "string" } )
                      .option( "a", { alias: "all", describe: "specify if you want to check all sub-dirs for files to generate tests", type: "boolean" } )
                      .help( "h" )
                      .alias( "h", "help" )
                      .example( "$0 ", "generate test.js for all routes.js in the present folder" )
                      .example( "$0 -d example -f routing.js", "generate test.js for all routing.js file in example folder" )
                      .epilog( "Copyright reserved 2017" )
                      .argv;


const util          = require('./utils'),
      routesSection = require('./libs/routesSection');
      
const reducer = (source, dest) => {
          const dir = `${ path.dirname(source) !== '.' && path.dirname(source) || path.basename(process.cwd()) }`;
          if(fs.existsSync(source)) {
            util(fs.createReadStream(source), fs.createWriteStream(dest), routesSection.fn('METADATA'));
            console.log(chalk.green(`${emoji.get('heavy_check_mark')} Created ${ path.basename(dest) } in ${dir}`));
            return true
          }
          else
            console.log(chalk.red(`${emoji.get('x')} There is no ${ path.basename(source) } in ${dir}`));
          return false
      };
      
const getSubdirs = p => fs.readdirSync(p).map(f => path.join(p, f)).filter(f => fs.statSync(f).isDirectory())
      


clear();
console.log(
  chalk.cyan(
    figlet.textSync('gen-tests', {
      font: 'Graceful',
      horizontalLayout: 'full',
      verticalLayout: 'default'
    })
  ), '\n'
);

const dirs    = [`${argv.d || '.'}`],
      inFile  = `${argv.f  || 'routes.js'}`,
      outFile = `${argv.t  || 'test.js'}`;

if(argv.a || argv.all) 
  dirs.push(...getSubdirs(dirs[0]));

let counter = 0;

for(const dir of dirs)
  counter += +reducer(path.join(dir, inFile), path.join(dir, outFile)) ;

console.log(chalk.yellow(`\nGenerated ${counter} '${outFile}'`));




