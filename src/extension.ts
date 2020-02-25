// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as fs from 'fs';
import * as path from "path";
import { QuickPickItem } from 'vscode';


interface Args {
    directories: string | string[],
    extensions: string | string[]
}

interface FileOptionItem extends QuickPickItem {
    fullpath: string
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('vspickfile.pickFile', async (args: Args) : Promise<string|undefined> => {
        // The code you place here will be executed every time your command is executed

        let dirs = ([] as string[]).concat(args.directories);

        let fileExtensions = ([] as string[]).concat(args.extensions);

        let files = [] as FileOptionItem[];
        let re = new RegExp(`^.*\\.(${fileExtensions.join('|')})$`, 'i');

        dirs.forEach(element => {
            let directory = element;
            if (!path.isAbsolute(directory)) {
                directory = path.join(vscode.workspace.rootPath ?? "", directory);
            }

            fs.readdirSync(directory).forEach(file => {
                if (file.match(re)) {
                    files.push({
                        label: file,
                        description: element,
                        fullpath: path.join(directory!, file)
                    } as FileOptionItem);
                }
            });
        });

        // sort the files
        files.sort((a, b) => {
            let aLower = a.label.toLocaleLowerCase();
            let bLower = b.label.toLocaleLowerCase();

            if (aLower > bLower) {
                return 1;
            }

            if (bLower > aLower) {
                return -1;
            }

            return 0;
        });

        // Display a message box to the user
        var fileItem = await vscode.window.showQuickPick(files).then(item => {
            // vscode.window.showInformationMessage(item?.fullpath ?? "No file chosen!");
            return item;
        });

        return fileItem?.fullpath;
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
