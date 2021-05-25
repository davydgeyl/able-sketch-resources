function checkVersion(context) {
	showDialogWith(versionMessage())
}

function currentVersion() {
	// Get the home folder of the current user
	var home = NSHomeDirectory()
		
	// Construct the file path to the version number
    var versionFilePath = NSString.stringWithFormat("%@%@", home, "/Library/Application\ Support/com.bohemiancoding.sketch3/able_version.txt")
	
	var versionString = NSString.stringWithContentsOfFile(versionFilePath)
	return versionString
}

function versionMessage() {
	return 'Able libraries Version ' + currentVersion()
}

function versionUpdatedMessage() {
    return 'Able libraries have been updated to Version ' + currentVersion() + '.'
}

function showDialogWith(versionMessage) {
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("Dismiss");
	dialog.setMessageText(versionMessage)
	dialog.runModal();
}
