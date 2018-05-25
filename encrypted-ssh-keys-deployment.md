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




### ?. _Test_ That you are Able to Login to the Server ...

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
