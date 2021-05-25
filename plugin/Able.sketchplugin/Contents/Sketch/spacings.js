function hideSpacings(context) {
	setSpacingsHidden(true) 
}

function showSpacings(context) {
	setSpacingsHidden(false) 
}

function setSpacingsHidden(flag) {
	let sketch = require('sketch')
	let document = sketch.getSelectedDocument()
	let selection = document.selectedLayers.layers

	selection.forEach(layer => {
		setSpacingsHiddenForLayer(layer, flag)
	})
}

function setSpacingsHiddenForLayer(layer, hidden) {
	switch (layer.type) {
	case "Artboard":
	case "Group":
		layer.layers.forEach(layer => {
			setSpacingsHiddenForLayer(layer, hidden)
		})
		break;
	case "SymbolInstance":
		if (layer.name.includes("spacing")) {
			layer.hidden = hidden
		}
		break;
	default:
	}
}