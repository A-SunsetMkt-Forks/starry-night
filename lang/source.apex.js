// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/forcedotcom/apex-tmLanguage>
// and licensed `bsd-3-clause`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.cls', '.apex', '.trigger'],
  names: ['apex'],
  patterns: [
    {include: '#javadoc-comment'},
    {include: '#comment'},
    {include: '#directives'},
    {include: '#declarations'},
    {include: '#script-top-level'}
  ],
  repository: {
    'annotation-declaration': {
      begin: '([@][_[:alpha:]]+)\\b',
      beginCaptures: {1: {name: 'storage.type.annotation.apex'}},
      end: '(?<=\\)|$)',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}]
        },
        {include: '#statement'}
      ]
    },
    'argument-list': {
      begin: '\\(',
      beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
      patterns: [
        {include: '#named-argument'},
        {include: '#expression'},
        {include: '#punctuation-comma'}
      ]
    },
    'array-creation-expression': {
      begin:
        '(?x)\n\\b(new)\\b\\s*\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)?\\s*\n(?=\\[)',
      beginCaptures: {
        1: {name: 'keyword.control.new.apex'},
        2: {patterns: [{include: '#support-type'}, {include: '#type'}]}
      },
      end: '(?<=\\])',
      patterns: [{include: '#bracketed-argument-list'}]
    },
    block: {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
      patterns: [{include: '#statement'}]
    },
    'boolean-literal': {
      patterns: [
        {
          match: '(?<!\\.)\\btrue\\b',
          name: 'constant.language.boolean.true.apex'
        },
        {
          match: '(?<!\\.)\\bfalse\\b',
          name: 'constant.language.boolean.false.apex'
        }
      ]
    },
    'bracketed-argument-list': {
      begin: '\\[',
      beginCaptures: {0: {name: 'punctuation.squarebracket.open.apex'}},
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.squarebracket.close.apex'}},
      patterns: [
        {include: '#soql-query-expression'},
        {include: '#named-argument'},
        {include: '#expression'},
        {include: '#punctuation-comma'}
      ]
    },
    'break-or-continue-statement': {
      captures: {
        1: {name: 'keyword.control.flow.break.apex'},
        2: {name: 'keyword.control.flow.continue.apex'}
      },
      match: '(?<!\\.)\\b(?:(break)|(continue))\\b'
    },
    'cast-expression': {
      captures: {
        1: {name: 'punctuation.parenthesis.open.apex'},
        2: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        6: {name: 'punctuation.parenthesis.close.apex'}
      },
      match:
        '(?x)\n(\\()\\s*\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s*\n(\\))(?=\\s*@?[_[:alnum:]\\(])'
    },
    'catch-clause': {
      begin: '(?<!\\.)\\b(catch)\\b',
      beginCaptures: {1: {name: 'keyword.control.try.catch.apex'}},
      end: '(?<=\\})',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [
            {
              captures: {
                1: {patterns: [{include: '#support-type'}, {include: '#type'}]},
                5: {name: 'entity.name.variable.local.apex'}
              },
              match:
                '(?x)\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s*\n(?:(\\g<identifier>)\\b)?'
            }
          ]
        },
        {include: '#comment'},
        {include: '#block'}
      ]
    },
    'class-declaration': {
      begin: '(?=\\bclass\\b)',
      end: '(?<=\\})',
      patterns: [
        {
          begin: '(?x)\n\\b(class)\\b\\s+\n(@?[_[:alpha:]][_[:alnum:]]*)\\s*',
          beginCaptures: {
            1: {name: 'keyword.other.class.apex'},
            2: {name: 'entity.name.type.class.apex'}
          },
          end: '(?=\\{)',
          patterns: [
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {include: '#type-parameter-list'},
            {include: '#extends-class'},
            {include: '#implements-class'}
          ]
        },
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
          patterns: [{include: '#class-or-trigger-members'}]
        },
        {include: '#javadoc-comment'},
        {include: '#comment'}
      ]
    },
    'class-or-trigger-members': {
      patterns: [
        {include: '#javadoc-comment'},
        {include: '#comment'},
        {include: '#storage-modifier'},
        {include: '#sharing-modifier'},
        {include: '#type-declarations'},
        {include: '#field-declaration'},
        {include: '#property-declaration'},
        {include: '#indexer-declaration'},
        {include: '#variable-initializer'},
        {include: '#constructor-declaration'},
        {include: '#method-declaration'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'colon-expression': {
      match: ':',
      name: 'keyword.operator.conditional.colon.apex'
    },
    comment: {
      patterns: [
        {
          begin: '/\\*(\\*)?',
          beginCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
          end: '\\*/',
          endCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
          name: 'comment.block.apex'
        },
        {
          begin: '(^\\s+)?(?=//)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.apex'}
          },
          end: '(?=$)',
          patterns: [
            {
              begin: '(?<!/)///(?!/)',
              beginCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
              end: '(?=$)',
              name: 'comment.block.documentation.apex',
              patterns: [{include: '#xml-doc-comment'}]
            },
            {
              begin: '(?<!/)//(?:(?!/)|(?=//))',
              beginCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
              end: '(?=$)',
              name: 'comment.line.double-slash.apex'
            }
          ]
        }
      ]
    },
    'conditional-operator': {
      begin: '(?<!\\?)\\?(?!\\?|\\.|\\[)',
      beginCaptures: {
        0: {name: 'keyword.operator.conditional.question-mark.apex'}
      },
      end: ':',
      endCaptures: {0: {name: 'keyword.operator.conditional.colon.apex'}},
      patterns: [{include: '#expression'}]
    },
    'constructor-declaration': {
      begin: '(?=@?[_[:alpha:]][_[:alnum:]]*\\s*\\()',
      end: '(?<=\\})|(?=;)',
      patterns: [
        {
          captures: {1: {name: 'entity.name.function.apex'}},
          match: '(@?[_[:alpha:]][_[:alnum:]]*)\\b'
        },
        {
          begin: '(:)',
          beginCaptures: {1: {name: 'punctuation.separator.colon.apex'}},
          end: '(?=\\{|=>)',
          patterns: [{include: '#constructor-initializer'}]
        },
        {include: '#parenthesized-parameter-list'},
        {include: '#comment'},
        {include: '#expression-body'},
        {include: '#block'}
      ]
    },
    'constructor-initializer': {
      begin: '\\b(?:(this))\\b\\s*(?=\\()',
      beginCaptures: {1: {name: 'keyword.other.this.apex'}},
      end: '(?<=\\))',
      patterns: [{include: '#argument-list'}]
    },
    'date-literal-with-params': {
      captures: {1: {name: 'keyword.operator.query.date.apex'}},
      match:
        '\\b((LAST_N_DAYS|NEXT_N_DAYS|NEXT_N_WEEKS|LAST_N_WEEKS|NEXT_N_MONTHS|LAST_N_MONTHS|NEXT_N_QUARTERS|LAST_N_QUARTERS|NEXT_N_YEARS|LAST_N_YEARS|NEXT_N_FISCAL_QUARTERS|LAST_N_FISCAL_QUARTERS|NEXT_N_FISCAL_YEARS|LAST_N_FISCAL_YEARS)\\s*\\:\\d+)\\b'
    },
    'date-literals': {
      captures: {1: {name: 'keyword.operator.query.date.apex'}},
      match:
        '\\b(YESTERDAY|TODAY|TOMORROW|LAST_WEEK|THIS_WEEK|NEXT_WEEK|LAST_MONTH|THIS_MONTH|NEXT_MONTH|LAST_90_DAYS|NEXT_90_DAYS|THIS_QUARTER|LAST_QUARTER|NEXT_QUARTER|THIS_YEAR|LAST_YEAR|NEXT_YEAR|THIS_FISCAL_QUARTER|LAST_FISCAL_QUARTER|NEXT_FISCAL_QUARTER|THIS_FISCAL_YEAR|LAST_FISCAL_YEAR|NEXT_FISCAL_YEAR)\\b\\s*'
    },
    declarations: {
      patterns: [
        {include: '#type-declarations'},
        {include: '#punctuation-semicolon'}
      ]
    },
    directives: {patterns: [{include: '#punctuation-semicolon'}]},
    'do-statement': {
      begin: '(?<!\\.)\\b(do)\\b',
      beginCaptures: {1: {name: 'keyword.control.loop.do.apex'}},
      end: '(?=;|})',
      patterns: [{include: '#statement'}]
    },
    'element-access-expression': {
      begin:
        '(?x)\n(?:(\\??\\.)\\s*)?                       # safe navigator or accessor\n(?:(@?[_[:alpha:]][_[:alnum:]]*)\\s*)? # property name\n(?:(\\?)\\s*)?                          # null-conditional operator?\n(?=\\[)                                # open bracket of argument list',
      beginCaptures: {
        1: {
          patterns: [
            {include: '#punctuation-accessor'},
            {include: '#operator-safe-navigation'}
          ]
        },
        2: {name: 'variable.other.object.property.apex'},
        3: {name: 'keyword.operator.null-conditional.apex'}
      },
      end: '(?<=\\])(?!\\s*\\[)',
      patterns: [{include: '#bracketed-argument-list'}]
    },
    'else-part': {
      begin: '(?<!\\.)\\b(else)\\b',
      beginCaptures: {1: {name: 'keyword.control.conditional.else.apex'}},
      end: '(?<=\\})|(?=;)',
      patterns: [{include: '#statement'}]
    },
    'enum-declaration': {
      begin: '(?=\\benum\\b)',
      end: '(?<=\\})',
      patterns: [
        {
          begin: '(?=enum)',
          end: '(?=\\{)',
          patterns: [
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {
              captures: {
                1: {name: 'keyword.other.enum.apex'},
                2: {name: 'entity.name.type.enum.apex'}
              },
              match: '(enum)\\s+(@?[_[:alpha:]][_[:alnum:]]*)'
            }
          ]
        },
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
          patterns: [
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {include: '#punctuation-comma'},
            {
              begin: '@?[_[:alpha:]][_[:alnum:]]*',
              beginCaptures: {
                0: {name: 'entity.name.variable.enum-member.apex'}
              },
              end: '(?=(,|\\}))',
              patterns: [
                {include: '#javadoc-comment'},
                {include: '#comment'},
                {include: '#variable-initializer'}
              ]
            }
          ]
        },
        {include: '#javadoc-comment'},
        {include: '#comment'}
      ]
    },
    expression: {
      patterns: [
        {include: '#comment'},
        {include: '#merge-expression'},
        {include: '#support-expression'},
        {include: '#throw-expression'},
        {include: '#this-expression'},
        {include: '#trigger-context-declaration'},
        {include: '#conditional-operator'},
        {include: '#expression-operators'},
        {include: '#soql-query-expression'},
        {include: '#object-creation-expression'},
        {include: '#array-creation-expression'},
        {include: '#invocation-expression'},
        {include: '#member-access-expression'},
        {include: '#element-access-expression'},
        {include: '#cast-expression'},
        {include: '#literal'},
        {include: '#parenthesized-expression'},
        {include: '#initializer-expression'},
        {include: '#identifier'}
      ]
    },
    'expression-body': {
      begin: '=>',
      beginCaptures: {0: {name: 'keyword.operator.arrow.apex'}},
      end: '(?=[,\\);}])',
      patterns: [{include: '#expression'}]
    },
    'expression-operators': {
      patterns: [
        {
          match: '\\*=|/=|%=|\\+=|-=',
          name: 'keyword.operator.assignment.compound.apex'
        },
        {
          match: '\\&=|\\^=|<<=|>>=|\\|=',
          name: 'keyword.operator.assignment.compound.bitwise.apex'
        },
        {match: '<<|>>', name: 'keyword.operator.bitwise.shift.apex'},
        {match: '==|!=', name: 'keyword.operator.comparison.apex'},
        {match: '<=|>=|<|>', name: 'keyword.operator.relational.apex'},
        {match: '\\!|&&|\\|\\|', name: 'keyword.operator.logical.apex'},
        {match: '\\&|~|\\^|\\|', name: 'keyword.operator.bitwise.apex'},
        {match: '\\=', name: 'keyword.operator.assignment.apex'},
        {match: '--', name: 'keyword.operator.decrement.apex'},
        {match: '\\+\\+', name: 'keyword.operator.increment.apex'},
        {match: '%|\\*|/|-|\\+', name: 'keyword.operator.arithmetic.apex'}
      ]
    },
    'extends-class': {
      begin: '(extends)\\b\\s+([_[:alpha:]][_[:alnum:]]*)',
      beginCaptures: {
        1: {name: 'keyword.other.extends.apex'},
        2: {name: 'entity.name.type.extends.apex'}
      },
      end: '(?={|implements)'
    },
    'field-declaration': {
      begin:
        '(?x)\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s+\n(\\g<identifier>)\\s* # first field name\n(?!=>|==)(?=,|;|=|$)',
      beginCaptures: {
        1: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        5: {name: 'entity.name.variable.field.apex'}
      },
      end: '(?=;)',
      patterns: [
        {
          match: '@?[_[:alpha:]][_[:alnum:]]*',
          name: 'entity.name.variable.field.apex'
        },
        {include: '#punctuation-comma'},
        {include: '#comment'},
        {include: '#variable-initializer'},
        {include: '#class-or-trigger-members'}
      ]
    },
    'finally-clause': {
      begin: '(?<!\\.)\\b(finally)\\b',
      beginCaptures: {1: {name: 'keyword.control.try.finally.apex'}},
      end: '(?<=\\})',
      patterns: [{include: '#comment'}, {include: '#block'}]
    },
    'for-apex-syntax': {
      captures: {
        1: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        2: {name: 'entity.name.variable.local.apex'},
        3: {name: 'keyword.operator.iterator.colon.apex'}
      },
      match:
        '([_.[:alpha:]][_.[:alnum:]]+)\\s+([_.[:alpha:]][_.[:alnum:]]*)\\s*(\\:)'
    },
    'for-statement': {
      begin: '(?<!\\.)\\b(for)\\b\\s*(?=\\()',
      beginCaptures: {1: {name: 'keyword.control.loop.for.apex'}},
      end: '(?<=\\})|(?=;)',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [
            {include: '#for-apex-syntax'},
            {include: '#local-variable-declaration'},
            {include: '#expression'},
            {include: '#punctuation-comma'},
            {include: '#punctuation-semicolon'},
            {include: '#colon-expression'}
          ]
        },
        {include: '#statement'}
      ]
    },
    'from-clause': {
      captures: {
        1: {name: 'keyword.operator.query.from.apex'},
        2: {name: 'storage.type.apex'}
      },
      match: '(FROM)\\b\\s*([_\\.[:alnum:]]+\\b)?'
    },
    'goto-statement': {
      begin: '(?<!\\.)\\b(goto)\\b',
      beginCaptures: {1: {name: 'keyword.control.goto.apex'}},
      end: '(?=;)',
      patterns: [
        {
          begin: '\\b(case)\\b',
          beginCaptures: {1: {name: 'keyword.control.case.apex'}},
          end: '(?=;)',
          patterns: [{include: '#expression'}]
        },
        {
          captures: {1: {name: 'keyword.control.default.apex'}},
          match: '\\b(default)\\b'
        },
        {match: '@?[_[:alpha:]][_[:alnum:]]*', name: 'entity.name.label.apex'}
      ]
    },
    identifier: {
      match: '@?[_[:alpha:]][_[:alnum:]]*',
      name: 'variable.other.readwrite.apex'
    },
    'if-statement': {
      begin: '(?<!\\.)\\b(if)\\b\\s*(?=\\()',
      beginCaptures: {1: {name: 'keyword.control.conditional.if.apex'}},
      end: '(?<=\\})|(?=;)',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}]
        },
        {include: '#statement'}
      ]
    },
    'implements-class': {
      begin: '(implements)\\b\\s+([_[:alpha:]][_[:alnum:]]*)',
      beginCaptures: {
        1: {name: 'keyword.other.implements.apex'},
        2: {name: 'entity.name.type.implements.apex'}
      },
      end: '(?={|extends)'
    },
    'indexer-declaration': {
      begin:
        '(?x)\n(?<return_type>\n  (?<type_name>\n    (?:\n      (?:ref\\s+)?   # ref return\n      (?:\n        (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n        (?<name_and_type_args> # identifier + type arguments (if any)\n          \\g<identifier>\\s*\n          (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n        )\n        (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n      )\n      (?:\\s*\\?\\s*)? # nullable suffix?\n      (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n    )\n  )\\s+\n)\n(?<interface_name>\\g<type_name>\\s*\\.\\s*)?\n(?<indexer_name>this)\\s*\n(?=\\[)',
      beginCaptures: {
        1: {patterns: [{include: '#type'}]},
        6: {patterns: [{include: '#type'}, {include: '#punctuation-accessor'}]},
        7: {name: 'keyword.other.this.apex'}
      },
      end: '(?<=\\})|(?=;)',
      patterns: [
        {include: '#comment'},
        {include: '#property-accessors'},
        {include: '#expression-body'},
        {include: '#variable-initializer'}
      ]
    },
    'initializer-expression': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
      patterns: [{include: '#expression'}, {include: '#punctuation-comma'}]
    },
    'interface-declaration': {
      begin: '(?=\\binterface\\b)',
      end: '(?<=\\})',
      patterns: [
        {
          begin: '(?x)\n(interface)\\b\\s+\n(@?[_[:alpha:]][_[:alnum:]]*)',
          beginCaptures: {
            1: {name: 'keyword.other.interface.apex'},
            2: {name: 'entity.name.type.interface.apex'}
          },
          end: '(?=\\{)',
          patterns: [
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {include: '#type-parameter-list'},
            {include: '#extends-class'}
          ]
        },
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
          patterns: [{include: '#interface-members'}]
        },
        {include: '#javadoc-comment'},
        {include: '#comment'}
      ]
    },
    'interface-members': {
      patterns: [
        {include: '#javadoc-comment'},
        {include: '#comment'},
        {include: '#property-declaration'},
        {include: '#indexer-declaration'},
        {include: '#method-declaration'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'invocation-expression': {
      begin:
        '(?x)\n(?:(\\??\\.)\\s*)?                                  # safe navigator or accessor\n(@?[_[:alpha:]][_[:alnum:]]*)\\s*                 # method name\n(?<type_args>\\s*<([^<>]|\\g<type_args>)+>\\s*)?\\s* # type arguments\n(?=\\()                                           # open paren of argument list',
      beginCaptures: {
        1: {
          patterns: [
            {include: '#punctuation-accessor'},
            {include: '#operator-safe-navigation'}
          ]
        },
        2: {name: 'entity.name.function.apex'},
        3: {patterns: [{include: '#type-arguments'}]}
      },
      end: '(?<=\\))',
      patterns: [{include: '#argument-list'}]
    },
    'javadoc-comment': {
      patterns: [
        {
          begin: '^\\s*(/\\*\\*)(?!/)',
          beginCaptures: {1: {name: 'punctuation.definition.comment.apex'}},
          end: '\\*/',
          endCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
          name: 'comment.block.javadoc.apex',
          patterns: [
            {
              match:
                '@(deprecated|author|return|see|serial|since|version|usage|name|link)\\b',
              name: 'keyword.other.documentation.javadoc.apex'
            },
            {
              captures: {
                1: {name: 'keyword.other.documentation.javadoc.apex'},
                2: {name: 'entity.name.variable.parameter.apex'}
              },
              match: '(@param)\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'keyword.other.documentation.javadoc.apex'},
                2: {name: 'entity.name.type.class.apex'}
              },
              match: '(@(?:exception|throws))\\s+(\\S+)'
            },
            {
              captures: {1: {name: 'string.quoted.single.apex'}},
              match: '(`([^`]+?)`)'
            }
          ]
        }
      ]
    },
    literal: {
      patterns: [
        {include: '#boolean-literal'},
        {include: '#null-literal'},
        {include: '#numeric-literal'},
        {include: '#string-literal'}
      ]
    },
    'local-constant-declaration': {
      begin:
        '(?x)\n(?<const_keyword>\\b(?:const)\\b)\\s*\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s+\n(\\g<identifier>)\\s*\n(?=,|;|=)',
      beginCaptures: {
        1: {name: 'storage.modifier.apex'},
        2: {patterns: [{include: '#type'}]},
        6: {name: 'entity.name.variable.local.apex'}
      },
      end: '(?=;)',
      patterns: [
        {
          match: '@?[_[:alpha:]][_[:alnum:]]*',
          name: 'entity.name.variable.local.apex'
        },
        {include: '#punctuation-comma'},
        {include: '#comment'},
        {include: '#variable-initializer'}
      ]
    },
    'local-declaration': {
      patterns: [
        {include: '#local-constant-declaration'},
        {include: '#local-variable-declaration'}
      ]
    },
    'local-variable-declaration': {
      begin:
        '(?x)\n(?:\n  (?:(\\bref)\\s+)?(\\bvar\\b)| # ref local\n  (?<type_name>\n    (?:\n      (?:ref\\s+)?   # ref local\n      (?:\n        (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n        (?<name_and_type_args> # identifier + type arguments (if any)\n          \\g<identifier>\\s*\n          (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n        )\n        (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n      )\n      (?:\\s*\\?\\s*)? # nullable suffix?\n      (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n    )\n  )\n)\\s+\n(\\g<identifier>)\\s*\n(?=,|;|=|\\))',
      beginCaptures: {
        1: {name: 'storage.modifier.apex'},
        2: {name: 'keyword.other.var.apex'},
        3: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        7: {name: 'entity.name.variable.local.apex'}
      },
      end: '(?=;|\\))',
      patterns: [
        {
          match: '@?[_[:alpha:]][_[:alnum:]]*',
          name: 'entity.name.variable.local.apex'
        },
        {include: '#punctuation-comma'},
        {include: '#comment'},
        {include: '#variable-initializer'}
      ]
    },
    'member-access-expression': {
      patterns: [
        {
          captures: {
            1: {
              patterns: [
                {include: '#punctuation-accessor'},
                {include: '#operator-safe-navigation'}
              ]
            },
            2: {name: 'variable.other.object.property.apex'}
          },
          match:
            '(?x)\n(\\??\\.)\\s*                       # safe navigator or accessor\n(@?[_[:alpha:]][_[:alnum:]]*)\\s* # property name\n(?![_[:alnum:]]|\\(|(\\?)?\\[|<)    # next character is not alpha-numeric, nor a (, [, or <. Also, test for ?['
        },
        {
          captures: {
            1: {
              patterns: [
                {include: '#punctuation-accessor'},
                {include: '#operator-safe-navigation'}
              ]
            },
            2: {name: 'variable.other.object.apex'},
            3: {patterns: [{include: '#type-arguments'}]}
          },
          match:
            '(?x)\n(\\??\\.)?\\s*\n(@?[_[:alpha:]][_[:alnum:]]*)\n(?<type_params>\\s*<([^<>]|\\g<type_params>)+>\\s*)\n(?=\n  (\\s*\\?)?\n  \\s*\\.\\s*@?[_[:alpha:]][_[:alnum:]]*\n)'
        },
        {
          captures: {1: {name: 'variable.other.object.apex'}},
          match:
            '(?x)\n(@?[_[:alpha:]][_[:alnum:]]*)\n(?=\n  (\\s*\\?)?\n  \\s*\\.\\s*@?[_[:alpha:]][_[:alnum:]]*\n)'
        }
      ]
    },
    'merge-expression': {
      begin: '(merge)\\b\\s+',
      beginCaptures: {1: {name: 'support.function.apex'}},
      end: '(?<=\\;)',
      patterns: [
        {include: '#object-creation-expression'},
        {include: '#merge-type-statement'},
        {include: '#expression'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'merge-type-statement': {
      captures: {
        1: {name: 'variable.other.readwrite.apex'},
        2: {name: 'variable.other.readwrite.apex'},
        3: {name: 'punctuation.terminator.statement.apex'}
      },
      match: '([_[:alpha:]]*)\\b\\s+([_[:alpha:]]*)\\b\\s*(\\;)'
    },
    'method-declaration': {
      begin:
        '(?x)\n(?<return_type>\n  (?<type_name>\n    (?:\n      (?:ref\\s+)?   # ref return\n      (?:\n        (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n        (?<name_and_type_args> # identifier + type arguments (if any)\n          \\g<identifier>\\s*\n          (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n        )\n        (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n      )\n      (?:\\s*\\?\\s*)? # nullable suffix?\n      (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n    )\n  )\\s+\n)\n(?<interface_name>\\g<type_name>\\s*\\.\\s*)?\n(\\g<identifier>)\\s*\n(<([^<>]+)>)?\\s*\n(?=\\()',
      beginCaptures: {
        1: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        6: {patterns: [{include: '#type'}, {include: '#punctuation-accessor'}]},
        7: {
          patterns: [
            {include: '#support-type'},
            {include: '#method-name-custom'}
          ]
        },
        8: {patterns: [{include: '#type-parameter-list'}]}
      },
      end: '(?<=\\})|(?=;)',
      patterns: [
        {include: '#comment'},
        {include: '#parenthesized-parameter-list'},
        {include: '#expression-body'},
        {include: '#block'}
      ]
    },
    'method-name-custom': {
      match: '@?[_[:alpha:]][_[:alnum:]]*',
      name: 'entity.name.function.apex'
    },
    'named-argument': {
      begin: '(@?[_[:alpha:]][_[:alnum:]]*)\\s*(:)',
      beginCaptures: {
        1: {name: 'entity.name.variable.parameter.apex'},
        2: {name: 'punctuation.separator.colon.apex'}
      },
      end: '(?=(,|\\)|\\]))',
      patterns: [{include: '#expression'}]
    },
    'null-literal': {
      match: '(?<!\\.)\\bnull\\b',
      name: 'constant.language.null.apex'
    },
    'numeric-literal': {
      patterns: [
        {
          match:
            '\\b(\\d{4}\\-\\d{2}\\-\\d{2}T\\d{2}\\:\\d{2}\\:\\d{2}(\\.\\d{1,3})?(\\-|\\+)\\d{2}\\:\\d{2})\\b',
          name: 'constant.numeric.datetime.apex'
        },
        {
          match:
            '\\b(\\d{4}\\-\\d{2}\\-\\d{2}T\\d{2}\\:\\d{2}\\:\\d{2}(\\.\\d{1,3})?(Z)?)\\b',
          name: 'constant.numeric.datetime.apex'
        },
        {
          match: '\\b(\\d{4}\\-\\d{2}\\-\\d{2})\\b',
          name: 'constant.numeric.date.apex'
        },
        {
          match: '\\b0(x|X)[0-9a-fA-F_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\\b',
          name: 'constant.numeric.hex.apex'
        },
        {
          match: '\\b0(b|B)[01_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\\b',
          name: 'constant.numeric.binary.apex'
        },
        {
          match: '\\b([0-9_]+)?\\.[0-9_]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\\b',
          name: 'constant.numeric.decimal.apex'
        },
        {
          match: '\\b[0-9_]+(e|E)[0-9_]+(F|f|D|d|M|m)?\\b',
          name: 'constant.numeric.decimal.apex'
        },
        {
          match: '\\b[0-9_]+(F|f|D|d|M|m)\\b',
          name: 'constant.numeric.decimal.apex'
        },
        {
          match: '\\b[0-9_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\\b',
          name: 'constant.numeric.decimal.apex'
        }
      ]
    },
    'object-creation-expression': {
      patterns: [
        {include: '#object-creation-expression-with-parameters'},
        {include: '#object-creation-expression-with-no-parameters'},
        {include: '#punctuation-comma'}
      ]
    },
    'object-creation-expression-with-no-parameters': {
      captures: {
        1: {name: 'support.function.apex'},
        2: {name: 'keyword.control.new.apex'},
        3: {patterns: [{include: '#support-type'}, {include: '#type'}]}
      },
      match:
        '(?x)\n(delete|insert|undelete|update|upsert)?\n\\s*(new)\\s+\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s*\n(?=\\{|$)'
    },
    'object-creation-expression-with-parameters': {
      begin:
        '(?x)\n(delete|insert|undelete|update|upsert)?\n\\s*(new)\\s+\n(?<type_name>\n  (?:\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s*\n(?=\\()',
      beginCaptures: {
        1: {name: 'support.function.apex'},
        2: {name: 'keyword.control.new.apex'},
        3: {patterns: [{include: '#support-type'}, {include: '#type'}]}
      },
      end: '(?<=\\))',
      patterns: [{include: '#argument-list'}]
    },
    'operator-assignment': {
      match: '(?<!=|!)(=)(?!=)',
      name: 'keyword.operator.assignment.apex'
    },
    'operator-safe-navigation': {
      match: '\\?\\.',
      name: 'keyword.operator.safe-navigation.apex'
    },
    'orderby-clause': {
      captures: {1: {name: 'keyword.operator.query.orderby.apex'}},
      match: '\\b(ORDER BY)\\b\\s*',
      patterns: [{include: '#ordering-direction'}, {include: '#ordering-nulls'}]
    },
    'ordering-direction': {
      captures: {
        1: {name: 'keyword.operator.query.ascending.apex'},
        2: {name: 'keyword.operator.query.descending.apex'}
      },
      match: '\\b(?:(ASC)|(DESC))\\b'
    },
    'ordering-nulls': {
      captures: {
        1: {name: 'keyword.operator.query.nullsfirst.apex'},
        2: {name: 'keyword.operator.query.nullslast.apex'}
      },
      match: '\\b(?:(NULLS FIRST)|(NULLS LAST))\\b'
    },
    parameter: {
      captures: {
        1: {name: 'storage.modifier.apex'},
        2: {patterns: [{include: '#support-type'}, {include: '#type'}]},
        6: {name: 'entity.name.variable.parameter.apex'}
      },
      match:
        '(?x)\n(?:(?:\\b(this)\\b)\\s+)?\n(?<type_name>\n  (?:\n    (?:ref\\s+)?   # ref return\n    (?:\n      (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n      (?<name_and_type_args> # identifier + type arguments (if any)\n        \\g<identifier>\\s*\n        (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n      )\n      (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n    )\n    (?:\\s*\\?\\s*)? # nullable suffix?\n    (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n  )\n)\\s+\n(\\g<identifier>)'
    },
    'parenthesized-expression': {
      begin: '\\(',
      beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
      patterns: [{include: '#expression'}]
    },
    'parenthesized-parameter-list': {
      begin: '(\\()',
      beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
      end: '(\\))',
      endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
      patterns: [
        {include: '#comment'},
        {include: '#parameter'},
        {include: '#punctuation-comma'},
        {include: '#variable-initializer'}
      ]
    },
    'property-accessors': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
      patterns: [
        {match: '\\b(private|protected)\\b', name: 'storage.modifier.apex'},
        {match: '\\b(get)\\b', name: 'keyword.other.get.apex'},
        {match: '\\b(set)\\b', name: 'keyword.other.set.apex'},
        {include: '#comment'},
        {include: '#expression-body'},
        {include: '#block'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'property-declaration': {
      begin:
        '(?x)\n(?!.*\\b(?:class|interface|enum)\\b)\\s*\n(?<return_type>\n  (?<type_name>\n    (?:\n      (?:ref\\s+)?   # ref return\n      (?:\n        (?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)? # alias-qualification\n        (?<name_and_type_args> # identifier + type arguments (if any)\n          \\g<identifier>\\s*\n          (?<type_args>\\s*<(?:[^<>]|\\g<type_args>)+>\\s*)?\n        )\n        (?:\\s*\\.\\s*\\g<name_and_type_args>)*\n      )\n      (?:\\s*\\?\\s*)? # nullable suffix?\n      (?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)* # array suffix?\n    )\n  )\\s+\n)\n(?<interface_name>\\g<type_name>\\s*\\.\\s*)?\n(?<property_name>\\g<identifier>)\\s*\n(?=\\{|=>|$)',
      beginCaptures: {
        1: {patterns: [{include: '#type'}]},
        6: {patterns: [{include: '#type'}, {include: '#punctuation-accessor'}]},
        7: {name: 'entity.name.variable.property.apex'}
      },
      end: '(?<=\\})|(?=;)',
      patterns: [
        {include: '#comment'},
        {include: '#property-accessors'},
        {include: '#expression-body'},
        {include: '#variable-initializer'},
        {include: '#class-or-trigger-members'}
      ]
    },
    'punctuation-accessor': {match: '\\.', name: 'punctuation.accessor.apex'},
    'punctuation-comma': {match: ',', name: 'punctuation.separator.comma.apex'},
    'punctuation-semicolon': {
      match: ';',
      name: 'punctuation.terminator.statement.apex'
    },
    'query-operators': {
      captures: {1: {name: 'keyword.operator.query.apex'}},
      match:
        '\\b(ABOVE|AND|AT|FOR REFERENCE|FOR UPDATE|FOR VIEW|GROUP BY|HAVING|IN|LIKE|LIMIT|NOT IN|NOT|OFFSET|OR|TYPEOF|UPDATE TRACKING|UPDATE VIEWSTAT|WITH DATA CATEGORY|WITH)\\b\\s*'
    },
    'return-statement': {
      begin: '(?<!\\.)\\b(return)\\b',
      beginCaptures: {1: {name: 'keyword.control.flow.return.apex'}},
      end: '(?=;)',
      patterns: [{include: '#expression'}]
    },
    'script-top-level': {
      patterns: [
        {include: '#method-declaration'},
        {include: '#statement'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'sharing-modifier': {
      match: '(?<!\\.)\\b(with sharing|without sharing|inherited sharing)\\b',
      name: 'sharing.modifier.apex'
    },
    'soql-colon-method-statement': {
      begin: '(:?\\.)?([_[:alpha:]][_[:alnum:]]*)(?=\\()',
      beginCaptures: {
        1: {name: 'punctuation.accessor.apex'},
        2: {name: 'entity.name.function.apex'}
      },
      end: '(?<=\\))',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}]
        },
        {include: '#statement'}
      ]
    },
    'soql-colon-vars': {
      begin: '(\\:)\\s*',
      beginCaptures: {0: {name: 'keyword.operator.conditional.colon.apex'}},
      end: '(?![_[:alnum:]]|\\(|(\\?)?\\[|<)',
      patterns: [
        {include: '#trigger-context-declaration'},
        {
          captures: {
            1: {name: 'variable.other.object.apex'},
            2: {
              patterns: [
                {include: '#punctuation-accessor'},
                {include: '#operator-safe-navigation'}
              ]
            }
          },
          match: '([_[:alpha:]][_[:alnum:]]*)(\\??\\.)'
        },
        {include: '#soql-colon-method-statement'},
        {
          match: '[_[:alpha:]][_[:alnum:]]*',
          name: 'entity.name.variable.local.apex'
        }
      ]
    },
    'soql-functions': {
      begin:
        '\\b(AVG|CALENDAR_MONTH|CALENDAR_QUARTER|CALENDAR_YEAR|convertCurrency|convertTimezone|COUNT|COUNT_DISTINCT|DAY_IN_MONTH|DAY_IN_WEEK|DAY_IN_YEAR|DAY_ONLY|toLabel|INCLUDES|EXCLUDES|FISCAL_MONTH|FISCAL_QUARTER|FISCAL_YEAR|FORMAT|GROUPING|GROUP BY CUBE|GROUP BY ROLLUP|HOUR_IN_DAY|MAX|MIN|SUM|WEEK_IN_MONTH|WEEK_IN_YEAR)\\s*(\\()',
      beginCaptures: {
        1: {name: 'support.function.query.apex'},
        2: {name: 'punctuation.parenthesis.open.apex'}
      },
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
      patterns: [
        {include: '#literal'},
        {include: '#punctuation-comma'},
        {include: '#soql-functions'},
        {match: '[_.[:alpha:]][_.[:alnum:]]*', name: 'keyword.query.field.apex'}
      ]
    },
    'soql-group-clauses': {
      begin: '\\(',
      beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
      patterns: [
        {include: '#soql-query-expression'},
        {include: '#soql-colon-vars'},
        {include: '#soql-group-clauses'},
        {include: '#punctuation-comma'},
        {include: '#operator-assignment'},
        {include: '#literal'},
        {include: '#query-operators'},
        {include: '#date-literals'},
        {include: '#date-literal-with-params'},
        {include: '#using-scope'},
        {match: '[_.[:alpha:]][_.[:alnum:]]*', name: 'keyword.query.field.apex'}
      ]
    },
    'soql-query-body': {
      patterns: [
        {include: '#trigger-context-declaration'},
        {include: '#soql-colon-vars'},
        {include: '#soql-functions'},
        {include: '#from-clause'},
        {include: '#where-clause'},
        {include: '#query-operators'},
        {include: '#date-literals'},
        {include: '#date-literal-with-params'},
        {include: '#using-scope'},
        {include: '#soql-group-clauses'},
        {include: '#orderby-clause'},
        {include: '#ordering-direction'},
        {include: '#ordering-nulls'}
      ]
    },
    'soql-query-expression': {
      begin: '\\b(SELECT)\\b\\s*',
      beginCaptures: {1: {name: 'keyword.operator.query.select.apex'}},
      end: '(?=;)|(?=\\])|(?=\\))',
      patterns: [
        {include: '#soql-query-body'},
        {include: '#comment'},
        {include: '#punctuation-comma'},
        {include: '#operator-assignment'},
        {include: '#parenthesized-expression'},
        {include: '#expression-operators'},
        {include: '#literal'},
        {
          captures: {
            1: {name: 'keyword.query.field.apex'},
            2: {name: 'punctuation.separator.comma.apex'}
          },
          match: '([_.[:alpha:]][_.[:alnum:]]*)\\s*(\\,)?'
        }
      ]
    },
    statement: {
      patterns: [
        {include: '#comment'},
        {include: '#while-statement'},
        {include: '#do-statement'},
        {include: '#for-statement'},
        {include: '#switch-statement'},
        {include: '#when-else-statement'},
        {include: '#when-sobject-statement'},
        {include: '#when-statement'},
        {include: '#when-multiple-statement'},
        {include: '#if-statement'},
        {include: '#else-part'},
        {include: '#goto-statement'},
        {include: '#return-statement'},
        {include: '#break-or-continue-statement'},
        {include: '#throw-statement'},
        {include: '#try-statement'},
        {include: '#soql-query-expression'},
        {include: '#local-declaration'},
        {include: '#block'},
        {include: '#expression'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'storage-modifier': {
      match:
        '(?<!\\.)\\b(new|public|protected|private|abstract|virtual|override|global|static|final|transient)\\b',
      name: 'storage.modifier.apex'
    },
    'string-character-escape': {
      match: '\\\\.',
      name: 'constant.character.escape.apex'
    },
    'string-literal': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.apex'}},
      end: "(\\')|((?:[^\\\\\\n])$)",
      endCaptures: {
        1: {name: 'punctuation.definition.string.end.apex'},
        2: {name: 'invalid.illegal.newline.apex'}
      },
      name: 'string.quoted.single.apex',
      patterns: [{include: '#string-character-escape'}]
    },
    'support-arguments': {
      begin: '<',
      beginCaptures: {
        0: {name: 'punctuation.definition.typeparameters.begin.apex'}
      },
      end: '>',
      endCaptures: {
        0: {name: 'punctuation.definition.typeparameters.end.apex'}
      },
      patterns: [
        {include: '#comment'},
        {include: '#support-type'},
        {include: '#punctuation-comma'}
      ]
    },
    'support-class': {
      captures: {1: {name: 'support.class.apex'}},
      match:
        '\\b(ApexPages|Database|DMLException|Exception|PageReference|Savepoint|SchedulableContext|Schema|SObject|System|Test)\\b'
    },
    'support-expression': {
      begin:
        '(?x)\n(ApexPages|Database|DMLException|Exception|PageReference|Savepoint|SchedulableContext|Schema|SObject|System|Test)(?=\\.|\\s) # supported apex namespaces',
      beginCaptures: {1: {name: 'support.class.apex'}},
      end: '(?<=\\)|$)|(?=\\})|(?=;)|(?=\\)|(?=\\]))|(?=\\,)',
      patterns: [
        {include: '#support-type'},
        {
          captures: {
            1: {name: 'punctuation.accessor.apex'},
            2: {name: 'support.function.apex'}
          },
          match: '(?:(\\.))([[:alpha:]]*)(?=\\()'
        },
        {
          captures: {
            1: {name: 'punctuation.accessor.apex'},
            2: {name: 'support.type.apex'}
          },
          match: '(?:(\\.))([[:alpha:]]+)'
        },
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}, {include: '#punctuation-comma'}]
        },
        {include: '#comment'},
        {include: '#statement'}
      ]
    },
    'support-functions': {
      captures: {1: {name: 'support.function.apex'}},
      match: '\\b(delete|execute|finish|insert|start|undelete|update|upsert)\\b'
    },
    'support-name': {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.accessor.apex'},
            2: {name: 'support.function.apex'}
          },
          match: '(\\.)\\s*([[:alpha:]]*)(?=\\()'
        },
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}, {include: '#punctuation-comma'}]
        },
        {
          captures: {
            1: {name: 'punctuation.accessor.apex'},
            2: {name: 'support.type.apex'}
          },
          match: '(\\.)\\s*([_[:alpha:]]*)'
        }
      ]
    },
    'support-type': {
      name: 'support.apex',
      patterns: [
        {include: '#comment'},
        {include: '#support-class'},
        {include: '#support-functions'},
        {include: '#support-name'}
      ]
    },
    'switch-statement': {
      begin:
        "(?x)\n(switch)\\b\\s+\n(on)\\b\\s+\n(?:([_.?\\'\\(\\)[:alnum:]]+)\\s*)?\n(\\{)",
      beginCaptures: {
        1: {name: 'keyword.control.switch.apex'},
        2: {name: 'keyword.control.switch.on.apex'},
        3: {
          patterns: [
            {include: '#statement'},
            {include: '#parenthesized-expression'}
          ]
        },
        4: {name: 'punctuation.curlybrace.open.apex'}
      },
      end: '(\\})',
      endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
      patterns: [
        {include: '#when-string'},
        {include: '#when-else-statement'},
        {include: '#when-sobject-statement'},
        {include: '#when-statement'},
        {include: '#when-multiple-statement'},
        {include: '#expression'},
        {include: '#punctuation-comma'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'this-expression': {
      captures: {1: {name: 'keyword.other.this.apex'}},
      match: '\\b(?:(this))\\b'
    },
    'throw-expression': {
      captures: {1: {name: 'keyword.control.flow.throw.apex'}},
      match: '(?<!\\.)\\b(throw)\\b'
    },
    'throw-statement': {
      begin: '(?<!\\.)\\b(throw)\\b',
      beginCaptures: {1: {name: 'keyword.control.flow.throw.apex'}},
      end: '(?=;)',
      patterns: [{include: '#expression'}]
    },
    'trigger-context-declaration': {
      begin: '\\b(?:(Trigger))\\b(\\.)\\b',
      beginCaptures: {
        1: {name: 'support.class.trigger.apex'},
        2: {name: 'punctuation.accessor.apex'}
      },
      end: '(?=\\})|(?=;)|(?=\\)|(?=\\]))',
      patterns: [
        {
          match:
            '\\b(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size)\\b',
          name: 'support.type.trigger.apex'
        },
        {
          captures: {
            1: {
              patterns: [
                {include: '#punctuation-accessor'},
                {include: '#operator-safe-navigation'}
              ]
            },
            2: {name: 'support.function.trigger.apex'}
          },
          match: '(?:(\\??\\.))([[:alpha:]]+)(?=\\()'
        },
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [
            {include: '#trigger-type-statement'},
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {include: '#expression'}
          ]
        },
        {include: '#expression'}
      ]
    },
    'trigger-declaration': {
      begin: '(?=\\btrigger\\b)',
      end: '(?<=\\})',
      patterns: [
        {
          begin:
            '(?x)\n\\b(trigger)\\b\\s+\n(@?[_[:alpha:]][_[:alnum:]]*)\\s*\n\\b(on)\\b\\s+\n([_[:alpha:]][_[:alnum:]]*)\\s*',
          beginCaptures: {
            1: {name: 'keyword.other.trigger.apex'},
            2: {name: 'entity.name.type.trigger.apex'},
            3: {name: 'keyword.operator.trigger.on.apex'},
            4: {name: 'storage.type.apex'}
          },
          end: '(?=\\{)',
          patterns: [
            {
              begin: '\\(',
              beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
              end: '\\)',
              endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
              patterns: [
                {include: '#trigger-type-statement'},
                {include: '#trigger-operator-statement'},
                {include: '#punctuation-comma'},
                {include: '#expression'}
              ]
            },
            {include: '#javadoc-comment'},
            {include: '#comment'},
            {include: '#type-parameter-list'}
          ]
        },
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.curlybrace.open.apex'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.curlybrace.close.apex'}},
          patterns: [
            {include: '#statement'},
            {include: '#class-or-trigger-members'}
          ]
        },
        {include: '#javadoc-comment'},
        {include: '#comment'}
      ]
    },
    'trigger-operator-statement': {
      match: '\\b(insert|update|delete|merge|upsert|undelete)\\b',
      name: 'keyword.operator.trigger.apex'
    },
    'trigger-type-statement': {
      captures: {
        1: {name: 'keyword.control.trigger.before.apex'},
        2: {name: 'keyword.control.trigger.after.apex'}
      },
      match: '\\b(?:(before)|(after))\\b'
    },
    'try-block': {
      begin: '(?<!\\.)\\b(try)\\b',
      beginCaptures: {1: {name: 'keyword.control.try.apex'}},
      end: '(?<=\\})',
      patterns: [{include: '#comment'}, {include: '#block'}]
    },
    'try-statement': {
      patterns: [
        {include: '#try-block'},
        {include: '#catch-clause'},
        {include: '#finally-clause'}
      ]
    },
    type: {
      name: 'meta.type.apex',
      patterns: [
        {include: '#comment'},
        {include: '#type-builtin'},
        {include: '#type-name'},
        {include: '#type-arguments'},
        {include: '#type-array-suffix'},
        {include: '#type-nullable-suffix'}
      ]
    },
    'type-arguments': {
      begin: '<',
      beginCaptures: {
        0: {name: 'punctuation.definition.typeparameters.begin.apex'}
      },
      end: '>',
      endCaptures: {
        0: {name: 'punctuation.definition.typeparameters.end.apex'}
      },
      patterns: [
        {include: '#comment'},
        {include: '#support-type'},
        {include: '#type'},
        {include: '#punctuation-comma'}
      ]
    },
    'type-array-suffix': {
      begin: '\\[',
      beginCaptures: {0: {name: 'punctuation.squarebracket.open.apex'}},
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.squarebracket.close.apex'}},
      patterns: [{include: '#punctuation-comma'}]
    },
    'type-builtin': {
      captures: {1: {name: 'keyword.type.apex'}},
      match:
        '\\b(Blob|Boolean|byte|Date|Datetime|Decimal|Double|ID|Integer|Long|Object|String|Time|void)\\b'
    },
    'type-declarations': {
      patterns: [
        {include: '#javadoc-comment'},
        {include: '#comment'},
        {include: '#annotation-declaration'},
        {include: '#storage-modifier'},
        {include: '#sharing-modifier'},
        {include: '#class-declaration'},
        {include: '#enum-declaration'},
        {include: '#interface-declaration'},
        {include: '#trigger-declaration'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'type-name': {
      patterns: [
        {
          captures: {
            1: {name: 'storage.type.apex'},
            2: {name: 'punctuation.accessor.apex'}
          },
          match: '(@?[_[:alpha:]][_[:alnum:]]*)\\s*(\\.)'
        },
        {
          captures: {
            1: {name: 'punctuation.accessor.apex'},
            2: {name: 'storage.type.apex'}
          },
          match: '(\\.)\\s*(@?[_[:alpha:]][_[:alnum:]]*)'
        },
        {match: '@?[_[:alpha:]][_[:alnum:]]*', name: 'storage.type.apex'}
      ]
    },
    'type-nullable-suffix': {
      captures: {0: {name: 'punctuation.separator.question-mark.apex'}},
      match: '\\?'
    },
    'type-parameter-list': {
      begin: '\\<',
      beginCaptures: {
        0: {name: 'punctuation.definition.typeparameters.begin.apex'}
      },
      end: '\\>',
      endCaptures: {
        0: {name: 'punctuation.definition.typeparameters.end.apex'}
      },
      patterns: [
        {
          captures: {1: {name: 'entity.name.type.type-parameter.apex'}},
          match: '(@?[_[:alpha:]][_[:alnum:]]*)\\b'
        },
        {include: '#comment'},
        {include: '#punctuation-comma'}
      ]
    },
    'using-scope': {
      captures: {1: {name: 'keyword.operator.query.using.apex'}},
      match:
        '((USING SCOPE)\\b\\s*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team))\\b\\s*'
    },
    'variable-initializer': {
      begin: '(?<!=|!)(=)(?!=|>)',
      beginCaptures: {1: {name: 'keyword.operator.assignment.apex'}},
      end: '(?=[,\\)\\];}])',
      patterns: [{include: '#expression'}]
    },
    'when-else-statement': {
      begin: '(when)\\b\\s+(else)\\b\\s*',
      beginCaptures: {
        1: {name: 'keyword.control.switch.when.apex'},
        2: {name: 'keyword.control.switch.else.apex'}
      },
      end: '(?<=\\})',
      patterns: [{include: '#block'}, {include: '#expression'}]
    },
    'when-multiple-statement': {
      begin: '(when)\\b\\s*',
      beginCaptures: {1: {name: 'keyword.control.switch.when.apex'}},
      end: '(?<=\\})',
      patterns: [{include: '#block'}, {include: '#expression'}]
    },
    'when-sobject-statement': {
      begin: '(when)\\b\\s+([_[:alnum:]]+)\\s+([_[:alnum:]]+)\\s*',
      beginCaptures: {
        1: {name: 'keyword.control.switch.when.apex'},
        2: {name: 'storage.type.apex'},
        3: {name: 'entity.name.variable.local.apex'}
      },
      end: '(?<=\\})',
      patterns: [{include: '#block'}, {include: '#expression'}]
    },
    'when-statement': {
      begin: "(when)\\b\\s+([\\'_\\-[:alnum:]]+)\\s*",
      beginCaptures: {
        1: {name: 'keyword.control.switch.when.apex'},
        2: {patterns: [{include: '#expression'}]}
      },
      end: '(?<=\\})',
      patterns: [{include: '#block'}, {include: '#expression'}]
    },
    'when-string': {
      begin: "(when)(\\b\\s*)((\\')[_.\\,\\'\\s*[:alnum:]]+)",
      beginCaptures: {
        1: {name: 'keyword.control.switch.when.apex'},
        2: {name: 'punctuation.whitespace.apex'},
        3: {
          patterns: [
            {include: '#when-string-statement'},
            {include: '#punctuation-comma'}
          ]
        }
      },
      end: '(?<=\\})',
      patterns: [{include: '#block'}, {include: '#expression'}]
    },
    'when-string-statement': {
      patterns: [
        {
          begin: "\\'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.apex'}
          },
          end: "\\'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.apex'}},
          name: 'string.quoted.single.apex'
        }
      ]
    },
    'where-clause': {
      captures: {1: {name: 'keyword.operator.query.where.apex'}},
      match: '\\b(WHERE)\\b\\s*'
    },
    'while-statement': {
      begin: '(?<!\\.)\\b(while)\\b\\s*(?=\\()',
      beginCaptures: {1: {name: 'keyword.control.loop.while.apex'}},
      end: '(?<=\\})|(?=;)',
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.parenthesis.open.apex'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.parenthesis.close.apex'}},
          patterns: [{include: '#expression'}]
        },
        {include: '#statement'}
      ]
    },
    'xml-attribute': {
      patterns: [
        {
          captures: {
            1: {name: 'entity.other.attribute-name.apex'},
            2: {name: 'entity.other.attribute-name.namespace.apex'},
            3: {name: 'punctuation.separator.colon.apex'},
            4: {name: 'entity.other.attribute-name.localname.apex'},
            5: {name: 'punctuation.separator.equals.apex'}
          },
          match:
            '(?x)\n(?:^|\\s+)\n(\n  (?:\n    ([-_[:alnum:]]+)\n    (:)\n  )?\n  ([-_[:alnum:]]+)\n)\n(=)'
        },
        {include: '#xml-string'}
      ]
    },
    'xml-cdata': {
      begin: '<!\\[CDATA\\[',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.apex'}},
      end: '\\]\\]>',
      endCaptures: {0: {name: 'punctuation.definition.string.end.apex'}},
      name: 'string.unquoted.cdata.apex'
    },
    'xml-character-entity': {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.constant.apex'},
            3: {name: 'punctuation.definition.constant.apex'}
          },
          match:
            '(?x)\n(&)\n(\n  (?:[[:alpha:]:_][[:alnum:]:_.-]*)|\n  (?:\\#[[:digit:]]+)|\n  (?:\\#x[[:xdigit:]]+)\n)\n(;)',
          name: 'constant.character.entity.apex'
        },
        {match: '&', name: 'invalid.illegal.bad-ampersand.apex'}
      ]
    },
    'xml-comment': {
      begin: '<!--',
      beginCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
      end: '-->',
      endCaptures: {0: {name: 'punctuation.definition.comment.apex'}},
      name: 'comment.block.apex'
    },
    'xml-doc-comment': {
      patterns: [
        {include: '#xml-comment'},
        {include: '#xml-character-entity'},
        {include: '#xml-cdata'},
        {include: '#xml-tag'}
      ]
    },
    'xml-string': {
      patterns: [
        {
          begin: "\\'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.apex'}
          },
          end: "\\'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.apex'}},
          name: 'string.quoted.single.apex',
          patterns: [{include: '#xml-character-entity'}]
        },
        {
          begin: '\\"',
          beginCaptures: {
            0: {name: 'punctuation.definition.stringdoublequote.begin.apex'}
          },
          end: '\\"',
          endCaptures: {
            0: {name: 'punctuation.definition.stringdoublequote.end.apex'}
          },
          name: 'string.quoted.double.apex',
          patterns: [{include: '#xml-character-entity'}]
        }
      ]
    },
    'xml-tag': {
      begin:
        '(?x)\n(</?)\n(\n  (?:\n    ([-_[:alnum:]]+)\n    (:)\n  )?\n  ([-_[:alnum:]]+)\n)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.apex'},
        2: {name: 'entity.name.tag.apex'},
        3: {name: 'entity.name.tag.namespace.apex'},
        4: {name: 'punctuation.separator.colon.apex'},
        5: {name: 'entity.name.tag.localname.apex'}
      },
      end: '(/?>)',
      endCaptures: {1: {name: 'punctuation.definition.tag.apex'}},
      name: 'meta.tag.apex',
      patterns: [{include: '#xml-attribute'}]
    }
  },
  scopeName: 'source.apex'
}

export default grammar
