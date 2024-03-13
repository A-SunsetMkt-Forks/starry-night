// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/spgennard/vscode_cobol>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.cob', '.cbl', '.ccp', '.cobol', '.cpy'],
  names: ['cobol'],
  patterns: [
    {
      match: '(^[ \\*][ \\*][ \\*][ \\*][ \\*][ \\*])([dD]\\s.*$)',
      name: 'token.info-token.cobol'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'comment.line.cobol.newpage'}
      },
      match: '(^[ \\*][ \\*][ \\*][ \\*][ \\*][ \\*])(\\/.*$)'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'comment.line.cobol.fixed'}
      },
      match: '(^[ \\*][ \\*][ \\*][ \\*][ \\*][ \\*])(\\*.*$)'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'comment.line.cobol.newpage'}
      },
      match: '(^[0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s])(\\/.*$)'
    },
    {
      match: '^[0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s]$',
      name: 'constant.numeric.cobol'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'comment.line.cobol.fixed'}
      },
      match: '(^[0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s][0-9\\s])(\\*.*$)'
    },
    {
      captures: {
        1: {name: 'constant.cobol'},
        2: {name: 'comment.line.cobol.fixed'}
      },
      match:
        '(^[0-9a-zA-Z\\s\\$#%\\.@\\- ][0-9a-zA-Z\\s\\$#%\\.@\\- ][0-9a-zA-Z\\s\\$#%\\.@\\- ][0-9a-zA-Z\\s\\$#%\\.@\\- ][0-9a-zA-Z\\s\\$#%\\.@\\- ][0-9a-zA-Z\\s\\$#%\\.@\\- ])(\\*.*$)'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'variable.other.constant'}
      },
      match: '^\\s+(78)\\s+([0-9a-zA-Z][a-zA-Z\\-0-9_]+)'
    },
    {
      captures: {
        1: {name: 'constant.numeric.cobol'},
        2: {name: 'variable.other.constant'},
        3: {name: 'keyword.identifers.cobol'}
      },
      match: '^\\s+([0-9]+)\\s+([0-9a-zA-Z][a-zA-Z\\-0-9_]+)\\s+((?i:constant))'
    },
    {
      captures: {
        1: {name: 'constant.cobol'},
        2: {name: 'comment.line.cobol.newpage'}
      },
      match:
        '(^[0-9a-zA-Z\\s\\$#%\\.@][0-9a-zA-Z\\s\\$#%\\.@][0-9a-zA-Z\\s\\$#%\\.@][0-9a-zA-Z\\s\\$#%\\.@][0-9a-zA-Z\\s\\$#%\\.@][0-9a-zA-Z\\s\\$#%\\.@])(\\/.*$)'
    },
    {match: '^\\*.*$', name: 'comment.line.cobol.fixed'},
    {
      captures: {
        1: {name: 'keyword.control.directive.conditional.cobol'},
        2: {name: 'entity.name.function.preprocessor.cobol'},
        3: {name: 'entity.name.function.cobol'},
        4: {name: 'keyword.control.directive.conditional.cobol'}
      },
      match:
        '((?:^|\\s+)(?i:\\$set)\\s+)((?i:constant)\\s+)([0-9a-zA-Z][a-zA-Z\\-0-9]+\\s*)([a-zA-Z\\-0-9]*)'
    },
    {
      captures: {
        1: {name: 'entity.name.function.preprocessor.cobol'},
        2: {name: 'storage.modifier.import.cobol'},
        3: {name: 'punctuation.begin.bracket.round.cobol'},
        4: {name: 'string.quoted.other.cobol'},
        5: {name: 'punctuation.end.bracket.round.cobol'}
      },
      match: '((?i:\\$\\s*set\\s+)(ilusing)(\\()(.*)(\\)))'
    },
    {
      captures: {
        1: {name: 'entity.name.function.preprocessor.cobol'},
        2: {name: 'storage.modifier.import.cobol'},
        3: {name: 'punctuation.definition.string.begin.cobol'},
        4: {name: 'string.quoted.other.cobol'},
        5: {name: 'punctuation.definition.string.begin.cobol'}
      },
      match: '((?i:\\$\\s*set\\s+)(ilusing)(")(.*)("))'
    },
    {
      captures: {
        1: {name: 'keyword.control.directive.conditional.cobol'},
        2: {name: 'entity.name.function.preprocessor.cobol'},
        3: {name: 'punctuation.definition.string.begin.cobol'},
        4: {name: 'string.quoted.other.cobol'},
        5: {name: 'punctuation.definition.string.begin.cobol'}
      },
      match: '((?i:\\$set))\\s+(\\w+)\\s*(")(\\w*)(")'
    },
    {
      captures: {
        1: {name: 'keyword.control.directive.conditional.cobol'},
        2: {name: 'entity.name.function.preprocessor.cobol'},
        3: {name: 'punctuation.begin.bracket.round.cobol'},
        4: {name: 'string.quoted.other.cobol'},
        5: {name: 'punctuation.end.bracket.round.cobol'}
      },
      match: '((?i:\\$set))\\s+(\\w+)\\s*(\\()(.*)(\\))'
    },
    {
      captures: {
        0: {name: 'keyword.control.directive.conditional.cobol'},
        1: {name: 'invalid.illegal.directive'},
        2: {name: 'comment.line.set.cobol'}
      },
      match:
        '(?:^|\\s+)(?i:\\$\\s*set\\s)((?i:01SHUFFLE|64KPARA|64KSECT|AUXOPT|CHIP|DATALIT|EANIM|EXPANDDATA|FIXING|FLAG-CHIP|MASM|MODEL|OPTSIZE|OPTSPEED|PARAS|PROTMODE|REGPARM|SEGCROSS|SEGSIZE|SIGNCOMPARE|SMALLDD|TABLESEGCROSS|TRICKLECHECK|\\s)+).*$'
    },
    {
      captures: {
        1: {name: 'keyword.control.directive.cobol'},
        2: {name: 'entity.other.attribute-name.preprocessor.cobol'}
      },
      match: '(\\$region|\\$end-region)(.*$)'
    },
    {
      begin: '\\$(?i:doc)(.*$)',
      end: '\\$(?i:end-doc)(.*$)',
      name: 'invalid.illegal.iscobol'
    },
    {
      match: '>>\\s*(?i:turn|page|listing|leap-seconds|d)\\s+.*$',
      name: 'invalid.illegal.meta.preprocessor.cobolit'
    },
    {
      match: '(?i:substitute-case|substitute)\\s+',
      name: 'invalid.illegal.functions.cobolit'
    },
    {
      captures: {
        1: {
          name: 'invalid.illegal.keyword.control.directive.conditional.cobol'
        },
        2: {name: 'invalid.illegal.entity.name.function.preprocessor.cobol'},
        3: {name: 'invalid.illegal.entity.name.function.preprocessor.cobol'}
      },
      match: '((((>>|\\$)[\\s]*)(?i:elif))(.*$))'
    },
    {
      captures: {
        1: {name: 'keyword.control.directive.conditional.cobol'},
        2: {name: 'entity.name.function.preprocessor.cobol'},
        3: {name: 'entity.name.function.preprocessor.cobol'}
      },
      match:
        '((((>>|\\$)[\\s]*)(?i:if|else|elif|end-if|end-evaluate|end|define|evaluate|when|display|call-convention|set))(.*$))'
    },
    {
      captures: {
        1: {name: 'comment.line.scantoken.cobol'},
        2: {name: 'keyword.cobol'},
        3: {name: 'string.cobol'}
      },
      match: '(\\*>)\\s+(@[0-9a-zA-Z][a-zA-Z\\-0-9]+)\\s+(.*$)'
    },
    {match: '(\\*>.*$)', name: 'comment.line.modern'},
    {match: '(>>.*)$', name: 'strong comment.line.set.acucobol'},
    {
      match: "([nNuU][xX]|[hHxX])'[[:xdigit:]]*'",
      name: 'constant.numeric.integer.hexadecimal.cobol'
    },
    {
      match: "([nNuU][xX]|[hHxX])'.*'",
      name: 'invalid.illegal.hexadecimal.cobol'
    },
    {
      match: '([nNuU][xX]|[hHxX])"[[:xdigit:]]*"',
      name: 'constant.numeric.integer.hexadecimal.cobol'
    },
    {
      match: '([nNuU][xX]|[hHxX])".*"',
      name: 'invalid.illegal.hexadecimal.cobol'
    },
    {match: '[bB]"[0-1]"', name: 'constant.numeric.integer.boolean.cobol'},
    {match: "[bB]'[0-1]'", name: 'constant.numeric.integer.boolean.cobol'},
    {match: '[oO]"[0-7]*"', name: 'constant.numeric.integer.octal.cobol'},
    {match: '[oO]".*"', name: 'invalid.illegal.octal.cobol'},
    {
      match: '(#)([0-9a-zA-Z][a-zA-Z\\-0-9]+)',
      name: 'meta.symbol.cobol.forced'
    },
    {
      begin:
        '((?<![-_a-zA-Z0-9()-])(?i:installation|author|source-computer|object-computer|date-written|security|date-compiled)(\\.|$))',
      beginCaptures: {0: {name: 'keyword.identifiers.cobol'}},
      end: '(?=((?<![-_])(?i:remarks|author|date-written|source-computer|object-computer|installation|date-compiled|special-names|security|environment\\s+division|data\\s+division|working-storage\\s+section|input-output\\s+section|linkage\\s+section|procedure\\s+division|local-storage\\s+section)|^[ \\*][ \\*][ \\*][ \\*][ \\*][ \\*]\\*.*$|^\\+$))',
      name: 'comment.block.cobol.remark',
      patterns: [
        {
          match: '(^[0-9 ][0-9 ][0-9 ][0-9 ][0-9 ][0-9 ])',
          name: 'constant.numeric.cobol'
        },
        {match: '(?i:with|debugging|mode)', name: 'keyword.identifiers.cobol'}
      ]
    },
    {
      captures: {
        1: {name: 'keyword.start.bracket.cobol'},
        2: {name: 'constant.numeric.cobol'},
        3: {name: 'keyword.end.bracket.cobol'}
      },
      match:
        '(?<=(\\(|\\[))((\\-\\+)*\\s*[0-9 ,\\.\\+\\-\\*\\/]+)(?=(\\)|\\]))',
      name: 'constant.numeric.cobol'
    },
    {include: '#number-complex-constant'},
    {include: '#number-simple-constant'},
    {
      match: '(?<![-_])(?i:true|false|null|nulls)(?![0-9A-Za-z_-])',
      name: 'constant.language.cobol'
    },
    {
      match:
        '(?<![-_])(?i:zeroes|alphabetic-lower|alphabetic-upper|alphanumeric-edited|alphabetic|alphabet|alphanumeric|zeros|zeros|zero|spaces|space|quotes|quote|low-values|low-value|high-values|high-value)(?=\\s+|\\.|,|\\))',
      name: 'constant.language.figurative.cobol'
    },
    {
      begin: '(?i:exec\\s+sqlims|exec\\s+sql)',
      contentName: 'meta.embedded.block.sql',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [
        {match: '(^\\s*\\*.*)$', name: 'comment.line.sql'},
        {match: '(\\:([0-9a-zA-Z\\-_])*)', name: 'variable.cobol'},
        {include: 'source.sql'}
      ]
    },
    {
      begin: '(?i:exec\\s+cics)',
      contentName: 'meta.embedded.block.cics',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [
        {match: '(\\()', name: 'meta.symbol.cobol'},
        {include: '#cics-keywords'},
        {include: '#string-double-quoted-constant'},
        {include: '#string-quoted-constant'},
        {include: '#number-complex-constant'},
        {include: '#number-simple-constant'},
        {
          match:
            '([a-zA-Z-0-9_]*[a-zA-Z0-9]|([#]?[0-9a-zA-Z]+[a-zA-Z-0-9_]*[a-zA-Z0-9]))',
          name: 'variable.cobol'
        }
      ]
    },
    {
      begin: '(?i:exec\\s+dli)',
      contentName: 'meta.embedded.block.dli',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [
        {match: '(\\()', name: 'meta.symbol.cobol'},
        {include: '#dli-keywords'},
        {include: '#dli-options'},
        {include: '#string-double-quoted-constant'},
        {include: '#string-quoted-constant'},
        {include: '#number-complex-constant'},
        {include: '#number-simple-constant'},
        {
          match:
            '([a-zA-Z-0-9_]*[a-zA-Z0-9]|([#]?[0-9a-zA-Z]+[a-zA-Z-0-9_]*[a-zA-Z0-9]))',
          name: 'variable.cobol'
        }
      ]
    },
    {
      begin: '(?i:exec\\s+sqlims)',
      contentName: 'meta.embedded.block.sql',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [
        {match: '(\\:([a-zA-Z\\-])*)', name: 'variable.cobol'},
        {include: 'source.sql'}
      ]
    },
    {
      begin: '(?i:exec\\s+ado)',
      contentName: 'meta.embedded.block.sql',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [
        {match: '(\\:([a-zA-Z\\-])*)', name: 'variable.cobol'},
        {include: 'source.sql'}
      ]
    },
    {
      begin: '(?i:exec\\s+html)',
      contentName: 'meta.embedded.block.html',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [{include: 'text.html.basic'}]
    },
    {
      begin: '(?i:exec\\s+java)',
      contentName: 'meta.embedded.block.java',
      end: '(?i:end\\-exec)',
      name: 'keyword.verb.cobol',
      patterns: [{include: 'source.java'}]
    },
    {
      captures: {
        1: {name: 'punctuation.definition.string.begin.cobol'},
        2: {name: 'support.function.cobol'},
        3: {name: 'punctuation.definition.string.end.cobol'}
      },
      match: '(")(CBL_.*)(")'
    },
    {
      captures: {
        1: {name: 'punctuation.definition.string.begin.cobol'},
        2: {name: 'support.function.cobol'},
        3: {name: 'punctuation.definition.string.end.cobol'}
      },
      match: '(")(PC_.*)(")'
    },
    {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: '("|$)',
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.double.cobol'
    },
    {
      captures: {
        1: {name: 'punctuation.definition.string.begin.cobol'},
        2: {name: 'support.function.cobol'},
        3: {name: 'punctuation.definition.string.end.cobol'}
      },
      match: "(\\')(CBL_.*)(\\')"
    },
    {
      captures: {
        1: {name: 'punctuation.definition.string.begin.cobol'},
        2: {name: 'support.function.cobol'},
        3: {name: 'punctuation.definition.string.end.cobol'}
      },
      match: "(\\')(PC_.*)(\\')"
    },
    {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: "('|$)",
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.single.cobol'
    },
    {
      begin: '(?<![\\-\\w])[gGzZ]"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: '("|$)',
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.double.cobol'
    },
    {
      begin: "(?<![\\-\\w])[gGzZ]'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.single.cobol'
    },
    {
      begin: '(?<![\\-\\w])[gGnN]"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: '("|$)',
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.double.cobol'
    },
    {
      begin: "(?<![\\-\\w])[gGnN]'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.single.cobol'
    },
    {
      begin: '(?<![\\-\\w])[uU]"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: '("|$)',
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.utf8.double.cobol'
    },
    {
      begin: "(?<![\\-\\w])[uU]'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.utf8.single.cobol'
    },
    {
      match:
        '(?<![-_])(?i:id\\s+division|identification\\s+division|identification|id|property-id|getter|setter|entry|function-id|end\\s+attribute|attribute|interface-id|indexer-id|factory|ctl|class-control|options|environment\\s+division|environment-name|environment-value|environment|configuration\\s+section|configuration|decimal-point\\s+is|decimal-point|console\\s+is|call-convention|special-names|cursor\\s+is|update|picture\\s+symbol|currency\\s+sign|currency|repository|input-output\\s+section|input-output|file\\s+section|file-control|select|optional|i-o-control|data\\s+division|working-storage\\s+section|working-storage|section|local-storage|linkage\\s+section|linkage|communication|report|screen\\s+section|object-storage|object\\s+section|class-object|fd|rd|cd|sd|printing|procedure\\s+division|procedure|division|references|debugging|end\\s+declaratives|declaratives|end\\s+static|end\\s+factory|end\\s+class-object|based-storage|size|font|national-edited|national)(?![0-9A-Za-z_-])',
      name: 'keyword.identifiers.cobol'
    },
    {
      captures: {
        1: {name: 'keyword.verb.cobol'},
        2: {name: 'entity.name.function.cobol'}
      },
      match:
        '(?<![-_])((?i:valuetype-id|operator-id|method-id|method|property-id|attribute-id|enum-id|iterator-id|class-id|program-id|operator-id|end\\s+program|end\\s+valuetype|extension))[\\.]*[\\s]+([a-zA-Z0-9_-]*)'
    },
    {
      match:
        '(?<![-_])(?i:implements|inherits|constraints|constrain)(?=\\s|\\.)',
      name: 'keyword.verb.cobol'
    },
    {
      match:
        '(?<![-_])(?i:end\\s+enum|end\\s+interface|end\\s+class|end\\s+property|end\\s+method|end\\s+object|end\\s+iterator|end\\s+function|end\\s+operator|end\\s+program|end\\s+indexer|create|reset|instance|delegate|end-delegate|delegate-id|declare|exception-object|as|stop\\s+iterator|stop\\s+run|stop)(?=\\s|\\.|,|\\))',
      name: 'keyword.identifiers.cobol'
    },
    {
      match:
        '\\s+(?i:attach\\s+method|attach\\s+del|attach|detach\\s+del|detach\\s+method|detach|method|del)(?=\\s|\\.|$)',
      name: 'keyword.identifiers.cobol'
    },
    {
      match: '\\s+(?i:sync\\s+(?i:on))(?=\\s|\\.)',
      name: 'keyword.other.sync.cobol'
    },
    {
      match: '\\s+(?i:try|finally|catch|end-try|throw)(?=\\s|\\.|$)',
      name: 'keyword.control.catch-exception.cobol'
    },
    {
      match:
        '(?<![-_])(?i:select|use|thru|varying|giving|remainder|tallying|through|until|execute|returning|using|chaining|yielding|\\+\\+include|copy|replace)(?=\\s)',
      name: 'keyword.otherverb.cobol'
    },
    {
      match: '(?i:dynamic)\\s+(?i:length)(?=\\s|\\.)',
      name: 'storage.type.dynamiclength.cobol'
    },
    {
      match:
        '(?<![-_])(?i:assign|external|prototype|organization|organisation|indexed|column|plus|line\\*s*sequential|sequential|access|dynamic|relative|label|block|contains|standard|records|record\\s+key|record|is|alternate|duplicates|reel|tape|terminal|disk\\sfilename|disk|disc|recording\\smode|mode|random)(?=\\s|\\.)',
      name: 'keyword.identifers.cobol'
    },
    {
      match:
        '(?<![-_])(?i:max|min|integer-of-date|integer-of-day|integer-part|integer|date-to-yyyymmdd|year-to-yyyy|day-to-yyyyddd|exp|exception-file|exception-location|exception-statement|exception-status|e|variance|integer-of-date|rem|pi|factorial|sqrt|log10|fraction-part|mean|exp|log|char|day-of-integer|date-of-integer|exp10|atan|integer-part|tan|sin|cos|midrange|addr|acos|asin|annuity|present-value|integer-of-day|ord-max|ord-min|ord|random|integer-of-date|sum|standard-deviation|median|reverse|abs|upper-case|lower-case|char-national|numval|mod|range|length|locale-date|locale-time-from-seconds|locale-time|seconds-past-midnight|stored-char-length|seconds-from-formatted-time|seconds-past-midnight|trim|length-an|numval-c|current-date|national-of|display-of|when-compiled|integer-of-boolean|combined-datetime|concatenate)(?=\\s|\\.|\\(|\\))',
      name: 'support.function.cobol'
    },
    {
      captures: {
        0: {name: 'support.function.cics.cobol'},
        1: {name: 'punctuation.definition.string.end.cobol'},
        2: {name: 'keyword.identifers.cobol'},
        3: {name: 'punctuation.definition.string.end.cobol'}
      },
      match: '(?<![-_])(?i:DFHRESP|DFHVALUE)(\\s*\\(\\s*)([a-zA-Z]*)(\\s*\\))'
    },
    {match: '(?<![-_])(?i:function)(?=\\s|\\.)', name: 'keyword.verb.cobol'},
    {
      match:
        '(?<![-_])(?i:end-accept|end-add|end-sync|end-compute|end-delete|end-display|end-divide|end-set|end-multiply|end-of-page|end-read|end-receive|end-return|end-rewrite|end-search|end-start|end-string|end-subtract|end-unstring|end-write|program|class|interface|enum|interface)(?![0-9A-Za-z_-])',
      name: 'keyword.verb.cobol'
    },
    {
      match:
        '(?<![-_])(?:by value|by reference|by content|property-value)(?![0-9A-Za-z_-])',
      name: 'keyword.other.cobol'
    },
    {
      match:
        '(?<![-_])(?i:attr-string|automatic|auto-skip|footing|next|group|indicate|source|control|full|required|of|input|output|i-o|extend|file|error|exception|overflow|goto|off|on|proceed|procedures|procedure|through|invalid|data|normal|eop|returning|to|for|giving|into|by|params|remainder|also|numeric|free|depending|converting|replacing|after|before|all|leading|first|recursive|initialized|global|common|initial|resident|reference|content|are\\sstandard|are|renames|like|format\\stime|values|omitted|value|constant|ascending|descending|key|retry|until|varying|with|no|advancing|up|down|uccurs|ignore\\s+lock|lock|length|delimited|count|delimiter|redefines|from\\s+console|from\\s+command-line|from\\s+user\\s+name|from\\s+day\\s+yyyyddd|from\\s+day|from\\s+time|from\\s+day-of-week|from\\s+escape|from\\s+day\\s+yyyyddd|from\\s+date\\s+yyyymmdd|from\\s+date|from|raising|crt\\s+status|status|class|upon\\s+crt|upon|lines|columns|step|linage|auto|line|position|col|reports|code-set|reporting|arithmetic|localize|program|class|interface|in|at\\s+end|page|name)(?![0-9A-Za-z_-])',
      name: 'keyword.identifers.cobol'
    },
    {
      captures: {
        0: {name: 'keyword.verb.cobol'},
        1: {name: 'storage.type.cobol'}
      },
      match:
        '(?<![-_])(?i:type|new)\\s+([a-zA-Z][a-zA-Z0-9\\$\\-\\._]*|[a-zA-Z])(?=\\.$)'
    },
    {
      match: '(?<![-_])(?i:string)(?=\\s+value|\\.)',
      name: 'storage.type.cobol'
    },
    {
      match:
        '(?<![-_])(?i:bit|byte|binary-char|binary-char-unsigned|binary-short|binary-short-unsigned|binary.long|binary-c-long|binary-long-unsigned|binary-long|binary-double|binary-double-unsigned|float-short|float-extended|float-long|bit|condition-value|characters|character\\s+type|character|comma|crt|decimal|object\\+sreference|object-reference|object|list|dictionary|unsigned)(?=\\s|\\.|,|\\]|\\[)',
      name: 'storage.type.cobol'
    },
    {
      captures: {
        1: {name: 'keyword.other.verb.cobol'},
        2: {name: 'meta.symbol.cobol'}
      },
      match: '(operator-id\\s+[+\\-\\*\\/])',
      name: 'keyword.operator-id.cobol'
    },
    {
      captures: {
        1: {name: 'punctuation.accessor.cobol.b3'},
        2: {name: 'entity.name.function.b3'}
      },
      match: '(?i:self)(\\:\\:)([0-9a-zA-Z_\\-\\.]*)(?=\\.$)'
    },
    {
      captures: {
        1: {name: 'punctuation.accessor.cobol'},
        2: {name: 'entity.name.function.cobol'}
      },
      match: '(\\:\\:)([0-9a-zA-Z_\\-\\.]*)'
    },
    {
      captures: {
        0: {name: 'keyword.verb.cobol.aa'},
        1: {name: 'storage.type.cobol.bb'}
      },
      match: '(?<![-_])(?i:type)\\s+([0-9a-zA-Z\\.]*)'
    },
    {
      match:
        '(?<![-_])(?i:if|else|end-if|exit\\s+iterator|exit\\s+program|exit\\s+method|evaluate|end-evaluate|exit\\s+perform|perform|end-perform|when\\s+other|when|continue|call|end-call|chain|end-chain|invoke|end\\s+invoke|go\\s+to|go|sort|merge|use|xml|parse|stop\\s+run|goback\\s+returning|goback|raise|exit\\s+function|exit\\sparagraph|await)(?![0-9A-Za-z_-])',
      name: 'keyword.control.cobol'
    },
    {
      captures: {
        1: {name: 'storage.type.picture10.cobol'},
        2: {name: 'constant.numeric.cobol'},
        3: {name: 'storage.type.picture10.cobol'},
        4: {name: 'constant.numeric.cobol'}
      },
      match:
        '(?<![-_])((?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBxXuUpPnNzZ/,.]*)\\(([0-9]*)\\)([vV][-+sS\\*$09aAbBxXuUpPnNzZ/,\\.]*)\\(([0-9]*)\\)[-|+]'
    },
    {
      captures: {
        1: {name: 'storage.type.picture9.cobol'},
        2: {name: 'constant.numeric.cobol'},
        3: {name: 'storage.type.picture9.cobol'},
        4: {name: 'constant.numeric.cobol'}
      },
      match:
        '(?<![-_])((?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBxXuUpPnNzZ/,.]*)\\(([0-9]*)\\)([vV][-+sS\\*$09aAbBxXuUpPnNzZ/,\\.]*)\\(([0-9]*)\\)'
    },
    {
      captures: {
        1: {name: 'storage.type.picture8.cobol'},
        2: {name: 'constant.numeric.cobol'},
        3: {name: 'storage.type.picture8.cobol'}
      },
      match:
        '(?<![-_])((?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBxXuUpPnNzZ/,.]*)\\(([0-9]*)\\)([vV\\.][-+s\\*$09aAbBsSnNxXuUzZ/,]*[0-9\\.()])*'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBsSnpPNxXuUzZ/,.]*\\([0-9]*\\)[Vv\\.][-+s\\*0$9aAbBsSnNxpPxXuUzZ/,]*',
      name: 'storage.type.picture7.cobol'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBsSnpPNxXuUzZ/,.]*\\([0-9]*\\)[-+s\\*0$9aAbBsSnNxpPxXuUzZ/,]*[Vv\\.][-+s\\*0$9aAbBsSnNxpPxXuUzZ/,]*',
      name: 'storage.type.picture6.cobol'
    },
    {
      captures: {
        1: {name: 'storage.type.picture5.cobol'},
        2: {name: 'constant.numeric.cobol'}
      },
      match:
        '(?<![-_])((?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBsSnpPNxuUXzZ/,.]*)\\(([0-9]*)\\)[-+s\\*0$9aAbBsSnNxpPxXuUzZ/,]*'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+sS\\*$09aAbBsSnpNNxXuUzZ/,.]*\\([0-9]*\\)',
      name: 'storage.type.picture4.cobol'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[sS]?[9aAbBsSnNxXuUzZ]*[Vv][9aAxbXuUzZ]*\\([0-9]*\\)',
      name: 'storage.type.picture3.cobol'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[sS]?[9aAbBsSnNxXuUzZ]*[Vv][9aAxbXuUzZ]*',
      name: 'storage.type.picture2.cobol'
    },
    {
      match:
        '(?<![-_])(?i:picture\\s+is|picture|pic\\s+is|pic)\\s+[-+\\*$9aAbBsSnpPNxXuUzZ/,.vV]*',
      name: 'storage.type.picture1.cobol'
    },
    {
      captures: {
        1: {name: 'invalid.illegal.keyword.verb.acu.cobol'},
        2: {name: 'invalid.illegal.constant.numeric.integer'}
      },
      match:
        '((?<![-_])(?i:binary|computational-4|comp-4|computational-5|comp-5))\\(([0-9]*)\\)'
    },
    {
      match:
        '(?i:cblt-x1-compx-const|cblt-x2-compx-const|cblt-x4-compx-const|cblt-alphanum-const|cblt-x9-compx|cblt-x8-compx|cblt-x8-comp5|cblt-x4-compx|cblt-x4-comp5|cblt-x2-compx|cblt-x2-comp5|cblt-x1-compx|cblt-x1-comp5|cblt-x1|cblt-vfile-status|cblt-vfile-handle|cblt-sx8-comp5|cblt-sx4-comp5|cblt-sx2-comp5|cblt-sx1-comp5|cblt-subsys-params|cblt-splitjoin-buf|cblt-screen-position|cblt-rtncode|cblt-request-context|cblt-reqhand-service-info|cblt-reqhand-service-funcs|cblt-reqhand-response|cblt-reqhand-funcs|cblt-prog-info-params|cblt-prog-info-arg-info|cblt-printer-properties|cblt-printer-name|cblt-printer-info|cblt-printer-default|cblt-ppointer|cblt-pointer|cblt-os-ssize|cblt-os-size|cblt-os-offset|cblt-os-info-params|cblt-os-flags|cblt-node-name|cblt-nls-msg-params|cblt-nls-msg-number-pair|cblt-nls-msg-ins-struct|cblt-nls-msg-buffer|cblt-mouse-shape|cblt-mouse-rect|cblt-mouse-pos|cblt-mouse-event|cblt-mem-validate-param|cblt-idp-exit-service-funcs|cblt-idp-exit-info|cblt-HWND|cblt-HINSTANCE|cblt-get-scr-line-draw-buffer|cblt-get-scr-graphics-buffer|cblt-generic-attr-value|cblt-generic-attr-rgb-values|cblt-generic-attr-information|cblt-file-status|cblt-fileexist-buf|cblt-exit-params|cblt-exit-info-params|cblt-cancel-proc-params|cblt-bytestream-handle|cblt-alphanum)',
      name: 'support.function.cbltypes.cobol'
    },
    {
      match:
        '(?<![-_])(?i:computational-1|comp-1|computational-2|comp-2|computational-3|comp-3|computational-4|comp-4|computational-x|comp-x|computational-5|comp-5|computational-6|comp-6|computational-n|comp-n|packed-decimal|index|float|double|signed-short|unsigned-short|signed-int|unsigned-int|signed-long|unsigned-long|comp|computational|group-usage|usage\\sis\\sdisplay|usage\\sis\\sfont|usage\\s+display|binary|mutex-pointer|data-pointer|thread-pointer|sempahore-pointer|event-pointer|program-pointer|procedure-pointer|pointer|window|subwindow|control-type|thread|menu|variant|layout-manager|occurs|typedef|any|times|display\\s+blank\\s+when|blank\\s+when|blank\\s+screen|blank|usage\\sis|is\\spartial|usage|justified|just|right|signed|trailing\\s+separate|sign|seperate|sql)(?=\\s|\\.|\\))',
      name: 'storage.type.picture.cobol'
    },
    {match: '(?i:byte-length)\\s+[0-9]+', name: 'storage.type.length.cobol'},
    {
      match:
        '(?<![-_])(?i:accept|add|address|allocate|cancel|close|commit|compute|continue|delete|disable|display|bell|divide|eject|enable|enter|evaluate|exhibit|named|exit|free|generate|go\\s+to|initialize\\sonly|initialize|initiate|inspect|merge|end-set|set|end-invoke|invoke\\s+run|invoke|move|corresponding|corr|multiply|otherwise|open|sharing|sort-merge|purge|ready|read|kept|receive|release|return|rewrite|rounded|rollback|search|send|sort|collating\\s+sequence|collating|start|service|subtract|suppress|terminate|then|unlock|string|unstring|validate|write|next|statement|sentence)(?![0-9A-Za-z_-])',
      name: 'keyword.verb.cobol'
    },
    {
      match: '(?<![-_])(?i:thread-local)(?![0-9A-Za-z_-])',
      name: 'keyword.verb.cobol'
    },
    {
      match:
        '(\\s+|^)(?i:foreground-color|background-color|prompt|underline|reverse-video|no-echo|highlight|blink)(?![0-9A-Za-z_-])',
      name: 'keyword.screens.cobol'
    },
    {
      match:
        '(\\s+|^)(?i:bold|high|lowlight|low|background-high|background-low|background-standard)(?![0-9A-Za-z_-])',
      name: 'invalid.illegal.screens.acu.cobol'
    },
    {
      match:
        '(?<![-_])(?i:internal|public|protected|final|private|static|new|abstract|override|readonly|property|async-void|async-value|async)(?=\\s|\\.)',
      name: 'storage.modifier.cobol'
    },
    {
      match:
        '=|<|>|<=|>=|<>|\\+|\\-|\\*|\\/|(?<![-_])(?i:b-and|b-or|b-xor|b-exor|b-not|b-left|b-right|and|or|equals|equal|greater\\s+than|less\\s+than|greater)(?![0-9A-Za-z_-])',
      name: 'keyword.operator.cobol'
    },
    {
      match: '(?i:not\\s+at\\s+end)(?![0-9A-Za-z_-])',
      name: 'keyword.verb.cobol'
    },
    {
      match: '(?<![-_])(?i:not)(?![0-9A-Za-z_-])',
      name: 'keyword.operator.cobol'
    },
    {
      match:
        '(?<![-_])(?i:sysout-flush|sysin|stderr|stdout|csp|stdin|sysipt|sysout|sysprint|syslist|syslst|printer|syserr|console|c01|c02|c03|c04|c05|c06|c07|c08|c09|c10|c11|c12|formfeed|switch-0|switch-10|switch-11|switch-12|switch-13|switch-13|switch-14|switch-15|switch-1|switch-2|switch-3|switch-4|switch-5|switch-6|switch-7|switch-8|switch-9|sw0|sw11|sw12|sw13|sw14|sw15|sw1|sw2|sw3|sw4|sw5|sw6|sw7|sw8|sw9|sw10|lc_all|lc_collate|lc_ctype|lc_messages|lc_monetary|lc_numeric|lc_time|ucs-4|utf-8|utf-16)(?![0-9A-Za-z_-])',
      name: 'support.type.cobol'
    },
    {
      match:
        '(?<![-_])(?i:end-xml|processing.*procedure|xml\\sparse|xml|xml-information|xml-text|xml-schemal|xml-declaration)(?![0-9A-Za-z_-])',
      name: 'keyword.xml.cobol'
    },
    {
      match:
        '(?<![-_])(?i:json\\s+generate|json|end-json|name\\sof)(?![0-9A-Za-z_-])',
      name: 'keyword.json.cobol'
    },
    {
      match:
        '(?<![-_])(?i:modify|inquire|tab|title|event|center|label-offset|cell|help-id|cells|push-button|radio-button|page-layout-screen|entry-field|list-box|label|default-font|id|no-tab|unsorted|color|height|width|bind|thread|erase|modeless|scroll|system|menu|title-bar|wrap|destroy|resizeable|user-gray|large-font|newline|3-d|data-columns|display-columns|alignment|separation|cursor-frame-width|divider-color|drag-color|heading-color|heading-divider-color|num-rows|record-data|tiled-headings|vpadding|centered-headings|column-headings|self-act|cancel-button|vscroll|report-composer|clsid|primary-interface|active-x-control|default-interface|default-source|auto-minimize|auto-resize|resource|engraved|initial-state|frame|acuactivexcontrol|activex-res|grid|box|message|namespace|class-name|module|constructor|version|strong|culture|method|handle|exception-value|read-only|dividers|graphical|indexed|termination-value|permanent|boxed|visible|centered|record-position|convert)(?=\\s|\\.|,|;|$)',
      name: 'invalid.illegal.acu.cobol'
    },
    {
      match:
        '(?<![-_])(?i:actual|auto|automatic|based-storage|complex|connect|contained|core-index|db-access-control-key|db-data-name|db-exception|db-record-name|db-set-name|db-status|dead-lock|endcobol|end-disable|end-enable|end-send|end-transceive|eos|file-limits|file-limit|formatted|sort-status|usage-mode)(?=\\s|\\.|,|;|$)',
      name: 'invalid.illegal.netcobol.cobol'
    },
    {
      match: '(?<![-_])(?i:System-Info|Terminal-Info)(?![0-9A-Za-z_-])',
      name: 'support.type.cobol.acu strong'
    },
    {match: '(?<![-_])(?i:alter)(?=\\s|\\.)', name: 'invalid.illegal.cobol'},
    {
      match:
        '(?<![-_])(?i:apply|areas|area|clock-units|code|com-reg|controls|dbcs|destination|detail|display-1|ending|every|insert|kanjikey|last|left|less|limits|limit|memory|metaclass|modules|more-labels|multiple|native_binary|native|negative|number|numeric-edited|other|padding|password|pf|ph|postive|processing|queue|recording|reload|removal|rerun|reserve|reserved|rewind|segment-limit|segment|separate|sequence|skip1|skip2|skip3|standard-1|standard-2|sub-queue-1|sub-queue-2|sub-queue-3|sum|symbolic|synchronized|sync|table|test|text|than|top|trace|trailing|unit|words|write-only|at|basis|beginning|bottom|cbl|cf|ch|de|positive|egcs|egi|emi|end|reversed|rf|rh|run|same|order|heading|esi)(?![0-9A-Za-z_-])',
      name: 'keyword.ibmreserved.cobol'
    },
    {
      match:
        '(?<![-_])(?i:active-class|aligned|anycase|boolean|cols|col|condition|ec|eo|system-default|function-pointer)(?![0-9A-Za-z_-])',
      name: 'strong keyword.potential.reserved.cobol'
    },
    {match: '(?i:filler)', name: 'keyword.filler.cobol'},
    {
      match:
        '(?<![-_])(?i:address-of|date|day-of-week|day|debug-content|debug-item|debug-line|debug-item|debug-sub-1|debug-sub-2|debug-sub-3|shift-in|shift-out|sort-control|sort-core-size|sort-file-size|sort-message|sort-return|sort-mode-size|sort-return|tally|time|when-compiled|line-counter|page-counter|return-code|linage-counter|debug-line|debug-name|debug-contents|json-code|json-status|xml-code|xml-event|xml-information|xml-namespace-prefix|xml-namespace|xml-nnamespace-repfix|xml-nnamespace|xml-ntext|jnienvptr|igy-javaiop-call-exception)(?![0-9A-Za-z_-])',
      name: 'variable.language'
    },
    {
      match:
        '(?<![-_])(?i:shortint1|shortint2|shortint3|shortint4|shortint5|shortint6|shortint7|longint1|longint2|longint3|longint4|longint5|longint6|bigint1|bigint2|blob-locator|clob-locator|dbclob-locator|dbclob-file|blob-file|clob-file|clob|dbclob|blob|varbinary|long-varbinary|time-record|timestamp-record|timestamp-offset-record|timestamp-offset|timestamp|rowid|xml|long-varchar)(?=\\s|\\.|\\)|\\()',
      name: 'storage.type.sql.picture.cobol'
    },
    {match: '(?<![-_])(?i:self)', name: 'keyword.other.self.cobol'},
    {match: '(?<![-_])(?i:super)', name: 'keyword.other.super.cobol'},
    {
      match: '(^[0-9][0-9][0-9][0-9][0-9][0-9])',
      name: 'constant.numeric.cobol'
    },
    {
      captures: {
        1: {name: 'meta.symbol.cobol'},
        2: {name: 'constant.numeric.integer'},
        3: {name: 'meta.symbol.cobol'},
        4: {name: 'constant.numeric.integer'},
        5: {name: 'meta.symbol.cobol'}
      },
      match: '(\\()([0-9]*)(:)([0-9]*)(\\))'
    },
    {
      match:
        '([a-zA-Z-0-9_]*[a-zA-Z0-9]|([#]?[0-9a-zA-Z]+[a-zA-Z-0-9_]*[a-zA-Z0-9]))',
      name: 'meta.symbol.cobol'
    }
  ],
  repository: {
    'cics-keywords': {
      match:
        '(?<![\\-\\w])(?i:abcode|abdump|abend|abort|abprogram|abstime|accum|acee|acqactivity|acqprocess|acquactivity|action|activity|activityid|actpartn|add|address|after|aid|alarm|all|allocate|alter|alternate|altscrnht|altscrnwd|and|anykey|aplkybd|apltext|applid|as|asa|asis|asktime|asraintrpt|asrakey|asrapsw|asraregs|asraspc|asrastg|assign|asynchronous|at|attach|attachid|attributes|authenticate|autopage|auxiliary|base64|basicauth|below|bif|binary|bit|bodycharset|bookmark|brdata|brdatalength|brexit|bridge|browsetoken|btrans|buffer|build|burgeability|caddrlength|cancel|card|cbuff|ccsid|certificate|change|changetime|channel|char|characterset|check|chunkend|chunking|chunkno|chunkyes|cicsdatakey|ciphers|class|clear|cliconvert|client|clientaddr|clientaddrnu|clientconv|clientname|clntaddr6nu|clntipfamily|close|closestatus|clrpartn|cmdsec|cnamelength|cnotcompl|codepage|color|commarea|commonname|commonnamlen|comparemax|comparemin|complete|composite|compstatus|condition|confirm|confirmation|connect|consistent|console|container|contexttype|control|convdata|converse|convertst|converttime|convid|copy|counter|country|countrylen|create|critical|ctlchar|current|cursor|cwa|cwaleng|data|data1|data2|datalength|datalenth|dataonly|datapointer|dataset|datastr|datatoxml|datatype|datcontainer|date|dateform|datesep|datestring|day|daycount|dayofmonth|dayofweek|dayofyear|days|daysleft|day-of-week|dcounter|ddmmyy|ddmmyyyy|debkey|debrec|debug-contents|debug-item|debug-line|debug-name|debug-sub-1|debug-sub-2|debug-sub-3|deedit|default|define|defresp|defscrnht|defscrnwd|delay|delete|deleteq|delimiter|deq|destcount|destid|destidleng|detail|detaillength|dfhresp|dfhvalue|digest|digesttype|disconnect|docdelete|docsize|docstatus|doctoken|document|ds3270|dsscs|dump|dumpcode|dumpid|duprec|ecaddr|ecblist|eib|elemname|elemnamelen|elemns|elemnslen|end|endactivity|endbr|endbrowse|endfile|endoutput|enq|enter|entry|entryname|eoc|eods|eprfield|eprfrom|eprinto|eprlength|eprset|eprtype|equal|erase|eraseaup|error|errterm|esmreason|esmresp|event|eventtype|eventual|ewasupp|exception|expect|expirytime|extds|external|extract|facility|facilitytokn|false|faultactlen|faultactor|faultcode|faultcodelen|faultcodestr|faultstring|faultstrlen|fci|fct|field|file|firestatus|flength|fmh|fmhparm|for|force|formattime|formfeed|formfield|free|freekb|freemain|from|fromactivity|fromccsid|fromchannel|fromcodepage|fromdoc|fromflength|fromlength|fromprocess|frset|fulldate|function|gchars|gcodes|gds|generic|get|getmain|getnext|gmmi|groupid|gtec|gteq|handle|head|header|hex|high-value|high-values|hilight|hold|honeom|host|hostcodepage|hostlength|hosttype|hours|httpheader|httpmethod|httprnum|httpversion|httpvnum|ignore|immediate|in|increment|initimg|initparm|initparmlen|inpartn|input|inputevent|inputmsg|inputmsglen|inquire|insert|integer|interval|into|intoccsid|intocodepage|invalidcount|invite|invmpsz|invoke|invokingprog|invpartn|invreq|issue|issuer|item|iutype|journalname|jtypeid|jusfirst|juslast|justify|katakana|keep|keylength|keynumber|l40|l64|l80|label|langinuse|languagecode|last|lastusetime|ldc|ldcmnem|ldcnum|leavekb|length|lengthlist|level|lightpen|linage-counter|line|lineaddr|line-counter|link|list|listlength|llid|load|locality|localitylen|logmessage|logmode|logonlogmode|logonmsg|low-value|low-values|luname|main|map|mapcolumn|mapfail|mapheight|mapline|maponly|mapped|mappingdev|mapset|mapwidth|massinsert|maxdatalen|maxflength|maximum|maxlength|maxlifetime|maxproclen|mcc|mediatype|message|messageid|metadata|metadatalen|method|methodlength|milliseconds|minimum|minutes|mmddyy|mmddyyyy|mode|modename|monitor|month|monthofyear|move|msr|msrcontrol|name|namelength|natlang|natlanginuse|netname|newpassword|newphrase|newphraselen|next|nexttransid|nleom|noautopage|nocc|nocheck|nocliconvert|noclose|nodata|node|nodocdelete|nodump|noedit|noflush|nohandle|noinconvert|none|nooutconert|noqueue|noquiesce|nosrvconvert|nosuspend|note|notpurgeable|notruncate|nowait|nscontainer|null|nulls|numciphers|numevents|numitems|numrec|numroutes|numsegments|numtab|of|oidcard|on|opclass|open|operation|operator|operid|operkeys|operpurge|opid|opsecurity|options|or|orgabcode|organization|organizatlen|orgunit|orgunitlen|outdescr|outline|outpartn|output|owner|pa1|pa2|pa3|page|pagenum|page-counter|paging|parse|partn|partner|partnfail|partnpage|partns|partnset|pass|passbk|password|passwordlen|path|pathlength|pct|pf1|pf10|pf11|pf12|pf13|pf14|pf15|pf16|pf17|pf18|pf19|pf2|pf20|pf21|pf22|pf23|pf24|pf3|pf4|pf5|pf6|pf7|pf8|pf9|pfxleng|phrase|phraselen|piplength|piplist|point|pool|pop|portnumber|portnumnu|post|ppt|predicate|prefix|prepare|princonvid|prinsysid|print|priority|privacy|process|processtype|proclength|procname|profile|program|protect|ps|punch|purge|purgeable|push|put|qname|query|queryparm|querystring|querystrlen|queue|quote|quotes|random|rba|rbn|rdatt|read|readnext|readprev|readq|reattach|receive|receiver|recfm|record|recordlen|recordlength|reduce|refparms|refparmslen|relatesindex|relatestype|relatesuri|release|remove|repeatable|repetable|replace|reply|replylength|reqid|requesttype|resclass|reset|resetbr|resid|residlength|resource|resp|resp2|ressec|restart|restype|result|resume|retain|retcode|retcord|retriece|retrieve|return|returnprog|return-code|rewind|rewrite|ridfld|role|rolelength|rollback|route|routecodes|rprocess|rresource|rrn|rtermid|rtransid|run|saddrlength|scheme|schemename|scope|scopelen|scrnht|scrnwd|seconds|security|segmentlist|send|sender|serialnum|serialnumlen|server|serveraddr|serveraddrnu|serverconv|servername|service|session|sesstoken|set|shared|shift-in|shift-out|sigdata|signal|signoff|signon|sit|snamelength|soapfault|sort-control|sort-core-size|sort-file-size|sort-message|sort-mode-size|sort-return|sosi|space|spaces|spoolclose|spoolopen|spoolread|spoolwrite|srvconvert|srvraddr6nu|srvripfamily|ssltype|start|startbr|startbrowse|startcode|state|statelen|stationid|status|statuscode|statuslen|statustext|storage|strfield|stringformat|subaddr|subcodelen|subcodestr|subevent|subevent1|subevent2|subevent3|subevent4|subevent5|subevent6|subevent7|subevent8|sum|suspend|suspstatus|symbol|symbollist|synchronous|synclevel|synconreturn|syncpoint|sysid|tables|tally|task|taskpriority|tcpip|tcpipservice|tct|tctua|tctualeng|td|tellerid|template|termcode|termid|terminal|termpriority|test|text|textkybd|textlength|textprint|time|timeout|timer|timesep|title|to|toactivity|tochannel|tocontainer|toflength|token|tolength|toprocess|trace|tracenum|trailer|tranpriority|transaction|transform|transid|trigger|trt|true|ts|twa|twaleng|type|typename|typenamelen|typens|typenslen|unattend|uncommitted|unescaped|unexpin|unlock|until|uow|update|uri|urimap|url|urllength|userdatakey|userid|username|usernamelen|userpriority|using|validation|value|valuelength|verify|versionlen|volume|volumeleng|wait|waitcics|web|when-compiled|wpmedia1|wpmedia2|wpmedia3|wpmedia4|wrap|write|writeq|wsacontext|wsaepr|xctl|xmlcontainer|xmltodata|xmltransform|xrba|year|yyddd|yyddmm|yymmdd|yyyyddd|yyyyddmm|yyyymmdd|zero|zeroes|zeros)(?![\\-\\w])',
      name: 'keyword.verb.cics'
    },
    'dli-keywords': {
      match:
        '(?<![\\-\\w])(?i:accept|chkp|deq|dlet|gnp|gn|gu|isrt|load|log|pos|query|refresh|repl|retrieve|rolb|roll|rols|schd|sets|setu|symchkp|term|xrst)(?![\\-\\w])',
      name: 'keyword.verb.dli'
    },
    'dli-options': {
      match:
        '(?<![\\-\\w])(?i:statusgroup|checkpoint|chkp|id|lockclass|segment|info|where|from|using|keyfeedback|feedbacklen|variable|first|last|current|seglength|offset|locked|movenext|getfirst|set|setcond|setzero|setparent|fieldlength|keys|maxlength|length[0-9]*|area[0-9]*|psc|pcs|pcb|sysserve|into)(?![\\-\\w])',
      name: 'keyword.other.dli'
    },
    'number-complex-constant': {
      match:
        '(\\-|\\+)?((([0-9]+(\\.[0-9]+))|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)([LlFfUuDd]|UL|ul)?(?=\\s|\\.$|,|\\))',
      name: 'constant.numeric.cobol'
    },
    'number-simple-constant': {
      match: '(\\-|\\+)?([0-9]+)(?=\\s|\\.$|,|\\))',
      name: 'constant.numeric.cobol'
    },
    'string-double-quoted-constant': {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: '("|$)',
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}}
    },
    'string-quoted-constant': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.cobol'}},
      end: "('|$)",
      endCaptures: {0: {name: 'punctuation.definition.string.end.cobol'}},
      name: 'string.quoted.single.cobol'
    }
  },
  scopeName: 'source.cobol'
}

export default grammar
