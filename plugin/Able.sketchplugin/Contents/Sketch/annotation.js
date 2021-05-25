@import 'web_annotations.js'
@import 'android_annotations.js'
@import 'ios_annotations.js'
@import 'version.js'

// Constants
const annotationGroupName = "Annotation Group";
const foundationLibraryName = "04 Able Foundation"
var foundationLibraryRef = null
const annotationSymbolName = "Ω/Annotation"
var annotationSymbolRef = null
const patternNameOverrideName = "Pattern Name"
const webURLOverrideName = "Web Code Snippet URL"
const webReactOverrideName = "React Snippet"
const androidSnippetOverrideName = "Android Snippet"
const iOSSnippetOverrideName = "iOS Snippet"
const versionOverrideName = "Version"
var wantedOverrideName = null

var versionNumber = ""

// Functions
function addAnnotation(context) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	let selection = document.selectedLayers.layers
	versionNumber = currentVersion()

	if (isSelectionValid(selection)) {
		selection.forEach(layer => {
			annotateLayer(layer, document)
		})
	}
}

function annotateLayer(layer, document) {
	// Hidden layers are not annotated
	if (layer.hidden) { return }
		
	var patternName = null
	var overrideValue = null
	var webCodeURL = null
	var reactSnippetValue = null
		
	switch (layer.type) {
	case "SymbolMaster":
	case "Artboard":
	case "Group":
		layer.layers.forEach(layer => {
			annotateLayer(layer, document)
		})
		break;
	case "Text":
		let sharedStyle = layer.sharedStyle
		if (sharedStyle) {
			var symbolName = sharedStyle.name
			if (isWebTextStyle(layer, document)) {
				patternName = webTextStyleNameFrom(symbolName)
			} else {
				patternName = patternNameFrom(symbolName)
			}
			
			var patternNameComponents = cleanedNameComponents(symbolName)
			var layerType = layer.type
			var layerTypeLowercased = layer.type.toLowerCase()
			webCodeURL = webAnnotationURL(layerTypeLowercased, patternNameComponents)
			reactSnippetValue = reactSnippetAnnotation(layerTypeLowercased, patternNameComponents)
			androidSnippetValue = androidCodeSnippet(layerType, patternNameComponents)
			iOSSnippetValue = iOSCodeSnippet(layerType, patternNameComponents)
		}
		break;
	case "SymbolInstance":
		// This is a backup, the real name will come from the symbol manster name.
		var symbolName = "Unknown"
		var symbolMaster = document.getSymbolMasterWithID(layer.symbolId)
		if (symbolMaster) {
			symbolName = symbolMaster.name
		}
		
		if (isAnnotatable(symbolName)) {
			patternName = patternNameFrom(symbolName)
			overrideValue = printableOverrideOf(layer, document)
			overrides = overridesOf(layer, document)
			var patternNameComponents = cleanedNameComponents(symbolName)
			webCodeURL = webAnnotationURL(layer.type, patternNameComponents, overrides)
			reactSnippetValue = reactSnippetAnnotation(layer.type, patternNameComponents, overrides)
			androidSnippetValue = androidCodeSnippet(layer.type, patternNameComponents, overrides)
			iOSSnippetValue = iOSCodeSnippet(layer.type, patternNameComponents, overrides)
		}
		break;
	case "ShapePath":
		// No annotation is available		
		break;
	default:
		alertUnknown(layer.type)
	}
	
	// Add annotation layer
	if (patternName) {
		var annotationText = patternName
		// List values of printable overrides in brackets
		if (overrideValue) {
			annotationText = annotationText + "(" + overrideValue + ")"
		}				
		// All annotations are added to one group
		var annotationGroup = annotationGroupOf(parentArtboardOf(layer))
		// The frame is converted into Artboard's coordinates
		var patternFrame = convertRectToArtboard(layer)
		
		let annotationSymbol = annotationSymbolFor(annotationText, patternFrame, annotationGroup, webCodeURL, reactSnippetValue, androidSnippetValue, iOSSnippetValue)
		if (annotationSymbol == null) {
			let annotationLayer = annotationLayerFor(annotationText, patternFrame, annotationGroup)
		}		
	}
}

