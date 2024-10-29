ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},s.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};r.inherits(s,i),s.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},s.getStartRule=function(e){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:e}},s.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=s}),ace.define("ace/mode/swift_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("../lib/lang"),s=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,u=function(){function t(e,t){var n=t.nestable||t.interpolation,r=t.interpolation&&t.interpolation.nextState||"start",s={regex:e+(t.multiline?"":"(?=.)"),token:"string.start"},o=[t.escape&&{regex:t.escape,token:"character.escape"},t.interpolation&&{token:"paren.quasi.start",regex:i.escapeRegExp(t.interpolation.lead+t.interpolation.open),push:r},t.error&&{regex:t.error,token:"error.invalid"},{regex:e+(t.multiline?"":"|$"),token:"string.end",next:n?"pop":"start"},{defaultToken:"string"}].filter(Boolean);n?s.push=o:s.next=o;if(!t.interpolation)return s;var u=t.interpolation.open,a=t.interpolation.close,f={regex:"["+i.escapeRegExp(u+a)+"]",onMatch:function(e,t,n){this.next=e==u?this.nextState:"";if(e==u&&n.length)return n.unshift("start",t),"paren";if(e==a&&n.length){n.shift(),this.next=n.shift();if(this.next.indexOf("string")!=-1)return"paren.quasi.end"}return e==u?"paren.lparen":"paren.rparen"},nextState:r};return[f,s]}function n(){return[{token:"comment",regex:/\/\//,next:[s.getTagRule(),{token:"comment",regex:"$|^",next:"start"},{defaultToken:"comment",caseInsensitive:!0}]},s.getStartRule("doc-start"),{token:"comment.start",regex:/\/\*/,stateName:"nested_comment",push:[s.getTagRule(),{token:"comment.start",regex:/\/\*/,push:"nested_comment"},{token:"comment.end",regex:"\\*\\/",next:"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var e=this.createKeywordMapper({"variable.language":"",keyword:"__COLUMN__|__FILE__|__FUNCTION__|__LINE__|as|associativity|break|case|class|continue|default|deinit|didSet|do|dynamicType|else|enum|extension|fallthrough|for|func|get|if|import|in|infix|init|inout|is|left|let|let|mutating|new|none|nonmutating|operator|override|postfix|precedence|prefix|protocol|return|right|safe|Self|self|set|struct|subscript|switch|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|convenience|dynamic|final|infix|lazy|mutating|nonmutating|optional|override|postfix|prefix|required|static|guard|defer","storage.type":"bool|double|Double|extension|float|Float|int|Int|open|internal|fileprivate|private|public|string|String","constant.language":"false|Infinity|NaN|nil|no|null|null|off|on|super|this|true|undefined|yes","support.function":""},"identifier");this.$rules={start:[t('"""',{escape:/\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,interpolation:{lead:"\\",open:"(",close:")"},error:/\\./,multiline:!0}),t('"',{escape:/\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,interpolation:{lead:"\\",open:"(",close:")"},error:/\\./,multiline:!1}),n(),{regex:/@[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,token:"variable.parameter"},{regex:/[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,token:e},{token:"constant.numeric",regex:/[+-]?(?:0(?:b[01]+|o[0-7]+|x[\da-fA-F])|\d+(?:(?:\.\d*)?(?:[PpEe][+-]?\d+)?)\b)/},{token:"keyword.operator",regex:/--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/}]},this.embedRules(s,"doc-",[s.getEndRule("start")]),this.normalizeRules()};r.inherits(u,o),t.HighlightRules=u,t.SwiftHighlightRules=u}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(r)?"start":i},this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,o);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;var s=i.match(this.foldingStopMarker);if(s){var o=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,o):e.getCommentFoldRange(n,o,-1)}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),s=t,o=n.length;t+=1;var u=t,a=e.getLength();while(++t<a){n=e.getLine(t);var f=n.search(/\S/);if(f===-1)continue;if(r>f)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=s)break;if(l.isMultiLine())t=l.end.row;else if(r==f)break}u=t}return new i(s,o,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/),s=e.getLength(),o=n,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;while(++n<s){t=e.getLine(n);var f=u.exec(t);if(!f)continue;f[1]?a--:a++;if(!a)break}var l=n;if(l>o)return new i(o,r,l,t.length)}}.call(o.prototype)}),ace.define("ace/mode/swift",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/swift_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./swift_highlight_rules").HighlightRules,o=e("./folding/cstyle").FoldMode,u=function(){this.HighlightRules=s,this.foldingRules=new o,this.$behaviour=this.$defaultBehaviour};r.inherits(u,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/",nestable:!0},this.$id="ace/mode/swift"}.call(u.prototype),t.Mode=u});                (function() {
                    ace.require(["ace/mode/swift"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            