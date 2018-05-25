# How to Encrypt/Decrypt SSH Keys for Deployment

Adding an _encrypted_ SSH key to your project
so Travis-CI can _deploy_ your App _automatically_.

## Why?

Continuous Deployment _completely_ automates the process of
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

The SSH key is created and _ecrypted_ on the _server_
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
 + Eager-beavers who are curious about "DevOps".


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
and use a _strong_ `passphrase`.
e.g: https://xkpasswd.net
(_or use your_
  [***imagination***](https://www.google.com/search?q=imaginationland&tbm=vid)
  ...)

![generate-ssh-key](https://user-images.githubusercontent.com/194400/40562649-cf74ee24-6059-11e8-92c4-69144ccdea55.png)


> _**Note**: given that we are "trusting" Travis-CI with the_ `private` _key
there is not much **point** adding_ `passphrase` _to it, because
the_ `passphrase` _can easily be "stripped" once the key is decrypted ...
see:_ https://stackoverflow.com/questions/112396/how-do-i-remove-the-passphrase-for-the-ssh-key-without-having-to-create-a-new-ke
_But, for the sake of "**perceived security**" we are using
a password for the SSH key to add an "**extra step**" for any "bad actors"
trying to "hack" your server._
> _I am including a "sample"_ `passphrase`
[`brown french cat wears big boots`](https://en.wikipedia.org/wiki/Puss_in_Boots)
_in this guide
for **illustration purposes ONLY**, it is not a "real" one used anywhere
and you should **never share passwords/passphrases** with **anyone**_!


### 3. Install Travis-CI CLI

In order to encrypt both the SSH key and passphrase, we will need
the [**Travis-CI CLI**](https://github.com/travis-ci/travis.rb)

Install the Travis CLI on your `localhost`
(_to avoid "polluting" the server_):
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

For installation instructions for specific/different Linux distribution, see:
https://www.ruby-lang.org/en/documentation/installation

#### Windows...?

<div align="center">
    <a href="https://travis-ci.org/">
        <img src="https://user-images.githubusercontent.com/194400/40563172-c329255c-605b-11e8-8b46-2db59796f905.jpg">
    </a>
</div>
<br />

But seriously,
https://www.computerworld.com/article/3252823/linux/why-linux-is-better-than-windows-or-macos-for-security.html


### 4. _Securely_ Download the SSH Key

Ensure that your current working directory is the project/app
that you are adding the SSH key for.
(_so you don't have to **move** the key later_)

`before` you download the SSH key,
_first_ add a line to your `.gitignore` file
to _ensure_ that you don't _accidentally_
commit the `private` key in _plaintext_!
```sh
echo "id_rsa" >> .gitignore
```

With that done, download the key with the following command:

```
scp user@ip.add.ress.here:/root/.ssh/id_rsa  ./local/dir
```

e.g:
```sh
scp root@138.68.163.126:/root/.ssh/id_rsa ./
```

![download-ssh-key](https://user-images.githubusercontent.com/194400/40564470-b8c60df0-6060-11e8-83f5-3e89995051c2.png)


### 5. Encrypt the Private Key

Use the `travis` CLI to encrypt the key:




### 6.







### ?. _Test_ That you are Able to Login to the Server ...

_Securely_
Note: we are only downloading this _temporarily_
and will `delete` it once we have confirmed that
our deployment pipeline is _working_.

> Run the following command from the directory where the
_decrypted_ SSH key is:

>> ssh ...


#### Download the Private Key File

On your `localhost`, download the `private` key you created in the previous step.

```
scp root@51.140.86.5:/root/.ssh/id_rsa ./deploy_key
echo "deploy_key" >> .gitignore
```

![download-ssh-key](https://user-images.githubusercontent.com/194400/28846821-c8570300-7704-11e7-993c-478010457fbd.png)

_Ensure_ you don't accidentally commit the _private_ key
to GitHub by your `.gitignore` file.

#### Encrypt the Private Key

Again, on your localhost, encrypt the `private` key using Travis' CLI:

```
gem install travis
touch .travis.yml && travis encrypt-file ~/.ssh/deploy_key --add
```

You should have a `deploy_key.enc` file in your working directory.
This should be added/commited to GitHub so that Travis can use it.

#### How the Private RSA Key is Used by Travis-CI to Deploy using Edeliver

The key decrypted by Travis in the `before_install:` script.
We check that the decrypted key is valid by testing the `ssh` access in `after_success:`
If that works, we attempt to run the `mix edeliver build upgrade` task.



## Background / Related Reading

+ Managing Deploy Keys (_for SSH deployment_):
https://developer.github.com/v3/guides/managing-deploy-keys
+ Generating a new SSH key: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
+ SSH deploys with Travis CI: https://oncletom.io/2016/travis-ssh-deploy/
