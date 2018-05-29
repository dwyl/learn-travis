# Learn Travis

<div align="center">
    <a href="https://travis-ci.org/">
        <img src="https://travis-ci.com/images/logos/Tessa-pride-4.svg" width="175">
    </a>
</div>
<br />

<div align="center">

[![Build Status](https://travis-ci.org/dwyl/learn-travis.svg?branch=master)](https://travis-ci.org/dwyl/learn-travis)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/learn-travis/issues)
[![HitCount](http://hits.dwyl.io/dwyl/learn-travis.svg)](http://hits.dwyl.io/dwyl/learn-travis)

</div>

Our ***quick guide*** to **Travis CI** (*Continuous Integration*)
for ***complete beginners***

##  Index

1.  [Why](#why)
2.  [What](#what)
    1.  [Key Advantages of Travis-CI](#key-advantages)
3.  [How](#how)
    1.  [Pre-requisites](#pre-requisites)
    2.  [Getting Started](#getting-started)
    3.  [Create The Project Files](#create-the-project-files)
    4.  [Define the test](#define-the-test)
    5.  [Watch it Fail](#watch-it-fail)
    6.  [Correct Code To Pass Build](#correct-code-to-pass-build)
4.  [Realistic Example](#realistic-example)
5.  [Using Environment Variables with Travis!](#environment-variables)
    1. [Include Environment Variables in your `.travis.yml` file](#environment-variables-travis.yml)
    2. [Add environment Variables in the Web Interface](#environment-variables-web-interface)
    3. [Secure (Encrypted) Environment Variables](#environment-variables-secured)
6.  [**Continuous _Delivery_**](#continuous-delivery)
    1. [Add Encrypted SSH Keys]()
7.  [Elm Lang](#elm-lang)
8.  [Elixir](#elixir-lang)
9.  [Install Travis-CLI on Ubuntu](#install-travis-cli-on-ubuntu)
10.  [Going further](#going-further)
    1.  [General CI Background Reading](#general-ci)
    2.  [Travis Specific](#travis-specific)
    3.  [Competitors](#competitors)

<a name="why"></a>
## Why?

Testing your work (to be **sure** its working as expected)
is the most important part of a project.

![Toilet Roll Blocks Seat FAIL](https://user-images.githubusercontent.com/194400/28815447-5458823c-7699-11e7-8c65-bcf9e4569388.png "Toilet Roll Blocks Seat from Closing. Fail!")

> ***CI*** helps you **Test Early, Test Often** to spot "*integration issues*"
_before its too late ..._
> **Travis CI** takes the *hassle* out of running your own CI
so you can focus on your project/product!

<a name="what"></a>
## What?

> **C**ontinuous **I**ntegration is a software development process  
> in which **all development work** is **integrated** at a predefined time  
> or event and the resulting ***work is automatically tested and built***.  
> The idea is that **development errors** are **identified**
_very **early**_ in the process.

![Continuous Integration Diagram](https://cloud.githubusercontent.com/assets/1128312/20186823/ddfdbb9e-a771-11e6-9e99-4720e7b60f53.png)

If you are ***completely new*** to Continuous Integration (CI)
we ***recommend reading*** the
[**CI Wikipedia Article**](http://en.wikipedia.org/wiki/Continuous_integration)
and Martin Fowler's
[Article on CI](http://www.martinfowler.com/articles/continuousIntegration.html).

**Note**: Both of these are quite *text-heavy*
but contain all the info you need.  
Read them! If you have any questions,
[*ask*!](https://github.com/dwyl/learn-travis/issues)

<a name="key-advantages"></a>
### *Key Advantages* of Travis-CI:  

- **Nothing to** ***Install*** (Travis is Web-Based,
  ***Not*** *a* ***heavy Java***
  *Application you have to host yourself*<sup>1</sup>)
- **Free** Both to *Use* and **Open Source** (MIT License) see: http://about.travis-ci.org/
- **Integrates** nicely with **GitHub** (*without any developer effort*!)


<sup>1</sup>We've used [Jenkins CI](http://jenkins-ci.org) in the past for *client* projects,  
but **Jenkins** has a
[***steep learning curve***](http://shop.oreilly.com/product/0636920010326.do)
for *new developers*.  
**Travis** *by contrast* has a much ***shallower learning curve***!

<a name="how"></a>
## How?

This tutorial will take you **20 minutes** and will ***save you hours***
of frustration! #**NoBrainer**

<a name="pre-requisites"></a>
### Pre-requisites

+ **Computer** *with* **node.js** ***installed***
+ any **text editor**
+ machine with a debian system (Like Ubuntu)

If you don't have these, see: https://github.com/dwyl/start-here.
If you don't have a Linux system, this tutorial will still apply, with exception
to some of the tools used and chapter 6.

<a name="getting-started"></a>
### Getting Started

Following the [Travis Getting Started](http://about.travis-ci.org/docs/user/getting-started/) guide:

> Visit: https://travis-ci.org/ and click "**Sign in with GitHub**" no "*registration*" required.

![Travis Login with GitHub](https://user-images.githubusercontent.com/194400/28815478-6b49c546-7699-11e7-9bc1-fe1ec36e4967.png "Sign in with GitHub")

> You will be re-directed to GitHub where you need to click "**Authorize application**"

![Authorize Travis at GitHub](https://user-images.githubusercontent.com/194400/28815493-7a9b1be4-7699-11e7-8f67-36b547bac915.png "Authorize Travis GitHub")

**Note**: If you ever want to *stop* Travis accessing to your GitHub account,  
simply visit: https://github.com/settings/applications and click on *Revoke*.

> Once you have allowed access you will be taken back to Travis  
> where you will need to enable a specific Git Repository.  
> You can also do this in your Travis Profile:
https://travis-ci.org/profile

![Enable Repo in Travis](https://user-images.githubusercontent.com/194400/28815577-bd0922e6-7699-11e7-90ea-ba891933f2ce.png "Travis Enable Repo")

<a name="create-the-project-files"></a>
### Create The Project Files

In this example, the project structure and files you will need are as follow:

```
project_folder
|_.travis.yml
|_hello.js
|_package.json
|_other_files
```

Once you hooked your project to Travis, every time you push a new version to GitHub
Travis will search your entire project folder for files, build your project and
run all tests automatically. This way you don't need to specify which folders
Travis needs to check - it always **checks everything**!

First, let's create our `.travis.yml` file and paste the following code:

```yml
language: node_js
node_js:
 - "node"
```

**.travis.yml** is a basic Travis configuration file
that tells travis-ci what to expect and how to behave for our application.

In this case, this file tells Travis we run on *Node.js*. Not only that, it also
tells Travis to use the latest version of Node.js. You can also specify specific
versions if you want to and to customize your build process:

 - https://docs.travis-ci.com/user/languages/javascript-with-nodejs/
 - https://docs.travis-ci.com/user/customizing-the-build/

Because this specific file is so vital, it is mandatory that you place it in the
root of your project folder and that you also validate it, either via the
[Travis-CLI ](#install-travis-cli-on-ubuntu) or via their [WebLint](http://lint.travis-ci.org/).

Second, lets create our `hello.js` file by pasting the following code:

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n')
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

<a name="define-the-test"></a>
### Define The Test

Previously we have mentioned that Travis runs all the tests automatically. But
how does it know where the tests are? Which files to run?

That is in the **package.json** file. This file has a `scripts` element, where you can
specify the `test` command, which Travis will look for and run!

Create a `package.json` file and paste the following:

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
    "test": "jshint hello.js"
  }
}
```

This file tells Travis to run `jshint` on our `hello.js` file.
`jshint` is a program that analysis code quality, so it is perfect to use a test!

To run the test command we will need to install the `jshint` node module from NPM:

```sh
npm install jshint --save-dev
```

Now you can run the `test` command *locally* by typing `npm test` in your terminal.

If you do it, you can see the test fails. But we are not introducing you to Travis so  
you can run tests manually, that's Travis's job! Let's see how Travis can run tests
automatically!

<a name="watch-it-fail"></a>
### Watch it Fail

Commit all the files you just created and push them to GitHub.
Travis will automatically scan your repository and pickup the
**.travis.yml** file which informs travis this is a **node.js** project/app
next travis will look for a **package.json** file and scan for a
**scripts** entry (*specifically* the **test** one)
Travis will download all the modules listed in your *devDependencies*
and attempt to run your test script **npm test**.

In our case we are only asking travis to **lint** the **hello.js** file.
and since the file was missing a semi-colon on the 4th line above,
it will fail the lint and thus the build process fails!

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n')  // Test fails here!
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

![Travis Build Failing](https://raw.github.com/dwyl/learn-travis/master/images/06-travis-build-failing.png "Travis Build Failing")

![Travis Build Failing Error Message](https://user-images.githubusercontent.com/194400/28815609-d7ec720c-7699-11e7-9376-56d438b1d2d8.png "Travis Build Failing Error Message")

On **line 343** we are missing a semi-colon.

<a name="correct-code-to-pass-build"></a>
### Correct Code To Pass Build

Simply add the semi-colon to the 4th line of **hello.js**, commit and push your changes again:

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n'); // build should pass now!
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

And just like that our "**build**" is ***passing***!

![Travis Build Passing](https://user-images.githubusercontent.com/194400/28816018-33a38120-769b-11e7-9f2f-28b7e325e9ed.png "Travis Build Passing")

![Build Status](https://user-images.githubusercontent.com/194400/28816007-2d303ec8-769b-11e7-8d75-8d1fbd93592c.png "Build Status: Passing")


<a name="realistic-example"></a>
## Realistic Example

@dwyl we use Travis-CI for a *lot* more than code linting! We use Travis-CI to
***automatically*** run our unit/integration tests.  
If you are new to ***automated testing***, we have a
***Complete Beginners Test Driven Development Tutorial***:

 - https://github.com/dwyl/learn-tdd  

Which will show you how to use Travis-CI
to check your code is working as expected!

<a name="environment-variables"></a>
## Using *Environment Variables* with Travis!

> If you are ***new to environment variables***
check out our ***introductory tutorial*** (*for complete beginners*):
https://github.com/dwyl/learn-environment-variables/

Often your application will use **environment variables** to store
keys, passwords or other sensitive data you don't want to hard-code in your
code; Travis-CI makes this **easy**:

There are **three ways** of telling Travis-CI about your environment variables:

<a name="environment-variables-travis.yml"></a>
### 1. Include Environment Variables in your `.travis.yml` file

The easiest and most explicit way of listing your environment variables
is to add them to your `.travis.yml` file:

```yml
language: node_js
node_js:
 - "node"
env:
- MY_VAR=EverythignIsAwesome
- NODE_ENV=TEST
```
The interesting part is the `env:` key where you can then list
your environment variables and their corresponding values.

<a name="environment-variables-web-interface"></a>
### 2. Add environment Variables in the Web Interface

Another way of telling Travis-CI your environment variable(s)
is to add them in the web-base user-interface (Web UI)
in your project's settings page:

![add travis-ci environment variables Web UI](https://user-images.githubusercontent.com/194400/28816067-5a2c99ee-769b-11e7-92da-c9187e0c8aa2.png)

*Notice* how in if you add your environment variables in the Travis Web UI
they are hidden (*from the build log*) by default.
This does *not* prevent you from accidentally `console.log`
them and exposing a key/password.

So take care when console.logging ...!

<a name="environment-variables-secured"></a>
### 3. **Secure** (Encrypted) Environment Variables

If you are storing sensitive information (*like API Keys or Database Passwords*)
for use in your node app, the ***best way*** is to use the
[travis ruby gem](http://docs.travis-ci.com/user/encryption-keys/)
to **encrypt** your keys:

You will need to have ruby installed on your computer,
if you don't already have this, we recommend installing it with
[RVM](http://stackoverflow.com/a/14182172/1148249):

```sh
\curl -L https://get.rvm.io | bash -s stable --ruby
rvm install current && rvm use current
```
Once you have installed ruby you can install the **travis ruby gem**:

```sh
gem install travis
```

With the gem installed, you encrypt your variable by running the command
in your terminal (*ensure you are in the working directory of your project*)

```sh
travis encrypt MY_SECRET=super_secret
```

Type `yes` to confirm you are your project, you should now see your encrypted variable:

![learn-travis-encrypted-variable](https://user-images.githubusercontent.com/194400/28816106-7ed7e1c2-769b-11e7-9601-39de2ec31e62.png)

Paste this in your `.travis.yml` file, commit and push it to GitHub!


<a name="continuous-delivery"></a>
## Continuous _Delivery_ 🚀

**Continuous delivery** (**CD**) is a software engineering approach
in which teams produce software in **short cycles**,
ensuring that the software can be **reliably released** at **_any_ time.**
It aims at building, testing, and releasing software
with greater speed and frequency.
The approach helps reduce the cost, time, and risk of delivering changes
by allowing for more incremental updates to applications in production.
A straightforward and repeatable **deployment process**
is important for continuous delivery. <br />
https://en.wikipedia.org/wiki/Continuous_delivery

Travis-CI can help with the **deployment process**
and there are _many_ tools you can use to deploy your App(s)
to a wide variety of "Cloud Infrastructure" or "Platform" providers.

> _**Note**: we consider this an "**advanced**" topic.
If you have not yet used Heroku (with GitHub hooks)
we **highly recommend** that you use that approach **first**
see:_ https://github.com/dwyl/learn-heroku <br />
_Once your App has "traction" and you have "outgrown Heroku"
(or your "Product Owner / Client" does no "allow" you to use Heroku)
return to this topic and our "**DevOps**" tutorial:_
https://github.com/dwyl/learn-devops

### Add an Encrypted SSH Key to Travis-CI for Deployment

We decided to give this walkthrough it's own file/page
(_to avoid "cluttering" the main "beginners" tutorial_):
[`encrypted-ssh-keys-deployment.md`](https://github.com/dwyl/learn-travis/blob/master/encrypted-ssh-keys-deployment.md)

<br /><br />

<a name="elm-lang"></a>
## Elm-lang Project

@dwyl we use (_and **highly recommend**_) Elm.

> If you are new to Elm please see:
[https://github.com/dwyl/**learn-elm**](https://github.com/dwyl/learn-elm)

If you need a _sample_ `.travis.yml` file for use with Elm projects,
please see: https://github.com/nelsonic/photo-groove/blob/master/.travis.yml

For more detail see our issue investigating this:
https://github.com/dwyl/learn-travis/issues/31
(_we looked at several prominent Elm projects to distil the config/script_)


<a name="elixir-lang"></a>
## Elixir-lang Project

@dwyl we use (_and **highly recommend**_) Elixir for Server-side Applications.

> If you are new to Elixir please see:
[https://github.com/dwyl/**learn-elixir**](https://github.com/dwyl/learn-elixir)

To get started, an Elixir project only needs the following lines
in `.travis.yml` file:

```yml
language: elixir
elixir:
  - 1.6
env:
  - MIX_ENV=test
script:
  - mix test
```

If you need a "_real world example_" `.travis.yml` file
for use with Elixir projects, please see:
https://github.com/dwyl/hits-elixir/blob/master/.travis.yml


<a name="install-travis-cli-on-ubuntu"></a>
## Install Travis-CLI on Ubuntu

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
<a name="going-further"></a>
## Going further

This tutorial is meant to be only but a first contact with Travis and the world of CI.
If you liked what have you seen so far, you can delve deeper into the following topics
which will improve your understanding about CI overall, Travis and other tools that support Node.js.

<a name="general-ci"></a>
### General CI Background Reading

- Continuous Integration Wikipedia Article: http://en.wikipedia.org/wiki/Continuous_integration
- Martin Fowler's Article on CI: http://www.martinfowler.com/articles/continuousIntegration.html
- CI Beginners Guide Video: https://vimeo.com/19596466
- Great Book on CI: http://www.amazon.com/Continuous-Integration-Improving-Software-Reducing/dp/0321336380/

<a name="travis-specific"></a>
### Travis Specific

- Travis Getting Started: http://about.travis-ci.org/docs/user/getting-started/
- Build Podcast Ep.32 (Travis) Video: http://build-podcast.com/travisci/
- [@sayanee_](https://twitter.com/sayanee_)'s Build Podcast GitHub: https://github.com/sayanee/build-podcast/tree/master/032-travisci
- Travis-CI Environment Variables guide: http://docs.travis-ci.com/user/environment-variables/

<a name="competitors"></a>
### Competitors

- Comparison of CI Software: http://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software
- Travis CI Alternatives https://www.quora.com/What-are-the-alternatives-to-Travis-CI-Are-there-any-alternative-hosted-CI-services-for-open-source-projects
- circle-ci: https://circleci.com/, [learn-circleci](https://github.com/dwyl/learn-circleci)
- codeship: https://codeship.com/, [learn-codeship](https://github.com/dwyl/learn-codeship)

<!--
<a name="todo"></a>
## TODO

- **ALL** The Diagrams on Google Image Search for Continuous Integration are terrible!
https://www.google.com/search?q=continuous+integration&source=lnms&tbm=isch
*we* either need to make time to draw one or ask/commission someone to do one for us!
-->
