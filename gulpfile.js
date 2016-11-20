const env = process.env.NODE_ENV || 'development';

const gulp = require('gulp');
const spawn = require('child_process').spawn;
const config = require('./config/config.json')[env];

// Create database
gulp.task('db:create', () =>
  spawn('psql', ['-c', [`create database ${config.database};`]], {
    stdio: 'inherit'
  }));

// Drop database
gulp.task('db:drop', () =>
  spawn('psql', ['-c', [`drop database ${config.database};`]], {
    stdio: 'inherit'
  }));
