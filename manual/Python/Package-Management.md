---
name: Package Management in Python
menu: Python
---

# Package Management in Python

## Resources

1. [Python Packaging User Guide](https://packaging.python.org/tutorials/managing-dependencies/)
2. [Tool Recommendations](https://packaging.python.org/guides/tool-recommendations/)
3. [pipenv](https://pypi.org/project/pipenv/)
4. [pipenv install](https://pipenv.pypa.io/en/latest/#install-pipenv-today)
5. [pipenv - GitHub](https://github.com/pypa/pipenv)
6. [ipython - GitHub](https://github.com/ipython/ipython)
7. [requests - GitHub](https://github.com/psf/requests)

## Why Pipenv?

The first two lines on the project sum it up perfectly.

> Pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world. Windows is a first-class citizen, in our world.
>
> It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.

Pipenv enables you to keep project dependecies between different setups in sync - hence the `deterministic` builds. By managing a `virtualenv` for you, it is treating different Pipenv projects you have a separate with separate dependencies - similar to what you would expect for those other package managers for other languages mentioned above (ie Bundler for Ruby, npm/yarn for Nodejs, Composer for PHP, Cargo for Rust).

Some of the other problems that it address is also stated on their GitHub. Word-for-word, this is the list:

1. You no longer need to use pip and virtualenv separately. They work together.
2. Managing a requirements.txt file can be problematic, so Pipenv uses the upcoming Pipfile and Pipfile.lock instead, which is superior for basic use cases.
3. Hashes are used everywhere, always. Security. Automatically expose security vulnerabilities.
4. Give you insight into your dependency graph (e.g. \$ pipenv graph).
5. Streamline development workflow by loading `.env` files.

The second-point on the `requirements.txt` file may look unfamiliar to new-goers to Python, but that is another way that Python projects have been attempting to streamline the packages used.

## Installation

There are a number of ways to install `pipenv`:

```s
# Brew
brew install pipenv
# Debian Buster +
sudo apt install pipenv
# Fedora
sudo dnf install pipenv
# FreeBSD
pkg install py36-pipenv
# When none of the above is available
pip install pipenv
```

You can see more details [here](https://pipenv.pypa.io/en/latest/#install-pipenv-today).

## Setting up two basic projects to demonstrate

Let's create a new folder to host a project that we will manage by Pipenv.

In each, we will install [iPython](https://github.com/ipython/ipython) which an alternative interactive environment to play around with.

Then we will use the [requests](https://github.com/psf/requests) package, which is a simple Python package for making requests. We won't go too deep into the package - it is mainly for demonstrating how the environment installation and setup works.

Run the following from where you would like to setup the project in your terminal. I recommend open two different tabs.

```s
# in tab one in the directory where you want to setup the project
mkdir -p hello-pipenv
cd hello-pipenv
pipenv --three
pipenv install --dev ipython
```

You can initialise a new Python3 virtual environment by running `pipenv --three`. For Python2, you can run `pipenv --two`.

Once setup, we can run `pipenv install <package>` to install a package that we need. That same call can be run as `pipenv install --dev <package>` for packages we only need to install to help with development (indicated by the `--dev` flag).

## Running a simple GET requests from iPython

To open up the iPython interactive environment, we can run `pipenv run ipython`.

Once it runs, you should get something like the following:

```s
Python 3.7.7 (default, Mar 10 2020, 15:43:03)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.16.1 -- An enhanced Interactive Python. Type '?' for help.

In [1]:
```

Thanks to Pipenv, iPython already knows that we are running `Python 3.7.7`.

Once in the REPL, let's try following the example from the [requests Github page](https://github.com/psf/requests) to import requests:

```s
In [1]: import requests
---------------------------------------------------------------------------
ModuleNotFoundError                       Traceback (most recent call last)
<ipython-input-5-ab36cda7e100> in <module>
----> 1 import requests

ModuleNotFoundError: No module named 'requests'
```

Uh-oh! This error shows up because we haven't yet installed `requests` for the project!

> Note: If you have `requests` installed previously using pip in the wider context, you may find you do not come to an issue importing requests.

We can rectify this by running `exit` to leave iPython and installing the package by running `pipenv install requests`. After the install, boot up iPython again and run the same line.

There should be no error this time when we run `import requests`, so let's move on and run a GET request to Google and assign it to the variable `r` by running `r = requests.get('https://google.com')`.

If we are successful, we can then simply put `r` and hit enter and we will see that `r` refers to a Response object `<Response [200]>`.

We can then access properties on it to see things like the status code, text etc.

```s
In [1]: import requests

In [2]: r = requests.get('https://google.com')

In [3]: r
Out[3]: <Response [200]>

In [4]: r.status_code
Out[4]: 200

In [5]: r.text
Out [5]: # A lot of HTML text
```

Amazing! We have successfully managed to install the package into our project and run it through the Python REPL!

## Pipfile

Once we installed our packages, you would have noticed a `Pipfile` and `Pipfile.lock` was generated.

First, looking at the Pipfile, we see:

```s
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]
ipython = "*"

[packages]
requests = "*"

[requires]
python_version = "3.7"
```

This file is what helps others who are running the project keep it running deterministically. Here is where we lock down the Python version we are using, as well as mention the development and production packages required to run this application. With the `"*"` beside the packages, we are currently telling Pipenv to install the latest. We can update this to lockdown specific versions that we want.

## Pipfile.lock

If you run `cat Pipefile.lock`, you will see that there is a bunch of JSON with versioning and hash information.

These lockfiles are used to ensure that the packages installed and their dependencies are all kept in sync.

It helps to avoid the risk of upgrading packages that depend upon each other and unintentionally breaking your project dependency tree without.

You can use `pipenv lock` to lock the currently installed packages in the project.

## Conclusion

This has been a short entry into installing packages using `pipenv` and seeing them in action in the interactive environment `iPython`.

Next time, we will go further in-depth into running some cooler projects.