function foundationLibrary() {
	if (foundationLibraryRef == null) {		
		let sketch = require('sketch')
		let document = sketch.getSelectedDocument()
		var libraries = require('sketch/dom').getLibraries()		
		foundationLibraryRef = libraries.find(foundationLibraryCondition)
		if (foundationLibraryRef == null) {
			log("ERROR: Could not find Able Foundation Library")
		}
	}
	return foundationLibraryRef
}

function foundationLibraryCondition(library) {
	return library.name == foundationLibraryName
}

function annotationSymbolReference(symbolReferences) {
	if (annotationSymbolRef == null) {		
		annotationSymbolRef = symbolReferences.find(annotationSymbolCondition)
		if (annotationSymbolRef == null) {
			log("ERROR: Could not find annotation symbol")
		}
	}
	return annotationSymbolRef
}


function annotationSymbolCondition(symbol) {
	return symbol.name == annotationSymbolName
}

/// Excludes non-annotatable symbols. Removes slashes, spaces, periods, etc. and forms a proper pattern name.
function patternNameFrom(symbolName) {	
	// Exclude non-annotatable symbols.	
	if (isAnnotatable(symbolName) == false) {
		return ""
	}
	
	var patternName = ""
	var cleanedComponents = cleanedNameComponents(symbolName)
	cleanedComponents.forEach(component => {
		patternName = patternName + component
	})
	
	return patternName
}

function cleanedNameComponents(symbolName) {
	var cleanedComponents = []
	
	var components = symbolName.split("/")
	components.forEach(component => {
		// Exclude parts of the path that end with a period.
		if (!component.startsWith(".")) {
			// Split components by hyphen. Inverted-Center will be turned into two components: "Inverted" and "Center"
			var subComponents = component.split("-")
			subComponents.forEach(subComponent => {
				var cleanedName = clean(subComponent)
				if (cleanedName) {
					cleanedComponents.push(cleanedName)
				}
			})
		}
	})
	return cleanedComponents
}

function isAnnotatable(symbolName) {
	if (symbolName.toLowerCase().includes("spacing")  
		// Exclude work in progress symbols.
		|| symbolName.toLowerCase().includes("[wip]") 
	) {
		return false
	}
	return true
}

/// Remove redundant symbols, non-prontable parts of the name, etc., from an individual name component.
function clean(name) {
	return removeRedundantSymbols(removePrefixesWithPeriods(name))
}

/// Remove redundant symbols, non-prontable parts of the name, etc., from an override name.
function cleanOverrideName(name) {
	return removeRedundantSymbolsFromOverrideName(name)
}

function webTextStyleNameFrom(symbolName) {
	/// Web text style is printed out in this format
	/// (“HeadingDisplay”, “Inverted”, “Center”)
	var textStyleNameParts = []
	var components = symbolName.split("/")
	components.forEach(component => {
		// Exclude parts of the path that end with a period. This is embedded to control what is/isn't a part of pattern name.
		if (!component.startsWith(".")) {
			// Split components by hyphen. Inverted-Center will be turned into two components: "Inverted" and "Center"
			var subComponents = component.split("-")
			subComponents.forEach(subComponent => {
				var cleanedName = clean(subComponent)
				if (cleanedName) {
					textStyleNameParts.push(cleanedName)
				}
			})
		}
	})
		
	var annotation = "("
	textStyleNameParts.forEach(part => {
		if (annotation.length > 1) {
			annotation = annotation + ", "
		}
		annotation = annotation + "'" + part + "'"
	})
	annotation = annotation + ")"
	return annotation
}

function removePrefixesWithPeriods(nameComponent) {
	var components = nameComponent.split(".")
	var length = components.length
	if (length > 0) {
		return components[length - 1]
	} else {
		return nameComponent
	}
}

function removeRedundantSymbols(nameComponent) {
	return nameComponent.replace(/\s/g,'').replace("⭐", "").replace("🌀", "").replace("Ω", "").replace("📍", "")
}

function removeRedundantSymbolsFromOverrideName(overrideName) {
	return overrideName.replace(/\s/g,'').replace("🔘", "").replace("🎨", "").replace("✏️", "").replace("📍", "").replace("⚙️", "").replace("👀", "").replace("👉", "")
}

