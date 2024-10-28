---
menu: Containers
name: Complete Intro To Containers
---

## 1 Intro

### Links 

- https://containers-v2.holt.courses/
- https://frontendmasters.com/courses/linux-command-line/
- https://frontendmasters.com/courses/complete-intro-containers-v2
- https://github.com/btholt/project-files-for-complete-intro-to-containers-v2

## 2 Crafting containers by hands

### 2.1 What are containers?

*In reality, the core of what containers are is just a few features of the Linux kernel duct-taped together. Honestly, there's no single concept of a "container": it's just using a few features of Linux together to achieve isolation. That's it.*

This section also goes into the history of why we need containers. It talks about bare metal, followed by virtual machines being a layer of abstraction between you and the metal. The VMs added more security and limitations of resources causing issues when being used with multi-tenacy. The VMs come at a cost of performance.

It also covers the introduction of the public cloud and virtual cores that are assigned as dedicated cores to your VM.

This leads into containers. Containers can still give many of the security and resource-management features of VMs but without the cost of having to run a whole other operating system.

It instead uses `chroot`, `namespace`, and `cgroup` to separate a group of processes from each other. If this sounds a little flimsy to you and you're still worried about security and resource-management, you're not alone. But I assure you a lot of very smart people have worked out the kinks and containers are the future of deploying code.

### 2.1.1 Extra credit

Exploring some of the terms more:

1. chroot (change root):
    - A Unix operation that changes the apparent root directory for the current running process and its children.
    - It's not specific to containers and has been used in Unix systems since the 1970s.
    - It can be used in both containers and virtual machines, but it's more commonly associated with containers.
2. Namespace:
    - A feature of the Linux kernel that partitions kernel resources such that one set of processes sees one set of resources while another set of processes sees a different set of resources.
    - Namespaces are a fundamental aspect of containers in Linux but are not typically used directly in virtual machines.
    - Different types include PID namespace, network namespace, mount namespace, etc.
3. cgroup (Control Groups):
    - A Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, network, etc.) of a collection of processes.
    - cgroups are heavily used in containers to manage resource allocation.
    - While they can be used in virtual machines, they're more commonly associated with and essential to container technologies.

These technologies are primarily associated with containers, especially in the context of Linux. Virtual machines, on the other hand, typically use different mechanisms for isolation and resource management, as they run complete operating systems. However, it's worth noting that some advanced virtualization technologies might use these or similar concepts to improve efficiency.

### 2.2 chroot

https://containers-v2.holt.courses/lessons/crafting-containers-by-hand/chroot

It's a Linux command that allows you to set the root directory of a new process. When we set the container's root directory (where it should be), the container cannot see anything outside of it.

Another import part to note is that when we create a new "jail" with `chroot`, we actually need to bring across new copies of programs in order for them to run (using `ldd`) and then copy the files into the place where we want to create the container root.

> While we are here, chroot stands for change root and chmod stands for change mode.

### 2.2.1 Extra credit

#### List dynamic Dependencies

The `ldd` command in Linux is a useful utility for examining the shared library dependencies of executable files or shared objects. Here's a brief overview:

1. Purpose:
   `ldd` stands for "List Dynamic Dependencies". It prints the shared libraries required by each program or shared library specified on the command line.

2. Basic usage:
   ```
   ldd [option]... file...
   ```

3. What it does:
   - It shows which shared libraries a program needs to run.
   - It displays the path of each shared library.
   - It can help diagnose issues related to missing libraries or version conflicts.

4. Common output:
   When you run `ldd`, you typically see output like this:
   ```
   linux-vdso.so.1 (0x00007ffcf25fc000)
   libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f567b021000)
   /lib64/ld-linux-x86-64.so.2 (0x00007f567b223000)
   ```
   Each line shows a required library and its memory address.

5. Useful options:
   - `ldd -v`: Verbose mode, prints all information
   - `ldd -u`: Prints unused direct dependencies

6. Security note:
   Be cautious when running `ldd` on untrusted executables, as it may execute code from the binary in some cases.

7. Example usage:
   To check the dependencies of a command like `ls`, you would use:
   ```
   ldd /bin/ls
   ```

`ldd` is particularly useful for developers and system administrators when troubleshooting library-related issues or analyzing software dependencies.

