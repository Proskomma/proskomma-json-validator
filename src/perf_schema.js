export default ({

    "$defs": {

        contentElement: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                },
                number: {type: "string"},
                subType: {
                    type: "string",
                    enum: [
                        "verses",
                        "xref",
                        "footnote",
                        "noteCaller",
                    ],
                },
                target: {type: "string"},
                nBlocks: {type: "integer"},
                previewText: {type: "string"},
            },
            required: ["type"],
            additionalProperties: false,
        },

        blockOrGraft: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: ["block", "graft"],
                    },
                    subType: {type: "string"},
                    target: {type: "string"},
                    nBlocks: {type: "integer"},
                    previewText: {type: "string"},
                    firstBlockScope: {type: "string"},
                    content: {
                        type: "array",
                        items: {
                            oneOf: [
                                {type: "string"},
                                {"$ref": "#/$defs/contentElement"},
                            ]
                        }
                    },
                },
                required: ["type", "subType"],
                additionalProperties: false,
                if: {properties: {type: {enum: ["block"]}}},
                then: {
                    required: [
                        'content',
                    ],
                },
                else: {
                    required: [
                        'target',
                        'nBlocks',
                        'previewText',
                        'firstBlockScope',
                    ]
                },
            },
        },

        sequence: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: [
                        "main",
                        "introduction",
                        "introTitle",
                        "IntroEndTitle",
                        "title",
                        "endTitle",
                        "heading",
                        "remark",
                        "sidebar",
                        "table",
                        "tree",
                        "kv",
                        "footnote",
                        "noteCaller",
                        "xref",
                        "pubNumber",
                        "altNumber",
                        "esbCat",
                        "fig",
                        "temp",
                    ],
                },
                nBlocks: {type: "integer"},
                firstBlockScope: {type: "string"},
                previewText: {type: "string"},
                selected: {type: "boolean"},
                blocks: {"$ref": "#/$defs/blockOrGraft"},
            },
            required: [
                "type",
                "selected",
            ],
            additionalProperties: false,
            if: {properties: {selected: {enum: [true]}}},
            then: {
                allOf: [
                    {required: ['blocks']},
                ],
            },
            else: {
                required: [
                    "nBlocks",
                    "firstBlockScope",
                    "previewText",
                ],
            },
        },
        document: {
            type: "object",
            properties: {
                headers: {
                    type: "object",
                    propertyNames: {
                        pattern: "^\\S+$",
                    },
                    additionalProperties: {
                        type: "string",
                    },
                },
                tags: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                sequences: {
                    type: "object",
                    propertyNames: {
                        pattern: "^\\S+$",
                    },
                    additionalProperties: {
                        "$ref": "#/$defs/sequence",
                    },
                },
                mainSequence: {type: "string"},
            },
            required: ["headers", "tags", "sequences", "mainSequence"],
        },
        docSet: {
            type: "object",
            properties: {
                selectors: {
                    type: "object",
                    minProperties: 1,
                    maxProperties: 6,
                    propertyNames: {
                        pattern: "^\\S+$",
                    },
                    additionalProperties: {
                        type: "string",
                    },
                },
                tags: {
                    type: "array",
                    items: {
                        type: "string",
                    }
                },
                documents: {
                    type: "object",
                    propertyNames: {
                        pattern: "^[A-Z0-9]{3}$",
                    },
                    additionalProperties: {"$ref": "#/$defs/document"},
                }
            },
            required: ["selectors", "tags", "documents"],
        },
    },
    type: "object",
    properties: {
        docSets: {
            type: "object",
            propertyNames: {
                pattern: "^\\S+$",
            },
            additionalProperties: {"$ref": "#/$defs/docSet"},
        },
    },
    required: ['docSets'],
    additionalProperties: false,
});