function overridesOf(layer, document) {
	var overridesDictionary = {};
	layer.overrides.forEach(override => {
		if (override.editable) {
			var overrideName = cleanOverrideName(override.affectedLayer.name) + '_' + override.property		
			var overrideValue = "Unknown"
		
			switch (override.property) {
			case "symbolID":
				var symbolMasterValue = document.getSymbolMasterWithID(override.value)
				if (symbolMasterValue) {
					overrideValue = patternNameFrom(symbolMasterValue.name)
				} else {
					overrideValue = "none"
				}
				break;
			case "stringValue":
				overrideValue = override.value
				break;
			case "layerStyle":
				var SharedStyle = require('sketch/dom').SharedStyle			
				var sharedStyle = document.sharedLayerStyles.find(element => element.id == override.value);
				if (sharedStyle) {
					overrideValue = patternNameFrom(sharedStyle.name)
				}
				break;
			case "textStyle":
				var SharedStyle = require('sketch/dom').SharedStyle
				var sharedStyle = document.sharedTextStyles.find(element => element.id == override.value);
				if (sharedStyle) {
					overrideValue = patternNameFrom(sharedStyle.name)
				}
				break;
			default:
				print("📍Unexpected layer.property in overridesOf function: " + layer.property)
			}				
			overridesDictionary[overrideName] = overrideValue
		}
	})
	return overridesDictionary
}

function printableOverrideOf(layer, document) {
	// TODO: This should return an array or printable overrides when we have more than one
	const iconOverridePrefix = "⚙️"
	var overrideValue
	layer.overrides.forEach(override => {
		var symbolMasterValue = document.getSymbolMasterWithID(override.value)
		if (override.affectedLayer.name.startsWith(iconOverridePrefix)) {
			overrideValue = patternNameFrom(symbolMasterValue.name)
		}
	})
	return overrideValue
}

function overrideOfSymbolNamed(symbol, overrideName) {
	// Horrible usage of a global variable, but I haven't found a way to pass another parameter into the find function
	wantedOverrideName = overrideName	
	return symbol.overrides.find(findOverrideNameCondition)
}

function findOverrideNameCondition(override) {
	// Horrible usage of a global variable, but I haven't found a way to pass another parameter into the find's condition function
	return override.affectedLayer.name == wantedOverrideName
}

function isWebTextStyle(textStyle, document) {
	var originLibrary = textStyle.sharedStyle.getLibrary()
	if (originLibrary.name.includes("Web")) {
		return true
	} else {
		return false
	}
}

// TODO: Return a dedicated annotation symbol
function annotationLayerFor(text, frame, parentGroup) {
	let sketch = require('sketch')
	let Text = sketch.Text	
	var Rectangle = require('sketch/dom').Rectangle
	
	var xTranslation = parentGroup.frame.x
	var yTranslation = parentGroup.frame.y

	let annotationTextLayer = new Text({
		text: text,
		parent: parentGroup,
	})
	
	annotationTextLayer.style.textColor = "#cc1effff"
	annotationTextLayer.style.fontSize = 14
	annotationTextLayer.style.fontFamily = "Helvetica"
	annotationTextLayer.adjustToFit()
	annotationTextLayer.fixedWidth = true
	annotationTextLayer.frame = new Rectangle(frame.x - xTranslation, frame.y - yTranslation - annotationTextLayer.frame.height, annotationTextLayer.frame.width, annotationTextLayer.frame.height)
	parentGroup.adjustToFit()
	return annotationTextLayer
}

