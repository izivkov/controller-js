# OpenBot Nodejs Controller

Ivo Zikkov
izivkov@gmail.com
Dec 9, 2021

## Nomenclature

Here are some terms we will be using in this document:

```
● Robot, bot - this is the Android software runningon the phone on theOpenBotvehicle.
● Server - the node server, the server part of thisproject
● Client, UI - this is the client part of this project.It runs in the browser.
```
## Introduction

This is aNode.jsbased project acting as a controllerfor theOpenBotvehicle. The software
comprises two parts - a server and a client. The server is a Node.js application running on a
computer on the same network as the Robot. The client part runs in the browser. Here is a
diagram

## Getting Started

You can run this software on a PC or a RaspberryPi-type device supporting Node.js
environment. First make sure you have installedNode.js,version 10 or newer. Check the
version:

```
node –version
```
The software is located in the “/client-js” directory of the OpenBot project. After checking out the
code fromgithub, change into this directory and runthe following commands:

```
npm run prestart
npm install
npm start
```

The last command will start the server. If you like to run the server without a terminal in the
background, on Linux/MacOS you can run:

```
nohup npm start
```
Point your browser to the server’s IP address at port 8081, for example (http://localhost:8081,
orhttp://192.168.1.100:8081). Note you can accessthe server from a different computer, but the
Robot, server and browser PC need to be on the same network. In the future we can add the
ability to access the server remotely.

## How it Works