#### Working around issues I had

The class mentions to copy things across using the `ldd` command, but I also had to copy the actual paths to the bin executables as well into the `<new-root>/bin` directory.

### 2.2.2 Namespaces

https://containers-v2.holt.courses/lessons/crafting-containers-by-hand/namespaces

From the above link:

*Let's say you're running a big server that's in your home and you're selling space to customers (that you don't know) to run their code on your server. What sort of concerns would you have about running their "untrusted" code? Let's say you have Alice and Bob who are running e-commerce services dealing with lots of money. They themselves are good citizens of the servers and minding their own business. But then you have Eve join the server who has other intentions: she wants to steal money, source code, and whatever else she can get her hands on from your other tenants on the server. If just gave all three them unfettered root access to server, what's to stop Eve from taking everything? Or what if she just wants to disrupt their businesses, even if she's not stealing anything?*

*Your first line of defense is that you could log them into chroot'd environments and limit them to only those. Great! Now they can't see each others' files. Problem solved? Well, no, not quite yet. Despite the fact that she can't see the files, she can still see all the processes going on on the computer. She can kill processes, unmount filesystem and even hijack processes.*

*Enter namespaces. Namespaces allow you to hide processes from other processes. If we give each chroot'd environment different sets of namespaces, now Alice, Bob, and Eve can't see each others' processes (they even get different process PIDs, or process IDs, so they can't guess what the others have) and you can't steal or hijack what you can't see!*

*There's a lot more depth to namespaces beyond what I've outlined here. The above is describing just the PID namespace. There are more namespaces as well and this will help these containers stay isloated from each other.*

If you can each other's processes, you can just kill them at any time.

We can use `unshare` to help create a new isolated namespace. The example is run by installing another instance of Ubunu jammy using `debootstrap`.

The important code for `unshare` looks like this:

```bash
# head into the new namespace'd, chroot'd environment 
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash
# this also chroot's for us 
mount -t proc none /proc 
# process namespace 
mount -t sysfs none /sys 
# filesystem 
mount -t tmpfs none /tmp # filesystem
```

### 2.3 cgroups

https://containers-v2.holt.courses/lessons/crafting-containers-by-hand/cgroups

`cgroups` are required for isolating resources. If we had a multitenant app, we need this to operate efficiently.

You interact with cgroups by a pseudo-file system. Honestly the whole interface feels weird to me but that is what it is! Inside your #2 terminal (the non-unshared one) run `cd /sys/fs/cgroup` and then run `ls`. You'll see a bunch of "files" that look like `cpu.max`, `cgroup.procs`, and `memory.high`. Each one of these represents a setting that you can play with with regard to the cgroup. In this case, we are looking at the root cgroup: all cgroups will be children of this root cgroup. The way you make your own cgroup is by creating a folder inside of the cgroup.

```bash
# creates the cgroup 
mkdir /sys/fs/cgroup/sandbox 
# look at all the files created automatically 
ls /sys/fs/cgroup/sandbox
```

It automatically created a number of files for us.

You want to add our unshared environments into our sandbox. Follow the notes for this section for more on how to.

By default, you will not have all of the controllers within the subtree, so you will need to add some more. Again, check the resource for more info.

`cgroups` are definitely more complicated, but knowing what it is will be super important for getting a better understanding of what is happening under the hood.

Using those three concepts is a container at it's most basic sense. Now you can be a little bit more grateful for what Docker does for you.

## 3 Docker

### 3.1 Docker images

Walks through Docker Hub for searching for containers.

Premade containers are called `images`. In the example run, the following was done:

```bash
# start docker contaier with docker running in it connected to host 
docker daemon docker run -ti -v /var/run/docker.sock:/var/run/docker.sock --privileged --rm --name docker-host docker:26.0.1-cli 

# run stock alpine container 
docker run --rm -dit --name my-alpine alpine:3.19.1 sh 

# export running container's file system 
docker export -o dockercontainer.tar my-alpine 

# make container-root directory, export contents of container into it 
mkdir container-root 
tar xf dockercontainer.tar -C container-root/ 

# make a contained user, mount in name spaces 
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot $PWD/container-root ash 

# this also does chroot for us 
mount -t proc none /proc 
mount -t sysfs none /sys 
mount -t tmpfs none /tmp 

# here's where you'd do all the cgroup rules making with the settings you wanted to 
# we're not going to since we did it all in the last lesson
```

