exports.expectations = {
  ActionButton: {
    HighEmphasis: {
      patternNameValues: ["ActionButton", "HighEmphasis"],
      overrideValues: {
        "2_stringValue": 2,
        Background_layerStyle: "InteractiveBackgroundInverseNormal",
        Label_stringValue: "Normal",
        "Spacing/Inset/inset2x(16)_symbolID": "",
        State_symbolID: "ActionButtonHighEmphasisNormal",
      },
      url: `https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-action-button--high-emphasis&Label=Normal`,
    },
    LowEmphasis: {
      patternNameValues: ["ActionButton", "LowEmphasis"],
      overrideValues: {
        IconColour_layerStyle: "InteractiveForegroundNormal",
        Icon_symbolID: "iconCalendar24",
        Label_stringValue: "Lorem ipsum",
        State_symbolID: "ActionButtonLowEmphasis16Normal",
        half_stringValue: "half",
        "spacing/Horizontal/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-action-button--low-emphasis&Label=Lorem%20ipsum&Icon=Calendar",
    },
  },
  IconButton: {
    default: {
      patternNameValues: ["IconButton"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-icon-button--default",
    },
    withParams: {
      patternNameValues: ["IconButton"],
      overrideValues: {
        IconColour_layerStyle: "InteractiveForegroundNormal",
        Icon_symbolID: "iconStarSelected32",
        Label_stringValue: "Hello World",
        State_symbolID: "ActionButtonLowEmphasis24Normal",
        half_stringValue: "half",
        "spacing/Horizontal/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-icon-button--default&Label=Hello%20World&Icon=StarSelected",
    },
    Destructive: {
      patternNameValues: ["IconButton", "Destructive"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-icon-button--destructive",
    },
  },
  Icons: {
    24: {
      patternNameValues: ["icon", "CoverageMap", "24"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/foundations-icon--default&Icon=CoverageMap&Size=default",
    },
    32: {
      patternNameValues: ["icon", "Guarantee", "32"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/foundations-icon--default&Icon=Guarantee&Size=32",
    },
  },
  TextStyles: {
    HeadingDisplayInvertedCenter: {
      patternType: "text",
      patternNameValues: ["HeadingDisplay", "Inverted", "Center"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Name=HeadingDisplay&Colour=Inverted&Align=Center",
    },
    HeadingDisplayCenter: {
      patternType: "text",
      patternNameValues: ["HeadingDisplay", "Center"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Name=HeadingDisplay&Align=Center",
    },
    HeadingAInverted: {
      patternType: "text",
      patternNameValues: ["HeadingDisplay", "Inverted"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Name=HeadingDisplay&Colour=Inverted",
    },
    FinePrintSubtle: {
      patternType: "text",
      patternNameValues: ["FinePrint", "Subtle"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Name=FinePrint&Colour=Subtle",
    },
  },
  InlineLink: {
    Default: {
      patternNameValues: ["InlineLink"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-inline-link--default",
    },
  },
  TextField: {
    Default: {
      patternNameValues: ["TextField"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-field--default",
    },
    definedHelper: {
      patternNameValues: ["TextField"],
      overrideValues: {
        "1_stringValue": "1",
        Background_layerStyle: "InteractiveBackgroundFieldboxBackground",
        Border_layerStyle: "InteractiveForegroundFieldborderNormal",
        "Helptext(Show/Hide)_symbolID": "ElementsHelpText",
        Helptext_stringValue: "I am the help text",
        Helptext_textStyle: "FinePrintSubtle",
        InputHelper_symbolID: "InputHelperABN",
        Inputvalue_stringValue: "92 983 933 887",
        Inputvalue_textStyle: "TextBody",
        Label_stringValue: "Australian Business Number (ABN)",
        Label_textStyle: "HeadingD",
        half_stringValue: "half",
        "spacing/Horizontal/spacing2x(16)_symbolID": "none",
        "spacing/Vertical/spacing1x(8)_symbolID": "",
        "spacing/Vertical/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-field--default&Type=ABN",
    },
    helperWithError: {
      patternNameValues: ["TextField"],
      overrideValues: {
        "1_stringValue": "1",
        Background_layerStyle: "InteractiveBackgroundFieldboxBackground",
        Border_layerStyle: "InteractiveForegroundFieldborderNormal",
        "Helptext(Show/Hide)_symbolID": "ElementsHelpText",
        Helptext_stringValue: "I am the help text",
        Helptext_textStyle: "FinePrintSubtle",
        InputHelper_symbolID: "InputHelperABN",
        Inputvalue_stringValue: "92 983 933 887",
        Inputvalue_textStyle: "TextBody",
        Label_stringValue: "Australian Business Number (ABN)",
        Label_textStyle: "HeadingD",
        State_symbolID: "ErrorNormal",
        half_stringValue: "half",
        "spacing/Horizontal/spacing2x(16)_symbolID": "none",
        "spacing/Vertical/spacing1x(8)_symbolID": "",
        "spacing/Vertical/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-field--default&Type=ABN&State=Invalid",
    },
    customContent: {
      patternNameValues: ["TextField"],
      overrideValues: {
        "1_stringValue": "1",
        Background_layerStyle: "InteractiveBackgroundFieldboxBackground",
        Border_layerStyle: "InteractiveForegroundFieldborderNormal",
        "Helptext(Show/Hide)_symbolID": "ElementsHelpText",
        Helptext_stringValue: "I am the help text",
        Helptext_textStyle: "FinePrintSubtle",
        InputHelper_symbolID: "InputHelperCustom",
        Inputvalue_stringValue: "92 983 933 887",
        Inputvalue_textStyle: "TextBody",
        Label_stringValue: "Lorem Ipsum",
        Label_textStyle: "HeadingD",
        half_stringValue: "half",
        "spacing/Horizontal/spacing2x(16)_symbolID": "none",
        "spacing/Vertical/spacing1x(8)_symbolID": "",
        "spacing/Vertical/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-field--default&Type=Custom&Label=Lorem%20Ipsum&HelpText=I%20am%20the%20help%20text",
    },
    customError: {
      patternNameValues: ["TextField"],
      overrideValues: {
        "1_stringValue": "1",
        Background_layerStyle: "InteractiveBackgroundFieldboxBackground",
        Border_layerStyle: "InteractiveForegroundFieldborderNormal",
        "Helptext(Show/Hide)_symbolID": "ElementsHelpText",
        Helptext_stringValue: "Lorem Ipsum",
        Helptext_textStyle: "FinePrintSubtle",
        InputHelper_symbolID: "InputHelperCustom",
        Inputvalue_stringValue: "92 983 933 887",
        Inputvalue_textStyle: "TextBody",
        Label_stringValue: "Foo bar",
        Label_textStyle: "HeadingD",
        State_symbolID: "ErrorNormal",
        Errortext_stringValue: "This is the error text.",
        half_stringValue: "half",
        "spacing/Horizontal/spacing2x(16)_symbolID": "none",
        "spacing/Vertical/spacing1x(8)_symbolID": "",
        "spacing/Vertical/spacingHalf(4)_symbolID": "",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-field--default&Type=Custom&State=Invalid&Label=Foo%20bar&HelpText=Lorem%20Ipsum&ErrorText=This%20is%20the%20error%20text.",
    },
  },
  Checkbox: {
    Compact: {
      patternNameValues: ["Checkbox"],
      overrideValues: {
        State_symbolID: "CheckboxUnselectedNormal",
        Label_stringValue: "Lorem ipsum",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-checkbox--compact&Label=Lorem%20ipsum",
    },
    Comfortable: {
      patternNameValues: ["Checkbox"],
      overrideValues: {
        State_symbolID: "CheckboxComfortableUnselectedNormal",
        Label_stringValue: "Lorem ipsum",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-checkbox--comfortable&Label=Lorem%20ipsum",
    },
  },
  CheckboxGroup: {
    Compact: {
      patternNameValues: ["CheckboxGroup", "Compact"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabel",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-checkbox-group--compact&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum",
    },
    Comfortable: {
      patternNameValues: ["CheckboxGroup", "Comfortable"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabel",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-checkbox-group--comfortable&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum",
    },
    CompactError: {
      patternNameValues: ["CheckboxGroup", "Compact"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabelError",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        Errortext_stringValue: "Epic fail",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-checkbox-group--compact&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum&ErrorText=Epic%20fail",
    },
  },
  RadioGroup: {
    Compact: {
      patternNameValues: ["RadioGroup", "Compact"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabel",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-radio-group--compact&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum",
    },
    Comfortable: {
      patternNameValues: ["RadioGroup", "Comfortable"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabel",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-radio-group--comfortable&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum",
    },
    CompactError: {
      patternNameValues: ["RadioGroup", "Compact"],
      overrideValues: {
        LabelState_symbolID: "FormLabelsSM+XSGroupLabelError",
        Grouplabel_stringValue: "Lorem ipsum",
        "Helptext(Show/Hide)_symbolID": "AssistiveTextSM+XS+MDHelpText",
        Helptext_stringValue: "Dolor sit",
        Errortext_stringValue: "Epic fail",
        C1State_symbolID: "CheckboxCompactUnselectedNormal",
        Label_stringValue: "Checkbox label",
        C2State_symbolID: "CheckboxCompactUnselectedNormal",
        C3State_symbolID: "CheckboxCompactUnselectedNormal",
        C4State_symbolID: "CheckboxCompactUnselectedNormal",
        C5State_symbolID: "CheckboxCompactUnselectedNormal",
        C6State_symbolID: "CheckboxCompactUnselectedNormal",
      },
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-radio-group--compact&HelpText=Dolor%20sit&GroupLabel=Lorem%20ipsum&ErrorText=Epic%20fail",
    },
  },
  LinkList: {
    default: {
      patternNameValues: ["LinkList"],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-link-list--default",
    },
  },
  TextList: {
    bullet: {
      patternNameValues: ['TextList', 'Bullet'],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Content=Bullet%20List&Name=TextBodyShort"
    },
    number: {
      patternNameValues: ['TextList', 'Number'],
      url:
        "https://able-web-docs.apps.np.sdppcf.com/?path=/story/patterns-text-style--default&Content=Number%20List&Name=TextBodyShort"
    },
  },
};