function annotationSymbolFor(annotationText, patternFrame, annotationGroup, webCodeURL, reactSnippetValue, androidSnippetValue, iOSSnippetValue) {	
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	
	var libraries = require('sketch/dom').getLibraries()		
	var foundation = foundationLibrary()

	var symbolReferences = foundation.getImportableSymbolReferencesForDocument(document)
	var annotationReference = annotationSymbolReference(symbolReferences)
	
	var symbolMaster = annotationReference.import()
	var annotation = symbolMaster.createNewInstance()
	
	if (annotation != null) {
		annotation.parent = annotationGroup
		
		// Pattern Name
		let patternNameOverride = overrideOfSymbolNamed(annotation, patternNameOverrideName)
		if (patternNameOverride != null) {
			patternNameOverride.value = annotationText
		}
		// Web code URL
		let webURLOverride = overrideOfSymbolNamed(annotation, webURLOverrideName)
		if (webURLOverride != null) {
			webURLOverride.value = webCodeURL
		}
		// Web React Snippet
		let reactSnippetOverride = overrideOfSymbolNamed(annotation, webReactOverrideName)
		if (reactSnippetOverride != null) {
			reactSnippetOverride.value = reactSnippetValue
		}
		// Android Snippet
		let androidSnippetOverride = overrideOfSymbolNamed(annotation, androidSnippetOverrideName)
		if (androidSnippetOverride != null) {
			androidSnippetOverride.value = androidSnippetValue
		}
		// iOS nippet
		let iOSSnippetOverride = overrideOfSymbolNamed(annotation, iOSSnippetOverrideName)
		if (iOSSnippetOverride != null) {
			iOSSnippetOverride.value = iOSSnippetValue
		}
		// Version override
		let versionOverride = overrideOfSymbolNamed(annotation, versionOverrideName)
		if (versionOverride != null) {
			versionOverride.value = versionNumber
		}
		
		
		var xTranslation = annotationGroup.frame.x
		var yTranslation = annotationGroup.frame.y
		var Rectangle = require('sketch/dom').Rectangle
		annotation.frame = new Rectangle(Math.max(patternFrame.x, 0) - xTranslation, Math.max(patternFrame.y - annotation.frame.height, 0) - yTranslation, annotation.frame.width, annotation.frame.height)
		annotation.resizeWithSmartLayout()
	}	
	return annotation
}

// ------------ 

function parentArtboardOf(layer) {
	if (layer.parent == null) {
		return null
	} else if (isArtboardOrSymbolMaster(layer.parent.type)) {
		return layer.parent
	} else {
		return parentArtboardOf(layer.parent)
	}
}

function convertRectToArtboard(layer) {
	var Rectangle = require('sketch/dom').Rectangle
	if (isArtboardOrSymbolMaster(layer.type)) {
		return new Rectangle(0, 0, 0, 0) 
	} else if (layer.parent == null) {
		return layer.frame
	} else if (isArtboardOrSymbolMaster(layer.parent.type)) {
		return layer.frame
	} else {
		let parentRect = convertRectToArtboard(layer.parent)
		return new Rectangle(layer.frame.x + parentRect.x, 
			layer.frame.y + parentRect.y, 
			layer.frame.width, 
			layer.frame.height)
	}
}

function annotationGroupOf(artboard) {
	var annotationGroup = artboard.layers.find(annotationGroupCondition)
	if (annotationGroup == null) {
		var Group = require('sketch/dom').Group
		var Rectangle = require('sketch/dom').Rectangle
		var rect = new Rectangle(0, 0, artboard.frame.width, artboard.frame.height)
		annotationGroup = new Group({
			name: annotationGroupName,
			parent: artboard,
			frame: rect
		})
	}
	return annotationGroup
}

function annotationGroupCondition(layer) {
	return layer.name == annotationGroupName;
}

function isSelectionValid(selection) {
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("Dismiss");
	
    if (selection.length == 0) {
		dialog.setMessageText('No selection found')
		dialog.setInformativeText('Select an artboard or individual objects to annotate.')
		dialog.runModal();
		return false
	} else if (findArtboardsInMixedSelection(selection)) {
		dialog.setMessageText('Mixed selection is not supported')
		dialog.setInformativeText('Please select either artboards or individual objects.')
		dialog.runModal();
		return false
	}
	return true
}

function findArtboardsInMixedSelection(selection) {
	let artboards = selection.filter(function(layer) {
		return isArtboardOrSymbolMaster(layer.type)
	});
	
	if (artboards.length == 0) {
		return false
	} else if (artboards.length == selection.length) {
		return false
	}
	return true
}

function isArtboardOrSymbolMaster(type) {
	return (type == "Artboard") || (type == "SymbolMaster")
}

function alertUnknown(layerType) {
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("Dismiss");
	dialog.setMessageText('Unknown type of object:' + layerType)
	dialog.setInformativeText('Please contact the Able team regarding this message.')
	dialog.runModal();
}
