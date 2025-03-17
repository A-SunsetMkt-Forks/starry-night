// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/shader-slang/slang-vscode-extension>
// and licensed `apache-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.slang'],
  names: ['slang'],
  patterns: [
    {include: '#preprocessor-rule-enabled'},
    {include: '#preprocessor-rule-disabled'},
    {include: '#preprocessor-rule-conditional'},
    {include: '#predefined_macros'},
    {include: '#comments'},
    {include: '#switch_statement'},
    {
      match:
        '\\b(break|continue|do|else|for|goto|if|return|while|try|throw|catch|defer|discard)\\b',
      name: 'keyword.control.slang'
    },
    {include: '#storage_types'},
    {match: 'typedef', name: 'keyword.other.typedef.slang'},
    {
      match:
        '\\b(throws|using|__generic|func|associatedtype|public|internal|private|import|module|implementing|__include|export|__exported|groupshared|let|var|property|extension|in|out|inout|ref|namespace|this|cbuffer|tbuffer|(dynamic_)?uniform|typealias|new|__extern_cpp|__(target|stage)_intrinsic|__intrinsic_asm|spirv_asm|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref|expand|each|where|typename)\\b',
      name: 'keyword.other.additional.slang'
    },
    {
      match:
        '\\b(const|extern|register|restrict|static|volatile|inline|nointerpolation|precise|row_major|column_major|snorm|unorm|globallycoherent|layout)\\b',
      name: 'storage.modifier.slang'
    },
    {
      match: '\\bk[A-Z]\\w*\\b',
      name: 'constant.other.variable.mac-classic.slang'
    },
    {
      match: '\\bg[A-Z]\\w*\\b',
      name: 'variable.other.readwrite.global.mac-classic.slang'
    },
    {
      match: '\\bs[A-Z]\\w*\\b',
      name: 'variable.other.readwrite.static.mac-classic.slang'
    },
    {match: '\\b(nullptr|none|true|false)\\b', name: 'constant.language.slang'},
    {include: '#operators'},
    {include: '#numbers'},
    {include: '#strings'},
    {
      begin:
        '((?:(?:(?>\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+?|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z)))((#)\\s*define\\b)\\s+((?<!\\w)[a-zA-Z_]\\w*(?!\\w))(?:(\\()([^()\\\\]+)(\\)))?',
      beginCaptures: {
        1: {patterns: [{include: '#inline_comment'}]},
        10: {name: 'punctuation.definition.parameters.end.slang'},
        2: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        3: {name: 'comment.block.slang'},
        4: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        5: {name: 'keyword.control.directive.define.slang'},
        6: {name: 'punctuation.definition.directive.slang'},
        7: {name: 'entity.name.function.preprocessor.slang'},
        8: {name: 'punctuation.definition.parameters.begin.slang'},
        9: {
          patterns: [
            {
              captures: {1: {name: 'variable.parameter.preprocessor.slang'}},
              match: '(?<=[(,])\\s*((?<!\\w)[a-zA-Z_]\\w*(?!\\w))\\s*'
            },
            {match: ',', name: 'punctuation.separator.parameters.slang'},
            {
              match: '\\.\\.\\.',
              name: 'ellipses.slang punctuation.vararg-ellipses.variable.parameter.preprocessor.slang'
            }
          ]
        }
      },
      end: '(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.macro.slang',
      patterns: [{include: '#preprocessor-rule-define-line-contents'}]
    },
    {
      begin: '^\\s*((#)\\s*(error|warning))\\b\\s*',
      beginCaptures: {
        1: {name: 'keyword.control.directive.diagnostic.$3.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.diagnostic.slang',
      patterns: [
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: '"|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.double.slang',
          patterns: [{include: '#line_continuation_character'}]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: "'|(?<!\\\\)(?=\\s*\\n)",
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.single.slang',
          patterns: [{include: '#line_continuation_character'}]
        },
        {
          begin: '[^\'"]',
          end: '(?<!\\\\)(?=\\s*\\n)',
          name: 'string.unquoted.single.slang',
          patterns: [
            {include: '#line_continuation_character'},
            {include: '#comments'}
          ]
        }
      ]
    },
    {
      begin:
        '^\\s*((#)\\s*(include(?:_next)?|import|module|implementing|__include))\\b\\s*',
      beginCaptures: {
        1: {name: 'keyword.control.directive.$3.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=(?://|/\\*))|(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.include.slang',
      patterns: [
        {include: '#line_continuation_character'},
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.double.include.slang'
        },
        {
          begin: '<',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: '>',
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.other.lt-gt.include.slang'
        }
      ]
    },
    {include: '#pragma-mark'},
    {include: '#preprocessor-version'},
    {
      begin: '^\\s*((#)\\s*line)\\b',
      beginCaptures: {
        1: {name: 'keyword.control.directive.line.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=(?://|/\\*))|(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.slang',
      patterns: [
        {include: '#strings'},
        {include: '#numbers'},
        {include: '#line_continuation_character'}
      ]
    },
    {
      begin: '^\\s*(?:((#)\\s*undef))\\b',
      beginCaptures: {
        1: {name: 'keyword.control.directive.undef.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=(?://|/\\*))|(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.slang',
      patterns: [
        {
          match: '[a-zA-Z_$][\\w$]*',
          name: 'entity.name.function.preprocessor.slang'
        },
        {include: '#line_continuation_character'}
      ]
    },
    {
      begin: '^\\s*(?:((#)\\s*pragma))\\b',
      beginCaptures: {
        1: {name: 'keyword.control.directive.pragma.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=(?://|/\\*))|(?<!\\\\)(?=\\n)',
      name: 'meta.preprocessor.pragma.slang',
      patterns: [
        {include: '#strings'},
        {
          match: '[a-zA-Z_$][\\w\\-$]*',
          name: 'entity.other.attribute-name.pragma.preprocessor.slang'
        },
        {include: '#numbers'},
        {include: '#line_continuation_character'}
      ]
    },
    {
      match:
        '(?x) \\b\n(int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|intptr_t|uintptr_t)\n\\b',
      name: 'support.type.stdint.slang'
    },
    {match: '(?x) \\b(string)\\b', name: 'support.type.string.slang'},
    {match: '(?x) \\b(Ptr)\\b', name: 'support.type.ptr.slang'},
    {
      match:
        '(?x) \\b((RW)?StructuredBuffer|(RW)?Buffer|(RW)?ByteAddressBuffer|ConstantBuffer|ParameterBlock|(RW)?Texture([1-3]D|Cube)(MS)?(Array)?|Sampler(Comparison)?State|RaytracingAccelerationStructure)\\b',
      name: 'support.type.hlsl.slang'
    },
    {
      match: '(?x) \\b(bool|char|half|float|int|double|uint)[1-4](x[1-4])?\\b',
      name: 'support.type.vector.slang'
    },
    {include: '#block'},
    {include: '#parens'},
    {include: '#line_continuation_character'},
    {
      begin: '([a-zA-Z_][a-zA-Z_0-9]*|(?<=[\\]\\)]))?(\\[)(?!\\])',
      beginCaptures: {
        1: {name: 'variable.object.slang'},
        2: {name: 'punctuation.definition.begin.bracket.square.slang'}
      },
      end: '\\]',
      endCaptures: {
        0: {name: 'punctuation.definition.end.bracket.square.slang'}
      },
      name: 'meta.bracket.square.access.slang',
      patterns: [{include: '#function-call-innards'}]
    },
    {match: '\\[\\s*\\]', name: 'storage.modifier.array.bracket.square.slang'},
    {match: ';', name: 'punctuation.terminator.statement.slang'},
    {match: ',', name: 'punctuation.separator.delimiter.slang'}
  ],
  repository: {
    'access-method': {
      begin:
        '([a-zA-Z_][a-zA-Z_0-9]*|(?<=[\\]\\)]))\\s*(?:(\\.)|(->))((?:(?:[a-zA-Z_][a-zA-Z_0-9]*)\\s*(?:(?:\\.)|(?:->)))*)\\s*([a-zA-Z_][a-zA-Z_0-9]*)(\\()',
      beginCaptures: {
        1: {name: 'variable.object.slang'},
        2: {name: 'punctuation.separator.dot-access.slang'},
        3: {name: 'punctuation.separator.pointer-access.slang'},
        4: {
          patterns: [
            {match: '\\.', name: 'punctuation.separator.dot-access.slang'},
            {match: '->', name: 'punctuation.separator.pointer-access.slang'},
            {match: '[a-zA-Z_][a-zA-Z_0-9]*', name: 'variable.object.slang'},
            {match: '.+', name: 'everything.else.slang'}
          ]
        },
        5: {name: 'entity.name.function.member.slang'},
        6: {
          name: 'punctuation.section.arguments.begin.bracket.round.function.member.slang'
        }
      },
      end: '\\)',
      endCaptures: {
        0: {
          name: 'punctuation.section.arguments.end.bracket.round.function.member.slang'
        }
      },
      name: 'meta.function-call.member.slang',
      patterns: [{include: '#function-call-innards'}]
    },
    backslash_escapes: {
      match:
        '(?x)\\\\ (\n\\\\\t\t\t |\n[abefnprtv\'"?]   |\n[0-3][0-7]{,2}\t |\n[4-7]\\d?\t\t|\nx[a-fA-F0-9]{,2} |\nu[a-fA-F0-9]{,4} |\nU[a-fA-F0-9]{,8} )',
      name: 'constant.character.escape.slang'
    },
    block: {
      patterns: [
        {
          begin: '{',
          beginCaptures: {
            0: {name: 'punctuation.section.block.begin.bracket.curly.slang'}
          },
          end: '}|(?=\\s*#\\s*(?:elif|else|endif)\\b)',
          endCaptures: {
            0: {name: 'punctuation.section.block.end.bracket.curly.slang'}
          },
          name: 'meta.block.slang',
          patterns: [{include: '#block_innards'}]
        }
      ]
    },
    block_innards: {
      patterns: [
        {include: '#preprocessor-rule-enabled-block'},
        {include: '#preprocessor-rule-disabled-block'},
        {include: '#preprocessor-rule-conditional-block'},
        {include: '#method_access'},
        {include: '#member_access'},
        {include: '#c_function_call'},
        {
          begin:
            '(?x)\n(?:\n  (?:\n\t(?=\\s)(?<!else|new|return)\n\t(?<=\\w) \\s+(and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|alignof|alignas|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref)  # or word + space before name\n  )\n)\n(\n  (?:[A-Za-z_][A-Za-z0-9_]*+ | :: )++   # actual name\n  |\n  (?:(?<=operator) (?:[-*&<>=+!]+ | \\(\\) | \\[\\]))\n)\n\\s*(\\() # opening bracket',
          beginCaptures: {
            1: {name: 'variable.other.slang'},
            2: {
              name: 'punctuation.section.parens.begin.bracket.round.initialization.slang'
            }
          },
          end: '\\)',
          endCaptures: {
            0: {
              name: 'punctuation.section.parens.end.bracket.round.initialization.slang'
            }
          },
          name: 'meta.initialization.slang',
          patterns: [{include: '#function-call-innards'}]
        },
        {
          begin: '{',
          beginCaptures: {
            0: {name: 'punctuation.section.block.begin.bracket.curly.slang'}
          },
          end: '}|(?=\\s*#\\s*(?:elif|else|endif)\\b)',
          endCaptures: {
            0: {name: 'punctuation.section.block.end.bracket.curly.slang'}
          },
          patterns: [{include: '#block_innards'}]
        },
        {include: '#parens-block'},
        {include: '$base'}
      ]
    },
    c_conditional_context: {
      patterns: [{include: '$self'}, {include: '#block_innards'}]
    },
    c_function_call: {
      begin:
        '(?x)\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|countof|where|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref|__target_intrinsic|__intrinsic_asm|spirv_asm|expand|each)\\s*\\()\n(?=\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++\\s*\\(  # actual name\n|\n(?:(?<=operator)(?:[-*&<>=+!]+|\\(\\)|\\[\\]))\\s*\\(\n)',
      end: '(?<=\\))(?!\\w)',
      name: 'meta.function-call.slang',
      patterns: [{include: '#function-call-innards'}]
    },
    case_statement: {
      begin:
        '((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))((?<!\\w)case(?!\\w))',
      beginCaptures: {
        1: {patterns: [{include: '#inline_comment'}]},
        2: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        3: {name: 'comment.block.slang'},
        4: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        5: {name: 'keyword.control.case.slang'}
      },
      end: '(:)',
      endCaptures: {1: {name: 'punctuation.separator.colon.case.slang'}},
      name: 'meta.conditional.case.slang',
      patterns: [
        {include: '#evaluation_context'},
        {include: '#c_conditional_context'}
      ]
    },
    comments: {
      patterns: [
        {
          begin: '(?:^)(?>\\s*)(\\/\\/[!\\/]+)',
          beginCaptures: {
            1: {name: 'punctuation.definition.comment.documentation.slang'}
          },
          end: '(?<=\\n)(?<!\\\\\\n)',
          name: 'comment.line.double-slash.documentation.slang',
          patterns: [
            {include: '#line_continuation_character'},
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.italic.doxygen.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@](?:a|em|e))\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.bold.doxygen.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@]b)\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.inline.raw.string.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@](?:c|p))\\s+(\\S+)'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {
                  patterns: [
                    {
                      match: 'in|out|ref',
                      name: 'keyword.other.parameter.direction.$0.slang'
                    }
                  ]
                },
                3: {name: 'variable.parameter.slang'}
              },
              match:
                '((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?\\s*(?:in|out)\\s*)+)\\])?\\s+(\\b\\w+\\b)'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|uml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match: '(?:\\b[A-Z]+:|@[a-z_]+:)',
              name: 'storage.type.class.gtkdoc'
            }
          ]
        },
        {
          captures: {
            1: {
              name: 'punctuation.definition.comment.begin.documentation.slang'
            },
            2: {
              patterns: [
                {
                  match:
                    '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
                  name: 'storage.type.class.doxygen.slang'
                },
                {
                  captures: {
                    1: {name: 'storage.type.class.doxygen.slang'},
                    2: {name: 'markup.italic.doxygen.slang'}
                  },
                  match: '((?<=[\\s*!\\/])[\\\\@](?:a|em|e))\\s+(\\S+)'
                },
                {
                  captures: {
                    1: {name: 'storage.type.class.doxygen.slang'},
                    2: {name: 'markup.bold.doxygen.slang'}
                  },
                  match: '((?<=[\\s*!\\/])[\\\\@]b)\\s+(\\S+)'
                },
                {
                  captures: {
                    1: {name: 'storage.type.class.doxygen.slang'},
                    2: {name: 'markup.inline.raw.string.slang'}
                  },
                  match: '((?<=[\\s*!\\/])[\\\\@](?:c|p))\\s+(\\S+)'
                },
                {
                  match:
                    '(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?',
                  name: 'storage.type.class.doxygen.slang'
                },
                {
                  match:
                    '(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?',
                  name: 'storage.type.class.doxygen.slang'
                },
                {
                  captures: {
                    1: {name: 'storage.type.class.doxygen.slang'},
                    2: {
                      patterns: [
                        {
                          match: 'in|out',
                          name: 'keyword.other.parameter.direction.$0.slang'
                        }
                      ]
                    },
                    3: {name: 'variable.parameter.slang'}
                  },
                  match:
                    '((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?\\s*(?:in|out)\\s*)+)\\])?\\s+(\\b\\w+\\b)'
                },
                {
                  match:
                    '(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?',
                  name: 'storage.type.class.doxygen.slang'
                },
                {
                  match:
                    '(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|uml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?',
                  name: 'storage.type.class.doxygen.slang'
                },
                {
                  match: '(?:\\b[A-Z]+:|@[a-z_]+:)',
                  name: 'storage.type.class.gtkdoc'
                }
              ]
            },
            3: {name: 'punctuation.definition.comment.end.documentation.slang'}
          },
          match: '(\\/\\*[!*]+(?=\\s))(.+)([!*]*\\*\\/)',
          name: 'comment.block.documentation.slang'
        },
        {
          begin: '((?>\\s*)\\/\\*[!*]+(?:(?:\\n|$)|(?=\\s)))',
          beginCaptures: {
            1: {
              name: 'punctuation.definition.comment.begin.documentation.slang'
            }
          },
          end: '([!*]*\\*\\/)',
          endCaptures: {
            1: {name: 'punctuation.definition.comment.end.documentation.slang'}
          },
          name: 'comment.block.documentation.slang',
          patterns: [
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.italic.doxygen.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@](?:a|em|e))\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.bold.doxygen.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@]b)\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {name: 'markup.inline.raw.string.slang'}
              },
              match: '((?<=[\\s*!\\/])[\\\\@](?:c|p))\\s+(\\S+)'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              captures: {
                1: {name: 'storage.type.class.doxygen.slang'},
                2: {
                  patterns: [
                    {
                      match: 'in|out',
                      name: 'keyword.other.parameter.direction.$0.slang'
                    }
                  ]
                },
                3: {name: 'variable.parameter.slang'}
              },
              match:
                '((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?\\s*(?:in|out)\\s*)+)\\])?\\s+(\\b\\w+\\b)'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match:
                '(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|uml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?',
              name: 'storage.type.class.doxygen.slang'
            },
            {
              match: '(?:\\b[A-Z]+:|@[a-z_]+:)',
              name: 'storage.type.class.gtkdoc'
            }
          ]
        },
        {
          captures: {1: {name: 'meta.toc-list.banner.block.slang'}},
          match: '^\\/\\* =(\\s*.*?)\\s*= \\*\\/$\\n?',
          name: 'comment.block.banner.slang'
        },
        {
          begin: '(\\/\\*)',
          beginCaptures: {
            1: {name: 'punctuation.definition.comment.begin.slang'}
          },
          end: '(\\*\\/)',
          endCaptures: {1: {name: 'punctuation.definition.comment.end.slang'}},
          name: 'comment.block.slang'
        },
        {
          captures: {1: {name: 'meta.toc-list.banner.line.slang'}},
          match: '^\\/\\/ =(\\s*.*?)\\s*=$\\n?',
          name: 'comment.line.banner.slang'
        },
        {
          begin: '((?:^[ \\t]+)?)(?=\\/\\/)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.slang'}
          },
          end: '(?!\\G)',
          patterns: [
            {
              begin: '(\\/\\/)',
              beginCaptures: {
                1: {name: 'punctuation.definition.comment.slang'}
              },
              end: '(?=\\n)',
              name: 'comment.line.double-slash.slang',
              patterns: [{include: '#line_continuation_character'}]
            }
          ]
        }
      ]
    },
    default_statement: {
      begin:
        '((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))((?<!\\w)default(?!\\w))',
      beginCaptures: {
        1: {patterns: [{include: '#inline_comment'}]},
        2: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        3: {name: 'comment.block.slang'},
        4: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        5: {name: 'keyword.control.default.slang'}
      },
      end: '(:)',
      endCaptures: {
        1: {name: 'punctuation.separator.colon.case.default.slang'}
      },
      name: 'meta.conditional.case.slang',
      patterns: [
        {include: '#evaluation_context'},
        {include: '#c_conditional_context'}
      ]
    },
    disabled: {
      begin: '^\\s*#\\s*if(n?def)?\\b.*$',
      end: '^\\s*#\\s*endif\\b',
      patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
    },
    evaluation_context: {
      patterns: [{include: '#function-call-innards'}, {include: '$base'}]
    },
    'function-call-innards': {
      patterns: [
        {include: '#comments'},
        {include: '#storage_types'},
        {include: '#method_access'},
        {include: '#member_access'},
        {include: '#operators'},
        {
          begin:
            '(?x)\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|countof|where|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref|expand|each)\\s*\\()\n(\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\n|\n(?:(?<=operator)(?:[-*&<>=+!]+|\\(\\)|\\[\\]))\n)\n\\s*(\\()',
          beginCaptures: {
            1: {name: 'entity.name.function.slang'},
            2: {name: 'punctuation.section.arguments.begin.bracket.round.slang'}
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.section.arguments.end.bracket.round.slang'}
          },
          patterns: [{include: '#function-call-innards'}]
        },
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.section.parens.end.bracket.round.slang'}
          },
          patterns: [{include: '#function-call-innards'}]
        },
        {include: '#block_innards'}
      ]
    },
    'function-innards': {
      patterns: [
        {include: '#comments'},
        {include: '#storage_types'},
        {include: '#operators'},
        {include: '#vararg_ellipses'},
        {
          begin:
            '(?x)\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|countof|where|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref|expand|each)\\s*\\()\n(\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\n|\n(?:(?<=operator)(?:[-*&<>=+!]+|\\(\\)|\\[\\]))\n)\n\\s*(\\()',
          beginCaptures: {
            1: {name: 'entity.name.function.slang'},
            2: {
              name: 'punctuation.section.parameters.begin.bracket.round.slang'
            }
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.section.parameters.end.bracket.round.slang'}
          },
          name: 'meta.function.definition.parameters.slang',
          patterns: [
            {include: '#probably_a_parameter'},
            {include: '#function-innards'}
          ]
        },
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.section.parens.end.bracket.round.slang'}
          },
          patterns: [{include: '#function-innards'}]
        },
        {include: '$base'}
      ]
    },
    inline_comment: {
      captures: {
        1: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        2: {name: 'comment.block.slang'},
        3: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        }
      },
      match: '(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/))'
    },
    line_continuation_character: {
      patterns: [
        {
          captures: {
            1: {name: 'constant.character.escape.line-continuation.slang'}
          },
          match: '(\\\\)\\n'
        }
      ]
    },
    member_access: {
      captures: {
        1: {name: 'variable.other.object.access.slang'},
        2: {name: 'punctuation.separator.dot-access.slang'},
        3: {name: 'punctuation.separator.pointer-access.slang'},
        4: {
          patterns: [
            {include: '#member_access'},
            {include: '#method_access'},
            {
              captures: {
                1: {name: 'variable.other.object.access.slang'},
                2: {name: 'punctuation.separator.dot-access.slang'},
                3: {name: 'punctuation.separator.pointer-access.slang'}
              },
              match:
                '((?:[a-zA-Z_]\\w*|(?<=\\]|\\)))\\s*)(?:((?:\\.\\*|\\.))|((?:->\\*|->)))'
            }
          ]
        },
        5: {name: 'variable.other.member.slang'}
      },
      match:
        '((?:[a-zA-Z_]\\w*|(?<=\\]|\\)))\\s*)(?:((?:\\.\\*|\\.))|((?:->\\*|->)))((?:[a-zA-Z_]\\w*\\s*(?:(?:(?:\\.\\*|\\.))|(?:(?:->\\*|->)))\\s*)*)\\s*(\\b(?!(?:atomic_uint_least64_t|atomic_uint_least16_t|atomic_uint_least32_t|atomic_uint_least8_t|atomic_int_least16_t|atomic_uint_fast64_t|atomic_uint_fast32_t|atomic_int_least64_t|atomic_int_least32_t|pthread_rwlockattr_t|atomic_uint_fast16_t|pthread_mutexattr_t|atomic_int_fast16_t|atomic_uint_fast8_t|atomic_int_fast64_t|atomic_int_least8_t|atomic_int_fast32_t|atomic_int_fast8_t|pthread_condattr_t|atomic_uintptr_t|atomic_ptrdiff_t|pthread_rwlock_t|atomic_uintmax_t|pthread_mutex_t|atomic_intmax_t|atomic_intptr_t|atomic_char32_t|atomic_char16_t|pthread_attr_t|atomic_wchar_t|uint_least64_t|uint_least32_t|uint_least16_t|pthread_cond_t|pthread_once_t|uint_fast64_t|uint_fast16_t|atomic_size_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|pthread_key_t|atomic_ullong|atomic_ushort|uint_fast32_t|atomic_schar|atomic_short|uint_fast8_t|int_fast64_t|int_fast32_t|int_fast16_t|atomic_ulong|atomic_llong|int_least8_t|atomic_uchar|memory_order|suseconds_t|int_fast8_t|atomic_bool|atomic_char|atomic_uint|atomic_long|atomic_int|useconds_t|_Imaginary|blksize_t|pthread_t|in_addr_t|uintptr_t|in_port_t|uintmax_t|uintmax_t|blkcnt_t|uint16_t|unsigned|_Complex|uint32_t|intptr_t|intmax_t|intmax_t|uint64_t|u_quad_t|int64_t|int32_t|ssize_t|caddr_t|clock_t|uint8_t|u_short|swblk_t|segsz_t|int16_t|fixpt_t|daddr_t|nlink_t|qaddr_t|size_t|time_t|mode_t|signed|quad_t|ushort|u_long|u_char|double|int8_t|ino_t|uid_t|pid_t|_Bool|float|dev_t|div_t|short|gid_t|off_t|u_int|key_t|id_t|uint|long|void|char|bool|id_t|int)\\b)[a-zA-Z_]\\w*\\b(?!\\())'
    },
    method_access: {
      begin:
        '((?:[a-zA-Z_]\\w*|(?<=\\]|\\)))\\s*)(?:((?:\\.\\*|\\.))|((?:->\\*|->)))((?:[a-zA-Z_]\\w*\\s*(?:(?:(?:\\.\\*|\\.))|(?:(?:->\\*|->)))\\s*)*)\\s*([a-zA-Z_]\\w*)(\\()',
      beginCaptures: {
        1: {name: 'variable.other.object.access.slang'},
        2: {name: 'punctuation.separator.dot-access.slang'},
        3: {name: 'punctuation.separator.pointer-access.slang'},
        4: {
          patterns: [
            {include: '#member_access'},
            {include: '#method_access'},
            {
              captures: {
                1: {name: 'variable.other.object.access.slang'},
                2: {name: 'punctuation.separator.dot-access.slang'},
                3: {name: 'punctuation.separator.pointer-access.slang'}
              },
              match:
                '((?:[a-zA-Z_]\\w*|(?<=\\]|\\)))\\s*)(?:((?:\\.\\*|\\.))|((?:->\\*|->)))'
            }
          ]
        },
        5: {name: 'entity.name.function.member.slang'},
        6: {
          name: 'punctuation.section.arguments.begin.bracket.round.function.member.slang'
        }
      },
      contentName: 'meta.function-call.member.slang',
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'punctuation.section.arguments.end.bracket.round.function.member.slang'
        }
      },
      patterns: [{include: '#function-call-innards'}]
    },
    numbers: {
      captures: {
        0: {
          patterns: [
            {
              begin: '(?=.)',
              end: '$',
              patterns: [
                {
                  captures: {
                    1: {name: 'keyword.other.unit.hexadecimal.slang'},
                    10: {
                      name: 'keyword.operator.minus.exponent.hexadecimal.slang'
                    },
                    11: {
                      name: 'constant.numeric.exponent.hexadecimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    12: {
                      name: 'keyword.other.unit.suffix.floating-point.slang'
                    },
                    2: {
                      name: 'constant.numeric.hexadecimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    4: {name: 'constant.numeric.hexadecimal.slang'},
                    5: {
                      name: 'constant.numeric.hexadecimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    6: {name: 'punctuation.separator.constant.numeric'},
                    8: {name: 'keyword.other.unit.exponent.hexadecimal.slang'},
                    9: {
                      name: 'keyword.operator.plus.exponent.hexadecimal.slang'
                    }
                  },
                  match:
                    "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9a-fA-F])\\.|\\.(?=[0-9a-fA-F])))([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?<!')([pP])(\\+?)(\\-?)((?:[0-9](?:[0-9]|(?:(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)))?([lLfFzZhH](?!\\w))?$"
                },
                {
                  captures: {
                    10: {name: 'keyword.operator.minus.exponent.decimal.slang'},
                    11: {
                      name: 'constant.numeric.exponent.decimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    12: {
                      name: 'keyword.other.unit.suffix.floating-point.slang'
                    },
                    2: {
                      name: 'constant.numeric.decimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    4: {name: 'constant.numeric.decimal.point.slang'},
                    5: {
                      name: 'constant.numeric.decimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    6: {name: 'punctuation.separator.constant.numeric'},
                    8: {name: 'keyword.other.unit.exponent.decimal.slang'},
                    9: {name: 'keyword.operator.plus.exponent.decimal.slang'}
                  },
                  match:
                    "(\\G(?=[0-9.])(?!0[xXbB]))([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9])\\.|\\.(?=[0-9])))([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?<!')([eE])(\\+?)(\\-?)((?:[0-9](?:[0-9]|(?:(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)))?([lLfFzZhH](?!\\w))?$"
                },
                {
                  captures: {
                    1: {name: 'keyword.other.unit.binary.slang'},
                    2: {
                      name: 'constant.numeric.binary.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    4: {name: 'keyword.other.unit.suffix.integer.slang'}
                  },
                  match:
                    "(\\G0[bB])([01](?:[01]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)((?:(?:(?:(?:(?:[uU]|[uU]ll?)|[uU]LL?)|ll?[uU]?)|LL?[uU]?|[uU]?z|z[uU])|[fF])(?!\\w))?$"
                },
                {
                  captures: {
                    1: {name: 'keyword.other.unit.octal.slang'},
                    2: {
                      name: 'constant.numeric.octal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    4: {name: 'keyword.other.unit.suffix.integer.slang'}
                  },
                  match:
                    "(\\G0)((?:[0-7]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))+)((?:(?:(?:(?:(?:[uU]|[uU]ll?)|[uU]LL?)|ll?[uU]?|[uU]?z|z[uU])|LL?[uU]?)|[fF])(?!\\w))?$"
                },
                {
                  captures: {
                    1: {name: 'keyword.other.unit.hexadecimal.slang'},
                    2: {
                      name: 'constant.numeric.hexadecimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    5: {name: 'keyword.other.unit.exponent.hexadecimal.slang'},
                    6: {
                      name: 'keyword.operator.plus.exponent.hexadecimal.slang'
                    },
                    7: {
                      name: 'keyword.operator.minus.exponent.hexadecimal.slang'
                    },
                    8: {
                      name: 'constant.numeric.exponent.hexadecimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    9: {name: 'keyword.other.unit.suffix.integer.slang'}
                  },
                  match:
                    "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)((?<!')([pP])(\\+?)(\\-?)((?:[0-9](?:[0-9]|(?:(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)))?((?:(?:(?:(?:(?:[uU]|[uU]ll?)|[uU]LL?)|ll?[uU]?)|LL?[uU]?|[uU]?z|z[uU])|[fF])(?!\\w))?$"
                },
                {
                  captures: {
                    2: {
                      name: 'constant.numeric.decimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    3: {name: 'punctuation.separator.constant.numeric'},
                    5: {name: 'keyword.other.unit.exponent.decimal.slang'},
                    6: {name: 'keyword.operator.plus.exponent.decimal.slang'},
                    7: {name: 'keyword.operator.minus.exponent.decimal.slang'},
                    8: {
                      name: 'constant.numeric.exponent.decimal.slang',
                      patterns: [
                        {
                          match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                          name: 'punctuation.separator.constant.numeric'
                        }
                      ]
                    },
                    9: {name: 'keyword.other.unit.suffix.integer.slang'}
                  },
                  match:
                    "(\\G(?=[0-9.])(?!0[xXbB]))([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)((?<!')([eE])(\\+?)(\\-?)((?:[0-9](?:[0-9]|(?:(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)))?((?:(?:(?:(?:(?:[uU]|[uU]ll?|[uU]?z|z[uU])|[uU]LL?)|ll?[uU]?)|LL?[uU]?)|[fF])(?!\\w))?$"
                },
                {
                  match: "(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])+",
                  name: 'invalid.illegal.constant.numeric'
                }
              ]
            }
          ]
        }
      },
      match: "(?<!\\w)\\.?\\d(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])*"
    },
    operators: {
      patterns: [
        {
          match: '(?<![\\w$])(sizeof|countof)(?![\\w$])',
          name: 'keyword.operator.sizeof.slang'
        },
        {
          match: '(?<![\\w$])(as)(?![\\w$])',
          name: 'keyword.other.additional.slang'
        },
        {
          match: '(?<![\\w$])(is)(?![\\w$])',
          name: 'keyword.other.additional.slang'
        },
        {match: '--', name: 'keyword.operator.decrement.slang'},
        {match: '\\+\\+', name: 'keyword.operator.increment.slang'},
        {
          match: '%=|\\+=|-=|\\*=|(?<!\\()/=',
          name: 'keyword.operator.assignment.compound.slang'
        },
        {
          match: '&=|\\^=|<<=|>>=|\\|=',
          name: 'keyword.operator.assignment.compound.bitwise.slang'
        },
        {match: '<<|>>', name: 'keyword.operator.bitwise.shift.slang'},
        {match: '!=|<=|>=|==|<|>', name: 'keyword.operator.comparison.slang'},
        {match: '&&|!|\\|\\|', name: 'keyword.operator.logical.slang'},
        {match: '&|\\||\\^|~', name: 'keyword.operator.slang'},
        {match: '=', name: 'keyword.operator.assignment.slang'},
        {match: '%|\\*|/|-|\\+', name: 'keyword.operator.slang'},
        {
          begin: '(\\?)',
          beginCaptures: {1: {name: 'keyword.operator.ternary.slang'}},
          end: '(:)',
          endCaptures: {1: {name: 'keyword.operator.ternary.slang'}},
          patterns: [{include: '#function-call-innards'}, {include: '$base'}]
        }
      ]
    },
    parens: {
      begin: '\\(',
      beginCaptures: {
        0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
      },
      end: '\\)',
      endCaptures: {
        0: {name: 'punctuation.section.parens.end.bracket.round.slang'}
      },
      name: 'meta.parens.slang',
      patterns: [{include: '$base'}]
    },
    'parens-block': {
      begin: '\\(',
      beginCaptures: {
        0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
      },
      end: '\\)',
      endCaptures: {
        0: {name: 'punctuation.section.parens.end.bracket.round.slang'}
      },
      name: 'meta.parens.block.slang',
      patterns: [
        {include: '#block_innards'},
        {match: '(?-mix:(?<!:):(?!:))', name: 'punctuation.range-based.slang'}
      ]
    },
    'pragma-mark': {
      captures: {
        1: {name: 'meta.preprocessor.pragma.slang'},
        2: {name: 'keyword.control.directive.pragma.pragma-mark.slang'},
        3: {name: 'punctuation.definition.directive.slang'},
        4: {name: 'entity.name.tag.pragma-mark.slang'}
      },
      match: '^\\s*(((#)\\s*pragma\\s+mark)\\s+(.*))',
      name: 'meta.section.slang'
    },
    predefined_macros: {
      patterns: [
        {
          captures: {
            1: {
              name: 'entity.name.other.preprocessor.macro.predefined.$1.slang'
            }
          },
          match:
            '\\b(__cplusplus|__DATE__|__FILE__|__LINE__|__STDC__|__STDC_HOSTED__|__STDC_NO_COMPLEX__|__STDC_VERSION__|__STDCPP_THREADS__|__TIME__|NDEBUG|__OBJC__|__ASSEMBLER__|__ATOM__|__AVX__|__AVX2__|_CHAR_UNSIGNED|__CLR_VER|_CONTROL_FLOW_GUARD|__COUNTER__|__cplusplus_cli|__cplusplus_winrt|_CPPRTTI|_CPPUNWIND|_DEBUG|_DLL|__FUNCDNAME__|__FUNCSIG__|__FUNCTION__|_INTEGRAL_MAX_BITS|__INTELLISENSE__|_ISO_VOLATILE|_KERNEL_MODE|_M_AMD64|_M_ARM|_M_ARM_ARMV7VE|_M_ARM_FP|_M_ARM64|_M_CEE|_M_CEE_PURE|_M_CEE_SAFE|_M_FP_EXCEPT|_M_FP_FAST|_M_FP_PRECISE|_M_FP_STRICT|_M_IX86|_M_IX86_FP|_M_X64|_MANAGED|_MSC_BUILD|_MSC_EXTENSIONS|_MSC_FULL_VER|_MSC_VER|_MSVC_LANG|__MSVC_RUNTIME_CHECKS|_MT|_NATIVE_WCHAR_T_DEFINED|_OPENMP|_PREFAST|__TIMESTAMP__|_VC_NO_DEFAULTLIB|_WCHAR_T_DEFINED|_WIN32|_WIN64|_WINRT_DLL|_ATL_VER|_MFC_VER|__GFORTRAN__|__GNUC__|__GNUC_MINOR__|__GNUC_PATCHLEVEL__|__GNUG__|__STRICT_ANSI__|__BASE_FILE__|__INCLUDE_LEVEL__|__ELF__|__VERSION__|__OPTIMIZE__|__OPTIMIZE_SIZE__|__NO_INLINE__|__GNUC_STDC_INLINE__|__CHAR_UNSIGNED__|__WCHAR_UNSIGNED__|__REGISTER_PREFIX__|__REGISTER_PREFIX__|__SIZE_TYPE__|__PTRDIFF_TYPE__|__WCHAR_TYPE__|__WINT_TYPE__|__INTMAX_TYPE__|__UINTMAX_TYPE__|__SIG_ATOMIC_TYPE__|__INT8_TYPE__|__INT16_TYPE__|__INT32_TYPE__|__INT64_TYPE__|__UINT8_TYPE__|__UINT16_TYPE__|__UINT32_TYPE__|__UINT64_TYPE__|__INT_LEAST8_TYPE__|__INT_LEAST16_TYPE__|__INT_LEAST32_TYPE__|__INT_LEAST64_TYPE__|__UINT_LEAST8_TYPE__|__UINT_LEAST16_TYPE__|__UINT_LEAST32_TYPE__|__UINT_LEAST64_TYPE__|__INT_FAST8_TYPE__|__INT_FAST16_TYPE__|__INT_FAST32_TYPE__|__INT_FAST64_TYPE__|__UINT_FAST8_TYPE__|__UINT_FAST16_TYPE__|__UINT_FAST32_TYPE__|__UINT_FAST64_TYPE__|__INTPTR_TYPE__|__UINTPTR_TYPE__|__CHAR_BIT__|__SCHAR_MAX__|__WCHAR_MAX__|__SHRT_MAX__|__INT_MAX__|__LONG_MAX__|__LONG_LONG_MAX__|__WINT_MAX__|__SIZE_MAX__|__PTRDIFF_MAX__|__INTMAX_MAX__|__UINTMAX_MAX__|__SIG_ATOMIC_MAX__|__INT8_MAX__|__INT16_MAX__|__INT32_MAX__|__INT64_MAX__|__UINT8_MAX__|__UINT16_MAX__|__UINT32_MAX__|__UINT64_MAX__|__INT_LEAST8_MAX__|__INT_LEAST16_MAX__|__INT_LEAST32_MAX__|__INT_LEAST64_MAX__|__UINT_LEAST8_MAX__|__UINT_LEAST16_MAX__|__UINT_LEAST32_MAX__|__UINT_LEAST64_MAX__|__INT_FAST8_MAX__|__INT_FAST16_MAX__|__INT_FAST32_MAX__|__INT_FAST64_MAX__|__UINT_FAST8_MAX__|__UINT_FAST16_MAX__|__UINT_FAST32_MAX__|__UINT_FAST64_MAX__|__INTPTR_MAX__|__UINTPTR_MAX__|__WCHAR_MIN__|__WINT_MIN__|__SIG_ATOMIC_MIN__|__SCHAR_WIDTH__|__SHRT_WIDTH__|__INT_WIDTH__|__LONG_WIDTH__|__LONG_LONG_WIDTH__|__PTRDIFF_WIDTH__|__SIG_ATOMIC_WIDTH__|__SIZE_WIDTH__|__WCHAR_WIDTH__|__WINT_WIDTH__|__INT_LEAST8_WIDTH__|__INT_LEAST16_WIDTH__|__INT_LEAST32_WIDTH__|__INT_LEAST64_WIDTH__|__INT_FAST8_WIDTH__|__INT_FAST16_WIDTH__|__INT_FAST32_WIDTH__|__INT_FAST64_WIDTH__|__INTPTR_WIDTH__|__INTMAX_WIDTH__|__SIZEOF_INT__|__SIZEOF_LONG__|__SIZEOF_LONG_LONG__|__SIZEOF_SHORT__|__SIZEOF_POINTER__|__SIZEOF_FLOAT__|__SIZEOF_DOUBLE__|__SIZEOF_LONG_DOUBLE__|__SIZEOF_SIZE_T__|__SIZEOF_WCHAR_T__|__SIZEOF_WINT_T__|__SIZEOF_PTRDIFF_T__|__BYTE_ORDER__|__ORDER_LITTLE_ENDIAN__|__ORDER_BIG_ENDIAN__|__ORDER_PDP_ENDIAN__|__FLOAT_WORD_ORDER__|__DEPRECATED|__EXCEPTIONS|__GXX_RTTI|__USING_SJLJ_EXCEPTIONS__|__GXX_EXPERIMENTAL_CXX0X__|__GXX_WEAK__|__NEXT_RUNTIME__|__LP64__|_LP64|__SSP__|__SSP_ALL__|__SSP_STRONG__|__SSP_EXPLICIT__|__SANITIZE_ADDRESS__|__SANITIZE_THREAD__|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_1|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_2|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_4|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_8|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_16|__HAVE_SPECULATION_SAFE_VALUE|__GCC_HAVE_DWARF2_CFI_ASM|__FP_FAST_FMA|__FP_FAST_FMAF|__FP_FAST_FMAL|__FP_FAST_FMAF16|__FP_FAST_FMAF32|__FP_FAST_FMAF64|__FP_FAST_FMAF128|__FP_FAST_FMAF32X|__FP_FAST_FMAF64X|__FP_FAST_FMAF128X|__GCC_IEC_559|__GCC_IEC_559_COMPLEX|__NO_MATH_ERRNO__|__has_builtin|__has_feature|__has_extension|__has_cpp_attribute|__has_c_attribute|__has_attribute|__has_declspec_attribute|__is_identifier|__has_include|__has_include_next|__has_warning|__BASE_FILE__|__FILE_NAME__|__clang__|__clang_major__|__clang_minor__|__clang_patchlevel__|__clang_version__|__fp16|_Float16)\\b'
        },
        {
          match: '\\b__([A-Z_]+)__\\b',
          name: 'entity.name.other.preprocessor.macro.predefined.probably.$1.slang'
        }
      ]
    },
    'preprocessor-rule-conditional': {
      patterns: [
        {
          begin: '^\\s*((#)\\s*if(?:n?def)?\\b)',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#preprocessor-rule-enabled-elif'},
            {include: '#preprocessor-rule-enabled-else'},
            {include: '#preprocessor-rule-disabled-elif'},
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '$base'}
          ]
        },
        {
          captures: {0: {name: 'invalid.illegal.stray-$1.slang'}},
          match: '^\\s*#\\s*(else|elif|endif)\\b'
        }
      ]
    },
    'preprocessor-rule-conditional-block': {
      patterns: [
        {
          begin: '^\\s*((#)\\s*if(?:n?def)?\\b)',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#preprocessor-rule-enabled-elif-block'},
            {include: '#preprocessor-rule-enabled-else-block'},
            {include: '#preprocessor-rule-disabled-elif'},
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#block_innards'}
          ]
        },
        {
          captures: {0: {name: 'invalid.illegal.stray-$1.slang'}},
          match: '^\\s*#\\s*(else|elif|endif)\\b'
        }
      ]
    },
    'preprocessor-rule-conditional-line': {
      patterns: [
        {
          match:
            '(?:\\bdefined\\b\\s*$)|(?:\\bdefined\\b(?=\\s*\\(*\\s*(?:(?!defined\\b)[a-zA-Z_$][\\w$]*\\b)\\s*\\)*\\s*(?:\\n|//|/\\*|\\?|\\:|&&|\\|\\||\\\\\\s*\\n)))',
          name: 'keyword.control.directive.conditional.slang'
        },
        {match: '\\bdefined\\b', name: 'invalid.illegal.macro-name.slang'},
        {include: '#comments'},
        {include: '#strings'},
        {include: '#numbers'},
        {
          begin: '\\?',
          beginCaptures: {0: {name: 'keyword.operator.ternary.slang'}},
          end: ':',
          endCaptures: {0: {name: 'keyword.operator.ternary.slang'}},
          patterns: [{include: '#preprocessor-rule-conditional-line'}]
        },
        {include: '#operators'},
        {
          match: '\\b(NULL|true|false|TRUE|FALSE)\\b',
          name: 'constant.language.slang'
        },
        {
          match: '[a-zA-Z_$][\\w$]*',
          name: 'entity.name.function.preprocessor.slang'
        },
        {include: '#line_continuation_character'},
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
          },
          end: '\\)|(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
          endCaptures: {
            0: {name: 'punctuation.section.parens.end.bracket.round.slang'}
          },
          patterns: [{include: '#preprocessor-rule-conditional-line'}]
        }
      ]
    },
    'preprocessor-rule-define-line-blocks': {
      patterns: [
        {
          begin: '{',
          beginCaptures: {
            0: {name: 'punctuation.section.block.begin.bracket.curly.slang'}
          },
          end: '}|(?=\\s*#\\s*(?:elif|else|endif)\\b)|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {
            0: {name: 'punctuation.section.block.end.bracket.curly.slang'}
          },
          patterns: [
            {include: '#preprocessor-rule-define-line-blocks'},
            {include: '#preprocessor-rule-define-line-contents'}
          ]
        },
        {include: '#preprocessor-rule-define-line-contents'}
      ]
    },
    'preprocessor-rule-define-line-contents': {
      patterns: [
        {include: '#vararg_ellipses'},
        {
          begin: '{',
          beginCaptures: {
            0: {name: 'punctuation.section.block.begin.bracket.curly.slang'}
          },
          end: '}|(?=\\s*#\\s*(?:elif|else|endif)\\b)|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {
            0: {name: 'punctuation.section.block.end.bracket.curly.slang'}
          },
          name: 'meta.block.slang',
          patterns: [{include: '#preprocessor-rule-define-line-blocks'}]
        },
        {
          match: '\\(',
          name: 'punctuation.section.parens.begin.bracket.round.slang'
        },
        {
          match: '\\)',
          name: 'punctuation.section.parens.end.bracket.round.slang'
        },
        {
          begin:
            '(?x)\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate|and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|alignof|alignas|asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void)\\s*\\()\n(?=\n  (?:[A-Za-z_][A-Za-z0-9_]*+|::)++\\s*\\(  # actual name\n  |\n  (?:(?<=operator)(?:[-*&<>=+!]+|\\(\\)|\\[\\]))\\s*\\(\n)',
          end: '(?<=\\))(?!\\w)|(?<!\\\\)(?=\\s*\\n)',
          name: 'meta.function.slang',
          patterns: [{include: '#preprocessor-rule-define-line-functions'}]
        },
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: '"|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.double.slang',
          patterns: [
            {include: '#string_escaped_char'},
            {include: '#string_placeholder'},
            {include: '#line_continuation_character'}
          ]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: "'|(?<!\\\\)(?=\\s*\\n)",
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.single.slang',
          patterns: [
            {include: '#string_escaped_char'},
            {include: '#line_continuation_character'}
          ]
        },
        {include: '#method_access'},
        {include: '#member_access'},
        {include: '$base'}
      ]
    },
    'preprocessor-rule-define-line-functions': {
      patterns: [
        {include: '#comments'},
        {include: '#storage_types'},
        {include: '#vararg_ellipses'},
        {include: '#method_access'},
        {include: '#member_access'},
        {include: '#operators'},
        {
          begin:
            '(?x)\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|countof|where|(__)?(f|b)wd_diff|__dispatch_kernel|no_diff|__constref|expand|each)\\s*\\()\n(\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\n|\n(?:(?<=operator)(?:[-*&<>=+!]+|\\(\\)|\\[\\]))\n)\n\\s*(\\()',
          beginCaptures: {
            1: {name: 'entity.name.function.slang'},
            2: {name: 'punctuation.section.arguments.begin.bracket.round.slang'}
          },
          end: '(\\))|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {
            1: {name: 'punctuation.section.arguments.end.bracket.round.slang'}
          },
          patterns: [{include: '#preprocessor-rule-define-line-functions'}]
        },
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.section.parens.begin.bracket.round.slang'}
          },
          end: '(\\))|(?<!\\\\)(?=\\s*\\n)',
          endCaptures: {
            1: {name: 'punctuation.section.parens.end.bracket.round.slang'}
          },
          patterns: [{include: '#preprocessor-rule-define-line-functions'}]
        },
        {include: '#preprocessor-rule-define-line-contents'}
      ]
    },
    'preprocessor-rule-disabled': {
      patterns: [
        {
          begin: '^\\s*((#)\\s*if\\b)(?=\\s*\\(*\\b0+\\b\\)*\\s*(?:$|//|/\\*))',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#comments'},
            {include: '#preprocessor-rule-enabled-elif'},
            {include: '#preprocessor-rule-enabled-else'},
            {include: '#preprocessor-rule-disabled-elif'},
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              end: '(?=^\\s*((#)\\s*(?:elif|else|endif)\\b))',
              patterns: [
                {
                  begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
                  end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
                  name: 'meta.preprocessor.slang',
                  patterns: [{include: '#preprocessor-rule-conditional-line'}]
                },
                {include: '$base'}
              ]
            },
            {
              begin: '\\n',
              contentName: 'comment.block.preprocessor.if-branch.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            }
          ]
        }
      ]
    },
    'preprocessor-rule-disabled-block': {
      patterns: [
        {
          begin: '^\\s*((#)\\s*if\\b)(?=\\s*\\(*\\b0+\\b\\)*\\s*(?:$|//|/\\*))',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#comments'},
            {include: '#preprocessor-rule-enabled-elif-block'},
            {include: '#preprocessor-rule-enabled-else-block'},
            {include: '#preprocessor-rule-disabled-elif'},
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              end: '(?=^\\s*((#)\\s*(?:elif|else|endif)\\b))',
              patterns: [
                {
                  begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
                  end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
                  name: 'meta.preprocessor.slang',
                  patterns: [{include: '#preprocessor-rule-conditional-line'}]
                },
                {include: '#block_innards'}
              ]
            },
            {
              begin: '\\n',
              contentName:
                'comment.block.preprocessor.if-branch.in-block.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            }
          ]
        }
      ]
    },
    'preprocessor-rule-disabled-elif': {
      begin: '^\\s*((#)\\s*elif\\b)(?=\\s*\\(*\\b0+\\b\\)*\\s*(?:$|//|/\\*))',
      beginCaptures: {
        0: {name: 'meta.preprocessor.slang'},
        1: {name: 'keyword.control.directive.conditional.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=^\\s*((#)\\s*(?:elif|else|endif)\\b))',
      patterns: [
        {
          begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
          end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
          name: 'meta.preprocessor.slang',
          patterns: [{include: '#preprocessor-rule-conditional-line'}]
        },
        {include: '#comments'},
        {
          begin: '\\n',
          contentName: 'comment.block.preprocessor.elif-branch.slang',
          end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
          patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
        }
      ]
    },
    'preprocessor-rule-enabled': {
      patterns: [
        {
          begin:
            '^\\s*((#)\\s*if\\b)(?=\\s*\\(*\\b0*1\\b\\)*\\s*(?:$|//|/\\*))',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'},
            3: {name: 'constant.numeric.preprocessor.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#comments'},
            {
              begin: '^\\s*((#)\\s*else\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName: 'comment.block.preprocessor.else-branch.slang',
              end: '(?=^\\s*((#)\\s*endif\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName: 'comment.block.preprocessor.if-branch.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '\\n',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '$base'}]
            }
          ]
        }
      ]
    },
    'preprocessor-rule-enabled-block': {
      patterns: [
        {
          begin:
            '^\\s*((#)\\s*if\\b)(?=\\s*\\(*\\b0*1\\b\\)*\\s*(?:$|//|/\\*))',
          beginCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          end: '^\\s*((#)\\s*endif\\b)',
          endCaptures: {
            0: {name: 'meta.preprocessor.slang'},
            1: {name: 'keyword.control.directive.conditional.slang'},
            2: {name: 'punctuation.definition.directive.slang'}
          },
          patterns: [
            {
              begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
              end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?=\\n)',
              name: 'meta.preprocessor.slang',
              patterns: [{include: '#preprocessor-rule-conditional-line'}]
            },
            {include: '#comments'},
            {
              begin: '^\\s*((#)\\s*else\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName:
                'comment.block.preprocessor.else-branch.in-block.slang',
              end: '(?=^\\s*((#)\\s*endif\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '^\\s*((#)\\s*elif\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName:
                'comment.block.preprocessor.if-branch.in-block.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '\\n',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#block_innards'}]
            }
          ]
        }
      ]
    },
    'preprocessor-rule-enabled-elif': {
      begin: '^\\s*((#)\\s*elif\\b)(?=\\s*\\(*\\b0*1\\b\\)*\\s*(?:$|//|/\\*))',
      beginCaptures: {
        0: {name: 'meta.preprocessor.slang'},
        1: {name: 'keyword.control.directive.conditional.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=^\\s*((#)\\s*endif\\b))',
      patterns: [
        {
          begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
          end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
          name: 'meta.preprocessor.slang',
          patterns: [{include: '#preprocessor-rule-conditional-line'}]
        },
        {include: '#comments'},
        {
          begin: '\\n',
          end: '(?=^\\s*((#)\\s*(?:endif)\\b))',
          patterns: [
            {
              begin: '^\\s*((#)\\s*(else)\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName: 'comment.block.preprocessor.elif-branch.slang',
              end: '(?=^\\s*((#)\\s*endif\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '^\\s*((#)\\s*(elif)\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName: 'comment.block.preprocessor.elif-branch.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {include: '$base'}
          ]
        }
      ]
    },
    'preprocessor-rule-enabled-elif-block': {
      begin: '^\\s*((#)\\s*elif\\b)(?=\\s*\\(*\\b0*1\\b\\)*\\s*(?:$|//|/\\*))',
      beginCaptures: {
        0: {name: 'meta.preprocessor.slang'},
        1: {name: 'keyword.control.directive.conditional.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=^\\s*((#)\\s*endif\\b))',
      patterns: [
        {
          begin: '\\G(?=.)(?!//|/\\*(?!.*\\\\\\s*\\n))',
          end: '(?=//)|(?=/\\*(?!.*\\\\\\s*\\n))|(?<!\\\\)(?=\\n)',
          name: 'meta.preprocessor.slang',
          patterns: [{include: '#preprocessor-rule-conditional-line'}]
        },
        {include: '#comments'},
        {
          begin: '\\n',
          end: '(?=^\\s*((#)\\s*(?:endif)\\b))',
          patterns: [
            {
              begin: '^\\s*((#)\\s*(else)\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName:
                'comment.block.preprocessor.elif-branch.in-block.slang',
              end: '(?=^\\s*((#)\\s*endif\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {
              begin: '^\\s*((#)\\s*(elif)\\b)',
              beginCaptures: {
                0: {name: 'meta.preprocessor.slang'},
                1: {name: 'keyword.control.directive.conditional.slang'},
                2: {name: 'punctuation.definition.directive.slang'}
              },
              contentName: 'comment.block.preprocessor.elif-branch.slang',
              end: '(?=^\\s*((#)\\s*(?:else|elif|endif)\\b))',
              patterns: [{include: '#disabled'}, {include: '#pragma-mark'}]
            },
            {include: '#block_innards'}
          ]
        }
      ]
    },
    'preprocessor-rule-enabled-else': {
      begin: '^\\s*((#)\\s*else\\b)',
      beginCaptures: {
        0: {name: 'meta.preprocessor.slang'},
        1: {name: 'keyword.control.directive.conditional.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=^\\s*((#)\\s*endif\\b))',
      patterns: [{include: '$base'}]
    },
    'preprocessor-rule-enabled-else-block': {
      begin: '^\\s*((#)\\s*else\\b)',
      beginCaptures: {
        0: {name: 'meta.preprocessor.slang'},
        1: {name: 'keyword.control.directive.conditional.slang'},
        2: {name: 'punctuation.definition.directive.slang'}
      },
      end: '(?=^\\s*((#)\\s*endif\\b))',
      patterns: [{include: '#block_innards'}]
    },
    'preprocessor-version': {
      captures: {
        2: {name: 'keyword.control.directive.version.slang'},
        3: {name: 'constant.numeric.decimal.slang'}
      },
      match: '^\\s*((#\\s*version)\\s+(.*))',
      name: 'meta.section.slang'
    },
    probably_a_parameter: {
      captures: {1: {name: 'variable.parameter.probably.slang'}},
      match:
        '(?<=[a-zA-Z_0-9] |[&*>\\]\\)])\\s*([a-zA-Z_]\\w*)\\s*(?=(?:\\[\\]\\s*)?(?:,|\\)))'
    },
    static_assert: {
      begin:
        '((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))((?<!\\w)static_assert|_Static_assert(?!\\w))((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))(\\()',
      beginCaptures: {
        1: {patterns: [{include: '#inline_comment'}]},
        10: {
          name: 'punctuation.section.arguments.begin.bracket.round.static_assert.slang'
        },
        2: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        3: {name: 'comment.block.slang'},
        4: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        5: {name: 'keyword.other.static_assert.slang'},
        6: {patterns: [{include: '#inline_comment'}]},
        7: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        8: {name: 'comment.block.slang'},
        9: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        }
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'punctuation.section.arguments.end.bracket.round.static_assert.slang'
        }
      },
      patterns: [
        {
          begin: '(,)\\s*(?=(?:L|u8|u|U\\s*\\")?)',
          beginCaptures: {
            1: {name: 'punctuation.separator.delimiter.comma.slang'}
          },
          end: '(?=\\))',
          name: 'meta.static_assert.message.slang',
          patterns: [{include: '#string_context'}]
        },
        {include: '#evaluation_context'}
      ]
    },
    storage_types: {
      patterns: [
        {
          match:
            '(?-mix:(?<!\\w)(?:unsigned|signed|double|_Bool|short|float|half|long|void|char|bool|int|uint)(?!\\w))',
          name: 'storage.type.built-in.primitive.slang'
        },
        {
          captures: {
            1: {name: 'keyword.$1.slang'},
            2: {name: 'support.type.$1.slang'},
            4: {name: 'punctuation.separator.dot-access.slang'},
            5: {name: 'support.type.$1.slang'}
          },
          match:
            '\\b(namespace|enum|enum\\s+class|struct|class|interface)\\s+([A-Za-z0-9_]+)((\\.|::)([A-Za-z0-9_]+))*'
        },
        {
          begin: '(\\b(?:__asm__|asm)\\b)\\s*((?:volatile)?)',
          beginCaptures: {
            1: {name: 'storage.type.asm.slang'},
            2: {name: 'storage.modifier.slang'}
          },
          end: '(?!\\G)',
          name: 'meta.asm.slang',
          patterns: [
            {
              captures: {
                1: {patterns: [{include: '#inline_comment'}]},
                2: {
                  name: 'comment.block.slang punctuation.definition.comment.begin.slang'
                },
                3: {name: 'comment.block.slang'},
                4: {
                  patterns: [
                    {
                      match: '\\*\\/',
                      name: 'comment.block.slang punctuation.definition.comment.end.slang'
                    },
                    {match: '\\*', name: 'comment.block.slang'}
                  ]
                }
              },
              match:
                '(?:^)((?:(?:(?>\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+?|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z)))(?:\\n|$)'
            },
            {include: '#comments'},
            {
              begin:
                '(((?:(?:(?>\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+?|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z)))\\()',
              beginCaptures: {
                1: {
                  name: 'punctuation.section.parens.begin.bracket.round.assembly.slang'
                },
                2: {patterns: [{include: '#inline_comment'}]},
                3: {
                  name: 'comment.block.slang punctuation.definition.comment.begin.slang'
                },
                4: {name: 'comment.block.slang'},
                5: {
                  patterns: [
                    {
                      match: '\\*\\/',
                      name: 'comment.block.slang punctuation.definition.comment.end.slang'
                    },
                    {match: '\\*', name: 'comment.block.slang'}
                  ]
                }
              },
              end: '(\\))',
              endCaptures: {
                1: {
                  name: 'punctuation.section.parens.end.bracket.round.assembly.slang'
                }
              },
              patterns: [
                {
                  begin: '(R?)(")',
                  beginCaptures: {
                    1: {name: 'meta.encoding.slang'},
                    2: {
                      name: 'punctuation.definition.string.begin.assembly.slang'
                    }
                  },
                  contentName: 'meta.embedded.assembly.slang',
                  end: '(")',
                  endCaptures: {
                    1: {
                      name: 'punctuation.definition.string.end.assembly.slang'
                    }
                  },
                  name: 'string.quoted.double.slang',
                  patterns: [
                    {include: '#backslash_escapes'},
                    {include: '#string_escaped_char'}
                  ]
                },
                {
                  begin: '(\\()',
                  beginCaptures: {
                    1: {
                      name: 'punctuation.section.parens.begin.bracket.round.assembly.inner.slang'
                    }
                  },
                  end: '(\\))',
                  endCaptures: {
                    1: {
                      name: 'punctuation.section.parens.end.bracket.round.assembly.inner.slang'
                    }
                  },
                  patterns: [{include: '#evaluation_context'}]
                },
                {
                  captures: {
                    1: {patterns: [{include: '#inline_comment'}]},
                    2: {
                      name: 'comment.block.slang punctuation.definition.comment.begin.slang'
                    },
                    3: {name: 'comment.block.slang'},
                    4: {
                      patterns: [
                        {
                          match: '\\*\\/',
                          name: 'comment.block.slang punctuation.definition.comment.end.slang'
                        },
                        {match: '\\*', name: 'comment.block.slang'}
                      ]
                    },
                    5: {name: 'variable.other.asm.label.slang'},
                    6: {patterns: [{include: '#inline_comment'}]},
                    7: {
                      name: 'comment.block.slang punctuation.definition.comment.begin.slang'
                    },
                    8: {name: 'comment.block.slang'},
                    9: {
                      patterns: [
                        {
                          match: '\\*\\/',
                          name: 'comment.block.slang punctuation.definition.comment.end.slang'
                        },
                        {match: '\\*', name: 'comment.block.slang'}
                      ]
                    }
                  },
                  match:
                    '\\[((?:(?:(?>\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+?|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z)))([a-zA-Z_]\\w*)((?:(?:(?>\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+?|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z)))\\]'
                },
                {
                  match: ':',
                  name: 'punctuation.separator.delimiter.colon.assembly.slang'
                },
                {include: '#comments'}
              ]
            }
          ]
        }
      ]
    },
    string_escaped_char: {
      patterns: [
        {
          match:
            '(?x)\\\\ (\n\\\\\t\t\t |\n[abefnprtv\'"?]   |\n[0-3]\\d{,2}\t |\n[4-7]\\d?\t\t|\nx[a-fA-F0-9]{,2} |\nu[a-fA-F0-9]{,4} |\nU[a-fA-F0-9]{,8} )',
          name: 'constant.character.escape.slang'
        },
        {match: '\\\\.', name: 'invalid.illegal.unknown-escape.slang'}
      ]
    },
    string_placeholder: {
      patterns: [
        {
          match:
            "(?x) %\n(\\d+\\$)?\t\t\t\t\t\t   # field (argument #)\n[#0\\- +']*\t\t\t\t\t\t  # flags\n[,;:_]?\t\t\t\t\t\t\t  # separator character (AltiVec)\n((-?\\d+)|\\*(-?\\d+\\$)?)?\t\t  # minimum field width\n(\\.((-?\\d+)|\\*(-?\\d+\\$)?)?)?\t# precision\n(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier\n[diouxXDOUeEfFgGaACcSspn%]\t\t   # conversion type",
          name: 'constant.other.placeholder.slang'
        },
        {
          captures: {1: {name: 'invalid.illegal.placeholder.slang'}},
          match: '(%)(?!"\\s*(PRI|SCN))'
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin:
            '((?:u|u8|U|L)?R)"(?:([^ ()\\\\\\t]{0,16})|([^ ()\\\\\\t]*))\\(',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin'},
            1: {name: 'meta.encoding'},
            3: {name: 'invalid.illegal.delimiter-too-long'}
          },
          end: '\\)\\2(\\3)"',
          endCaptures: {
            0: {name: 'punctuation.definition.string.end'},
            1: {name: 'invalid.illegal.delimiter-too-long'}
          },
          name: 'string.quoted.double.raw'
        },
        {
          begin: '((?:u|u8|U|L)?)?"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.double.slang',
          patterns: [
            {include: '#string_escaped_char'},
            {include: '#string_placeholder'},
            {include: '#line_continuation_character'}
          ]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.slang'}
          },
          end: "'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.slang'}},
          name: 'string.quoted.single.slang',
          patterns: [
            {include: '#string_escaped_char'},
            {include: '#line_continuation_character'}
          ]
        }
      ]
    },
    switch_conditional_parentheses: {
      begin:
        '((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))(\\()',
      beginCaptures: {
        1: {patterns: [{include: '#inline_comment'}]},
        2: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        3: {name: 'comment.block.slang'},
        4: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        5: {
          name: 'punctuation.section.parens.begin.bracket.round.conditional.switch.slang'
        }
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'punctuation.section.parens.end.bracket.round.conditional.switch.slang'
        }
      },
      name: 'meta.conditional.switch.slang',
      patterns: [
        {include: '#evaluation_context'},
        {include: '#c_conditional_context'}
      ]
    },
    switch_statement: {
      begin:
        '(((?>(?:(?:(?>(?<!\\s)\\s+)|(\\/\\*)((?>(?:[^\\*]|(?>\\*+)[^\\/])*)((?>\\*+)\\/)))+|(?:(?:(?:(?:\\b|(?<=\\W))|(?=\\W))|\\A)|\\Z))))((?<!\\w)switch|__(target|stage)_switch(?!\\w)))',
      beginCaptures: {
        1: {name: 'meta.head.switch.slang'},
        2: {patterns: [{include: '#inline_comment'}]},
        3: {
          name: 'comment.block.slang punctuation.definition.comment.begin.slang'
        },
        4: {name: 'comment.block.slang'},
        5: {
          patterns: [
            {
              match: '\\*\\/',
              name: 'comment.block.slang punctuation.definition.comment.end.slang'
            },
            {match: '\\*', name: 'comment.block.slang'}
          ]
        },
        6: {name: 'keyword.control.switch.slang'}
      },
      end: '(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))',
      name: 'meta.block.switch.slang',
      patterns: [
        {
          begin: '\\G ?',
          end: '((?:\\{|<%|\\?\\?<|(?=;)))',
          endCaptures: {
            1: {
              name: 'punctuation.section.block.begin.bracket.curly.switch.slang'
            }
          },
          name: 'meta.head.switch.slang',
          patterns: [
            {include: '#switch_conditional_parentheses'},
            {include: '$self'}
          ]
        },
        {
          begin: '(?<=\\{|<%|\\?\\?<)',
          end: '(\\}|%>|\\?\\?>)',
          endCaptures: {
            1: {
              name: 'punctuation.section.block.end.bracket.curly.switch.slang'
            }
          },
          name: 'meta.body.switch.slang',
          patterns: [
            {include: '#default_statement'},
            {include: '#case_statement'},
            {include: '$self'},
            {include: '#block_innards'}
          ]
        },
        {
          begin: '(?<=\\}|%>|\\?\\?>)[\\s\\n]*',
          end: '[\\s\\n]*(?=;)',
          name: 'meta.tail.switch.slang',
          patterns: [{include: '$self'}]
        }
      ]
    },
    vararg_ellipses: {
      match: '(?<!\\.)\\.\\.\\.(?!\\.)',
      name: 'punctuation.vararg-ellipses.slang'
    }
  },
  scopeName: 'source.slang'
}

export default grammar
