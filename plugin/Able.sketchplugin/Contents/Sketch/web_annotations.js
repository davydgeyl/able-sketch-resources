const { getWebAnnotationURL } = require("./web_annotations/index");

/**
 * URL to the Storybook with code snippet
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
 * @returns String URL to Storybook code snippet
 */
function webAnnotationURL(patternType, patternNameComponents, overrides) {
  return getWebAnnotationURL(patternType, patternNameComponents, overrides);
}

/// Parameters and examples are identical to the once for webAnnotationURL function
/// - Returns: String code snippet for React
function reactSnippetAnnotation(
  patternType,
  patternNameComponents,
  overrides = ""
) {
  return "React Snippet";
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
// Pattern name components: [ 'CheckboxGroup', 'Compact' ], [ 'CheckboxGroup', 'Comfortable' ], 
// [ 'CheckboxGroup', 'CheckboxGroupComfortable+Txt' ], [ 'CheckboxGroup', 'Comfortable+Txt+TrailingIcon' ], [ 'CheckboxGroup', 'Comfortable+Txt+Pictogram' ], 
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

// Radio Group
// Pattern name components: [ 'RadioGroup', 'Compact' ], [ 'RadioGroup', 'Comfortable' ], 
// [ 'RadioGroup', 'CheckboxGroupComfortable+Txt' ], [ 'RadioGroup', 'Comfortable+Txt+TrailingIcon' ], [ 'RadioGroup', 'Comfortable+Txt+Pictogram' ], 

// File Picker
// Pattern name components: [ 'FilePicker']

// Beradcrumb
// Pattern name components: [ 'Breadcrumb']

// Link List
// Pattern name components: [ 'LinkList']

// Text List
// Pattern name components: [ 'TextList, 'Bullet'], [ 'TextList, 'Number']


