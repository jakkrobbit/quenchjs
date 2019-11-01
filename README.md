# QUENCH

## The Gulp file generator. Easily automate your next web project.

### What is Gulp?

Gulp is a command-line JavaScript task runner that automates your web workflow by way of self-scripted tasks. 
#### So Quench does what exactly?
Quench easily creates those self-scripted tasks based on your custom input.

### CSS AUTOMATION

* Autoprefix
* Compile pre-processors
* Minimize
* Remove unused CSS

### JAVASCRIPT AUTOMATION

* Compress
* Concatenate
* Convert ES6 to ES5
* Lint

### IMAGES AND BEYOND

* Compress Images
* Sync browsers and devices

## Prerequisites
Quench requires both [Node](https://nodejs.org/) and [Gulp](http://gulpjs.com/). Install those first!

## How To Use Quench

1. Unzip the downloaded project files.
2. Use the command line to navigate to the project directory. For example if you were navigating to a test folder on your Desktop, you would use:

	`cd Desktop/test`
3. Run `npm install`
4. Run `gulp`
5. Code away!

## Included Tasks
    `gulp`
The default. Runs all tasks choosen and watches your project folder.

    `gulp styles`
Runs all selected CSS tasks. Options are:
* Pre-Compile (SASS, LESS, on STYLUS)
* Minify
* Autoprefix

    `gulp scripts`
Runs all selected JavaScript tasks. Options are:
* Compile (CoffeeScript)
* Minify
* Concatenate
* Convert ES6 to ES5
* Linter

    `gulp watch`
Initiates BrowserSync and watches files for changes.

    `gulp images`
Optimizes images.

    `gulp build`
Runs all selected image, CSS, and JavaScript tasks. If not using BrowserSync, this is the same as the default `gulp` task.