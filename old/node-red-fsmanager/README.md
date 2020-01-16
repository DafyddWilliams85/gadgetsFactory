The file system manager is a node-red custom node to handle most of the file system operations:

- This node is not on a npm repo so install the node by putting the folder node-red-fsmanager inside the root of your node-red installation at  .nodered/node_modules/
- Then go inside the node-red-fsmanager folder and run npm I to install the module.
- Restart node-red

How to use the node:

This node expects the a msg.payload that will contain an object the necessary data to perform a file system operation and for every call the data described below is mandatory:

!!! IMPORTANTE  -  in order to keep your file system safe guarded it’s important to understand the need and importance of the key "fileSystemPath".  The  fileSystemPath is were do you want to establish the root path for your file manager node, so that this way you can target a root path that is not dangerous to your server.

For the sake of example of this manual will going to set root of the file system to the user /home folder
"fileSystemPath" : "/home"

The inbound msg should be formated like the examples below: msg containing:
List from the storage root folder
{"fileSystemPath" : "/home","fsop":"listAll"} 
	this will list the contents of the entire file system assuming that root is /home

List the selected folder from the listhPath relative to the fileSystemPath
{"fileSystemPath" : "/home","fsop":"listDir", "listPath":"path/to/list"}
	this will list the contents of a specific folder assuming that root is /home, so in the case of this 	example you’ll be listing the contents of /home/path/to/list.

Create a folder
{"fileSystemPath" : "/home","fsop":"createDir", "dirPath":"path/to/newfolder"}
	this will create a  folder assuming that root is /home, so in the case of this example you’ll be  	creating the folder newfolder  at  /home/path/to/newfolder.

Remove an object
{"fileSystemPath" : "/home","fsop":"removeObject", "removePath":"path/to/object"}
	this will remove a  folder or a file assuming that root is /home, so in the case of this example 	you’ll be removing the folder or file  called object  at  /home/path/to/object.

Rename an object
{"fileSystemPath" : "/home","fsop":"renameObject", "renameFrom":"path/to/object", "renameTo":"object-new-name"}
     this will rename a  folder or a file assuming that root is /home, so in the case of this example y	ou’ll be renaming the folder or file called object  at path/to/object to  object-new-name, so in this 	case the result would be a file or folder called  object-new-name at /home/path/to/ object- new-	name.

Move an object
{"fileSystemPath" : "/home","fsop":"moveObject", "moveFrom":"path/to/object", "moveTo":"new-path/to/object"}
	this will move a  folder or a file assuming that root is /home, so in the case of this example 	you’ll be moving the folder or file called object at path/to/object to new-path/to/object, so in         	this case the result would be that the file or folder called object at /home/path/to/object would 	be moved to /home/new-path/to/object.

Copy an object
{"fileSystemPath" : "/home","fsop":"copyObject", "copyFrom":"path/to/object", "copyTo":"new-path/to/object"}
	this will copy a  folder or a file assuming that root is /home, so in the case of this example 	you’ll be copying the folder or file called object  at path/to/object to new-path/to/object, so in         	this case the result would be that the file or folder called object at /home/path/to/object would 	be copied to /home/new-path/to/object.

Read a file
{"fileSystemPath" : "/home","fsop":"readFile", "filePath":"path/to/file"}
	this will read the contents of  a  file assuming that root is /home, so in the case of this example 	you’ll be  reading the contents of the file at  /home/path/to/file.

Write to a file
{"fileSystemPath" : "/home","fsop":"writeFile", "filePath":"path/to/file", "fileData":"hello world!"}
	this will write the content to  a  file assuming that root is /home, so in the case of this example 	you’ll be  writing the text "hello world!" to the file at  /home/path/to/file.




How to use the examples:
- drag and drop the  fs-test-folders at the root you have choose to your file system, in the case of our example we have choosen /home.
- Import the flows into node red and run trough them.
Please refer to the example-flow.json and use the fs-test-folders folder at the node-red-fsmanager folder for the examples.
KR, Bruno