In the above example, we ended up running through the same process of running the container within a "container" that we worked through in our last example. It also demonstrates that you don't need docker to run the contents of a `.tar` file. We can unzip the tar file into the directory that we apply the `unshare` command and mounting the namespaces to then have the ability to run that image.

### 3.2 Docker images with Docker

An example of interactively starting a container: 

```s
# Create a new container and interact with it
docker run --interactive --tty alpine:3.19.1
# Start a container in the background
docker run alpine:3.19.1
# Run a ls command after starting it in the bg 
docker run alpine:3.19.1 ls
# Detach from a container
docker run --detach -it alpine:3.19
# Attach to a container
docker attach <ID or name>
# Kill a container
docker kill <IDs or names of containers>

docker export -o dockercontainer.tar my-alpine
```

> --tty simulates a real terminal to allow more natural interaction with processes running in the container, enables features like coloured output and line editing.

### 3.3 Running Node.js on containers

We can do this with a predefined container:

```bash 
docker run -it --rm node:20
```

Again, if you also passed bash into the end of the command you could run `bash`.

For running on Alpine:

```bash
docker run -it node:20-alpine cat /etc/issue
```

There are a few other options to for JS runtimes:

```bash
docker run -it denoland/deno:centos-1.42.4
docker run -it denoland/deno:centos-1.42.4 deno

docker run -it oven/bun:1.1.3 bun repl 
docker run -it oven/bun:1.1.3 cat /etc/issue
```

A few other interesting runtimes:

```bash
# you don't have to run all of these, just wanted to show you the variety of what's available 
docker run -it ruby:3.3 
docker run -it golang:1.22.2 
docker run -it rust:1.77.2 
docker run -it php:8.2 
docker run -it python:3.12.3
```

### 3.4 Tags & Docker CLI

In this section, it covers that for local development you should run the larger, fully fledged containers for things like Node etc so that you can get the full developer suite, while on production you should only run the bare minimum containers.

For a fun example, he runs `docker run -it bcbcarl/hollywood`.

A couple of other useful commands

| Command | Description | Short Description |
|---------|-------------|-------------------|
| `docker inspect node:20` | Displays detailed information about the node:20 image or container | Inspect image/container |
| `docker pause <name>` | Suspends all processes in the specified container | Pause container |
| `docker unpause <name>` | Resumes all processes in a previously paused container | Resume container |
| `docker kill <name>` | Sends a SIGKILL signal to the main process in the container | Force stop container |
| `docker exec <name> ps aux` | Runs the 'ps aux' command inside the specified running container | Execute command in container |
| `docker history node:20` | Shows the history of the node:20 image, listing the layers | View image history |
| `docker info` | Displays system-wide Docker information | Show Docker system info |
| `docker top <name>` | Shows the running processes in a container | List container processes |
| `docker logs <name>` | Fetches the logs of a container | View container logs |
| `docker restart <name>` | Stops and then starts a container | Restart container |
| `docker search <search>` | Searches for an image on Docker Hub | Search Docker Hub |

## 4 Dockerfiles

## 4.1 Introduction to Dockerfiles

You want Dockerfiles to be "cattle, not pets". It's an imperfect analogy, but it illustrates the design goals for Dockerfiles. They're supposed to be disposable.

A very basic example of a Dockerfile:

```dockerfile
FROM node:20 
CMD ["node", "-e", "console.log(\"hi lol\")"]
```

