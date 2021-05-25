@import 'system_commands.js'
@import 'version.js'

function updateRepo(context) {
	
	// Get the home folder of the current user
	var home = NSHomeDirectory();
		
	// Construct the folder path where the script is kept	
    var scriptFolderPath = NSString.stringWithFormat("%@%@", home, "/Projects/able-design/scripts/");
	var scriptPath = scriptFolderPath + "updateWithLog.sh";
	
	// Run the script
	runShell([scriptPath], scriptFolderPath)
	
	// Combine the path to the log file
	var logPath = NSString.stringWithFormat("%@%@", home, "/Library/Logs/AbleSketchPlugin.log")
	var log = NSString.stringWithContentsOfFile(logPath)
	
	// Combine the path to the error log file
	var errorLogPath = NSString.stringWithFormat("%@%@", home, "/Library/Logs/AbleSketchPluginError.log")
	var errorLog = NSString.stringWithContentsOfFile(errorLogPath)
	
	// Prepare the alert
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("OK");
	
	// Check if the error log is empty
	if (errorLog == null || errorLog.compare("") == NSOrderedSame) {

        addLibrariesToSketch();
        addTDSLibrariesToSketch();

		dialog.setMessageText("Libraries Updated Successfully");
		dialog.setInformativeText(versionUpdatedMessage())
		
		var infoButton = dialog.addButtonWithTitle("Show Log");
		var modalResult = dialog.runModal()
		
		if (modalResult == NSAlertSecondButtonReturn) {
			// Display the log if user chose the information button
			var infoDialog = NSAlert.alloc().init();
			infoDialog.setMessageText("Update Logs");
			
			var testView = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, 800, 600));
			testView.setString(log)
			// Add custom view to dialog
			infoDialog.setAccessoryView(testView);

			var button = dialog.addButtonWithTitle("OK");
			if (infoDialog.runModal() != NSAlertFirstButtonReturn) {
				return;
			}
			return;
		}
	}
	else {
		dialog.setMessageText("Able Libraries Update Failed");
		if (errorLog != null) {
			dialog.setInformativeText(errorLog);
		}
		if (dialog.runModal() != NSAlertFirstButtonReturn) {
			return;
		}
	}
}

// Add the `Able sketch library` to user's sketch library in System Preferences
function addLibrariesToSketch() {
	var libraryFolder = pathForFolder("sketch/libraries/");
	addLibrariesFromFolderToSketch(libraryFolder)
}

// Add the `Able sketch library` to user's sketch library in System Preferences
function addTDSLibrariesToSketch() {
	var libraryFolder = pathForFolder("sketch/tds_libraries/");
	addLibrariesFromFolderToSketch(libraryFolder)
}

function addLibrariesFromFolderToSketch(libraryFolder) {
    // Retrieving files with the given folder path
    log("Checking for Able libraries folder...")
    var sketchFiles = sketchFilesInFolder(libraryFolder)

    if (sketchFiles.length > 0) {
        for(var i=0; i<sketchFiles.length; i++) {
            log(NSString.stringWithFormat("Adding %@ of %@ library...", String(i+1), String(sketchFiles.length)))
            addAssetToLibraryWithFilePath(sketchFiles[i])
        }
        playSuccessSound()
    }
}

function sketchFilesInFolder(folderPath) {
    var files = filesInFolder(folderPath)
    var sketchFiles = NSMutableArray.new()
    if (files.length > 0) {
        // Files found
        log(files.length + " files found in 📂" + folderPath)

        // Check for `sketch` files, ignores other files.
        var libraries = NSMutableArray.new()
        for (var i=0; i<files.length; i++) {
            if (files[i].containsString(".sketch")) {
                libraries.addObject(files[i])
            }
        }

        // List out all sketch files
        if (libraries.length > 0) {
            log("Found " + libraries.length + " sketch libraries: ")
            for(var i=0; i<libraries.length; i++) {
                log("💎 " + libraries[i] + "")
                var filePath = folderPath + libraries[i]
                sketchFiles.addObject(filePath)
            }
            return sketchFiles
        } else {
            log("No sketch libraries found.")
        }

    } else if (files.length == 0) {
        log("No files in '" + folderPath + "'")

    } else {
        // Folder doesnt exist
        log("Failed finding 📂" + folderPath + " please check path again.")
    }

    return sketchFiles
}

function pathForFolder(folderPath) {
    var home = NSHomeDirectory();
    return NSString.stringWithFormat("%@%@%@", home, "/Projects/able-design/", folderPath)
}

function addAssetToLibraryWithFilePath(path) {
    var url = NSURL.fileURLWithPath(path);
    var libraryController = AppController.sharedInstance().librariesController();
    libraryController.addAssetLibraryAtURL(url);
    log("✅ Library added successfully")
}

/// Returns an array of files with the given folder path.
function filesInFolder(folderPath) {
    log("Locating 📂" + folderPath)
    var folderExist = NSFileManager.defaultManager().fileExistsAtPath_isDirectory(folderPath, nil)
    if (folderExist) {
        var files = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(folderPath, nil)
        return files
    } else {
        log("❌ Folder doesn't exist.")
        return -1
    }
}

/// Plays a sound to indicate an operation is successful.
function playSuccessSound() {

    // Use the system `Installer Success` sound file
    // (This file should be here
    var soundPath = "/System/Library/Components/CoreAudio.component/Contents/SharedSupport/SystemSounds/system/burn complete.aif"
    if(NSFileManager.defaultManager().fileExistsAtPath(soundPath)) {
        var sound = NSSound.alloc().initWithContentsOfFile_byReference(soundPath,true);
        sound.play();
        return;
    }

    // If not found, use the default system Blow sound
    var sound = NSSound.soundNamed("Blow");
    sound.play();
}

/// Plays a sound to indicate an operation has failed.
function playFailSound() {
    var sound = NSSound.soundNamed("Funk");
    sound.play();
}

/// Logs messages related to Able Plugin.
function log(message) {
    print("Able " + message)
}
