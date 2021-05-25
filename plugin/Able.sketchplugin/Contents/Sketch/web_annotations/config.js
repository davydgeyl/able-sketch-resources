/**
 * webAnnotationsConfig
 * .url {string} - playground url
 * .patternPath {string} - base path to pattern stories
 * .foundationPath {string} - base path to foundation stories
 * .componentConfig {object} - configuration for individual components
 * .componentConfig[name] {bool} - name of component to match data passed from Sketch
 * .componentConfig[name].isFoundation {bool} - paths in the format ...path=/story/foundations-icons
 * .componentConfig[name].paramsFromValues {bool} - builds URL params from patternNameValues
 * .componentConfig[name].customParamsFromValues {object} - modify the values to match required params
 * .componentConfig[name].urlFromStateFn {function} - derive end of URL from the component "State" override value
 * .componentConfig[name].nameOverride {string} - change the name of the story to modify the returned URL
 * .paramConfig {object} - configuration to cherry-pick specific values from overrideValues
 * .paramConfig[name] {object} - name of param to add to the story URL
 * .paramConfig[name].key {string} - key to look for in overrideValues
 * .paramConfig[name].transformValue {function} - function to process the value found with paramConfig[name].key
 *    Returning false will remove the param
 * .paramConfig[name].additions {object} - extra params to be added to URL
 * .paramConfig[name].ignore {array} - params to ignore if this param exists
 * .paramConfig[name].ignoreCondition {function} - only ignore if this condition returns true
 * .paramConfig[name].restrictTo {array} - names of components which this param should apply to
 */

exports.webAnnotationConfig = {
  url: "https://able-web-docs.apps.np.sdppcf.com/",
  patternPath: "path=/story/patterns-",
  foundationPath: "path=/story/foundations-",
  componentConfig: {
    icon: {
      isFoundation: true,
      paramsFromValues: true,
    },
    TextStyle: {
      paramsFromValues: true,
    },
    TextList: {
      paramsFromValues: true,
      customParamsFromValues:  {
        Bullet: { Content: "Bullet List", Name:"TextBodyShort"},
        Number: { Content: "Number List", Name:"TextBodyShort"}
      },
      nameOverride: "TextStyle"
    },
    Checkbox: {
      urlFromStateFn: function (val) {
        return checkboxSubPath(val);
      },
    },
  },
  paramConfig: {
    ErrorText: {
      key: "Errortext_stringValue",
    },
    GroupLabel: {
      key: "Grouplabel_stringValue",
      ignore: ["Label"],
    },
    HelpText: { key: "Helptext_stringValue" },
    Icon: {
      key: "Icon_symbolID",
      transformValue: function (val) {
        return val.replace(/(icon|24|32)/g, "");
      },
    },
    Label: { key: "Label_stringValue" },
    State: {
      key: "State_symbolID",
      transformValue: function (val) {
        return val.indexOf("Error") > -1 ? "Invalid" : undefined;
      },
      restrictTo: ["TextField"],
    },
    Type: {
      key: "InputHelper_symbolID",
      transformValue: function (val) {
        return val.replace("InputHelper", "");
      },
      ignore: ["HelpText", "Label", "ErrorText"],
      ignoreCondition: function (val) {
        return val.indexOf("Custom") === -1;
      },
    },
  },
};

function checkboxSubPath(val) {
  if (val.indexOf("Comfortable") > -1) return "comfortable";
  else return "compact";
}
