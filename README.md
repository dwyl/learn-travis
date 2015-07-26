# Learn Travis [![Build Status](https://travis-ci.org/dwyl/learn-travis.svg?branch=master)](https://travis-ci.org/dwyl/learn-travis)  [![Dependencies](https://david-dm.org/dwyl/learn-travis.png?theme=shields.io)](https://david-dm.org/dwyl/learn-travis)


Our ***quick guide*** to **Travis CI** (*Continuous Integration*) for ***complete beginners***

## *Why*?

Testing your work (*to be* ***sure*** *its working as expected*)
is the most important part of a project.

![Toilet Roll Blocks Seat FAIL](https://raw.github.com/dwyl/learn-travis/master/images/Roll-Blocks-Toilet-Seat.jpg "Toilet Roll Blocks Seat from Closing. Fail!"")

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
**Travis** *by contrast* has a much ***shallow learning curve***!

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

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n') // this will FAIL travis ci lint
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

### Watch it Fail

Commit all the files you just created and push them to github.
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

[![Build Status](https://travis-ci.org/dwyl/learn-travis.png?branch=master)](https://travis-ci.org/dwyl/learn-travis)

![Travis Build Passing](https://raw.github.com/dwyl/learn-travis/master/images/07-travis-build-passing.png "Travis Build Passing")

- - -

> Todo: create a more realistic test that does something useful. [**pull requests welcome**!]

- - -


### Notes:

#### General CI Background Reading

- Continuous Integration Wikipedia Article: http://en.wikipedia.org/wiki/Continuous_integration
- Martin Fowler's Article on CI: http://www.martinfowler.com/articles/continuousIntegration.html
- CI Beginners Guide Video: https://vimeo.com/19596466

#### Travis Specific

- Travis Getting Started: http://about.travis-ci.org/docs/user/getting-started/
- Build Podcast Ep.32 (Travis) Video: http://build-podcast.com/travisci/
- [@sayanee_](https://twitter.com/sayanee_)'s Build Podcast GitHub: https://github.com/sayanee/build-podcast/tree/master/032-travisci

#### Further Reading

- Comparison of CI Software: http://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software
- Great Book on CI: http://www.amazon.com/Continuous-Integration-Improving-Software-Reducing/dp/0321336380/
- Jenkins/Hudson CI: http://jenkins-ci.org/
- Lars Vogel Jenkins Tutorial: http://www.vogella.com/articles/Jenkins/article.html
- This is why I avoid Java: http://www.cvedetails.com/vulnerability-list/vendor_id-5/product_id-1526/
by comparison, Node.js: http://www.cvedetails.com/vulnerability-list/vendor_id-12113/product_id-22804/opginf-1/Nodejs-Nodejs.html

#### Future

- **ALL** The Diagrams on Google Image Search for Continuous Integration are terrible!
https://www.google.com/search?q=continuous+integration&source=lnms&tbm=isch I either need
to make time to draw one or ask someone to do one.
