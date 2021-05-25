/**
 * iOS code snippet
 *
 * @param {string} patternType - Variants: "Text", "SymbolInstance"
 * @param {array} patternNameComponents - array of pattern name componets cleaned from redundant symbols
 * @param {object} overrides - contains override names as keys and override values as values.
 * The keys are suffixed with the type of the override.
 * Example: Label_stringValue and Label_textStyle will point to the string value and the syle of the label respectively.
 *
 * Example 1:
 *   Text Style: LG./01. HeadingDisplay/4. Inverted-Center
 *   patternType = "Text"
 *   patternNameComponents = ["HeadingDisplay", "Inverted", "Center"]
 * Example 2:
 *   Action Button: Action Button/1. High Emphasis
 *   patternType = "SymbolInstance"
 *   patternNameComponents = ["ActionButton", "HighEmphasis"]
 * Example 3:
 *   Icon Button: Icon Button/Default.
 *   patternType = "SymbolInstance"
 *   patternNameComponents = ["IconButton"]
 *   overrideValue = { Icon_symbolID: "iconCoverageMap24", Label_stringValue: "Lorem Ipsum" }
 *
 * @returns String code snippet
 */

function iOSCodeSnippet(patternType, patternNameComponents, overrides) {
	
	// Text Style
	const textStyleSnippet = 'StyledLabel(.%1)';
	// %1 - headingDisplay, etc.
	
	// Action Button
	const actionButtonSnippet = 'ActionButton(.%1)';
	// %1 - .highEmphasis, .mediumEmphasis, .lowEmphasis
	
	// Icons
	const iconSnippet = 'UIImage.%1';
	// %1 - iconBankAccount24, etc.

	// Confirmation Dialog Default

	//
		
	// ContainerSurface
	const containerSurfaceSnippet = 'view.apply(containerSurfaceStyle: %1');
	//  .surfaceTop) //surfaceFlat, surfaceFlatBlue, surfaceFlatGrey, surfaceSlight, surfaceLow, surfaceMid, surfaceHigh, surfaceTop, surfaceFlat
	const surfaceStyleSnippet = ".surface%1"
		
	// Divider
	const dividerSnippet = 'Divider(type: .%1)';
	// %1 - dividerEmphasis, dividerSubtle
	
	// Dialogs
	const dialogConfirmation = "presentConfirmationDialog(buttonText: \"Confirmation button text\"%1) {\n\
	// Confirmation code goes here\n\
}"
	
	const descriptionParameter = ", message: \"Message\""
	
	const dialogConfirmationDestructive = "presentConfirmationDialogDestructive(buttonText: \"Confirmation button text\"%1) {\n\
	// Confirmation code goes here\n\
}"
	
	const dialogCritical = "presentCriticalDialog(title: \"Title\"%1) {\n\
	// Remove this closure if no code is needed on user action.\n\
}"
	
	const dialogCriticalDecision = "presentCriticalDialogDecision(title: \"Title\"%1, preferredButtonText: \"Preferred button text\") {\n\
	// Prefered action code goes here. Use another overloaded method to access secondaryButtonText adn secondaryActionHandler parameters.\n\
}"

	// SwitchRow
	// //initialise:Var
	const switchRowSnippet = 'SwitchRow()';
	
	// SingleSelectRow
	const singleSelectRowSnippet = 'SingleSelectRow()'

	// DrillDownRow
	const drillDownRowSnippet = 'DrillDownRow(itemLabelText: text, iconImage: image) {}'

	// IconButton
	const iconButtonSnippet = 'IconButton(icon: .%1, accessibilityLabel: "%2"%3)​'
	const iconButtonDestructiveStyleSnippet = ', style: .destructive'
	// %1 - iconProfile24, etc., %2 - icon name accessibility label, %3 - destructive style
	
	// InteractiveSurface
	const interactiveSurfaceSnippet = '​​​InteractiveSurface(style: %1)'
	 // %1: .surfaceFlat, surfaceSlight, surfaceLow, surfaceMid, surfaceHigh


	// MultiSelectRow
	const multiSelectRowSnippet = 'MultiSelectRow(itemLabelText: "%1"%2) {}'
	// %1 - text label
	// %2 - icon snippet or null
	const multiSelectIconSnippet = ', iconImage: .%1'
	// %1 - icon name
	
	// Text Area
	const textAreaSnippet = 'TextArea()'
	
	// Text Field
	const textFieldSnippet = 'TextField(helper: %1())'
	// %1 - text input helper name
		
	var groupName = patternNameComponents[0]
	var patternSubname = patternNameComponents[1]
	var variation = patternNameComponents[2]
		
	print(patternNameComponents)
	print(overrides)
	
	if (!patternSubname) {
		patternSubname = ""
	}
  
	switch (patternType) {
		
	case "Text":
		var style = pascalToCamelCase(groupName) + patternSubname
		return textStyleSnippet.replace("%1", style)

	case "SymbolInstance":
		switch (groupName) {
		case "ActionButton":
			return actionButtonSnippet.replace("%1", pascalToCamelCase(patternSubname))
			
		case "Divider":
			return dividerSnippet.replace("%1", pascalToCamelCase(groupName) + patternSubname)
		
		case "Dialog":
			var description = overrides["Description_stringValue"]
			var result = ""
			
			switch (patternSubname) {
			case "Confirmation":
				result = dialogConfirmation
				break
			case "ConfirmationDestructive":
				result =  dialogConfirmationDestructive
				break
			case "Critical":
				result =  dialogCritical
				break
			case "CriticalDecision":
				result = dialogCriticalDecision
				break
			}
			
			if (description) {
				result = result.replace("%1", descriptionParameter)
			} else {
				result = result.replace("%1", "")
			}
			return result
			
		case "DrillDown":
			return drillDownRowSnippet
			
		case "icon": 
			return iconSnippet.replace("%1", groupName + patternSubname + variation)
						
		case "IconButton":
			var snippet = iconButtonSnippet
			if (patternSubname) {
				snippet = snippet.replace("%3", iconButtonDestructiveStyleSnippet)
			} else {
				snippet = snippet.replace("%3", '')
			}
			
			var iconName = overrides["Icon_symbolID"]
			var iconEssentialName = iconName.substring(4) // Remove 'icon' prefix
			iconEssentialName = iconEssentialName.substring(0, iconEssentialName.length - 2) // remove size variant '24' or '36' at the end
			if (iconName) {
				snippet = snippet.replace("%1", iconName)
				snippet = snippet.replace("%2", iconEssentialName)
			}
			return snippet
			
		case "ContainerSurface":
			var surfaceStyle = surfaceStyleSnippet.replace("%1", patternSubname)
			return containerSurfaceSnippet.replace("%1", surfaceStyle)
			
		case "InteractiveSurface":
			var surfaceStyle = surfaceStyleSnippet.replace("%1", patternSubname)
			return interactiveSurfaceSnippet.replace("%1", surfaceStyle)

		case "MultiSelect":
		case "MultiSelectRow":
			var snippet = multiSelectRowSnippet
			var iconName = overrides["Icon_symbolID"]
			var textLabel = overrides["MultiSelectLabel_stringValue"]
			if (textLabel == null) {
				textLabel = "text"
			}
			snippet = snippet.replace("%1", textLabel)
			if (iconName) {
				snippet = snippet.replace("%2", multiSelectIconSnippet.replace("%1", iconName))
			} else {
				snippet = snippet.replace("%2", '')
			}
			return snippet
			
		case "SingleSelect":
		case "SingleSelectRow":
			return singleSelectRowSnippet
			
		case "Switch":
		case "SwitchRow":
			return switchRowSnippet
			
		case "TextArea":
			return textAreaSnippet
			
		case "TextField":
			var inputHelperName = overrides["InputHelper_symbolID"]
			print(inputHelperName)
			return textFieldSnippet.replace("%1", inputHelperName)
				
		default:
			return "n/a"
		}		
	default:
		return "Undefined"
	}
}

function camelToSnakeCase(key) {
   var result = key.replace( /([A-Z])/g, " $1" );
   return result.split(' ').join('_').toLowerCase();
}

function pascalToCamelCase(key) {
	var result = key;
	var firstLetter = result.substring(0, 1);
	if (firstLetter) {
		result = firstLetter.toLowerCase() + result.substring(1);
	}
	return result;
}
