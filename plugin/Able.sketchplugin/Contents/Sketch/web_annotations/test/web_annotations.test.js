const assert = require("assert");
const { expectations } = require("./web_annotations_expectations");
const {
  kebabCaseName,
  getPath,
  getParams,
  getWebAnnotationURL,
} = require("../index");

describe("fn kebabCaseName", function () {
  it("should return kebab-case of CamelCase", function () {
    assert.strictEqual(
      kebabCaseName("CamelCaseToKebabCase"),
      "camel-case-to-kebab-case"
    );
  });
});

describe("fn getPath", function () {
  it("should return a pattern path with kebab case string", function () {
    assert.strictEqual(getPath("KebabCase"), "path=/story/patterns-kebab-case");
  });
  it("should return a foundation path with kebab case string", function () {
    assert.strictEqual(
      getPath("KebabCase", true),
      "path=/story/foundations-kebab-case"
    );
  });
});

describe("fn getParams", function () {
  const obj = {
    Foo: "bar",
    lorem: "ipsum",
    "90s cartoon": "Ren & Stimpy",
    "Naughties cartoon": "Bob's Burgers",
  };
  it("should a string of URL params built from an object", function () {
    assert.strictEqual(
      getParams(obj),
      "&Foo=bar&lorem=ipsum&90s%20cartoon=Ren%20%26%20Stimpy&Naughties%20cartoon=Bob's%20Burgers"
    );
  });
});

describe("fn webAnnotationsURL", function () {
  describe("Should return the expected URLs from passed params", function () {
    for (const patternName in expectations) {
      for (const patternVariant in expectations[patternName]) {
        const pattern = expectations[patternName][patternVariant];
        it(`${patternName} ${patternVariant}`, function () {
          assert.strictEqual(
            getWebAnnotationURL(
              pattern.patternType ? pattern.patternType : "SymbolInstance",
              pattern.patternNameValues,
              pattern.overrideValues
            ),
            pattern.url
          );
        });
      }
    }
  });
});
