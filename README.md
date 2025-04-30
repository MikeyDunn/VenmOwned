# VenmOwned

Command line interface for sending mass transactions through the Venmo API.

### Motivation

This project was created as an opportunity to build a command line interface and become more familiar with Venmo's public APIs.

### Author

Mike Dunn is a senior Front-end Developer with 5+ years of professional experience. Seeking to help deliver high quality applications through excellent coding practices and technical leadership. Specializing in semantics, optimization and system design.

### Application Structure

`/bin` - Bin file to provide a system path command

`/commands` - Provided CLI commands

`/dictionaries` - Importable arrays of strings for use in Venmo's note section

`/services` - Common services for commands

`/index.js` - Entry point for NodeJS

### Getting Started

##### NPM Setup

[Node.js](https://nodejs.org) is a prerequisite.

Commands to install and run application:

```
$ git clone git@github.com:MikeyDunn/VenmOwned.git
$ cd VenmOwned
$ npm install
$ npm link
```

### Commands

`$ vo init` - provides prompt for storing your venmo authentication token

`$ vo friends` - return a list of friends with IDs

`$ vo friends --find=string` - filter and return friends list based on string

`$ vo own` - provides prompt for passing user ID and transaction loops to send

### Retrieving Token

1. Login to venmo.com
2. Open network dev console
3. Find "https://api.venmo.com/graphql" request
4. Find  request header "authorization"
5. Copy "xxxx" token from "Bearer xxxx" value

### Built With

* [NodeJS](https://nodejs.org/) - JavaScript Run-Time Environment
