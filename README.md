# Learn Travis [![Build Status](https://travis-ci.org/dwyl/learn-travis.svg?branch=master)](https://travis-ci.org/dwyl/learn-travis)  [![Dependencies](https://david-dm.org/dwyl/learn-travis.png?theme=shields.io)](https://david-dm.org/dwyl/learn-travis) [![devDependency Status](https://david-dm.org/dwyl/learn-travis/dev-status.svg)](https://david-dm.org/dwyl/learn-travis#info=devDependencies)


Our ***quick guide*** to **Travis CI** (*Continuous Integration*) for ***complete beginners***

## *Why*?

Testing your work (*to be* ***sure*** *its working as expected*)
is the most important part of a project.

![Toilet Roll Blocks Seat FAIL](https://raw.github.com/dwyl/learn-travis/master/images/Roll-Blocks-Toilet-Seat.jpg "Toilet Roll Blocks Seat from Closing. Fail!")

> ***CI*** helps you **Test Early, Test Often** to spot "*integration issues*" *before its too late ...*  
> **Travis CI** takes the *hassle* out of running your own CI so you can focus on your project/product!


## *What*?

> **C**ontinuous **I**ntegration is a software development process  
> in which **all development work** is **integrated** at a predefined time  
> or event and the resulting ***work is automatically tested and built***.  
> The idea is that **development errors** are **identified** very ***early*** in the process.

If you are ***completely new*** to Continuous Integration (CI) we ***recommend reading***  
the [**CI Wikipedia Article**](http://en.wikipedia.org/wiki/Continuous_integration)
and Martin Fowler's
[Article on CI](http://www.martinfowler.com/articles/continuousIntegration.html).
<br />
**Note**: Both of these are quite *text-heavy* but contain all the info you need.  
Read them! If you have any questions, *ask*!  [![Join the chat at https://gitter.im/dwyl/chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dwyl/chat/)

### *Key Advantages* of Travis-CI:

- **Nothing to** ***Install*** (*Travis Web-Based* ... ***Not*** *a* ***heavy Java*** *Application you have to host yourself*<sup>1</sup>)
- **Free** Both to *Use* and **Open Source** (MIT License) see: http://about.travis-ci.org/
- **Integrates** nicely with **GitHub** (*without any developer effort*!)


<sup>1</sup>We've used [Jenkins CI](http://jenkins-ci.org) in the past for *client* projects,  
but **Jenkins** has a
[***steep learning curve***](http://shop.oreilly.com/product/0636920010326.do)
for *new developers*.  
**Travis** *by contrast* has a much ***shallower learning curve***!

## *How*?

This tutorial will take you **20 minutes** and will ***save you hours***
of frustration! #**NoBrainer**

### Pre-requisites?

+ **Computer** *with* **node.js** ***installed***
+ any **text editor**

If you don't have these, see: https://github.com/dwyl/start-here

### Getting Started

Following the [Travis Getting Started](http://about.travis-ci.org/docs/user/getting-started/) guide:

> Visit: https://travis-ci.org/ and click "**Sign in with GitHub**" no "*registration*" required.

![Travis Login with GitHub](https://raw.github.com/dwyl/learn-travis/master/images/01-Travis-login-with-github.png "Sign in with GitHub")

> You will be re-directed to GitHub where you need to click "**Authorize application**"

![Authorize Travis at GitHub](https://cloud.githubusercontent.com/assets/4185328/5859970/3b6fac6a-a256-11e4-9e9a-6b9a38099873.jpg "Authorize Travis GitHub")

**Note**: If you ever want to *stop* Travis accessing to your GitHub account,  
simply visit: https://github.com/settings/applications and click on *Revoke*.

> Once you have allowed access you will be taken back to Travis  
> where you will need to enable a specific Git Repository.  
> You can also do this in your Travis Profile:
https://travis-ci.org/profile

![Enable Repo in Travis](https://raw.github.com/dwyl/learn-travis/master/images/04-Travis-profile-enable-repo.png "Travis Enable Repo")

### Create The Project Files

> Now back in your text editor create a few *new files*:

```sh
vi .travis.yml
```
Paste the following code:

```yml
language: node_js
node_js:
  - 0.12
```

**.travis.yml** is a basic Travis configuration file
that tells travis-ci our application runs on **node.js**  
and we want them to test it using a *specific version* of node.  
(*the file needs to be in the* ***root*** *of your GitHub repository*)

#### Define The Test

Create a **package.json** file and define the *test* you want Travis-CI to run:

```sh
vi package.json
```

```javascript
{
  "name": "learn-travis-YOURNAME",
  "description": "Simple Travis-CI check for JSHint (Code Linting)",
  "author": "your name here :-)",
  "version": "0.0.1",
  "devDependencies": {
    "jshint": "^2.6.0"
  },
  "scripts": {
    "test": "./node_modules/jshint/bin/jshint hello.js"
  }
}
```

The **package.json** file is a standard node.js package file with *one* extra
element on the end, the "**scripts**" property identifies a "**test**" command.

To run the test command we will need to install the `jshint` node module from NPM:

```sh
npm install jshint --save-dev
```

Now you can run the `test` command *locally* by typing `npm test` in your terminal  
*or* in our case, we ask Travis to run it on the travis-ci.org servers.

But first lets create a file for `jshint` to check:

```sh
vi hello.js
```
Paste (*or type*) out the following code:

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n') // this will FAIL travis ci lint
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

### Watch it Fail

Commit all the files you just created and push them to GitHub.
Travis will automatically scan your repository and pickup the
**.travis.yml** file which informs travis this is a **node.js** project/app
next travis will look for a **package.json** file and scan for a
**scripts** entry (*specifically* the **test** one)
Travis will download all the modules listed in your *devDependencies*
and attempt to run your test script **npm test**

In our case we are only asking travis to **lint** the **hello.js** file.
and since the file was missing a semi-colon on the 4th line above,
it will fail the lint and thus the build process fails!

![Travis Build Failing](https://raw.github.com/dwyl/learn-travis/master/images/06-travis-build-failing.png "Travis Build Failing")

![Travis Build Failing Error Message](https://raw.github.com/dwyl/learn-travis/master/images/05-travis-ci-lint-build-fails.png "Travis Build Failing Error Message")

On **line 343** we are missing a semi-colon.


### Correct Code To Pass Build

Simply add the simi-colon to the 4th line of **hello.js** and commit your changes:

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n'); // build should pass now!
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

And just like that our "**build**" is ***passing***!

![Travis Build Passing](https://raw.github.com/dwyl/learn-travis/master/images/07-travis-build-passing.png "Travis Build Passing")

[![Build Status](https://raw.githubusercontent.com/dwyl/repo-badges/master/highresPNGs/build-passing.png)](https://travis-ci.org/dwyl/learn-travis)


## *Realistic* Example

@dwyl we use Travis-CI for a *lot* more than code linting! We use Travis-CI to
***automatically*** run our unit/integration tests.  
If you are new to ***automated testing***, we have a
***Complete Beginners Test Driven Development Tutorial***:
https://github.com/dwyl/learn-tdd  
Which will show you how to use Travis-CI to check your code is working as expected!

## Using *Environment Variables* with Travis!

> If you are ***new to environment variables***
check out our ***introductory tutorial*** (*for complete beginners*):
https://github.com/dwyl/learn-environment-variables/


Often your application will use **environment variables** to store
keys, passwords or other sensitive data you don't want to hard-code in your
code; Travis-CI makes this ***easy***:

There are **two ways** of telling Travis-CI about your environment variables:

### 1. Include Environment Variables in your `.travis.yml` file

The easiest and most *explicit* way of listing your environment variables
is to add them to your `.travis.yml` file:

```yml
language: node_js
node_js:
  - 0.12
env:
- MY_VAR=EverythignIsAwesome
- NODE_ENV=TEST
```
The interesting part is the `env:` key where you can then list
your environment variables and their corresponding values.

### 2. Add environment Variables in the Web Interface

The *other* way of telling Travis-CI your environment variable(s)
is to add them in the web-base user-interface (Web UI) in your project's settings page:

![add travis-ci environment variables Web UI](http://i.imgur.com/5ubG0fM.png)

*Notice* how in if you add your environment variables in the the Travis Web UI
they are hidden (*from the build log*) by default.
This does *not* prevent you from accidentally `console.log` them and exposing a key/passord.
So take care when console.logging ...!

### *Secure* (*Encrypted*) Environment Variables

If you are storing sensitive information (*like API Keys or Database Passwords*)
for use in your node app, the ***best way*** is to use the
[***travis ruby gem***](http://docs.travis-ci.com/user/encryption-keys/)
to ***encrypt*** your keys:

You will need to have ruby installed on your computer,
if you don't already have this, we recommend installing it with
[**RVM**](http://stackoverflow.com/a/14182172/1148249):

```sh
\curl -L https://get.rvm.io | bash -s stable --ruby
rvm install current && rvm use current
```
Once you have installed ruby you can **install** the **travis ruby gem**:

```sh
gem install travis
```

With the gem installed, you encrypt your variable by running the command
in your terminal (*ensure you are in the working directory of your project*)

```sh
travis encrypt MY_SECRET=super_secret
```
Type `yes` to confirm you are your project, you should now see your encrypted variable:

![learn-travis-encrypted-variable](http://i.imgur.com/7WP1Xe0.png)

Paste this in your `.travis.yml` file and commit it to GitHub!


:bulb: **Top tip**: if you need to ***check your*** `.travis.yml` file
is **error-free**, run the command ``` travis lint``` (in the folder where is your travis file)

### Install Travis-CLI on Ubuntu

> Can be useful if one needs for instance to encrypt keys in setup with external deployment tools like s3,
> to simply check the syntax of your .travis.yml by doing a simple "travis lint" or any other advanced operations

The install process on the official page https://github.com/travis-ci/travis.rb#installation lacks a bit of help and details.
Even with installing the dev package of ruby you may encounter troubles.
But the process seems to work flawlessly with RVM (Ruby version manager), like described above: https://rvm.io/rvm/install

Just run the following commands:

```sh
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable --ruby
```

now add this line at the end of your ~/.bashrc file:
source "$HOME/.rvm/scripts/rvm"

```sh
source ~/.bashrc
gem install travis
travis --version
```

### Notes:

#### General CI Background Reading

- Continuous Integration Wikipedia Article: http://en.wikipedia.org/wiki/Continuous_integration
- Martin Fowler's Article on CI: http://www.martinfowler.com/articles/continuousIntegration.html
- CI Beginners Guide Video: https://vimeo.com/19596466

#### Travis Specific

- Travis Getting Started: http://about.travis-ci.org/docs/user/getting-started/
- Build Podcast Ep.32 (Travis) Video: http://build-podcast.com/travisci/
- [@sayanee_](https://twitter.com/sayanee_)'s Build Podcast GitHub: https://github.com/sayanee/build-podcast/tree/master/032-travisci
- Travis-CI Environment Variables guide: http://docs.travis-ci.com/user/environment-variables/

#### Further Reading

- Comparison of CI Software: http://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software
- Great Book on CI: http://www.amazon.com/Continuous-Integration-Improving-Software-Reducing/dp/0321336380/
- Jenkins/Hudson CI: http://jenkins-ci.org/
- Lars Vogel Jenkins Tutorial: http://www.vogella.com/articles/Jenkins/article.html
- This is why we ***avoid Java***: http://www.cvedetails.com/vulnerability-list/vendor_id-5/product_id-1526/
by comparison, Node.js: http://www.cvedetails.com/vulnerability-list/vendor_id-12113/product_id-22804/opginf-1/Nodejs-Nodejs.html

#### Future

- **ALL** The Diagrams on Google Image Search for Continuous Integration are terrible!
https://www.google.com/search?q=continuous+integration&source=lnms&tbm=isch
*we* either need to make time to draw one or ask/commission someone to do one for us!
