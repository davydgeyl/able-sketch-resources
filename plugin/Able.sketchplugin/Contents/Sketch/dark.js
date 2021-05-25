@import 'annotation.js'

const lightModeSuffix = "☀️LightMode."
const darkModeSuffix = "🌒DarkMode."

function convertToDarkMode(context) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	let selection = document.selectedLayers.layers

	// TODO: Move isSelectionValid into a separate file
	if (isSelectionValid(selection)) {
		selection.forEach(layer => {
			convertLayer(layer, document)
		})
	}
}

function convertLayer(layer, document) {
	// Hidden layers are not annotated
	if (layer.hidden) { return }
		
	switch (layer.type) {
	case "SymbolMaster":
	case "Artboard":
	case "Group":
		layer.layers.forEach(layer => {
			convertLayer(layer, document)
		})
		break;
	case "Text":		
		var sharedStyle = layer.sharedStyle
		if (sharedStyle) {
			var sharedStyleName = layer.sharedStyle.name
			var darkModeStyleName = darkModeName(sharedStyleName)
			
			var originLibrary = sharedStyle.getLibrary()
			var librarySharedStyles = originLibrary.getImportableTextStyleReferencesForDocument(document)
			darkModeSharedStyle = librarySharedStyles.find(librarySharedStyle => librarySharedStyle.name == darkModeStyleName)
			if (darkModeSharedStyle == null) {
				log("ERROR: Could not find dark mode shared text style: " + darkModeStyleName)
				alertMissingStyle(darkModeStyleName)
			} else {
				layer.sharedStyle = darkModeSharedStyle
				layer.sharedStyle.syncWithLibrary()
			}
		}
		break;
	case "SymbolInstance":	
		var repeatNeeded = false
		do {
			repeatNeeded = convertSymbolInstanceLayerType(layer, document)
		}
		while (repeatNeeded);
		break;
	case "ShapePath":
		// No annotation is available		
		break;
	default:
		alertUnknown(layer.type)
	}
}

function convertSymbolInstanceLayerType(layer, document) {
	var repeatNeeded = false
	layer.overrides.forEach(override => {
		if (override.editable) {		
			switch (override.property) {
			case 'symbolID':			
				var symbolMaster = document.getSymbolMasterWithID(override.value)
				var overrideSymbolName = symbolMaster.name
			
				if (isForLightMode(overrideSymbolName)) {
					var overrideSymbolDarkModeName = darkModeName(overrideSymbolName)
					var originLibrary = symbolMaster.getLibrary()
					var symbolReferences = originLibrary.getImportableSymbolReferencesForDocument(document)
			
					darkModeSymbolReference = symbolReferences.find(symbolReference => symbolReference.name == overrideSymbolDarkModeName)
					if (darkModeSymbolReference == null) {
						log("ERROR: Could not find darkModeSymbolReference: " + overrideSymbolDarkModeName)
					} else {					
						var darkModeSymbolMaster = darkModeSymbolReference.import()
						if (darkModeSymbolMaster) {
							// Apparently there is no need to allocate an instance of a symbol for the override,
							// using symbolId of the sybmol master works.
							layer.setOverrideValue(override, darkModeSymbolMaster.symbolId)
						
							// When a symbol override is changes it may contain other child overrides.
							// For example: ActionButtonLowEmphasis has the State override and Icon Colour override.
							// Second run through the overrides is needed to apply Dark Mode conversion to those children overrides.
							repeatNeeded = true
						} else {
							log("ERROR: Could not find dark mode symbol master")
						}
					}
				}
				break;
			case 'layerStyle':			
				var sharedStyle = document.getSharedLayerStyleWithID(override.value)
				if (sharedStyle) {
					var sharedStyleName = sharedStyle.name
					var darkModeStyleName = darkModeName(sharedStyleName)					
					darkModeSharedStyle = document.sharedLayerStyles.find(sharedStyle => sharedStyle.name == darkModeStyleName)
					if (darkModeSharedStyle == null) {
						log("ERROR: Could not find darkModeSharedStyle: " + darkModeSharedStyle)
						alertMissingStyle(darkModeStyleName)
					} else {
						layer.setOverrideValue(override, darkModeSharedStyle.id)
					}
				}
				break;
			default:
			}
		} // if editable
	})
	return repeatNeeded
}

function alertMissingStyle(styleName) {
	var dialog = NSAlert.alloc().init();
	dialog.addButtonWithTitle("Dismiss");
	dialog.setMessageText('Failed to find the style:' + styleName)
	dialog.setInformativeText('Please contact the Able team regarding this message.')
	dialog.runModal();
}

function isForLightMode(name) {
	return name.includes(lightModeSuffix)
}

function darkModeName(textStyleName) {
	return textStyleName.replace(lightModeSuffix, darkModeSuffix)
}
