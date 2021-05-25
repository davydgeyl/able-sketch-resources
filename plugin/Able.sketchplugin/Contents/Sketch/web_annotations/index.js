const { webAnnotationConfig } = require("./config");

/**
 * converts PascalCase to kebab-case
 * https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
 * @param {string} string - pascal case string
 * @return kebab case string
 */
const kebabCaseName = (string) => {
  return string
    .replace(/([A-Z])/g, "-$1")
    .replace(/^\-/, "")
    .toLowerCase();
};

exports.kebabCaseName = kebabCaseName;

/**
 * Get the URL param path based on pattern type
 * @param {string} name - component name
 * @param {bool} foundation - is this a foundational component
 * @return path URL param
 */
const getPath = (name, foundation) => {
  return foundation
    ? `${webAnnotationConfig.foundationPath}${kebabCaseName(name)}`
    : `${webAnnotationConfig.patternPath}${kebabCaseName(name)}`;
};

exports.getPath = getPath;
/**
 * Get the sub-path based on pattern type
 * @param {string} name - component name
 * @param {obj} config - component config
 * @param {obj} overrideValues - values passed from sketch
 * @return sub-path string
 */
const getSubPath = (patternName, config, overrideValues) => {
  if (typeof config.urlFromStateFn === "function") {
    console.log(
      "Value",
      overrideValues[webAnnotationConfig.paramConfig.State.key]
    );
    return config.urlFromStateFn(
      overrideValues[webAnnotationConfig.paramConfig.State.key]
    );
  }
  return patternName && !config.paramsFromValues
    ? kebabCaseName(patternName)
    : "default";
};

exports.getSubPath = getSubPath;

/**
 * Builds URL params from object
 * @param {object} obj - object of param key value pairs
 */
const getParams = (obj) => {
  return Object.keys(obj).reduce(function (str, current) {
    return typeof obj[current] !== "undefined"
      ? `${str}&${encodeURIComponent(current)}=${encodeURIComponent(
          obj[current]
        )}`
      : str;
  }, "");
};

exports.getParams = getParams;

/**
 * Extract and transforms data from overrideValues and returns them in an
 * object ready to be converted into URL params
 * @param {object} overrideValues - passed overrides from sketch
 * @param {object} config - transformation settings
 * @param {string} component - name of component
 * @see webAnnotationConfig.paramConfig for config transformation settings
 * @return {object}
 */
const extractParams = (overrideValues, config, component) => {
  if (typeof overrideValues === "undefined") {
    return {};
  }
  let removeParams = {};
  const extractedParams = Object.keys(config).reduce(function (obj, current) {
    const paramConfig = config[current];
    // if override values matches key, do some stuff
    // else do nothing
    if (Object.keys(overrideValues).find((el) => el === paramConfig.key)) {
      // check if param is restricted to certain components
      if (
        typeof paramConfig.restrictTo !== "undefined" &&
        paramConfig.restrictTo.indexOf(current) >= 0
      ) {
        return { ...obj };
      }
      if (typeof paramConfig.ignore !== "undefined") {
        removeParams[current] = paramConfig.ignore;
      }
      // return transformed value using custom func
      if (typeof paramConfig.transformValue === "function") {
        var value = paramConfig.transformValue(overrideValues[paramConfig.key]);
      } else {
        var value = overrideValues[paramConfig.key];
      }

      return {
        [current]: value,
        ...paramConfig.additions,
        ...obj,
      };
    }

    return { ...obj };
  }, {});

  // remove params which were set to be ignored
  for (key in removeParams) {
    if (
      typeof config[key].ignoreCondition !== "undefined" &&
      config[key].ignoreCondition(extractedParams[key])
    ) {
      for (item of removeParams[key]) {
        extractedParams[item] = undefined;
      }
    } else if (typeof config[key].ignoreCondition === "undefined") {
      for (item of removeParams[key]) {
        extractedParams[item] = undefined;
      }
    }
  }

  return extractedParams;
};

exports.extractParams = extractParams;

/**
 * Converts Sketch symbol data to URL for storybook
 * @param {string} patternType ("Text"|"SymbolInstance") - type of pattern
 * @param {array} patternNameValues - array of pattern name values
 * @param {object} overrideValues - object of URL params from Sketch override values
 * @return URL for @able/web playground code snippet
 */
const getWebAnnotationURL = (
  patternType,
  patternNameValues,
  overrideValues
) => {
  const name = patternType === "text" ? "TextStyle" : patternNameValues[0];
  const config = webAnnotationConfig.componentConfig[name] || false;
  const newName = config.nameOverride ? config.nameOverride : name;
  const isFoundation = config.isFoundation || false;
  const path = `${getPath(newName, isFoundation)}`;

  const subPath = getSubPath(patternNameValues[1], config, overrideValues);

  const customParams = function () {
    if (name === "icon") {
      return {
        Icon: patternNameValues[1],
        Size: patternNameValues[2] === "24" ? "default" : "32",
      };
    } else if (name === "TextStyle") {
      if (
        typeof patternNameValues[2] === "undefined" &&
        patternNameValues[1] === "Center"
      ) {
        return {
          Name: patternNameValues[0],
          Align: patternNameValues[1],
        };
      }
      return {
        Name: patternNameValues[0],
        Colour: patternNameValues[1],
        Align: patternNameValues[2],
      };
    } else if (config.customParamsFromValues) {
      for ( const value of patternNameValues ) {
        if (config.customParamsFromValues[value]) {
          return config.customParamsFromValues[value];
        }
      }
    }

    return {};
  };
  const params = getParams({
    ...customParams(),
    ...extractParams(overrideValues, webAnnotationConfig.paramConfig, name),
  });

  return `${webAnnotationConfig.url}?${path}--${subPath}${params}`;
};

exports.getWebAnnotationURL = getWebAnnotationURL;