You can build this with `docker build .` where `.` refers to this current directory (assuming that's where the Dockerfile is).

You'll get a hash back that you can use `docker run <hash>` with.

Once it runs, it will obviously log the command.

With this process, we start with the base image `node:20`, but the important part to know is that all these images can be built on images before that.

Each one of the lines is know as layers and you'll see the layers required being pulled when building for the first time.

If you run the build command with a `-t` or `--tag` then you can build your own image.

## 4.2 Building a Node.js app container

This section walks through a simple example of adding a Node.js server to the container.

```dockerfile
FROM node:20 

COPY index.js /home/code/node/index.js

CMD ["node", "/home/code/node/index.js"]
```

If we run this, will have the app running on port 3000 but for security reasons we need to expose the port.

```bash
# --init means to not care about the ctrl-c cancel
docker run --init --publish 3000:3000
```

The first is the host machine, the second is the port we want to expose from the container.

There is also a command for a Dockerfile that is `EXPOSE`, but it's not very helpful, so most people omit it.

### 4.3 Organising application files

Add a user for more security:

```dockerfile
FROM node:20 

RUN useradd -ms /bin/bash lolcat
USER lolcat

# This is a little redundant
COPY --chown=lolcat index.js /home/lolcat/node/index.js

CMD ["node", "/home/lolcat/node/index.js"]
```

With the node config:

```dockerfile
FROM node:20 

USER node

# This is a little redundant
COPY --chown=node index.js /home/node/code/index.js

CMD ["node", "/home/node/node/index.js"]
```

`WORKDIR` is also useful for setting a specific working directory.

```dockerfile
FROM node:20 

USER node

WORKDIR /home/node/code/

# This is a little redundant
COPY --chown=node index.js .

CMD ["node", "index.js"]
```

### 4.4 Adding dependencies to the app

In this example, Fastify was used for the example server.

```dockerfile
FROM node:20 

USER node

WORKDIR /home/node/code/

# Assume you're copying the entire structure
COPY --chown=node . .

RUN npm ci

CMD ["node", "index.js"]
```

There is an important conversation about not copying `node_modules` etc. since the binaries will be different.

In the example application, they add a `.dockerignore` file to ignore node modules and git.

### 4.5 Layers

This is about when layer become really important. The issue with the way we are doing things right now is knowing which stage within a Dockerfile needs to be re-done.

In our current case, our `COPY` change requires an npm install every time.

To fix it, we can adjust it to be the following:

```dockerfile
FROM node:20 

USER node

WORKDIR /home/node/code/

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node . .

CMD ["node", "index.js"]
```

In the above, it will be so much faster. There is a demo about this after. The aim is that for anything huge that can be cacheable, you should do it above.

## 5 Making Tiny Containers

### 5.1 Smaller containers with Alpine Linux

The advice is not to get too obsessed with it.

We talk about Alpine being used as a distribution where the entire existence is to be as small as possible and is based on BusyBox.

```dockerfile
FROM node:20-alpine

USER node

WORKDIR /home/node/code/

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node . .

CMD ["node", "index.js"]
```

There is a substantial difference in storage savings out of the box. In the example, it's about 900MB smaller than the Debian example (there is also a debian-slim).

The speaker describes Alpine as the "destination container".

### 5.2 Making our own Alpine Node.js container

The example starts from the Alpine base:

```dockerfile
FROM alpine:3.19

RUN apk add --update nodejs npm

# We need to create the user. We use && to keep it within one layer.
RUN addgroup -S node && adduser -S node -G node

USER node

WORKDIR /home/node/code/

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node . .

CMD ["node", "index.js"]
```

This ends up with 81.94MB. The end follows with a warning about caring more about the size than the 140MB from the previous container.

### 5.3 Multistage builds

```dockerfile
# Build step
FROM node:20 as node-builder
RUN mkdir /build
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .

# Production step
FROM alpine:3.19
RUN apk add --update nodejs
# We need to create the user. We use && to keep it within one layer.
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code/
COPY --from=node-builder --chown=node:node /build .
CMD ["node", "index.js"]
```

In this scenario, we managed to remove `npm`, but that's kind of it.

At this stage, we've cut off another 9MB.

There are some interesting things that thy mentioned about using multi-stage for the security.

### 5.4 Distroless

You may not want to use Alpine, but there is a blog post shared about this for Kubernetes https://martinheinz.dev/blog/92. The tl;dr is that `glibc` with `musl`.

The more compelling reason is that there is alternative options.

The four projects to look to here: 
- [Wolfi (an open source project)](https://wolfi.dev/)
- [Red Hat's Universal Base Image Micro](https://catalog.redhat.com/software/base-images)
- [Debian's slim variant](https://hub.docker.com/_/debian)
- [Google's Distroless](https://github.com/GoogleContainerTools/distroless).

An example with Distroless:

```dockerfile
# build stage 
FROM node:20 AS node-builder 
WORKDIR /build COPY package-lock.json package.json ./ 
RUN npm ci 
COPY . . 

# runtime stage 
FROM gcr.io/distroless/nodejs20 
COPY --from=node-builder --chown=node:node /build /app 
WORKDIR /app 
CMD ["index.js"]
```

### 5.6 Static asset project

## 6 Docker features

### 6.1 Docker Scout

This allows you to inspect your container for things like vulnerabilities.

```bash
docker scout quickview <image>

# gives more in-depth information
docker scout cves <image>
```


### 6.2 Bind mounts

At this point, you probably already know what you need to know about containers. The rest of this is mainly just extra features that are nice-to-knows.

Bind mounts help you use files on a local container, for example using local files for writing a Node.js app without having to rebuild it each time.

An example done with the static asset Astro project:

```bash
# from the root directory of your Astro app 
docker run --mount type=bind,source="$(pwd)"/dist,target=/usr/share/nginx/html -p 8080:80 nginx:latest
```

Now if you run it, you can see Nginx is serving it, even though the files are on our local file system.

### 6.3 Volumes

In this case, what happens if you want to share the data for the database so that it's not lost when you delete the container.

In the demonstration, there is a Node.js app that writes and reads from a `data.txt` file. In the example, we consider `data.txt` to be mission critical, and so we don't want to lose it with the ephemeral state that comes with the containers.

```bash
# src name does not matter so much
docker run --rm --env DATA_PATH=/data/num.txt --mount type=volume,src=incrementor-data,target=/data incrementor

# removing the volume if you want to reset later
docker volume rm incrementor-data
```

It also helps for things like sharing data, exporting and importing volume usage.

### 6.4 Dev containers

There is a `.devcontainer` file from the project that is related to this example (see [here](https://github.com/btholt/project-files-for-complete-intro-to-containers-v2/tree/main/dev-containers)).

This is a very Microsoft-y initiative. There are Microsoft dev container files you an start off from but you can also build your own.

There is also a dev container CLI and GitHub Codespaces also has something.

### 6.5 Networking with Docker

Why? Interfacing different containers for different applications.

The code used for this section:

```bash
# create the network 
docker network create --driver=bridge app-net 
# start the mongodb server 
docker run -d --network=app-net -p 27017:27017 --name=db --rm mongo:7
# running the mongo app on the network
# db is the name on the network that is used later
docker run -it --network=app-net --rm mongo:7 mongosh --host db
```

So now, if we create another app on the same network, it can connect to it.

```bash
docker build --tag=my-app-with-mongo . 
docker run -p 8080:8080 --network=app-net --init --env MONGO_CONNECTION_STRING=mongodb://db:27017 my-app-with-mongo
```

## 7 Multi Container Projects

### 7.1 Docker Compose

Described as good for local production.

It's the configuration file that makes life nice.

```yaml
services: 
	api: 
		build: api 
		ports: 
			- "8080:8080" 
		links: 
			- db 
		environment: 
			MONGO_CONNECTION_STRING: mongodb://db:27017 
	db: 
		image: mongo:7 
	web: 
		build: web 
		ports: 
			- "8081:80"
```

There is also a `--scale` command showed here for making n number of running containers for a service.

### 7.3 Kubernetes

I skipped this section since I've done my own courses prior on Kubernetes.

### 7.4 Kompose

This is part of the Cloud Native org stuff.

It helps to make an initial swap from Docker compose to Kubernetes.

```yaml
services:
	api:
	build: api
	ports:
		- "8080:8080"
	links:
		- db
	depends_on:
		- db
	environment:
		MONGO_CONNECTION_STRING: mongodb://db:27017
	labels:
		kompose.service.type: nodeport
		kompose.image-pull-policy: Never
	db:
		image: mongo:7
	ports:
		- "27017:27017"
	web:
		build: web
		links:
			- api
		depends_on:
			- api
		labels:
			kompose.service.type: LoadBalancer
			kompose.service.expose: true
			kompose. image-pull-policy: Never
	ports:
		- "8081:80"
```

### 7.5 Scaling

This part is also demonstrating the Kubernetes scaling.

### 7.6 Docker alternatives

There is a list of the alternatives spoken about here https://containers-v2.holt.courses/lessons/wrap-up/docker-alternatives