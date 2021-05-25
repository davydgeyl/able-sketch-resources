// Increase Text Size

function increaseAndroidAndWebTextSize(context) {
	increaseTextSize(context, androidMaxScaledSizeWithSize)
}

function increaseiOSXXXLTextSize(context) {
	increaseTextSize(context, iosXXXLScaledSizeWithSize)
}

function increaseiOSAX5TextSize(context) {
	increaseTextSize(context, iosAX5ScaledSizeWithSize)
}

function increaseTextSize(context, callback) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	let selection = document.selectedLayers.layers

	selection.forEach(layer => {
		increaseTextSizeOfLayer(layer, callback)
	})
}

function increaseTextSizeOfLayer(layer, callback) {
	switch (layer.type) {
	case "Artboard":
	case "Group":
		layer.layers.forEach(layer => {
			increaseTextSizeOfLayer(layer, callback)
		})
		break;
	case "Text":
		var textLayer = layer;
		// Restore the original style before applying the changes
		resetTextStyle(textLayer);
		
		var fontSize = textLayer.style.fontSize;
		var lineHeight = textLayer.style.lineHeight;
		var newFontSize = callback(fontSize);
		var newLineHeight = newFontSize * lineHeight / fontSize;
		textLayer.style.fontSize = newFontSize;
		textLayer.style.lineHeight = newLineHeight;
		break;
	default:
	}
}

function androidMaxScaledSizeWithSize(size) {
	return size * 2
}

function iosXXXLScaledSizeWithSize(size) {
	if (size >= 40) {
		return 47;
	} else if (size >= 32) {
		return 39;
	} else if (size >= 24) {
		return 31;
	} else if (size >= 20) {
		return 26;
	} else if (size >= 16) {
		return 21;
	} else if (size >= 14) {
		return 20;
	} else return 18;
}

function iosAX5ScaledSizeWithSize(size) {
	if (size >= 40) {
		return 68;
	} else if (size >= 32) {
		return 64;
	} else if (size >= 24) {
		return 62;
	} else if (size >= 20) {
		return 58;
	} else if (size >= 16) {
		return 46;
	} else if (size >= 14) {
		return 45;
	} else return 40;
}

// Reset Text Size

function resetTextSize(context) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	let selection = document.selectedLayers.layers

	selection.forEach(layer => {
		resetTextSizeOfLayer(layer)
	})
}

function resetTextSizeOfLayer(layer) {
	switch (layer.type) {
	case "Artboard":
	case "Group":
		layer.layers.forEach(layer => {
			resetTextSizeOfLayer(layer)
		})
		break;
	case "Text":
		resetTextStyle(layer);
		break;
	default:
	}
}

function resetTextStyle(textLayer) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	var sharedStyleID = textLayer.sharedStyleId
	var sharedStyle = document.getSharedTextStyleWithID(sharedStyleID)

	if (textLayer.style.isOutOfSyncWithSharedStyle(sharedStyle)) {
		textLayer.style.syncWithSharedStyle(sharedStyle)
	}
}