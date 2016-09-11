#!/usr/bin/env node

var spawn = require('cross-spawn');
var argv = require('minimist')(process.argv.slice(2));
var commands = argv._;

// console.log(commands);
// console.log(argv);

var idBuild = commands[0] == 'build';

var isProd = !!argv['prod'];
var isDev = !!argv['dev'];

var args = ['webpack'];

var proc = spawn('npm', args, {stdio: 'inherit'});

proc.on('close', function(close) {
  console.log(close);
})

// var program = require('commander');

// program
//   .arguments('<command>')
//   .option('-d, --dev', 'Developer build')
//   .option('-p, --prod', 'Production build')
//   .action(function(command) {
//     console.log('command: %s program: %s',
//         command, JSON.stringify(program));
//   })
//   .parse(process.argv);