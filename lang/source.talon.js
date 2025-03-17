// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/mrob95/vscode-TalonScript>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.talon'],
  names: ['talon'],
  patterns: [
    {include: '#body-header'},
    {include: '#header'},
    {include: '#body-noheader'},
    {include: '#comment'},
    {include: '#settings'}
  ],
  repository: {
    action: {
      begin: '([a-zA-Z0-9._]+)(\\()',
      beginCaptures: {
        1: {
          name: 'entity.name.function.talon',
          patterns: [{match: '\\.', name: 'punctuation.separator.talon'}]
        },
        2: {name: 'punctuation.definition.parameters.begin.talon'}
      },
      end: '(\\))',
      endCaptures: {1: {name: 'punctuation.definition.parameters.end.talon'}},
      name: 'variable.parameter.talon',
      patterns: [
        {include: '#action'},
        {include: '#qstring-long'},
        {include: '#qstring'},
        {include: '#argsep'},
        {include: '#number'},
        {include: '#operator'},
        {include: '#varname'}
      ]
    },
    'action-gamepad': {
      captures: {
        2: {name: 'punctuation.definition.parameters.begin.talon'},
        3: {
          name: 'variable.parameter.talon',
          patterns: [{include: '#key-mods'}]
        },
        4: {name: 'punctuation.definition.parameters.key.talon'}
      },
      match: '(deck|gamepad|action|face|parrot)(\\()(.*)(\\))',
      name: 'entity.name.function.talon'
    },
    'action-key': {
      captures: {
        1: {name: 'punctuation.definition.parameters.begin.talon'},
        2: {
          name: 'variable.parameter.talon',
          patterns: [
            {include: '#key-prefixes'},
            {include: '#key-mods'},
            {include: '#keystring'}
          ]
        },
        3: {name: 'punctuation.definition.parameters.key.talon'}
      },
      match: 'key(\\()(.*)(\\))',
      name: 'entity.name.function.talon'
    },
    argsep: {match: ',', name: 'punctuation.separator.talon'},
    assignment: {
      begin: '(\\S*)(\\s?=\\s?)',
      beginCaptures: {
        1: {name: 'variable.other.talon'},
        2: {name: 'keyword.operator.talon'}
      },
      end: '\n',
      patterns: [{include: '#comment'}, {include: '#expression'}]
    },
    'body-header': {
      begin: '^-$',
      end: '(?=not)possible',
      patterns: [{include: '#body-noheader'}]
    },
    'body-noheader': {
      patterns: [
        {include: '#comment'},
        {include: '#other-rule-definition'},
        {include: '#speech-rule-definition'}
      ]
    },
    capture: {
      match: '(\\<[a-zA-Z0-9._]+\\>)',
      name: 'variable.parameter.talon'
    },
    comment: {match: '(\\s*#.*)$', name: 'comment.line.number-sign.talon'},
    context: {
      captures: {
        1: {
          name: 'entity.name.tag.talon',
          patterns: [{match: '(and |or )', name: 'keyword.operator.talon'}]
        },
        2: {
          name: 'entity.name.type.talon',
          patterns: [{include: '#comment'}, {include: '#regexp'}]
        }
      },
      match: '(.*): (.*)'
    },
    expression: {
      patterns: [
        {include: '#qstring-long'},
        {include: '#action-key'},
        {include: '#action'},
        {include: '#operator'},
        {include: '#number'},
        {include: '#qstring'},
        {include: '#varname'}
      ]
    },
    fstring: {
      captures: {
        1: {
          patterns: [
            {include: '#action'},
            {include: '#operator'},
            {include: '#number'},
            {include: '#varname'},
            {include: '#qstring'}
          ]
        }
      },
      match: '{(.+?)}',
      name: 'constant.character.format.placeholder.talon'
    },
    header: {
      begin: '(?=^app:|title:|os:|tag:|list:|language:)',
      end: '(?=^-$)',
      patterns: [{include: '#comment'}, {include: '#context'}]
    },
    'key-mods': {
      captures: {
        1: {name: 'keyword.operator.talon'},
        2: {name: 'keyword.control.talon'}
      },
      match: '(:)(up|down|change|repeat|start|stop|\\d+)',
      name: 'keyword.operator.talon'
    },
    'key-prefixes': {
      captures: {
        1: {name: 'keyword.control.talon'},
        2: {name: 'keyword.operator.talon'}
      },
      match: '(ctrl|shift|cmd|alt|win|super)(-)'
    },
    keystring: {
      begin: '("|\')',
      beginCaptures: {1: {name: 'punctuation.definition.string.begin.talon'}},
      end: '(\\1)|$',
      endCaptures: {1: {name: 'punctuation.definition.string.end.talon'}},
      name: 'string.quoted.double.talon',
      patterns: [
        {include: '#string-body'},
        {include: '#key-mods'},
        {include: '#key-prefixes'}
      ]
    },
    list: {match: '({[a-zA-Z0-9._]+?})', name: 'string.interpolated.talon'},
    number: {match: '(?<=\\b)\\d+(\\.\\d+)?', name: 'constant.numeric.talon'},
    operator: {match: '\\s(\\+|-|\\*|/|or)\\s', name: 'keyword.operator.talon'},
    'other-rule-definition': {
      begin:
        '^([a-z]+\\(.*[^\\-]\\)|[a-z]+\\(.*--\\)|[a-z]+\\(-\\)|[a-z]+\\(\\)):',
      beginCaptures: {
        1: {
          name: 'entity.name.tag.talon',
          patterns: [
            {include: '#action-key'},
            {include: '#action-gamepad'},
            {include: '#rule-specials'}
          ]
        }
      },
      end: '(?=^[^\\s#])',
      patterns: [{include: '#statement'}]
    },
    qstring: {
      begin: '("|\')',
      beginCaptures: {1: {name: 'punctuation.definition.string.begin.talon'}},
      end: '(\\1)|$',
      endCaptures: {1: {name: 'punctuation.definition.string.end.talon'}},
      name: 'string.quoted.double.talon',
      patterns: [{include: '#string-body'}]
    },
    'qstring-long': {
      begin: '("""|\'\'\')',
      beginCaptures: {1: {name: 'punctuation.definition.string.begin.talon'}},
      end: '(\\1)',
      endCaptures: {1: {name: 'punctuation.definition.string.end.talon'}},
      name: 'string.quoted.triple.talon',
      patterns: [{include: '#string-body'}]
    },
    regexp: {
      begin: '(/)',
      end: '(/)',
      name: 'string.regexp.talon',
      patterns: [
        {match: '\\.', name: 'support.other.match.any.regexp'},
        {match: '\\$', name: 'support.other.match.end.regexp'},
        {match: '\\^', name: 'support.other.match.begin.regexp'},
        {
          match: '\\\\\\.|\\\\\\*|\\\\\\^|\\\\\\$|\\\\\\+|\\\\\\?',
          name: 'constant.character.escape.talon'
        },
        {match: '\\[(\\\\\\]|[^\\]])*\\]', name: 'constant.other.set.regexp'},
        {match: '\\*|\\+|\\?', name: 'keyword.operator.quantifier.regexp'}
      ]
    },
    'rule-specials': {
      captures: {
        1: {name: 'entity.name.function.talon'},
        2: {name: 'punctuation.definition.parameters.begin.talon'},
        3: {name: 'punctuation.definition.parameters.end.talon'}
      },
      match: '(settings|tag)(\\()(\\))'
    },
    'speech-rule-definition': {
      begin: '^(.*?):',
      beginCaptures: {
        1: {
          name: 'entity.name.tag.talon',
          patterns: [
            {match: '^\\^', name: 'string.regexp.talon'},
            {match: '\\$$', name: 'string.regexp.talon'},
            {
              match: '\\(',
              name: 'punctuation.definition.parameters.begin.talon'
            },
            {match: '\\)', name: 'punctuation.definition.parameters.end.talon'},
            {match: '\\|', name: 'punctuation.separator.talon'},
            {include: '#capture'},
            {include: '#list'}
          ]
        }
      },
      end: '(?=^[^\\s#])',
      patterns: [{include: '#statement'}]
    },
    statement: {
      patterns: [
        {include: '#comment'},
        {include: '#qstring-long'},
        {include: '#action-key'},
        {include: '#action'},
        {include: '#qstring'},
        {include: '#assignment'}
      ]
    },
    'string-body': {
      patterns: [
        {match: '{{|}}', name: 'string.quoted.double.talon'},
        {
          match: '\\\\\\\\|\\\\n|\\\\t|\\\\r|\\\\"|\\\\\'',
          name: 'constant.character.escape.python'
        },
        {include: '#fstring'}
      ]
    },
    varname: {
      captures: {
        2: {
          name: 'constant.numeric.talon',
          patterns: [{match: '_', name: 'keyword.operator.talon'}]
        }
      },
      match: '([a-zA-Z0-9._])(_(list|\\d+))?',
      name: 'variable.parameter.talon'
    }
  },
  scopeName: 'source.talon'
}

export default grammar
