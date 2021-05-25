@import 'system_commands.js'

// Clean the working copy
function cleanWorkingCopy(context) {
	var home = NSHomeDirectory();	
	// Construct the folder path where the script is kept	
    var scriptFolderPath = NSString.stringWithFormat("%@%@", home, "/Projects/able-design/scripts/");
	var workingCopyStatusScriptPath = scriptFolderPath + "workingCopyStatus.sh";
	runShell([workingCopyStatusScriptPath], scriptFolderPath)
	
	// Prepare the dialogue
	// var dialog = NSAlert.alloc().init();
	// dialog.addButtonWithTitle("OK");
	
	var infoDialog = NSAlert.alloc().init();
	infoDialog.addButtonWithTitle("Cancel"); 
	infoDialog.addButtonWithTitle("Reset Able Libraries");
	
	// Combine the path to the error log file
	var statusLogPath = NSString.stringWithFormat("%@%@", home, "/Library/Logs/AbleGitStatus.log")
	var statusLog = NSString.stringWithContentsOfFile(statusLogPath)
	
	// Check the status log
	if (statusLog == null || statusLog.compare("") == NSOrderedSame) {
		infoDialog.setMessageText("Reset Able Libraries");
        infoDialog.setInformativeText("This will delete any changes you made to the Able libraries and reset back to the released version.\n\nYou can't undo this action.")
	}
	else {
		infoDialog.setMessageText("Changes Detected in Your Able Libraries");
		infoDialog.setInformativeText("All changes listed made to the Able libraries are listed below.\n\nPlease review these files carefully. It's recommended to copy and save the files into a safe location before resetting Able libraries.\n\nReset libraries operation is irreversible and can't be undone.");
		
		var textView = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, 600, 400));
		textView.setString(statusLog)
		// Add custom view to dialog
		infoDialog.setAccessoryView(textView);
	}
	
	// Present the dialogue
	var modalResult = infoDialog.runModal()
	if (modalResult == NSAlertFirstButtonReturn) {
		// First button on the right - Cancel
		return 0
	} else if (modalResult == NSAlertSecondButtonReturn) {
		// Second button from the right - Reset Changes
		// Proceed with resetting
		var scriptPath = scriptFolderPath + "cleanWorkingCopy.sh";
		runShell([scriptPath], scriptFolderPath)
		// Run the working copy status script again
		runShell([workingCopyStatusScriptPath], scriptFolderPath)
		
		var statusLogAfterCleaning = NSString.stringWithContentsOfFile(statusLogPath)

		// Prepare the alert
		var dialog = NSAlert.alloc().init();
		dialog.addButtonWithTitle("Dismiss");

		// // Check the status log
		if (statusLogAfterCleaning == null || statusLogAfterCleaning.compare("") == NSOrderedSame) {
			dialog.setMessageText("Reset Successfully");
			dialog.setInformativeText("Your Able libraries has be reset back to the released version.");
			dialog.runModal()
			return 0
		}
		else {
			dialog.setMessageText("Something has gone wrong");
			dialog.setInformativeText("Please try to clean the working copy again, but review the changed files carefully. If the error keeps coming back contact Able team.");
			dialog.runModal()
			return 0
		}
	}
}

