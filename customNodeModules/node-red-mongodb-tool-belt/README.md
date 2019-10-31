

# node-red-mongodb-tool-belt
Node Red Tools Module for MongoDB

## Install
This module is private and it's not available online
Drop the node-red-mongodb-tool-belt folder at  /root/.nodered/node_modules/
<pre>go inside the folder  node-red-mongodb-tool-belt  and run npm i</pre>
<pre>After that add the module to your settings.js file:

    functionGlobalContext: {
	…

        mongodbTools:require('node-red-mongodb-tool-belt')

	... 
    },
</pre>

## Usage

This module is an abstraction of the mongodb client and delivers the methods to perform queries to a mongodb from a node-red function node .
