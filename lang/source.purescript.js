// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/purescript-contrib/atom-language-purescript>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.purs'],
  names: ['purescript'],
  patterns: [
    {include: '#module_declaration'},
    {include: '#module_import'},
    {include: '#type_synonym_declaration'},
    {include: '#data_type_declaration'},
    {include: '#typeclass_declaration'},
    {include: '#instance_declaration'},
    {include: '#derive_declaration'},
    {include: '#infix_op_declaration'},
    {include: '#foreign_import_data'},
    {include: '#foreign_import'},
    {include: '#function_type_declaration'},
    {include: '#function_type_declaration_arrow_first'},
    {include: '#typed_hole'},
    {include: '#keywords_orphan'},
    {include: '#control_keywords'},
    {include: '#function_infix'},
    {include: '#data_ctor'},
    {include: '#infix_op'},
    {include: '#constants_numeric_decimal'},
    {include: '#constant_numeric'},
    {include: '#constant_boolean'},
    {include: '#string_triple_quoted'},
    {include: '#string_single_quoted'},
    {include: '#string_double_quoted'},
    {include: '#markup_newline'},
    {include: '#string_double_colon_parens'},
    {include: '#double_colon_parens'},
    {include: '#double_colon_inlined'},
    {include: '#comments'},
    {match: '\\<-|-\\>', name: 'keyword.other.arrow.purescript'},
    {
      match: '[\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']]+',
      name: 'keyword.operator.purescript'
    },
    {match: ',', name: 'punctuation.separator.comma.purescript'}
  ],
  repository: {
    block_comment: {
      patterns: [
        {
          applyEndPatternLast: true,
          begin: '\\{-\\s*\\|',
          beginCaptures: {
            0: {name: 'punctuation.definition.comment.documentation.purescript'}
          },
          end: '-\\}',
          endCaptures: {
            0: {name: 'punctuation.definition.comment.documentation.purescript'}
          },
          name: 'comment.block.documentation.purescript',
          patterns: [{include: '#block_comment'}]
        },
        {
          applyEndPatternLast: true,
          begin: '\\{-',
          beginCaptures: {
            0: {name: 'punctuation.definition.comment.purescript'}
          },
          end: '-\\}',
          name: 'comment.block.purescript',
          patterns: [{include: '#block_comment'}]
        }
      ]
    },
    characters: {
      patterns: [
        {
          captures: {
            1: {name: 'constant.character.escape.purescript'},
            2: {name: 'constant.character.escape.octal.purescript'},
            3: {name: 'constant.character.escape.hexadecimal.purescript'},
            4: {name: 'constant.character.escape.control.purescript'}
          },
          match:
            '(?:[ -\\[\\]-~]|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_]))'
        }
      ]
    },
    class_constraint: {
      patterns: [
        {
          captures: {
            1: {
              patterns: [
                {
                  match:
                    "\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*",
                  name: 'entity.name.type.purescript'
                }
              ]
            },
            2: {patterns: [{include: '#type_name'}, {include: '#generic_type'}]}
          },
          match:
            "(?:(?:([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\s+)(?:(?<classConstraint>(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)(?:\\s*(?:\\s+)\\s*(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*))*)))",
          name: 'meta.class-constraint.purescript'
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: '(^[ \\t]+)?(?=--+)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.purescript'}
          },
          end: '(?!\\G)',
          patterns: [
            {
              begin: '--',
              beginCaptures: {
                0: {name: 'punctuation.definition.comment.purescript'}
              },
              end: '\\n',
              name: 'comment.line.double-dash.purescript'
            }
          ]
        },
        {include: '#block_comment'}
      ]
    },
    constant_boolean: {
      patterns: [
        {
          match: "\\b(true|false)(?!')\\b",
          name: 'constant.language.boolean.purescript'
        }
      ]
    },
    constant_numeric: {
      patterns: [
        {
          match: '\\b(([0-9]+_?)*[0-9]+|0([xX][0-9a-fA-F]+|[oO][0-7]+))\\b',
          name: 'constant.numeric.purescript'
        }
      ]
    },
    constants_numeric_decimal: {
      patterns: [
        {
          captures: {
            0: {name: 'constant.numeric.decimal.purescript'},
            1: {name: 'meta.delimiter.decimal.period.purescript'},
            2: {name: 'meta.delimiter.decimal.period.purescript'},
            3: {name: 'meta.delimiter.decimal.period.purescript'},
            4: {name: 'meta.delimiter.decimal.period.purescript'},
            5: {name: 'meta.delimiter.decimal.period.purescript'},
            6: {name: 'meta.delimiter.decimal.period.purescript'}
          },
          match:
            '(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9]+(\\.)[0-9]+[eE][+-]?[0-9]+\\b)| # 1.1E+3\n  (?:\\b[0-9]+[eE][+-]?[0-9]+\\b)|            # 1E+3\n  (?:\\b[0-9]+(\\.)[0-9]+\\b)|                # 1.1\n  (?:\\b[0-9]+\\b(?!\\.))                     # 1\n)(?!\\$)',
          name: 'constant.numeric.decimal.purescript'
        }
      ]
    },
    control_keywords: {
      patterns: [
        {
          match: "\\b(do|ado|if|then|else|case|of|let|in)(?!('|\\s*(:|=)))\\b",
          name: 'keyword.control.purescript'
        }
      ]
    },
    data_ctor: {
      patterns: [
        {
          match:
            "\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*",
          name: 'entity.name.tag.purescript'
        }
      ]
    },
    data_type_declaration: {
      patterns: [
        {
          begin: '^(\\s)*(data|newtype)\\s+(.+?)\\s*(?=\\=|$)',
          beginCaptures: {
            2: {name: 'storage.type.data.purescript'},
            3: {
              name: 'meta.type-signature.purescript',
              patterns: [{include: '#type_signature'}]
            }
          },
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.declaration.type.data.purescript',
          patterns: [
            {include: '#comments'},
            {captures: {2: {patterns: [{include: '#data_ctor'}]}}},
            {
              captures: {0: {name: 'keyword.operator.pipe.purescript'}},
              match: '\\|'
            },
            {include: '#record_types'},
            {include: '#type_signature'}
          ]
        }
      ]
    },
    derive_declaration: {
      patterns: [
        {
          begin: "^\\s*\\b(derive)(\\s+newtype)?(\\s+instance)?(?!')\\b",
          beginCaptures: {
            1: {name: 'keyword.other.purescript'},
            2: {name: 'keyword.other.purescript'},
            3: {name: 'keyword.other.purescript'},
            4: {name: 'keyword.other.purescript'}
          },
          contentName: 'meta.type-signature.purescript',
          end: '^(?=\\S)',
          endCaptures: {1: {name: 'keyword.other.purescript'}},
          name: 'meta.declaration.derive.purescript',
          patterns: [{include: '#type_signature'}]
        }
      ]
    },
    double_colon: {
      patterns: [
        {match: '(?:::|∷)', name: 'keyword.other.double-colon.purescript'}
      ]
    },
    double_colon_inlined: {
      patterns: [
        {
          patterns: [
            {
              captures: {
                1: {name: 'keyword.other.double-colon.purescript'},
                2: {
                  name: 'meta.type-signature.purescript',
                  patterns: [{include: '#type_signature'}]
                }
              },
              match: '((?:::|∷))(.*?)(?=<-| """)'
            }
          ]
        },
        {
          patterns: [
            {
              begin: '((?:::|∷))',
              beginCaptures: {
                1: {name: 'keyword.other.double-colon.purescript'}
              },
              end: '(?=^(\\s|\\S))',
              patterns: [{include: '#type_signature'}]
            }
          ]
        }
      ]
    },
    double_colon_orphan: {
      patterns: [
        {
          begin: '(\\s*)(?:(::|∷))(\\s*)$',
          beginCaptures: {2: {name: 'keyword.other.double-colon.purescript'}},
          end: '^(?!\\1[ \\t]*|[ \\t]*$)',
          patterns: [{include: '#type_signature'}]
        }
      ]
    },
    double_colon_parens: {
      patterns: [
        {
          captures: {
            1: {patterns: [{include: '$self'}]},
            2: {name: 'keyword.other.double-colon.purescript'},
            3: {
              name: 'meta.type-signature.purescript',
              patterns: [{include: '#type_signature'}]
            }
          },
          match:
            '\\((?<paren>(?:[^()]|\\(\\g<paren>\\))*)(::|∷)(?<paren2>(?:[^()}]|\\(\\g<paren2>\\))*)\\)'
        }
      ]
    },
    foreign_import: {
      patterns: [
        {
          begin:
            "^(\\s*)(foreign)\\s+(import)\\s+([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)",
          beginCaptures: {
            2: {name: 'keyword.other.purescript'},
            3: {name: 'keyword.other.purescript'},
            4: {name: 'entity.name.function.purescript'}
          },
          contentName: 'meta.type-signature.purescript',
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.foreign.purescript',
          patterns: [
            {include: '#double_colon'},
            {include: '#type_signature'},
            {include: '#record_types'}
          ]
        }
      ]
    },
    foreign_import_data: {
      patterns: [
        {
          begin:
            "^(\\s*)(foreign)\\s+(import)\\s+(data)\\s(?:\\s+([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\s*((?:::|∷)))?",
          beginCaptures: {
            2: {name: 'keyword.other.purescript'},
            3: {name: 'keyword.other.purescript'},
            4: {name: 'keyword.other.purescript'},
            5: {name: 'entity.name.type.purescript'},
            6: {name: 'keyword.other.double-colon.purescript'}
          },
          contentName: 'meta.kind-signature.purescript',
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.foreign.data.purescript',
          patterns: [
            {include: '#comments'},
            {include: '#type_signature'},
            {include: '#record_types'}
          ]
        }
      ]
    },
    function_infix: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.entity.purescript'},
            2: {name: 'punctuation.definition.entity.purescript'}
          },
          match:
            "(`)(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*.*(`)",
          name: 'keyword.operator.function.infix.purescript'
        }
      ]
    },
    function_type_declaration: {
      patterns: [
        {
          begin:
            "^(\\s*)([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\s*(?:(::|∷)(?!.*<-))",
          beginCaptures: {
            2: {name: 'entity.name.function.purescript'},
            3: {name: 'keyword.other.double-colon.purescript'}
          },
          contentName: 'meta.type-signature.purescript',
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.function.type-declaration.purescript',
          patterns: [
            {include: '#double_colon'},
            {include: '#type_signature'},
            {include: '#record_types'},
            {include: '#row_types'}
          ]
        }
      ]
    },
    function_type_declaration_arrow_first: {
      patterns: [
        {
          begin: '^(\\s*)(?:\\s(::|∷)(?!.*<-))',
          beginCaptures: {2: {name: 'keyword.other.double-colon.purescript'}},
          contentName: 'meta.type-signature.purescript',
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.function.type-declaration.purescript',
          patterns: [
            {include: '#double_colon'},
            {include: '#type_signature'},
            {include: '#record_types'},
            {include: '#row_types'}
          ]
        }
      ]
    },
    generic_type: {
      patterns: [
        {
          match:
            "\\b(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",
          name: 'variable.other.generic-type.purescript'
        }
      ]
    },
    infix_op: {
      patterns: [
        {
          match: '(?:\\((?!--+\\))[\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']]+\\))',
          name: 'entity.name.function.infix.purescript'
        }
      ]
    },
    infix_op_declaration: {
      patterns: [
        {
          begin: "^\\b(infix[l|r]?)(?!')\\b",
          beginCaptures: {1: {name: 'keyword.other.purescript'}},
          end: '($)',
          name: 'meta.infix.declaration.purescript',
          patterns: [
            {include: '#comments'},
            {include: '#data_ctor'},
            {match: ' \\d+ ', name: 'constant.numeric.purescript'},
            {
              captures: {1: {name: 'keyword.other.purescript'}},
              match: '([\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']]+)'
            },
            {
              captures: {
                1: {name: 'keyword.other.purescript'},
                2: {name: 'entity.name.type.purescript'}
              },
              match:
                "\\b(type)\\s+([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\b"
            },
            {
              captures: {1: {name: 'keyword.other.purescript'}},
              match: '\\b(as|type)\\b'
            }
          ]
        }
      ]
    },
    instance_declaration: {
      patterns: [
        {
          begin: "^\\s*\\b(else\\s+)?(newtype\\s+)?(instance)(?!')\\b",
          beginCaptures: {
            1: {name: 'keyword.other.purescript'},
            2: {name: 'keyword.other.purescript'},
            3: {name: 'keyword.other.purescript'},
            4: {name: 'keyword.other.purescript'}
          },
          contentName: 'meta.type-signature.purescript',
          end: '(\\bwhere\\b|(?=^\\S))',
          endCaptures: {1: {name: 'keyword.other.purescript'}},
          name: 'meta.declaration.instance.purescript',
          patterns: [{include: '#type_signature'}]
        }
      ]
    },
    keywords_orphan: {
      patterns: [
        {
          match:
            "^\\s*\\b(derive|where|data|type|newtype|foreign(\\s+import)?(\\s+data)?)(?!')\\b",
          name: 'keyword.other.purescript'
        }
      ]
    },
    kind_signature: {
      patterns: [
        {match: '\\*', name: 'keyword.other.star.purescript'},
        {match: '!', name: 'keyword.other.exclaimation-point.purescript'},
        {match: '#', name: 'keyword.other.pound-sign.purescript'},
        {match: '->|→', name: 'keyword.other.arrow.purescript'}
      ]
    },
    markup_newline: {
      patterns: [
        {match: '\\\\$', name: 'markup.other.escape.newline.purescript'}
      ]
    },
    module_declaration: {
      patterns: [
        {
          begin: "^\\s*\\b(module)(?!')\\b",
          beginCaptures: {1: {name: 'keyword.other.purescript'}},
          end: '(\\bwhere\\b)',
          endCaptures: {1: {name: 'keyword.other.purescript'}},
          name: 'meta.declaration.module.purescript',
          patterns: [
            {include: '#comments'},
            {include: '#module_name'},
            {include: '#module_exports'},
            {match: '[a-z]+', name: 'invalid.purescript'}
          ]
        }
      ]
    },
    module_exports: {
      patterns: [
        {
          begin: '\\(',
          end: '\\)',
          name: 'meta.declaration.exports.purescript',
          patterns: [
            {include: '#comments'},
            {
              match:
                "\\b(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",
              name: 'entity.name.function.purescript'
            },
            {include: '#type_name'},
            {match: ',', name: 'punctuation.separator.comma.purescript'},
            {include: '#infix_op'},
            {match: '\\(.*?\\)', name: 'meta.other.constructor-list.purescript'}
          ]
        }
      ]
    },
    module_import: {
      patterns: [
        {
          begin: "^\\s*\\b(import)(?!')\\b",
          beginCaptures: {1: {name: 'keyword.other.purescript'}},
          end: '^(?=\\S)',
          name: 'meta.import.purescript',
          patterns: [
            {include: '#module_name'},
            {include: '#string_double_quoted'},
            {include: '#comments'},
            {include: '#module_exports'},
            {
              captures: {1: {name: 'keyword.other.purescript'}},
              match: '\\b(as|hiding)\\b'
            }
          ]
        }
      ]
    },
    module_name: {
      patterns: [
        {
          match:
            "(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)*[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.?",
          name: 'support.other.module.purescript'
        }
      ]
    },
    record_field_declaration: {
      patterns: [
        {
          begin:
            "((?:[ ,])(?:\"(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\")|[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\s*(::|∷)",
          beginCaptures: {
            1: {
              patterns: [
                {
                  match:
                    "(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",
                  name: 'entity.other.attribute-name.purescript'
                },
                {
                  match:
                    '\\"([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\']*|[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\']*)\\"',
                  name: 'string.quoted.double.purescript'
                }
              ]
            },
            2: {name: 'keyword.other.double-colon.purescript'}
          },
          contentName: 'meta.type-signature.purescript',
          end: "(?=((?:[ ,])(?:\"(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\")|[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\s*(::|∷)|}| \\)|^(?!\\1[ \\t]|[ \\t]*$))",
          name: 'meta.record-field.type-declaration.purescript',
          patterns: [
            {include: '#record_types'},
            {include: '#type_signature'},
            {include: '#comments'}
          ]
        }
      ]
    },
    record_types: {
      patterns: [
        {
          begin: '\\{(?!-)',
          beginCaptures: {
            0: {name: 'keyword.operator.type.record.begin.purescript'}
          },
          end: '\\}',
          endCaptures: {
            0: {name: 'keyword.operator.type.record.end.purescript'}
          },
          name: 'meta.type.record.purescript',
          patterns: [
            {match: ',', name: 'punctuation.separator.comma.purescript'},
            {include: '#comments'},
            {include: '#record_field_declaration'},
            {include: '#type_signature'}
          ]
        }
      ]
    },
    row_types: {
      patterns: [
        {
          begin:
            '\\((?=\\s*([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\']*|"[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\']*"|"[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\']*")\\s*(::|∷))',
          end: '(?=^\\S)',
          name: 'meta.type.row.purescript',
          patterns: [
            {match: ',', name: 'punctuation.separator.comma.purescript'},
            {include: '#comments'},
            {include: '#record_field_declaration'},
            {include: '#type_signature'}
          ]
        }
      ]
    },
    string_double_colon_parens: {
      patterns: [
        {
          captures: {
            1: {patterns: [{include: '$self'}]},
            2: {patterns: [{include: '$self'}]}
          },
          match:
            '\\((.*?)("(?:[ -\\[\\]-~]|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_]))*(::|∷)((?:[ -\\[\\]-~]|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_])))*")'
        }
      ]
    },
    string_double_quoted: {
      patterns: [
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.purescript'}
          },
          end: '"',
          endCaptures: {
            0: {name: 'punctuation.definition.string.end.purescript'}
          },
          name: 'string.quoted.double.purescript',
          patterns: [
            {include: '#characters'},
            {
              begin: '\\\\\\s',
              beginCaptures: {
                0: {name: 'markup.other.escape.newline.begin.purescript'}
              },
              end: '\\\\',
              endCaptures: {
                0: {name: 'markup.other.escape.newline.end.purescript'}
              },
              patterns: [
                {
                  match: '\\S+',
                  name: 'invalid.illegal.character-not-allowed-here.purescript'
                }
              ]
            }
          ]
        }
      ]
    },
    string_single_quoted: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.string.begin.purescript'},
            2: {patterns: [{include: '#characters'}]},
            7: {name: 'punctuation.definition.string.end.purescript'}
          },
          match:
            "(')((?:[ -\\[\\]-~]|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\\"'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_])))(')",
          name: 'string.quoted.single.purescript'
        }
      ]
    },
    string_triple_quoted: {
      patterns: [
        {
          begin: '"""',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.purescript'}
          },
          end: '"""',
          endCaptures: {
            0: {name: 'punctuation.definition.string.end.purescript'}
          },
          name: 'string.quoted.triple.purescript'
        }
      ]
    },
    type_kind_signature: {
      patterns: [
        {
          begin:
            "^(data|newtype)\\s+([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\s*((?:::|∷))",
          beginCaptures: {
            1: {name: 'storage.type.data.purescript'},
            2: {
              name: 'meta.type-signature.purescript',
              patterns: [{include: '#type_signature'}]
            },
            3: {name: 'keyword.other.double-colon.purescript'}
          },
          end: '(?=^\\S)',
          name: 'meta.declaration.type.data.signature.purescript',
          patterns: [
            {include: '#type_signature'},
            {
              captures: {0: {name: 'keyword.operator.assignment.purescript'}},
              match: '='
            },
            {
              captures: {
                1: {patterns: [{include: '#data_ctor'}]},
                2: {
                  name: 'meta.type-signature.purescript',
                  patterns: [{include: '#type_signature'}]
                }
              },
              match:
                "(?:(?:\\b([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\s+)(?:(?<ctorArgs>(?:(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*|(?:(?:[\\w()'→⇒\\[\\],]|->|=>)+\\s*)+))(?:\\s*(?:\\s+)\\s*(?:(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*|(?:(?:[\\w()'→⇒\\[\\],]|->|=>)+\\s*)+)))*)?))"
            },
            {
              captures: {0: {name: 'keyword.operator.pipe.purescript'}},
              match: '\\|'
            },
            {include: '#record_types'}
          ]
        }
      ]
    },
    type_name: {
      patterns: [
        {
          match:
            "\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*",
          name: 'entity.name.type.purescript'
        }
      ]
    },
    type_signature: {
      patterns: [
        {include: '#record_types'},
        {
          captures: {
            1: {patterns: [{include: '#class_constraint'}]},
            6: {name: 'keyword.other.big-arrow.purescript'}
          },
          match:
            "(?:(?:\\()(?:(?<classConstraints>(?:(?:(?:([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\s+)(?:(?<classConstraint>(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)(?:\\s*(?:\\s+)\\s*(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*))*))))(?:\\s*(?:,)\\s*(?:(?:(?:([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\s+)(?:(?<classConstraint>(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)(?:\\s*(?:\\s+)\\s*(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*))*)))))*))(?:\\))(?:\\s*(=>|<=|⇐|⇒)))",
          name: 'meta.class-constraints.purescript'
        },
        {
          captures: {
            1: {patterns: [{include: '#class_constraint'}]},
            4: {name: 'keyword.other.big-arrow.purescript'}
          },
          match:
            "((?:(?:([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*)\\s+)(?:(?<classConstraint>(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)(?:\\s*(?:\\s+)\\s*(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*|(?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?:\\.[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)*\\.)?[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*))*))))\\s*(=>|<=|⇐|⇒)",
          name: 'meta.class-constraints.purescript'
        },
        {
          match: '(?<![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']])(->|→)',
          name: 'keyword.other.arrow.purescript'
        },
        {
          match: '(?<![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']])(=>|⇒)',
          name: 'keyword.other.big-arrow.purescript'
        },
        {match: '<=|⇐', name: 'keyword.other.big-arrow-left.purescript'},
        {match: 'forall|∀', name: 'keyword.other.forall.purescript'},
        {include: '#string_double_quoted'},
        {include: '#generic_type'},
        {include: '#type_name'},
        {include: '#comments'},
        {
          match: '[\\p{S}\\p{P}&&[^(),;\\[\\]`{}_"\']]+',
          name: 'keyword.other.purescript'
        }
      ]
    },
    type_synonym_declaration: {
      patterns: [
        {
          begin: '^(\\s)*(type)\\s+(.+?)\\s*(?=\\=|$)',
          beginCaptures: {
            2: {name: 'storage.type.data.purescript'},
            3: {
              name: 'meta.type-signature.purescript',
              patterns: [{include: '#type_signature'}]
            }
          },
          contentName: 'meta.type-signature.purescript',
          end: '^(?!\\1[ \\t]|[ \\t]*$)',
          name: 'meta.declaration.type.type.purescript',
          patterns: [
            {
              captures: {0: {name: 'keyword.operator.assignment.purescript'}},
              match: '='
            },
            {include: '#type_signature'},
            {include: '#record_types'},
            {include: '#row_types'},
            {include: '#comments'}
          ]
        }
      ]
    },
    typeclass_declaration: {
      patterns: [
        {
          begin: "^\\s*\\b(class)(?!')\\b",
          beginCaptures: {1: {name: 'storage.type.class.purescript'}},
          end: '(\\bwhere\\b|(?=^\\S))',
          endCaptures: {1: {name: 'keyword.other.purescript'}},
          name: 'meta.declaration.typeclass.purescript',
          patterns: [{include: '#type_signature'}]
        }
      ]
    },
    typed_hole: {
      patterns: [
        {
          match:
            "\\?(?:[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*|[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)",
          name: 'entity.name.function.typed-hole.purescript'
        }
      ]
    }
  },
  scopeName: 'source.purescript'
}

export default grammar
