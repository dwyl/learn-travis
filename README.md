Learn Travis [![Build Status](https://travis-ci.org/nelsonic/learn-travis.png?branch=master)](https://travis-ci.org/nelsonic/learn-travis) [![Code Climate](https://codeclimate.com/github/nelsonic/learn-travis.png)](https://codeclimate.com/github/nelsonic/learn-travis) [![Dependencies](https://david-dm.org/nelsonic/learn-travis.png?theme=shields.io)](https://david-dm.org/nelsonic/learn-travis)
============

A quick Travis CI (Continuous Integration) Tutorial for Node.js developers


![Toilet Roll Blocks Seat FAIL](https://raw.github.com/nelsonic/learn-travis/master/images/Roll-Blocks-Toilet-Seat.jpg "Toilet Roll Blocks Seat from Closing. Fail!"")

**test early, test often** to spot "*integration issues*" *before its too late ...*

> Continuous integration is a software development process in which all
> development work is integrated at a predefined time or event and the
> resulting ***work is automatically tested and built***. The idea is that
> development errors are identified very early in the process.

If you are *completely* new to Continuous Integration (CI)
I recommend reading the
[CI Wikipedia Article](http://en.wikipedia.org/wiki/Continuous_integration)
and Martin Fowler's [Article on CI](http://www.martinfowler.com/articles/continuousIntegration.html).
<br />
**Note**: Both of these are quite *text-heavy* but contain all the info you need. Read them! If you have any questions, *ask*!

The key advantages of Travis:

- Nothing to *Install* (Cloud Based ... *Not Java*!)
- **Free** Both to *Use* and **Open Source** (MIT License) see: http://about.travis-ci.org/
- Integrates nicely with GitHub (without any developer effort!)

I've used [Jenkins/Hudson CI](http://jenkins-ci.org) in the past
@groupon, but found the learning curve a bit steep for
*new developers*. Travis by contrast has a much *shallower learning curve*!

### Getting Started

Following the [Travis Getting Started](http://about.travis-ci.org/docs/user/getting-started/) guide:

> Visit: https://travis-ci.org/ and click "**Sign in with GitHub**" no "*registration*" required.

![Travis Login with GitHub](https://raw.github.com/nelsonic/learn-travis/master/images/01-Travis-login-with-github.png "Sign in with GitHub")

> You will be re-directed to GitHub where you need to click "**Authorize application**"

![Authorize Travis at GitHub](https://cloud.githubusercontent.com/assets/4185328/5858401/c9fd2220-a24a-11e4-9c4c-f5dfcea18931.png "Authorize Travis GitHub")

**Note**: If you ever want to *stop* Travis accessing to your GitHub account,
simply visit: https://github.com/settings/applications and click on *Revoke*.

> Once you have allowed access you will be taken back to Travis where you will need to enable a specific Git Repository. You can also do this in your Travis Profile:
https://travis-ci.org/profile

![Enable Repo in Travis](https://raw.github.com/nelsonic/learn-travis/master/images/04-Travis-profile-enable-repo.png "Travis Enable Repo")

### Create The Project Files

> Now back in your text editor create a few *new files*:

```sh
vi .travis.yml
```

```yml
node_js:
  - 0.8
```

**.travis.yml** is a basic Travis configuration file that tells travis-ci our application
runs on node.js and we want them to test it using a specific version of node.
(the file needs to be in the root of your git repository)

```sh
grunt init:gruntfile
```

```sh
vi grunt.js
```

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    lint: {
      files: ['hello.js']
    }
  });

  grunt.registerTask('default', 'lint');
  grunt.registerTask('travis', 'lint');

};
```

**grunt.js** is a super basic grunt.js configuration file that
tells Grunt & Travis:
"I have one file called hello.js,
if it passes a *lint* check my build is working"

```sh
vi package.json
```

```javascript
{
  "name": "learn-travis",
  "description": "Simple nodejs, travis and grunt demo",
  "author": "your name here :-)",
  "version": "0.0.1",
  "devDependencies": {
    "grunt": "~0.3.17"
  },
  "scripts": {
    "test": "grunt travis --verbose"
  }
}
```

The **package.json** file is a standard node.js package file with *one* extra
element on the end, the "**scripts**" property identifies a "**test**" command:

```sh
sudo npm install -g grunt-cli
grunt travis --verbose
```

you can run this command *locally* if you have grunt installed on your machine,
*or* in our case, we ask Travis to run it on the travis-ci.org servers.

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
and attempt to run your test script **grunt travis --verbose**

In our case we are only asking travis to **lint** the **hello.js** file.
and since the file was missing a semi-colon on the 4th line above,
it will fail the lint and thus the build process fails!

![Travis Build Failing](https://raw.github.com/nelsonic/learn-travis/master/images/06-travis-build-failing.png "Travis Build Failing")

![Travis Build Failing Error Message](https://raw.github.com/nelsonic/learn-travis/master/images/05-travis-ci-lint-build-fails.png "Travis Build Failing Error Message")

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

[![Build Status](https://travis-ci.org/nelsonic/learn-travis.png?branch=master)](https://travis-ci.org/nelsonic/learn-travis)

![Travis Build Passing](https://raw.github.com/nelsonic/learn-travis/master/images/07-travis-build-passing.png "Travis Build Passing")

- - -

> Todo: update this tutorial to not use grunt.js to de-couple the tutorials.
> Todo: create a more realistic test that does something useful.

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
