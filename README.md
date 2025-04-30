# VenmOwned

Command line interface for sending mass transactions through the Venmo API.

### Motivation

This project was created as an opportunity to build a command line interface and become more familiar with Venmo's public APIs.

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

### Security

#### Token Storage
- Authentication tokens are stored locally on your machine
- Tokens are encrypted using AES-256-GCM encryption
- The encryption key is derived from your machine's hostname
- Tokens are stored in `~/.venmowned/token` with restricted permissions (600)
- The token directory is created with restricted permissions (700)

#### Security Implications
- This tool requires access to your Venmo authentication token
- The token provides full access to your Venmo account
- Use this tool at your own risk
- Only use tokens from accounts you own
- Be aware of Venmo's terms of service regarding API usage
- Consider the potential impact of mass transactions on your account

#### Disclaimer
This tool is provided for educational purposes only. The author is not responsible for any misuse of the tool or any consequences resulting from its use. Users are solely responsible for ensuring their use of this tool complies with Venmo's terms of service and applicable laws.

### Built With

* [NodeJS](https://nodejs.org/) - JavaScript Run-Time Environment

### Author

Mike Dunn is a senior Front-end Developer with 5+ years of professional experience. Seeking to help deliver high quality applications through excellent coding practices and technical leadership. Specializing in semantics, optimization and system design.
