# Omni-chat server API

[![Greenkeeper badge](https://badges.greenkeeper.io/ocilo/omni-chat-server-api.svg)](https://greenkeeper.io/)

## Description

Express middleware to handle the omni-chat API.

## Install

````bash
npm install
gulp install.noNpm
gulp build.node
````

## API ##

### `GET /` ###

### `GET /accounts` ###

### `POST /accounts` ###

Parameters:

| Name        | Type      | Description                                      |
| ----------- | --------- |------------------------------------------------- |
| login       | string    | 3-32 characters, will be normalized to lowercase |
| password    | string    | 8+ characters                                    |

Example:
````json
{
    "login": "Demurgos",
    "password": "p4ssw0rd"
}
````

Response:
````json
{
    "_id": "570fcc0f3158b8b00549505a",
    "login": "demurgos"
}
````

### `GET /accounts/:id` ###
