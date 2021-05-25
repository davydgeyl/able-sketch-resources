@import 'system_commands.js'
@import 'version.js'

var logString = ""
var errorLog = ""

function updateFiles(context) {
		
	var rootURLTemplate = "https://github.com/davydgeyl/able-sketch-resources/blob/main/libraries/%@?raw=true"
	
	// Get the Templates and Artboards downloading from url.
	// Get the home folder of the current user
	var home = NSHomeDirectory();

	// Construct the folder path where the script is kept
	var sketchPath = NSString.stringWithFormat("%@%@", home, "/Library/Application\ Support/com.bohemiancoding.sketch3/");
	var templatesPath = sketchPath + "Templates/";
	
	var result = download(NSString.stringWithFormat(rootURLTemplate, "artboards.plist"), sketchPath + "artboards.plist")
	if (result) {
		download(NSString.stringWithFormat(rootURLTemplate, "able_version.txt"), sketchPath + "able_version.txt")
		download(NSString.stringWithFormat(rootURLTemplate, "Able%20Android%20Template.sketch"), templatesPath + "Able\ Android\ Template.sketch")
		download(NSString.stringWithFormat(rootURLTemplate, "Able%20iOS%20Template.sketch"), templatesPath + "Able\ iOS\ Template.sketch")
		download(NSString.stringWithFormat(rootURLTemplate, "Able%20Web%20Template.sketch"), templatesPath + "Able\ Web\ Template.sketch")
	}

	// Get Librares

	// This call crashes Sketch. Comment out for now.
	// updateAbleLibraries()

	// The function gets Able libraries from RSS feed and adds it to Skecth if it hasnt't been added yet.
	var result = getRemoteLibrariesWithRSS()

	if (result) {
		errorLog = errorLog + result
		console.log(result)
	} else {
		logString = logString + "Remote libraries retrieved successfully.\n"
	}

	// Prepare the alert
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("OK");

	// Check if the error log is empty
	if (errorLog == null || errorLog == "") {

		playSuccessSound()

		dialog.setMessageText("Templates and Artboards Updated Successfully");
		//dialog.setInformativeText(versionUpdatedMessage())
		dialog.setInformativeText("Please download the libraries if needed and accept the changes.")

		var infoButton = dialog.addButtonWithTitle("Show Log");
		var modalResult = dialog.runModal()

		if (modalResult == NSAlertSecondButtonReturn) {
			// Display the log if user chose the information button
			var infoDialog = NSAlert.alloc().init();
			infoDialog.setMessageText("Update Logs");

			var testView = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, 800, 600));
			testView.setString(NSString.stringWithString(logString))
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
		playFailSound()
		dialog.setMessageText("Failed to update Able Libraries");
		if (errorLog != null) {
			dialog.setInformativeText(NSString.stringWithString(errorLog));
		}
		if (dialog.runModal() != NSAlertFirstButtonReturn) {
			return;
		}
	}
}

function download(urlString, destination) {
	// console.log("Start downloading from: " + urlString)
	try {
	    var url = NSURL.URLWithString(urlString);
	    var data = NSData.dataWithContentsOfURL(url);
		// console.log("data " + data.length())
		data.writeToFile_atomically(destination, true)
		logString = logString + "Downloaded successfully: " + destination + "\n"
		return true
	} catch(e) {
	    // console.log("Exception: " + e);
		errorLog = errorLog + "Please connect to internet and log into Confluence.\n"
		return false
	}
}

function getRemoteLibrariesWithRSS() {

	var urlTemplate = 'https://github.com/davydgeyl/able-sketch-resources/blob/main/libraries/%fileName?raw=true'
	
	var errorLog = ""
	var androidlibraryURL = urlTemplate.replace('%fileName', 'able_android_library.xml')
	var result = getRemoteLibraryFrom(androidlibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }
	
	var iosLibraryURL = urlTemplate.replace('%fileName', 'able_ios_library.xml')
	result = getRemoteLibraryFrom(iosLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }

	var webLibraryURL = urlTemplate.replace('%fileName', 'able_web_library.xml')
	result = getRemoteLibraryFrom(webLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }

	var foundationLibraryURL = urlTemplate.replace('%fileName', 'able_foundation_library.xml')
	result = getRemoteLibraryFrom(foundationLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }

	var aemWebLibraryURL = urlTemplate.replace('%fileName', 'aem_web_library.xml')
	result = getRemoteLibraryFrom(aemWebLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }

	var tdsCoreLibraryURL = urlTemplate.replace('%fileName', 'tds_core_library.xml')
	result = getRemoteLibraryFrom(tdsCoreLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }

	var tdsAppLibraryURL = urlTemplate.replace('%fileName', 'tds_app_library.xml')
	result = getRemoteLibraryFrom(tdsAppLibraryURL)
	if (result) { errorLog = errorLog + result + ', ' }
	
	return result
}

function getRemoteLibraryFrom(libraryURL) {
	// This function gets a library from the given URL and adds it to Skecth if it hasnt't bee added yet. 
	// So, when run the first time the user should have all Able libraries added.
	// What this call fails to do is to update the library if it has been added before. 
	// So, either user has to press the Download button un the settings or we need to trigger downloading programmatically.
	// Automatic update is done via `updateAbleLibraries()`
	// So, basically this code only works for the firts time, when updateAbleLibraries() works aevry time after.
	var Library = require('sketch/dom').Library
	
	Library.getRemoteLibraryWithRSS(libraryURL, (err, library) => {
	    if (err) {
			console.log("Error: " + libraryURL)
			console.log(error)
	      return err
	    } else {
			console.log("Success: " + libraryURL)
			console.log(library)
	    	return nil
	    }
	  }
	)
}

/**
 * This is a noop--we use it because the native API for downloading library updates requires
 * handlers for progress and completion. We can't just pass in an arrow function, however, because
 * it needs to be globally scoped.
 *
 * The following command creates an NSBlock which can be passed into a native Sketch function as a
 * callback. The first parameter is the name of the function, the second is the number of arguments
 * it expects, and the third is a data object that you're apparently able to access from inside the
 * callback. We don't need these, so we abandon them.
 */
// Source: https://sketchplugins.com/d/796-distributing-and-updating-sketch-libraries/58
function noop() {} // eslint-disable-line no-unused-vars

function didFinish(obj) {
	console.log("Did finish downloading")
}

function didFinish2() {
	console.log("Did finish")
}

function progress(obj) {
	console.log("Progress " + obj)
}


function updateAbleLibraries() {
	// This function will trigger downloading of new versions od libraries programmatically.
	// We have to filter out any third party libraries.
	
	const block = __command.callback_asBlockWithArguments_data_('noop', 0, null);
	var obj = [NSDictionary new];
	const didFinishBlock = __command.callback_asBlockWithArguments_data_('didFinish', 0, obj);
	
	const didFinishBlock2 = __command.callback_asBlockWithArguments_data_('didFinish2', 0, obj);
	
	var obj1 = [NSDictionary new];
	const progressBlock = __command.callback_asBlockWithArguments_data_('progress', 0, obj1);
	
	const librariesController = AppController.sharedInstance().librariesController();
	
	librariesController.remoteLibraries().forEach(library => {
		var libraryName = String(library.name());
		if (libraryName.includes(" Able ") || libraryName.startsWith("AEM") || libraryName.startsWith("TDS")) {
			console.log("Found library " + libraryName);
			console.log(library);
			librariesController.startDownloadingAssetLibrary_progressHandler_downloadCompletionHandler_completionHandler_(library, progressBlock, didFinishBlock, didFinishBlock2);
		}
	});
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