// Lauch shell with arguments
// - args must be an array, construct with ["arg1," "arg2"]
function runShell(args, currentDirectoryPath = "") {
	return runCommand("/bin/sh", args, currentDirectoryPath)
}

// Lauch a system command 
// - launchPath must be the full path to the executable, for example "/bin/sh"
// - args must be an array, construct with ["arg1," "arg2"]
function runCommand(launchPath, args, currentDirectoryPath = "") {
	// Allocate the task to run the script
	var task = NSTask.alloc().init();
    task.setLaunchPath_(launchPath);
	
	if (currentDirectoryPath.length > 0 ){
		task.setCurrentDirectoryPath_(currentDirectoryPath)
	}
    task.arguments = args;
	task.launch();	
	task.waitUntilExit();
	return (task.terminationStatus() == 0)
}
