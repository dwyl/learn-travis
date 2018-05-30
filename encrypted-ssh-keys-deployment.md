# How to Encrypt/Decrypt SSH Keys for Deployment

Adding an _encrypted_ SSH key to your project
so Travis-CI can _deploy_ your App _automatically_.

## Why?

Continuous Deployment **_completely_ automates** the process of
deploying the latest version of the project/application to a given environment.
This saves a _considerable_ amount of time for the team as
there are no _manual_ steps to perform each time a new feature or bug-fix
needs to be deployed, and avoids confusion around which version is
on the given instance.

Many people prefer to use SSH-based deployment tools
(_such as_ [***Edeliver***](https://github.com/edeliver/edeliver))
because they are _simple_, _fast_ and _secured_ by the encrypted SSH "tunnel".


## What?

A _secure_ way to setup your "deployment pipeline" using Travis-CI
to ship your App to (_one or more_) server instance(s) via `SSH`.

### Is it "_Secure_"?

The SSH key is created and _ecrypted_
and is _never_ transmitted in plaintext.
Only Travis-CI can _decrypt_ the key.

_**Note**: if you are using the **paid version** of Travis-CI,
you can use the Web-UI to add an SSH Key. <br />
see:_ https://docs.travis-ci.com/user/private-dependencies <br /> via:
https://stackoverflow.com/questions/27444891/how-to-add-ssh-key-in-travis-ci
<br />

## Who?

This guide is intended for:
 + People who have "outgrown Heroku" (_the **easy** way to deploy apps..._)
 or whose project/client/manager does not _allow_ them to use Heroku.
 + Anyone who wants/needs "_full control_" over their deployment/platform.
 + Eager-beavers who are _curious_ about "DevOps".


## How?

### Step "0": _Before_ You Start (_Prerequisites_)

This guide assumes you _already_ have a Linux "Virtual Private Server" (VPS)
instance on a "Cloud" service provider
e.g: AWS, Google Cloud, Digital Ocean, Linode, etc.

You will need SSH access to the instance and a note of the IP address
so that you can login and perform the actions described below.

For the purposes of this walkthrough, we are using an CentOS instance
running on DigitalOcean, however we have tested it on
an Ubuntu instance running on both AWS, Azure and Linode and it works great!

> If you do not _already_ have a Digital Ocean account,
please use the following ("_referral_") link to register:
https://m.do.co/c/29379863a4f8 and get **$10 in Credit**.

No other knowledge is _assumed_.
All commands are explained,
_however_ if _anything_ is _unclear_,
as always, we are "here + happy to help";
just open an issue on:
https://github.com/dwyl/learn-travis/issues


### 1. Log-in to Your Server Instance

Log-in to your server instance via SSH using the IP address:

```sh
ssh user@ip.add.ress.here
```
e.g:

```sh
ssh root@138.68.163.126
```

You should see the terminal prompt change to reflect the fact
that you are logged into the server. e.g: <br />

![ssh-login](https://user-images.githubusercontent.com/194400/40557858-68a7f3ea-6049-11e8-8bc6-24bdf52c7300.png)

### 2. Create a `new` SSH Key

Change directory into the `.ssh` directory on the instance:
```sh
cd ~/.ssh
```

```sh
ssh-keygen -t rsa -b 4096 -C "TravisCIDeployKey"
```
Press `[Enter]` key to use the defaults for the filename
and leave the `password` _blank_.<sup>1</sup> <br />
You should see output in your terminal _similar_ to this:

![generate-ssh-key](https://user-images.githubusercontent.com/194400/40580695-b5550956-613b-11e8-936c-9ba091b3c1ba.png)


<sup>1</sup><small>_Having an RSA key **without** a_ `password`
_is "OK" for use as a key **exclusively** used for deployment on Travis-CI
because the key will be **encrypted** using Travis'_ `public` _key
meaning that **only** Travis can decrypt it._
_given that we are "trusting" Travis-CI with the_ `private` _key
there is not much **point** adding_ `password` _to it, because
the_ `password` _can easily be_
["_stripped_"](https://stackoverflow.com/questions/112396)
_once the key is decrypted._
_and, given that Travis **needs** to "know"_
_the_ `password` _in order to **use** the key.
If an "attacker" was to gain access to Travis' system and had their_
`private` _key, the **Internet** would "break"!_
_seriously, enough NPM packages are
**automatically published** by Travis-CI that it would be_
["`left-pad` _gate_"](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos)
_times a **million** if Travis were compromised!_
_**However**, if you have **time** to help us with "upgrading" this tutorial
to use an RSA key **with** a_ `password`
_we would **love** to know how it's done
see_: https://github.com/dwyl/learn-travis/issues/42#issuecomment-392257518


#### 2.1 Add the `new` SSH Key to the `authorized_keys` File

In order for this key to be _used_ for SSH access,
it needs to be included in the `authorized_keys` file on the _server_.

Run the following command to _append_
the `public` key to the list of "authorized keys":

```
cat id_rsa.pub >> authorized_keys
```
We will _test_ that this worked below in step **3.1**


### 3. _Securely_ Download the SSH Key

Ensure that your current working directory is the project/app
that you are adding the SSH key for.
(_so you don't have to **move** the key later_)

`before` you download the SSH key,
_first_ add a line to your `.gitignore` file
to _ensure_ that you don't _accidentally_
commit the `private` key in _plaintext_!
```sh
echo "deploy_key" >> .gitignore
```

With that done, download the key with the following command:

```sh
scp user@ip.add.ress.here:/root/.ssh/id_rsa  ./deploy_key
```

e.g:
```sh
scp root@138.68.163.126:/root/.ssh/id_rsa ./deploy_key
```

![download-ssh-key](https://user-images.githubusercontent.com/194400/40564862-4ac51e98-6062-11e8-8ac0-a6c0fab92902.png)

#### 3.1 _Test_ That you are Able to Login to the Server ...

Test that you are _able_ to login to the server using the `deploy_key`:

```sh
ssh -i /path/to/deploy_key user@ip.add.ress.here
```
e.g: <br />
```sh
ssh -i ./deploy_key root@138.68.163.126
```

![ssh-login-with-deploy_key](https://user-images.githubusercontent.com/194400/40565345-2b3b197c-6064-11e8-80ea-84a9439b48ba.png)


### 4. Install Travis-CI CLI

In order to encrypt both the SSH key and passphrase, we will need
the [**Travis-CI CLI**](https://github.com/travis-ci/travis.rb)

Install the Travis CLI on your `localhost`
(_to avoid "polluting" the server
**and** so that you can use it in future projects_):
```sh
gem install travis
```
You _should_ see:
![travis-installed-localhost](https://user-images.githubusercontent.com/194400/40563051-4abfee7a-605b-11e8-9ebb-4502ef8b3ea1.png)


`if` you see the error:
```
-bash: gem: command not found
```
You need to install `ruby` _first_.

#### Mac

```sh
brew install ruby
```

#### Centos (or RedHat/Fedora)

```sh
sudo yum install ruby -y
```
You should see: <br />
![image](https://user-images.githubusercontent.com/194400/40562925-d8e933f6-605a-11e8-87db-e782a753660c.png)

Now try installing the Travis-CI CLI again.

#### Ubuntu

```sh
sudo apt-get install ruby-full
```

For installation instructions for specific/different Linux distribution, <br />
see: https://www.ruby-lang.org/en/documentation/installation

#### Windows...?

<div align="center">
    <a href="https://travis-ci.org/">
        <img src="https://user-images.githubusercontent.com/194400/40563172-c329255c-605b-11e8-8b46-2db59796f905.jpg">
    </a>
</div>
<br />

But seriously, install Linux on your Windows PC and set yourself _free_!
https://www.computerworld.com/article/3252823/linux/why-linux-is-better-than-windows-or-macos-for-security.html

If you are "_stuck_" using windows see: https://rubyinstaller.org


### 5. _Encrypt_ the Private Key

Use the `travis` CLI to encrypt the key on your `localhos`:

```
touch .travis.yml && travis encrypt-file ./deploy_key --add
```
You should see something like this:

![ssh-key-encrypted](https://user-images.githubusercontent.com/194400/40564928-8b1209f2-6062-11e8-83a1-2a0df73fe519.png)


if you look at the `.travis.yml` file in your project folder,
you will notice that a couple of lines were added:

```
before_install:
- openssl aes-256-cbc -K $encrypted_77965d5bdd4d_key -iv $encrypted_77965d5bdd4d_iv
  -in deploy_key.enc -out ./deploy_key -d
```

Ensure that you commit the `deploy_key.enc` file and `.travis.yml` file
in your project before pushing to GitHub.

> Note: there is an _alternative_ way of doing this where the SSH key
is to `base64` encode the encrypted key and included it in `.travis.yml`,
see: https://gist.github.com/lukewpatterson/4242707
but we feel that it adds a lot of "noise" to the `.travis.yml` file.
Decide for yourself which you prefer; be consistent across your projects.

<!-- see: https://github.com/dwyl/learn-travis/issues/42#issuecomment-392257518
### 6. _Encrypt_ the SSH Key Passphrase

Since we used a `passphrase` for our SSH key in step 2 (_above_),
we need to _securely_ encrypt that `passphrase` and add it as an
Environment Variable in our `.travis.yml` file.

Thankfully, we've done this before in a "previous lesson":
https://github.com/dwyl/learn-environment-variables#secure-encrypted-environment-variables

```
travis encrypt SSH_ASKPASS="totes super secret" --add
```

`ssh-add` _expects_ the password for the RSA Key to be the `SSH_ASKPASS`
environment variable ... see: https://www.ssh.com/ssh/add

travis encrypt SSH_ASKPASS="brown french cat wears big boots" --add

Your `.travis.yml` file should include a _new_ line something like this:
```
env:
  matrix:
  - MY_VAR=EverythingIsAwesome
  global:
    secure: Yr/YfU7fIqgNoD+xKp+6IKPLC6Vwa9636wcQT+E--etc.=

```

This is the Git commit where I did this for our "example" project:
https://github.com/nelsonic/hello-world-node-http-server/commit/b7c00b889f1e5d8663613b4514e8e6e31ea99115
-->

#### 5.1 Set the RSA Key as the "preferred key" in `.travis.yml`

We already added the _encrypted_ RSA key to our repository in step 5 (_above_)
but we _also_ need to add the RSA key as the "preferred key" on Travis-CI.
To do that, add the following line to your `.travis.yml` file:
```yml
- ssh-add ./deploy_key
```
_ensure_ that this line is _after_ the key decryption line.
Example: https://github.com/nelsonic/hello-world-node-http-server/blob/master/.travis.yml#L13



### 6. Test it on Travis-CI!

The ["proof of the pudding"](https://en.wiktionary.org/wiki/the_proof_of_the_pudding_is_in_the_eating)
is _confirming_ that Travis-CI can execute an SSH command
on your server instance ...

Add the following lines to your `.travis.yml` file:

```sh
- eval "$(ssh-agent -s)"
- chmod 600 ./deploy_key
- echo -e "Host $SERVER_IP_ADDRESS\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
- ssh-add ./deploy_key
- ssh -i ./deploy_key root@138.68.163.126 pwd
```
Let's walkthrough those lines ...
- `eval "$(ssh-agent -s)"` = start the `ssh-agent` (_so that we can run ssh commands_)
- `chmod 600 ./deploy_key` = change permissions on `deploy_key` to avoid warnings.
- `echo -e "Host $SERVER_IP_ADDRESS\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config` =
avoid Travis asking if we want to "check" the identity of our host (VPS) Via: https://stackoverflow.com/questions/16638573/auto-authorize-ssh-auth-requests-on-travis-ci
- `ssh-add ./deploy_key` = add the `deploy_key` as our _preferred_ `ssh` RSA key.
- `ssh -i ./deploy_key root@138.68.163.126 pwd` = run the `pwd` command
on the deployment server using the `deploy_key` as our "identity" file (RSA Key)

If the `ssh` command works on Travis-CI
(_which it should if you followed each step of this guide..._)
You should see something _similar_ to the folloiwng output:
https://travis-ci.org/nelsonic/hello-world-node-http-server/builds/385702903#L457
![ssh-pwd-success-travis-ci](https://user-images.githubusercontent.com/194400/40725130-8a4134f6-641a-11e8-86b8-c948b5b0d0dc.png)

Full _example_ (_working_) [`.travis.yml`](https://github.com/nelsonic/hello-world-node-http-server/blob/master/.travis.yml#L7-L16) file.



## Background / Related Reading

+ Managing Deploy Keys (_for SSH deployment_):
https://developer.github.com/v3/guides/managing-deploy-keys
+ Generating a new SSH key: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
+ SSH deploys with Travis CI: https://oncletom.io/2016/travis-ssh-deploy/
+ https://www.rusiczki.net/2018/01/25/use-travis-to-build-and-deploy-your-jekyll-site-through-ssh/
+ http://anil.recoil.org/2013/10/06/travis-secure-ssh-integration.html
+ Auto-deploying built products to gh-pages with Travis: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
