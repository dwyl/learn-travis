learn-travis
============

A quick Travis CI (Continuous Integration) Tutorial for Node.js developers


![Toilet Roll Blocks Seat FAIL](https://raw.github.com/nelsonic/learn-travis/master/images/Roll-Blocks-Toilet-Seat.jpg "Toilet Roll Blocks Seat from Closing. Fail!"")

*it pays to* **fully test** *things before deploying them ...*

> Continuous integration is a software development process in which all 
> development work is integrated at a predefined time or event and the 
> resulting work is automatically tested and built. The idea is that 
> development errors are identified very early in the process.

If you are *completely* new to **C**ontinuous **I**ntegration (CI) 
I recommend reading the 
[CI Wikipedia Article](http://en.wikipedia.org/wiki/Continuous_integration) 
and Martin Fowler's [Article on CI](http://www.martinfowler.com/articles/continuousIntegration.html)
<br />
**Note**: Both of these are quite *text-heavy* but contain all the info you need. Read them! If you have any questions, *ask*! 

The key advantages of Travis:

- Nothing to *Install* (Cloud Based ... *Not Java*!)
- **Free** Both to *Use* and **Open Source** (MIT License) see: http://about.travis-ci.org/
- Integrates nicely with GitHub (without any developer effort!)

I've used [Jenkins/Hudson CI](http://jenkins-ci.org) in the past @groupon, but found the learning curve a bit steep for new developers. Travis by contrast has a much *shallower learning curve*!

### Getting Started

Following the [Travis Getting Started](http://about.travis-ci.org/docs/user/getting-started/) guide:

> 1. Visit: https://travis-ci.org/ and click "**Sign in with GitHub**" no "*registration*" required.

![Travis Login with GitHub](https://raw.github.com/nelsonic/learn-travis/master/images/01-Travis-login-with-github.png "Sign in with GitHub")

> 2. You will be re-directed to GitHub where you need to click "**Allow Access**"

![Authorize Travis at GitHub](https://raw.github.com/nelsonic/learn-travis/master/images/02-Authorise-Travis-access-github.png "Authorize Travis GitHub")

> 3. Once you have allowed access you will be taken back to Travis 
where you will see the Welcome screen:

![Welcome to Travis](https://raw.github.com/nelsonic/learn-travis/master/images/03-Travis-Welcome.png "Travis Welcome")

> 4. Next you need to enable a specific Git Repository in your Tavis Profile:
https://travis-ci.org/profile

![Enable Repo in Travis](https://raw.github.com/nelsonic/learn-travis/master/images/04-Travis-profile-enable-repo.png "Travis Enable Repo")





**Note**: If you ever want to *stop* Travis accessing to your GitHub account, 
simply visit: https://github.com/settings/applications and click on *Revoke*.






[![Build Status](https://travis-ci.org/nelsonic/learn-travis.png?branch=master)](https://travis-ci.org/nelsonic/learn-travis)


### Notes:

#### Background Reading

- Continuous Integration Wikipedia Article: http://en.wikipedia.org/wiki/Continuous_integration
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

