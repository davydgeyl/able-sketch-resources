/**
 * Android code snippet
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

function androidCodeSnippet(patternType, patternNameComponents, overrides) {
	
const actionButtonSnippet = '<com.telstra.designsystem.buttons.ActionButton\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    android:text="@string/high_emphasis"\n\
    app:actionButtonType="%1" />'
// actionButtonType = HighEmphasis | MediumEmphasis | LowEmphasis | Destructive

const textFieldSnippet = '<com.telstra.designsystem.textfields.TextField\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    app:inputHelperType="%1" />'
// inputHelperType = input helper name

const iconButton = '<com.telstra.designsystem.buttons.IconButton\n\
    android:layout_width="wrap_content"\n\
    android:layout_height="wrap_content"\n\
    android:contentDescription="Delete"\n\
    android:src="@drawable/%iconName"\n\
    app:iconButtonType="%1" />'
//iconButtonType = Default | Destructive '


// Surfaces -
// ContainerSurfaceFlatBlue-
// @style/ContainerSurfaceFlatBlue
// InteractiveSurfaceSlight
// @style/InteractiveSurfaceSlight
const surfaceStyle = '@style/%1'


// Divider -
// @style/DividerEmphasis | @style/DividerSubtle
const dividerStyle = '@style/%1'
	
const dialogConfirmation = "Dialogs.prepareConfirmation(title%1, actionText).show(parentFragmentManager, Dialogs.TAG)"
const descriptionParameter = ", description"
	
const dialogConfirmationDestructive = "Dialogs.prepareConfirmationDestructive(title%1, actionText).show(parentFragmentManager, Dialogs.TAG)"
	
const dialogCritical = "Dialogs.prepareCritical(title%1).show(parentFragmentManager, Dialogs.TAG)"
	
const dialogCriticalDecision = "Dialogs.prepareCriticalDecision(title%1, preferredActionText, secondaryActionText)\n\
    .setDialogClickListener(object : Dialogs.DialogClickListener {\n\
        override fun onAction() {\n\
            // Preferred action implementation goes here\n\
        }\n\
        override fun onCancel() {\n\
            // Secondary action implementation goes here\n\
        }\n\
    }).show(parentFragmentManager, Dialogs.TAG)"

// DrillDownRow -

const drillDownRow = '<com.telstra.designsystem.patterns.DrillDownRow\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    android:text="Text Goes Here"\n\
    app:drillDownIcon="@drawable/icon_here(icon is optional)" />'

// MultiSelectRow

const multiSelectRow = '<com.telstra.designsystem.selection.controls.MultiSelectRow\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    android:text="Text Goes Here" />'

// Single Select Row 

const singleSelectRow = '<com.telstra.designsystem.selection.controls.SingleSelectRow\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    android:text="Text Goes Here" />'

// Switch Row

const switchRow = '<com.telstra.designsystem.selection.controls.SwitchRow\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    android:text="Text Goes Here" />'

// Text Area -

const textArea = '<com.telstra.designsystem.textfields.TextArea\n\
    android:id="@+id/ta1"\n\
    android:layout_width="match_parent"\n\
    android:layout_height="wrap_content"\n\
    app:textAreaHelpText="Help Text Goes Here"\n\
    app:textAreaInputLength="100"\n\
    app:textAreaLabel="Label Here" />'
	
  
	switch (patternType) {

	case "Text":

	case "SymbolInstance":
		var groupName = patternNameComponents[0]
		var patternSubname = patternNameComponents[1]
		switch (groupName) {
		case "ActionButton":
			return actionButtonSnippet.replace("%1", patternSubname)
			
		case "Divider":
			return dividerStyle.replace("%1", groupName + patternSubname)
			
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
			return drillDownRow
						
		case "IconButton":
			var snippet = iconButton
			if (patternSubname == null) {
				patternSubname = "Default"
			}
			
			var iconName = overrides["Icon_symbolID"]
			if (iconName) {
				iconName = camelToSnakeCase(iconName)
				snippet = snippet.replace("%iconName", iconName)
			}
			snippet = snippet.replace("%1", patternSubname)
			return snippet
			
		case "ContainerSurface":
		case "InteractiveSurface":
			return surfaceStyle.replace("%1", groupName + patternSubname)

		case "MultiSelect":
		case "MultiSelectRow":
			return multiSelectRow
			
		case "SingleSelect":
		case "SingleSelectRow":
			return singleSelectRow
			
		case "Switch":
		case "SwitchRow":
			return switchRow
			
		case "TextArea":
			return textArea
			
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


// Pattern names
//
// Interactive Surfaces
// - Slight: ["InteractiveSurface", "Slight"]
// - Low: ["InteractiveSurface", "Low"]
// - Mid: ["InteractiveSurface", "Mid"]
// - High: ["InteractiveSurface", "High"]
//
// Text Field: ["TextField"]
//
// Icons
// - Sized 24 example: ["icon", "CoverageMap", "24"]
// - Sized 32 example: ["icon", "CoverageMap", "32"]
//
// Text Styles
// - with all two variations: ["HeadingDisplay", "Inverted", "Center"]
// - with one variation: ["HeadingDisplay", "Inverted"]
// - with one variation: ["HeadingDisplay", "Center"]
// - with no variations: ["HeadingA"]

// Overides examples:
// Action button high emphasis
// { State_symbolID: 'ActionButtonHighEmphasis16Normal',
//   Label_stringValue: 'Normal' }

// Action button medum emphasis
// { State_symbolID: 'ActionButtonMediumEmphasis16Normal',
//   Label_stringValue: 'Normal' }

// Action button low emphasis without icon
// { State_symbolID: 'ActionButtonLowEmphasis16Normal',
//   Label_stringValue: 'Normal' }

// With icon
// { State_symbolID: 'ActionButtonLowEmphasis16Normal',
//   Icon_symbolID: 'iconEdit24',
//   IconColour_layerStyle: 'IconInformation',
//   Label_stringValue: 'Normal' }

// Destructive
// {
// 	State_symbolID: 'ActionButtonDestructive16Normal',
// 	Label_stringValue: 'Delete'
// }
// Destructive with icon
// {
// 	State_symbolID: 'ActionButtonDestructive16Normal',
// 	Icon_symbolID: 'iconDelete24',
// 	IconColour_layerStyle: 'IconError',
// 	Label_stringValue: 'Delete'
// }

// Icon Button:
// {
// 	State_symbolID: 'IconButtonNormal',
// 	Icon_symbolID: 'iconEdit24',
// 	IconColour_layerStyle: 'IconPrimary'
// }

// Text Field
// Pattern name components: [ 'TextField' ]
// {
// 	InputHelper_symbolID: 'InputHelperABN',
// 	State_symbolID: 'DefaultNormal',
// 	Label_stringValue: 'Australian Business Number (ABN)',
// 	'Helptext(Show/Hide)_symbolID': 'AssistiveTextSM+XS+MDHelpText',
// 	Helptext_stringValue: 'This is an 11-digit number.',
// 	Inputvalue_stringValue: '92 983 933 887'
// }
// With Error mode and Custom Inout Helper
// { InputHelper_symbolID: 'InputHelperCustom',
//   State_symbolID: 'ErrorNormal',
//   Label_stringValue: 'Label',
//   'Helptext(Show/Hide)_symbolID': 'AssistiveTextSM+XS+MDHelpText',
//   Helptext_stringValue: 'Help text - show/hide as needed.',
//   Inputvalue_stringValue: 'Input value',
//   Errortext_stringValue: 'Error text here' }

// Checkbox Compact:
// Pattern name components: [ 'Checkbox', 'Compact' ]
// { State_symbolID: 'CheckboxUnselectedNormal',
//   Label_stringValue: 'Checkbox label' }
//
// Checkbox Comfortable:
// Pattern name components: [ 'Checkbox', 'Comfortable' ]
// { State_symbolID: 'CheckboxComfortableUnselectedNormal',
//   Label_stringValue: 'Checkbox label' }
//
// Checkbox Group
// Pattern name components: [ 'CheckboxGroup', 'Compact' ], [ 'CheckboxGroup', 'Comfortable' ]
//
// { LabelState_symbolID: 'FormLabelsSM+XSGroupLabel',
//   Grouplabel_stringValue: 'Group label',
//   'Helptext(Show/Hide)_symbolID': 'AssistiveTextSM+XS+MDHelpText',
//   Helptext_stringValue: 'Help text - show/hide as needed.',
//   C1State_symbolID: 'CheckboxCompactUnselectedNormal',
//   Label_stringValue: 'Checkbox label',
//   C2State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C3State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C4State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C5State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C6State_symbolID: 'CheckboxCompactUnselectedNormal' }
// Error state
// { LabelState_symbolID: 'FormLabelsSM+XSGroupLabelError',
//   Grouplabel_stringValue: 'Group label',
//   'Helptext(Show/Hide)_symbolID': 'AssistiveTextSM+XS+MDHelpText',
//   Helptext_stringValue: 'Help text - show/hide as needed.',
//   Errortext_stringValue: 'Error goes here',
//   C1State_symbolID: 'CheckboxCompactUnselectedNormal',
//   Label_stringValue: 'Checkbox label',
//   C2State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C3State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C4State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C5State_symbolID: 'CheckboxCompactUnselectedNormal',
//   C6State_symbolID: 'CheckboxCompactUnselectedNormal' }