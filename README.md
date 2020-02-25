# VS PickFile

A simple VS code extension which helps you pick files in launch configurations or tasks.

## Examples
In this example, we use the extension to run a JavaScript file in our work space.

    // launch.json
    {
	    "version": "0.2.0",
	    "inputs": [
		    {
			    "id": "pickJSProg",
			    "type": "command",
			    "command": "vspickfile.pickFile",
			    "args": {
				    "directories": "", // defaults to workpace folder
				    "extensions": "js",
			    }
		    }
	    ],
	    "configurations": [
		    {
			    "type": "node",
			    "request": "launch",
			    "name": "Choose JS Program",
			    "program": "${input:pickJSProg}"
		    }
	    ]
    }

In this example, we run from choosing a JavaScript file in our work space.

    // launch.json
    {
	    "version": "0.2.0",
	    "inputs": [
		    {
			    "id": "pickFile",
			    "type": "command",
			    "command": "vspickfile.pickFile",
			    "args": {
				    "directories": "", // defaults to workpace folder
				    "extensions": "json"
			    }
		    }
	    ],
	    "configurations": [
		    {
			    "type": "node",
			    "request": "launch",
			    "name": "Choose file arguments",
			    "program": "${workspaceFolder}/prog2.js",
			    "args": [
				    "${input:pickFile}"
			    ]
		    }
	    ]
    }
