// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/hashicorp/syntax>
// and licensed `mpl-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.tftpl'],
  names: ['terraform-template'],
  patterns: [
    {include: '#comments'},
    {include: '#attribute_definition'},
    {include: '#block'},
    {include: '#expressions'}
  ],
  repository: {
    attribute_access: {
      begin: '\\.(?!\\*)',
      beginCaptures: {0: {name: 'keyword.operator.accessor.hcl'}},
      end: '[[:alpha:]][\\w-]*|\\d*',
      endCaptures: {
        0: {
          patterns: [
            {
              match: '(?!null|false|true)[[:alpha:]][\\w-]*',
              name: 'variable.other.member.hcl'
            },
            {match: '\\d+', name: 'constant.numeric.integer.hcl'}
          ]
        }
      }
    },
    attribute_definition: {
      captures: {
        1: {name: 'punctuation.section.parens.begin.hcl'},
        2: {name: 'variable.other.readwrite.hcl'},
        3: {name: 'punctuation.section.parens.end.hcl'},
        4: {name: 'keyword.operator.assignment.hcl'}
      },
      match:
        '(\\()?(\\b(?!null\\b|false\\b|true\\b)[[:alpha:]][[:alnum:]_-]*)(\\))?\\s*(\\=(?!\\=|\\>))\\s*',
      name: 'variable.declaration.hcl'
    },
    attribute_splat: {
      begin: '\\.',
      beginCaptures: {0: {name: 'keyword.operator.accessor.hcl'}},
      end: '\\*',
      endCaptures: {0: {name: 'keyword.operator.splat.hcl'}}
    },
    block: {
      begin: '([\\w][\\-\\w]*)([\\s\\"\\-\\w]*)(\\{)',
      beginCaptures: {
        1: {
          patterns: [
            {
              match:
                '\\bdata|check|import|locals|module|output|provider|resource|terraform|variable\\b',
              name: 'entity.name.type.terraform'
            },
            {
              match: '\\b(?!null|false|true)[[:alpha:]][[:alnum:]_-]*\\b',
              name: 'entity.name.type.hcl'
            }
          ]
        },
        2: {
          patterns: [
            {match: '[\\"\\-\\w]+', name: 'variable.other.enummember.hcl'}
          ]
        },
        3: {name: 'punctuation.section.block.begin.hcl'}
      },
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.block.end.hcl'}},
      name: 'meta.block.hcl',
      patterns: [
        {include: '#comments'},
        {include: '#attribute_definition'},
        {include: '#block'},
        {include: '#expressions'}
      ]
    },
    block_inline_comments: {
      begin: '/\\*',
      captures: {0: {name: 'punctuation.definition.comment.hcl'}},
      end: '\\*/',
      name: 'comment.block.hcl'
    },
    brackets: {
      begin: '\\[',
      beginCaptures: {0: {name: 'punctuation.section.brackets.begin.hcl'}},
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.section.brackets.end.hcl'}},
      patterns: [
        {match: '\\*', name: 'keyword.operator.splat.hcl'},
        {include: '#comma'},
        {include: '#comments'},
        {include: '#inline_for_expression'},
        {include: '#inline_if_expression'},
        {include: '#expressions'},
        {include: '#local_identifiers'}
      ]
    },
    char_escapes: {
      match: '\\\\[nrt"\\\\]|\\\\u([[:xdigit:]]{8}|[[:xdigit:]]{4})',
      name: 'constant.character.escape.hcl'
    },
    comma: {match: '\\,', name: 'punctuation.separator.hcl'},
    comments: {
      patterns: [
        {include: '#hash_line_comments'},
        {include: '#double_slash_line_comments'},
        {include: '#block_inline_comments'}
      ]
    },
    double_slash_line_comments: {
      begin: '//',
      captures: {0: {name: 'punctuation.definition.comment.hcl'}},
      end: '$\\n?',
      name: 'comment.line.double-slash.hcl'
    },
    expressions: {
      patterns: [
        {include: '#literal_values'},
        {include: '#operators'},
        {include: '#tuple_for_expression'},
        {include: '#object_for_expression'},
        {include: '#brackets'},
        {include: '#objects'},
        {include: '#attribute_access'},
        {include: '#attribute_splat'},
        {include: '#functions'},
        {include: '#parens'}
      ]
    },
    for_expression_body: {
      patterns: [
        {match: '\\bin\\b', name: 'keyword.operator.word.hcl'},
        {match: '\\bif\\b', name: 'keyword.control.conditional.hcl'},
        {match: '\\:', name: 'keyword.operator.hcl'},
        {include: '#expressions'},
        {include: '#comments'},
        {include: '#comma'},
        {include: '#local_identifiers'}
      ]
    },
    functions: {
      begin: '([:\\-\\w]+)(\\()',
      beginCaptures: {
        1: {
          patterns: [
            {
              match:
                '\\b(core::)?(abs|abspath|alltrue|anytrue|base64decode|base64encode|base64gzip|base64sha256|base64sha512|basename|bcrypt|can|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|cidrsubnets|coalesce|coalescelist|compact|concat|contains|csvdecode|dirname|distinct|element|endswith|file|filebase64|filebase64sha256|filebase64sha512|fileexists|filemd5|fileset|filesha1|filesha256|filesha512|flatten|floor|format|formatdate|formatlist|indent|index|join|jsondecode|jsonencode|keys|length|log|lookup|lower|matchkeys|max|md5|merge|min|nonsensitive|one|parseint|pathexpand|plantimestamp|pow|range|regex|regexall|replace|reverse|rsadecrypt|sensitive|setintersection|setproduct|setsubtract|setunion|sha1|sha256|sha512|signum|slice|sort|split|startswith|strcontains|strrev|substr|sum|templatefile|textdecodebase64|textencodebase64|timeadd|timecmp|timestamp|title|tobool|tolist|tomap|tonumber|toset|tostring|transpose|trim|trimprefix|trimspace|trimsuffix|try|upper|urlencode|uuid|uuidv5|values|yamldecode|yamlencode|zipmap)\\b',
              name: 'support.function.builtin.terraform'
            },
            {
              match: '\\bprovider::[[:alpha:]][\\w_-]*::[[:alpha:]][\\w_-]*\\b',
              name: 'support.function.provider.terraform'
            }
          ]
        },
        2: {name: 'punctuation.section.parens.begin.hcl'}
      },
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.section.parens.end.hcl'}},
      name: 'meta.function-call.hcl',
      patterns: [
        {include: '#comments'},
        {include: '#expressions'},
        {include: '#comma'}
      ]
    },
    hash_line_comments: {
      begin: '#',
      captures: {0: {name: 'punctuation.definition.comment.hcl'}},
      end: '$\\n?',
      name: 'comment.line.number-sign.hcl'
    },
    hcl_type_keywords: {
      match: '\\b(any|string|number|bool|list|set|map|tuple|object)\\b',
      name: 'storage.type.hcl'
    },
    heredoc: {
      begin: '(\\<\\<\\-?)\\s*(\\w+)\\s*$',
      beginCaptures: {
        1: {name: 'keyword.operator.heredoc.hcl'},
        2: {name: 'keyword.control.heredoc.hcl'}
      },
      end: '^\\s*\\2\\s*$',
      endCaptures: {0: {name: 'keyword.control.heredoc.hcl'}},
      name: 'string.unquoted.heredoc.hcl',
      patterns: [{include: '#string_interpolation'}]
    },
    inline_for_expression: {
      begin: '(for)\\b',
      beginCaptures: {1: {name: 'keyword.control.hcl'}},
      end: '\\n',
      patterns: [
        {match: '\\=\\>', name: 'storage.type.function.hcl'},
        {include: '#for_expression_body'}
      ]
    },
    inline_if_expression: {
      begin: '(if)\\b',
      beginCaptures: {1: {name: 'keyword.control.conditional.hcl'}},
      end: '\\n',
      patterns: [
        {include: '#expressions'},
        {include: '#comments'},
        {include: '#comma'},
        {include: '#local_identifiers'}
      ]
    },
    language_constants: {
      match: '\\b(true|false|null)\\b',
      name: 'constant.language.hcl'
    },
    literal_values: {
      patterns: [
        {include: '#numeric_literals'},
        {include: '#language_constants'},
        {include: '#string_literals'},
        {include: '#heredoc'},
        {include: '#hcl_type_keywords'},
        {include: '#named_value_references'}
      ]
    },
    local_identifiers: {
      match: '\\b(?!null|false|true)[[:alpha:]][[:alnum:]_-]*\\b',
      name: 'variable.other.readwrite.hcl'
    },
    named_value_references: {
      match: '\\b(var|local|module|data|path|terraform)\\b',
      name: 'variable.other.readwrite.terraform'
    },
    numeric_literals: {
      patterns: [
        {
          captures: {1: {name: 'punctuation.separator.exponent.hcl'}},
          match: '\\b\\d+([Ee][+-]?)\\d+\\b',
          name: 'constant.numeric.float.hcl'
        },
        {
          captures: {
            1: {name: 'punctuation.separator.decimal.hcl'},
            2: {name: 'punctuation.separator.exponent.hcl'}
          },
          match: '\\b\\d+(\\.)\\d+(?:([Ee][+-]?)\\d+)?\\b',
          name: 'constant.numeric.float.hcl'
        },
        {match: '\\b\\d+\\b', name: 'constant.numeric.integer.hcl'}
      ]
    },
    object_for_expression: {
      begin: '(\\{)\\s?(for)\\b',
      beginCaptures: {
        1: {name: 'punctuation.section.braces.begin.hcl'},
        2: {name: 'keyword.control.hcl'}
      },
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.braces.end.hcl'}},
      patterns: [
        {match: '\\=\\>', name: 'storage.type.function.hcl'},
        {include: '#for_expression_body'}
      ]
    },
    object_key_values: {
      patterns: [
        {include: '#comments'},
        {include: '#literal_values'},
        {include: '#operators'},
        {include: '#tuple_for_expression'},
        {include: '#object_for_expression'},
        {include: '#heredoc'},
        {include: '#functions'}
      ]
    },
    objects: {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.section.braces.begin.hcl'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.braces.end.hcl'}},
      name: 'meta.braces.hcl',
      patterns: [
        {include: '#comments'},
        {include: '#objects'},
        {include: '#inline_for_expression'},
        {include: '#inline_if_expression'},
        {
          captures: {
            1: {name: 'meta.mapping.key.hcl variable.other.readwrite.hcl'},
            2: {
              name: 'keyword.operator.assignment.hcl',
              patterns: [{match: '\\=\\>', name: 'storage.type.function.hcl'}]
            }
          },
          match:
            '\\b((?!null|false|true)[[:alpha:]][[:alnum:]_-]*)\\s*(\\=\\>?)\\s*'
        },
        {
          captures: {
            0: {patterns: [{include: '#named_value_references'}]},
            1: {name: 'meta.mapping.key.hcl string.quoted.double.hcl'},
            2: {name: 'punctuation.definition.string.begin.hcl'},
            3: {name: 'punctuation.definition.string.end.hcl'},
            4: {name: 'keyword.operator.hcl'}
          },
          match: '\\b((").*("))\\s*(\\=)\\s*'
        },
        {
          begin: '^\\s*\\(',
          beginCaptures: {0: {name: 'punctuation.section.parens.begin.hcl'}},
          end: '(\\))\\s*(=|:)\\s*',
          endCaptures: {
            1: {name: 'punctuation.section.parens.end.hcl'},
            2: {name: 'keyword.operator.hcl'}
          },
          name: 'meta.mapping.key.hcl',
          patterns: [
            {include: '#named_value_references'},
            {include: '#attribute_access'}
          ]
        },
        {include: '#object_key_values'}
      ]
    },
    operators: {
      patterns: [
        {match: '\\>\\=', name: 'keyword.operator.hcl'},
        {match: '\\<\\=', name: 'keyword.operator.hcl'},
        {match: '\\=\\=', name: 'keyword.operator.hcl'},
        {match: '\\!\\=', name: 'keyword.operator.hcl'},
        {match: '\\+', name: 'keyword.operator.arithmetic.hcl'},
        {match: '\\-', name: 'keyword.operator.arithmetic.hcl'},
        {match: '\\*', name: 'keyword.operator.arithmetic.hcl'},
        {match: '\\/', name: 'keyword.operator.arithmetic.hcl'},
        {match: '\\%', name: 'keyword.operator.arithmetic.hcl'},
        {match: '\\&\\&', name: 'keyword.operator.logical.hcl'},
        {match: '\\|\\|', name: 'keyword.operator.logical.hcl'},
        {match: '\\!', name: 'keyword.operator.logical.hcl'},
        {match: '\\>', name: 'keyword.operator.hcl'},
        {match: '\\<', name: 'keyword.operator.hcl'},
        {match: '\\?', name: 'keyword.operator.hcl'},
        {match: '\\.\\.\\.', name: 'keyword.operator.hcl'},
        {match: '\\:'}
      ]
    },
    parens: {
      begin: '\\(',
      beginCaptures: {0: {name: 'punctuation.section.parens.begin.hcl'}},
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.section.parens.end.hcl'}},
      patterns: [{include: '#comments'}, {include: '#expressions'}]
    },
    string_interpolation: {
      begin: '(?<![%$])([%$]{)',
      beginCaptures: {1: {name: 'keyword.other.interpolation.begin.hcl'}},
      end: '\\}',
      endCaptures: {0: {name: 'keyword.other.interpolation.end.hcl'}},
      name: 'meta.interpolation.hcl',
      patterns: [
        {match: '\\~\\s', name: 'keyword.operator.template.left.trim.hcl'},
        {match: '\\s\\~', name: 'keyword.operator.template.right.trim.hcl'},
        {
          match: '\\b(if|else|endif|for|in|endfor)\\b',
          name: 'keyword.control.hcl'
        },
        {include: '#expressions'},
        {include: '#local_identifiers'}
      ]
    },
    string_literals: {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.hcl'}},
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.hcl'}},
      name: 'string.quoted.double.hcl',
      patterns: [{include: '#string_interpolation'}, {include: '#char_escapes'}]
    },
    tuple_for_expression: {
      begin: '(\\[)\\s?(for)\\b',
      beginCaptures: {
        1: {name: 'punctuation.section.brackets.begin.hcl'},
        2: {name: 'keyword.control.hcl'}
      },
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.section.brackets.end.hcl'}},
      patterns: [{include: '#for_expression_body'}]
    }
  },
  scopeName: 'source.hcl.terraform'
}

export default grammar
