var ecui;
(function () {

//{assign var="phases" value="define,body" delimiter=","}//
//{foreach item="item" from=$phases}//
//{assign var="phase" value=$item}//
//{include file="adapter.js"}//
//{include file="core.js"}//
//{include file="control.js"}//
//{include file="input-control.js"}//
//{include file="button.js"}//
//{include file="scrollbar.js"}//
//{include file="panel.js"}//
//{include file="items.js"}//
//{include file="checkbox.js"}//
//{include file="radio.js"}//
//{include file="select.js"}//

//{include file="combox.js"}//
//{include file="form.js"}//
//{include file="tree-view.js"}//
//{include file="month-view.js"}//
//{include file="table.js"}//
//{include file="locked-table.js"}//
//{include file="popup-menu.js"}//
//{include file="listbox.js"}//
//{include file="tab.js"}//
//{include file="decorate.js"}//
//{include file="combine.js"}//

//*{include file="label.js"}//
//*{include file="progress.js"}//
//*{include file="collection.js"}//
//*{include file="calendar.js"}//
//*{include file="format-edit.js"}//
//*{include file="radio-tree.js"}//
//*{include file="check-tree.js"}//
//*{include file="color.js"}//
//*{include file="palette.js"}//
//*{include file="multi-select.js"}//
//*{include file="locked-table.js"}//
//*{include file="messagebox.js"}//
//*{include file="shield.js"}//
//*{include file="tween.js"}//
//{/foreach}//
})();

//{if 0}//
(function () {
//{/if}//
//{if $phase == "define"}//

//__gzip_unitize__i
//__gzip_unitize__list
//__gzip_unitize__o
//__gzip_unitize__el
//__gzip_unitize__params
    var core = ecui = {},
        array = core.array = {},
        dom = core.dom = {},
        ext = core.ext = {},
        json = core.json = {},
        string = core.string = {},
        ui = core.ui = {},
        util = core.util = {};

    //__gzip_original__WINDOW
    ///__gzip_original__DOCUMENT
    //__gzip_original__DATE
    //__gzip_original__FUNCTION
    //__gzip_original__MATH
    //__gzip_original__REGEXP
    //__gzip_original__ABS
    //__gzip_original__CEIL
    ///__gzip_original__FLOOR
    ///__gzip_original__MAX
    ///__gzip_original__MIN
    //__gzip_original__POW
    ///__gzip_original__ROUND
    ///__gzip_original__PARSEINT
    //__gzip_original__ISNAN
    var undefined,
        WINDOW = window,
        DOCUMENT = document,
        DATE = Date,
        FUNCTION = Function,
        MATH = Math,
        REGEXP = RegExp,
        ABS = MATH.abs,
        CEIL = MATH.ceil,
        FLOOR = MATH.floor,
        MAX = MATH.max,
        MIN = MATH.min,
        POW = MATH.pow,
        ROUND = MATH.round,
        PARSEINT = parseInt,
        ISNAN = isNaN;

    var USER_AGENT = navigator.userAgent,
        isStrict = DOCUMENT.compatMode == 'CSS1Compat',
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,
        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,
        operaVersion = /opera\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,
        safariVersion =
            /(\d+\.\d)(\.\d)?\s+safari/i.test(USER_AGENT) && !/chrome/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined;

    // 字符集基本操作定义
    var charset = {
            utf8: {
                byteLength: function (source) {
                    return source.replace(/[\x80-\u07ff]/g, '  ').replace(/[\u0800-\uffff]/g, '   ').length;
                },

                codeLength: function (code) {
                    return code > 2047 ? 3 : code > 127 ? 2 : 1;
                }
            },

            gbk: {
                byteLength: function (source) {
                    return source.replace(/[\x80-\uffff]/g, '  ').length;
                },

                codeLength: function (code) {
                    return code > 127 ? 2 : 1;
                }
            },

            '': {
                byteLength: function (source) {
                    return source.length;
                },

                codeLength: function (code) {
                    return 1;
                }
            }
        };

    // 读写特殊的 css 属性操作
    var styleFixer = {
            display:
                ieVersion < 8 ? {
                    get: function (el, style) {
                        return style.display == 'inline' && style.zoom == 1 ? 'inline-block' : style.display;
                    },

                    set: function (el, value) {
                        if (value == 'inline-block') {
                            value = 'inline';
                            el.style.zoom = 1;
                        }
                        el.style.display = value;
                    }
                } : firefoxVersion < 3 ? {
                    get: function (el, style) {
                        return style.display == '-moz-inline-box' ? 'inline-block' : style.display;
                    },

                    set: function (el, value) {
                        el.style.display = value == 'inline-block' ? '-moz-inline-box' : value;
                    }
                } : undefined,

            opacity:
                ieVersion ? {
                    get: function (el, style) {
                        return /alpha\(opacity=(\d+)/.test(style.filter) ? ((REGEXP.$1 - 0) / 100) + '' : '1';
                    },

                    set: function (el, value) {
                        el.style.filter =
                            el.style.filter.replace(/alpha\([^\)]*\)/gi, '') + 'alpha(opacity=' + value * 100 + ')';
                    }
                } : undefined,

            'float': ieVersion ? 'styleFloat' : 'cssFloat'
        };

        /**
         * 查询数组中指定对象的位置序号。
         * indexOf 方法返回完全匹配的对象在数组中的序号，如果在数组中找不到指定的对象，返回 -1。
         * @public
         * 
         * @param {Array} list 数组对象
         * @param {Object} obj 需要查询的对象
         * @return {number} 位置序号，不存在返回 -1
         */
    var indexOf = array.indexOf = function (list, obj) {
            for (var i = list.length; i--; ) {
                if (list[i] === obj) {
                    break;
                }
            }
            return i;
        },

        /**
         * 从数组中移除对象。
         * @public
         * 
         * @param {Array} list 数组对象
         * @param {Object} obj 需要移除的对象
         */
        remove = array.remove = function (list, obj) {
            for (var i = list.length; i--; ) {
                if (list[i] === obj) {
                    list.splice(i, 1);
                }
            }
        },

        /**
         * 为 Element 对象添加新的样式。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间使用空白符分隔
         */
        addClass = dom.addClass = function (el, className) {
            // 这里直接添加是为了提高效率，因此对于可能重复添加的属性，请使用标志位判断是否已经存在，
            // 或者先使用 removeClass 方法删除之前的样式
            el.className += ' ' + className;
        },

        /**
         * 获取所有 parentNode 为指定 Element 的子 Element 集合。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @return {Array} Element 对象数组
         */
        children = dom.children = function (el) {
            for (var result = [], o = el.firstChild; o; o = o.nextSibling) {
                if (o.nodeType == 1) {
                    result.push(o);
                }
            }
            return result;    
        },

        /**
         * 判断一个 Element 对象是否包含另一个 Element 对象。
         * contain 方法认为两个相同的 Element 对象相互包含。
         * @public
         * 
         * @param {HTMLElement} container 包含的 Element 对象
         * @param {HTMLElement} contained 被包含的 Element 对象
         * @return {boolean} contained 对象是否被包含于 container 对象的 DOM 节点上
         */
        contain = dom.contain = firefoxVersion ? function (container, contained) {
            return container == contained || !!(container.compareDocumentPosition(contained) & 16);
        } : function (container, contained) {
            return container.contains(contained);
        },

        /**
         * 创建 Element 对象。
         * @public
         * 
         * @param {string} className 样式名称
         * @param {string} cssText 样式文本
         * @param {string} tagName 标签名称，默认创建一个空的 div 对象
         * @return {HTMLElement} 创建的 Element 对象
         */
        createDom = dom.create = function (className, cssText, tagName) {
            tagName = DOCUMENT.createElement(tagName || 'DIV');
            if (className) {
                tagName.className = className;
            }
            if (cssText) {
                tagName.style.cssText = cssText;
            }
            return tagName;
        },

        /**
         * 获取 Element 对象的第一个子 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 子 Element 对象
         */
        first = dom.first = function (el) {
            return matchNode(el.firstChild, 'nextSibling');
        },

        /**
         * 获取 Element 对象的属性值。
         * 在 IE 下，Element 对象的属性可以通过名称直接访问，效率是 getAttribute 方式的两倍。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 属性名称
         * @return {string} 属性值
         */
        getAttribute = dom.getAttribute = ieVersion < 8 ? function (el, name) {
            return el[name];
        } : function (el, name) {
            return el.getAttribute(name);
        },

        /**
         * 获取 Element 对象的父 Element 对象。
         * 在 IE 下，Element 对象被 removeChild 方法移除时，parentNode 仍然指向原来的父 Element 对象，与 W3C 标准兼容的属性应该是 parentElement。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 父 Element 对象，如果没有，返回 null
         */
        getParent = dom.getParent = ieVersion ? function (el) {
            return el.parentElement;
        } : function (el) {
            return el.parentNode;
        },

        /**
         * 获取 Element 对象的页面位置。
         * getPosition 方法将返回指定 Element 对象的位置信息。属性如下：
         * left {number} X轴坐标
         * top  {number} Y轴坐标
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {Object} 位置信息
         */
        getPosition = dom.getPosition = function (el) {
            var top = 0,
                left = 0,
                body = DOCUMENT.body,
                html = getParent(body);

            if (ieVersion) {
                if(!isStrict) {
                    // 在怪异模式下，IE 将 body 的边框也算在了偏移值中，需要先纠正
                    o = getStyle(body);
                    if (ISNAN(top = PARSEINT(o.borderTopWidth))) {
                        top = -2;
                    }
                    if (ISNAN(left = PARSEINT(o.borderLeftWidth))) {
                        left = -2;
                    }
                }

                o = el.getBoundingClientRect();
                top += html.scrollTop + body.scrollTop - html.clientTop + FLOOR(o.top);
                left += html.scrollLeft + body.scrollLeft - html.clientLeft + FLOOR(o.left);
            }
            else if (el == body) {
                top = html.scrollTop + body.scrollTop;
                left = html.scrollLeft + body.scrollLeft;
            }
            else if (el != html) {
                for (o = el; o; o = o.offsetParent) {
                    top += o.offsetTop;
                    left += o.offsetLeft;
                }

                if (operaVersion || (/webkit/i.test(USER_AGENT) && getStyle(el, 'position') == 'absolute')) {
                    top -= body.offsetTop;
                }

                for (var o = getParent(el), style = getStyle(el); o != body; o = getParent(o), style = el) {
                    left -= o.scrollLeft;
                    if (!operaVersion) {
                        el = getStyle(o);
                        // 以下使用 html 作为临时变量
                        html = firefoxVersion && el.overflow != 'visible' && style.position == 'absolute' ? 2 : 1;
                        top += toNumber(el.borderTopWidth) * html - o.scrollTop;
                        left += toNumber(el.borderLeftWidth) * html;
                    }
                    else if (o.tagName != 'TR') {
                        top -= o.scrollTop;
                    }
                }
            }

            return {top: top, left: left};
        },

        /**
         * 获取 Element 对象的 CssStyle 对象或者是指定的样式值。
         * getStyle 方法如果不指定样式名称，将返回 Element 对象的当前 CssStyle 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @return {CssStyle|Object} CssStyle 对象或样式值
         */
        getStyle = dom.getStyle = function (el, name) {
            var fixer = styleFixer[name],
                style = el.currentStyle || (ieVersion ? el.style : getComputedStyle(el, null));

            return name ? fixer && fixer.get ? fixer.get(el, style) : style[fixer || name] : style;
        },

        /**
         * 获取 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {string} Element 对象的文本
         */
        getText = dom.getText = firefoxVersion ? function (el) {
            return el.textContent;
        } : function (el) {
            return el.innerText;
        },

        /**
         * 将 Element 对象插入指定的 Element 对象之后。
         * 如果指定的 Element 对象没有父 Element 对象，相当于 remove 操作。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertAfter = dom.insertAfter = function (el, target) {
            var parent = getParent(target);
            return parent ? parent.insertBefore(el, target.nextSibling) : removeDom(el);
        },

        /**
         * 将 Element 对象插入指定的 Element 对象之前。
         * 如果指定的 Element 对象没有父 Element 对象，相当于 remove 操作。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertBefore = dom.insertBefore = function (el, target) {
            var parent = getParent(target);
            return parent ? parent.insertBefore(el, target) : removeDom(el);
        },

        /**
         * 向指定的 Element 对象内插入一段 html 代码。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @param {string} position 插入 html 的位置信息，取值为 beforeBegin,afterBegin,beforeEnd,afterEnd
         * @param {string} html 要插入的 html 代码
         */
        insertHTML = dom.insertHTML = firefoxVersion ? function (el, position, html) {
            var name = {
                    AFTERBEGIN: 'selectNodeContents',
                    BEFOREEND: 'selectNodeContents',
                    BEFOREBEGIN: 'setStartBefore',
                    AFTEREND: 'setEndAfter'
                }[position.toUpperCase()],
                range = DOCUMENT.createRange();

            range[name](el);
            range.collapse(position.length > 9);
            range.insertNode(range.createContextualFragment(html));
        } : function (el, position, html) {
            el.insertAdjacentHTML(position, html);
        },

        /**
         * 获取 Element 对象的最后一个子 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 子 Element 对象
         */
        last = dom.last = function (el) {
            return matchNode(el.lastChild, 'previousSibling');
        },

        /**
         * 将指定的 Element 对象的内容移动到目标 Element 对象中。
         * @public
         *
         * @param {HTMLElement} source 指定的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @param {boolean} all 是否移动所有的 DOM 对象，默认仅移动 ElementNode 类型的对象
         */
        moveElements = dom.moveElements = function (source, target, all) {
            //__transform__el_o
            for (var el = source.firstChild; el; el = source) {
                source = el.nextSibling;
                if (all || el.nodeType == 1) {
                    target.appendChild(el);
                }
            }
        },

        /**
         * 获取 Element 对象的下一个 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} Element 对象
         */
        next = dom.next = function (el) {
            return matchNode(el.nextSibling, 'nextSibling');
        },

        /**
         * 从页面中移除 Element 对象。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 被移除的 Element 对象
         */
        removeDom = dom.remove = function (el) {
            var parent = getParent(el);
            if (parent) {
                parent.removeChild(el);
            }
            return el;
        },

        /**
         * 删除 Element 对象中的样式。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间用空白符分隔
         */
        removeClass = dom.removeClass = function (el, className) {
            var oldClasses = el.className.split(/\s+/).sort(),
                newClasses = className.split(/\s+/).sort(),
                i = oldClasses.length,
                j = newClasses.length;

            for (; i && j; ) {
                if (oldClasses[i - 1] == newClasses[j - 1]) {
                    oldClasses.splice(--i, 1);
                }
                else if (oldClasses[i - 1] < newClasses[j - 1]) {
                    j--;
                }
                else {
                    i--;
                }
            }
            el.className = oldClasses.join(' ');
        },

        /**
         * 设置输入框的表单项属性。
         * 如果没有指定一个表单项，setInput 方法将创建一个表单项。
         * @public
         *
         * @param {HTMLElement} el InputElement 对象
         * @param {string} name 新的表单项名称，默认与 el 相同
         * @param {string} type 新的表单项类型，默认为 el 相同
         * @return {HTMLElement} 设置后的 InputElement 对象
         */
        setInput = dom.setInput = function (el, name, type) {
            if (!el) {
                if (type == 'textarea') {
                    el = createDom('', '', 'textarea');
                }
                else {
                    if (ieVersion < 9) {
                        return createDom('', '', '<input type="' + (type || '') + '" name="' + (name || '') + '">');
                    }
                    el = createDom('', '', 'input');
                }
            }

            name = name === undefined ? el.name : name;
            type = type === undefined ? el.type : type;

            if (el.name != name || el.type != type) {
                if ((ieVersion && type != 'textarea') ||
                        el.type != type && (el.type == 'textarea' || type == 'textarea')) {
                    insertHTML(
                        el,
                        'AFTEREND',
                        '<' + (type == 'textarea' ? 'textarea' : 'input type="' + type + '"') +
                            ' name="' + name + '" class="' + el.className +
                            '" style="' + el.style.cssText + '" ' + (el.disabled ? 'disabled' : '') +
                            (el.readOnly ? ' readOnly' : '') + '>'
                    );
                    name = el;
                    (el = el.nextSibling).value = name.value;
                    if (type == 'radio') {
                        el.checked = name.checked;
                    }
                    removeDom(name);
                }
                else {
                    el.type = type;
                    el.name = name;
                }
            }
            return el;
        },

        /**
         * 设置 Element 对象的样式值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @param {string} value 样式值
         */
        setStyle = dom.setStyle = function (el, name, value) {
            var fixer = styleFixer[name];
            if (fixer && fixer.set) {
                fixer.set(el, value);
            }
            else {
                el.style[fixer || name] = value;
            }
        },

        /**
         * 设置 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} text Element 对象的文本
         */
        setText = dom.setText = firefoxVersion ? function (el, text) {
            el.textContent = text;
        } : function (el, text) {
            el.innerText = text;
        },

        /**
         * JSON字串解析，将JSON字符串解析为JSON对象。
         * @public
         *
         * @param {string} text json字符串
         * @return {Object} json字符串描述的对象
         */
        parse = json.parse = function (text) {
            return new Function('return (' + text + ')')();
        },

        /**
         * JSON对象序列化。
         * @public
         *
         * @param {Object} source 需要序列化的对象
         * @return {string} json字符串
         */
        stringify = json.stringify = (function () {
//__gzip_unitize__result
//__gzip_unitize__source
            var escapeMap = {
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"' : '\\"',
                    '\\': '\\\\'
                };

            /**
             * 字符串序列化。
             * @private
             *
             * @param {string} source 需要序列化的字符串
             */
            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var o = escapeMap[match];
                            if (o) {
                                return o;
                            }
                            o = match.charCodeAt();
                            return '\\u00' + FLOOR(o / 16) + (o % 16).toString(16);
                        }
                    );
                }
                return '"' + source + '"';
            }

            /**
             * 数组序列化。
             * @private
             *
             * @param {Array} source 需要序列化的数组
             */
            function encodeArray(source) {
                var i = 0,
                    result = [],
                    o,
                    l = source.length;

                for (var i = 0, result = [], o, l = source.length; i < l; i++) {
                    if ((o = stringify(source[i])) !== undefined) {
                        result.push(o);
                    }
                }
                return '[' + result.join(',') + ']';
            }

            /**
             * 处理日期序列化时的补零。
             * @private
             *
             * @param {number} source 数值，小于10需要补零
             */
            function pad(source) {
                return source < 10 ? '0' + source : source;
            }

            /**
             * 日期序列化。
             * @private
             *
             * @param {Date} source 需要序列化的日期
             */
            function encodeDate(source) {
                return '"' + source.getFullYear() + '-' + pad(source.getMonth() + 1) + '-' +
                        pad(source.getDate()) + 'T' + pad(source.getHours()) + ':' +
                        pad(source.getMinutes()) + ':' + pad(source.getSeconds()) + '"';
            }

            return function (source) {
                switch (typeof source) {
                case 'undefined':
                case 'function':
                case 'unknown':
                    return undefined;
                case 'number':
                    if (!isFinite(source)) {
                        return 'null';
                    }
                    // 对于有意义的数值与布尔类型直接输出
                case 'boolean':
                    return source.toString();
                case 'string':
                    return encodeString(source);
                default:
                    if (source === null) {
                        return 'null';
                    }
                    else if (source instanceof Array) {
                        return encodeArray(source);
                    }
                    else if (source instanceof Date) {
                        return encodeDate(source);
                    }
                    else {
                        var result = [],
                            o;

                        for (var i in source) {
                            if ((o = stringify(source[i])) !== undefined) {
                                result.push(encodeString(i) + ':' + o);
                            }
                        }

                        return '{' + result.join(',') + '}';
                    }
                }
            };
        })(),

        /**
         * 对目标字符串进行 html 解码。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        decodeHTML = string.decodeHTML = (function () {
            var codeTable = {
                quot: '"',
                lt: '<',
                gt: '>',
                amp: '&'
            };

            return function (source) {
                //处理转义的中文和实体字符
                return source.replace(/&(quot|lt|gt|amp|#([\d]+));/g, function(match, $1, $2) {
                    return codeTable[$1] || String.fromCharCode(+$2);
                });
            };
        })(),

        /**
         * 对目标字符串进行 html 编码。
         * encodeHTML 方法对四个字符进行编码，分别是 &<>"
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        encodeHTML = string.encodeHTML = function (source) {
            source = source + '';
            return source.replace(/[&<>"']/g, function (c) {
                return '&#' + c.charCodeAt(0) + ';';
            });
        },

        /**
         * 计算字符串的字节长度。
         * 如果没有指定编码集，相当于获取字符串属性 length 的值。
         * 
         * @param {string} source 目标字符串
         * @param {string} charsetName 字符对应的编码集
         * @return {number} 字节长度
         */
        getByteLength = string.getByteLength = function (source, charsetName) {
            return charset[charsetName || ''].byteLength(source);
        },

        /**
         * 根据字节长度截取字符串。
         * 如果没有指定编码集，相当于字符串的 slice 方法。
         * 
         * @param {string} source 目标字符串
         * @param {number} length 需要截取的字节长度
         * @param {string} charsetName 字符对应的编码集
         * @return {string} 结果字符串
         */
        sliceByte = string.sliceByte = function (source, length, charsetName) {
            for (var i = 0, func = charset[charsetName || ''].codeLength; i < source.length; i++) {
                length -= func(source.charCodeAt(i));
                if (length < 0) {
                    return source.slice(0, i);
                }
            }

            return source;
        },

        /**
         * 驼峰命名法转换。
         * toCamelCase 方法将 xxx-xxx 字符串转换成 xxxXxx。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        toCamelCase = string.toCamelCase = function (source) {
            if (source.indexOf('-') < 0) {
                return source;
            }
            return source.replace(/\-./g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        },

        /**
         * 将目标字符串中常见全角字符转换成半角字符。
         * 
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        toHalfWidth = string.toHalfWidth = function (source) {
            return source.replace(/[\u3000\uFF01-\uFF5E]/g, function (c) {
                return String.fromCharCode(MAX(c.charCodeAt(0) - 65248, 32));
            });
        },

        /**
         * 过滤字符串两端的空白字符。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        trim = string.trim = function (source) {
            return source && source.replace(/^\s+|\s+$/g, '');
        },

        /**
         * 日期格式化。
         * @public
         *
         * @param {Date} source 日期对象
         * @param {string} pattern 日期格式描述字符串
         * @return {string} 结果字符串
         */
        formatDate = string.formatDate = function (source, pattern) {
            var year = source.getFullYear(),
                month = source.getMonth() + 1,
                date = source.getDate(),
                hours = source.getHours(),
                minutes = source.getMinutes(),
                seconds = source.getSeconds();

            return pattern.replace(/(y+|M+|d+|H+|h+|m+|s+)/g, function (match) {
                var length = match.length;
                switch (match.charAt()) {
                case 'y':
                    return length > 2 ? year : year.toString().slice(2);
                case 'M':
                    match = month;
                    break;
                case 'd':
                    match = date;
                    break;
                case 'H':
                    match = hours;
                    break;
                case 'h':
                    match = hours % 12;
                    break;
                case 'm':
                    match = minutes;
                    break;
                case 's':
                    match = seconds;
                }
                return length > 1 && match < 10 ? '0' + match : match;
            });
        },

        /**
         * 挂载事件。
         * @public
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        attachEvent = util.attachEvent = ieVersion ? function (obj, type, func) {
            obj.attachEvent('on' + type, func);
        } : function (obj, type, func) {
            obj.addEventListener(type, func, false);
        },

        /*
         * 空函数。
         * blank 方法不应该被执行，也不进行任何处理，它用于提供给不需要执行操作的事件方法进行赋值，与 blank 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 cancel。
         * @public
         */
        blank = util.blank = function () {
        },

        /**
         * 调用指定对象超类的指定方法。
         * callSuper 用于不确定超类类型时的访问，例如接口内定义的方法。请注意，接口不允许被子类实现两次，否则将会引发死循环。
         * @public
         *
         * @param {Object} object 需要操作的对象
         * @param {string} name 方法名称
         * @return {Object} 超类方法的返回值
         */
        callSuper = util.callSuper = function (object, name) {
            /**
             * 查找指定的方法对应的超类方法。
             * @private
             *
             * @param {Object} clazz 查找的起始类对象
             * @param {Function} caller 基准方法，即查找 caller 对应的超类方法
             * @return {Function} 基准方法对应的超类方法，没有找到基准方法返回 undefined，基准方法没有超类方法返回 null
             */
            function findPrototype(clazz, caller) {
                for (; clazz; clazz = clazz.constructor.superClass) {
                    if (clazz[name] == caller) {
                        for (; clazz = clazz.constructor.superClass; ) {
                            if (clazz[name] != caller) {
                                return clazz[name];
                            }
                        }
                        return null;
                    }
                }
            }

            //__gzip_original__clazz
            var clazz = object.constructor.prototype,
                caller = callSuper.caller,
                func = findPrototype(clazz, caller);

            if (func === undefined) {
                // 如果Items的方法直接位于prototype链上，是caller，如果是间接被别的方法调用Items.xxx.call，是caller.caller
                func = findPrototype(clazz, caller.caller);
            }

            if (func) {
                return func.apply(object, caller.arguments);
            }
        },

        /*
         * 返回 false。
         * cancel 方法不应该被执行，它每次返回 false，用于提供给需要返回逻辑假操作的事件方法进行赋值，例如需要取消默认事件操作的情况，与 cancel 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 blank。
         * @public
         *
         * @return {boolean} false
         */
        cancel = util.cancel = function () {
            return false;
        },

        /**
         * 卸载事件。
         * @public
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        detachEvent = util.detachEvent = ieVersion ? function (obj, type, func) {
            obj.detachEvent('on' + type, func);
        } : function (obj, type, func) {
            obj.removeEventListener(type, func, false);
        },

        /**
         * 对象属性复制。
         * @public
         *
         * @param {Object} target 目标对象
         * @param {Object} source 源对象
         * @return {Object} 目标对象
         */
        extend = util.extend = function (target, source) {
            for (var key in source) {
                target[key] = source[key];
            }
            return target;
        },

        /**
         * 获取浏览器可视区域的相关信息。
         * getView 方法将返回浏览器可视区域的信息。属性如下：
         * top        {number} 可视区域最小X轴坐标
         * right      {number} 可视区域最大Y轴坐标
         * bottom     {number} 可视区域最大X轴坐标
         * left       {number} 可视区域最小Y轴坐标
         * width      {number} 可视区域的宽度
         * height     {number} 可视区域的高度
         * pageWidth  {number} 页面的宽度
         * pageHeight {number} 页面的高度
         * @public
         *
         * @return {Object} 浏览器可视区域信息
         */
        getView = util.getView = function () {
            //__gzip_original__clientWidth
            //__gzip_original__clientHeight
            var body = DOCUMENT.body,
                html = getParent(body),
                client = isStrict ? html : body,
                scrollTop = html.scrollTop + body.scrollTop,
                scrollLeft = html.scrollLeft + body.scrollLeft,
                clientWidth = client.clientWidth,
                clientHeight = client.clientHeight;

            return {
                top: scrollTop,
                right: scrollLeft + clientWidth,
                bottom: scrollTop + clientHeight,
                left: scrollLeft,
                width: clientWidth,
                height: clientHeight,
                pageWidth: MAX(html.scrollWidth, body.scrollWidth, clientWidth),
                pageHeight: MAX(html.scrollHeight, body.scrollHeight, clientHeight)
            };
        },

        /**
         * 类继承。
         * @public
         *
         * @param {Function} subClass 子类
         * @param {Function} superClass 父类
         * @return {Object} subClass 的 prototype 属性
         */
        inherits = util.inherits = function (subClass, superClass) {
            var oldPrototype = subClass.prototype,
                clazz = new FUNCTION();
                
            clazz.prototype = superClass.prototype;
            extend(subClass.prototype = new clazz(), oldPrototype);
            subClass.prototype.constructor = subClass;
            subClass.superClass = superClass.prototype;

            return subClass.prototype;
        },

        /**
         * 设置缺省的属性值。
         * 如果对象的属性已经被设置，setDefault 方法不进行任何处理，否则将默认值设置到指定的属性上。
         * @public
         *
         * @param {Object} obj 被设置的对象
         * @param {string} key 属性名
         * @param {Object} value 属性的默认值
         */
        setDefault = util.setDefault = function (obj, key, value) {
            if (!obj.hasOwnProperty(key)) {
                obj[key] = value;
            }
        },

        /**
         * 创建一个定时器对象。
         * @public
         *
         * @param {Function} func 定时器需要调用的函数
         * @param {number} delay 定时器延迟调用的毫秒数，如果为负数表示需要连续触发
         * @param {Object} caller 调用者，在 func 被执行时，this 指针指向的对象，可以为空
         * @param {Object} ... 向 func 传递的参数
         * @return {Function} 用于关闭定时器的方法
         */
        timer = util.timer = function (func, delay, caller) {
            function build() {
                return (delay < 0 ? setInterval : setTimeout)(function () {
                    func.apply(caller, args);
                    // 使用delay<0而不是delay>=0，是防止delay没有值的时候，不进入分支
                    if (!(delay < 0)) {
                        func = caller = args = null;
                    }
                }, ABS(delay));
            }

            var args = Array.prototype.slice.call(arguments, 3),
                handle = build(),
                pausing;

            /**
             * 中止定时调用。
             * @public
             *
             * @param {boolean} pause 是否暂时停止定时器，如果参数是 true，再次调用函数并传入参数 true 恢复运行。
             */
            return function (pause) {
                (delay < 0 ? clearInterval : clearTimeout)(handle);
                if (pause) {
                    if (pausing) {
                        handle = build();
                    }
                    pausing = !pausing;
                }
                else {
                    func = caller = args = null;
                }
            };
        },

        /**
         * 将对象转换成数值。
         * toNumber 方法会省略数值的符号，例如字符串 9px 将当成数值的 9，不能识别的数值将默认为 0。
         * @public
         *
         * @param {Object} obj 需要转换的对象
         * @return {number} 对象的数值
         */
        toNumber = util.toNumber = function (obj) {
            return PARSEINT(obj) || 0;
        },

        /**
         * 设置页面加载完毕后自动执行的方法。
         * @public
         *
         * @param {Function} func 需要自动执行的方法
         */
        ready = dom.ready = (function () {
            var hasReady = false,
                list = [],
                check,
                numStyles;

            function ready() {
                if (!hasReady) {
                    hasReady = true;
                    for (var i = 0, o; o = list[i++]; ) {
                        o();
                    }
                }
            }

            if (DOCUMENT.addEventListener && !operaVersion) {
                DOCUMENT.addEventListener('DOMContentLoaded', ready, false);
            }
            else if (ieVersion && WINDOW == top) {
                check = function () {
                    try {
                        DOCUMENT.documentElement.doScroll('left');
                        ready();
                    }
                    catch (e) {
                        timer(check, 0);
                    }
                };
            }
            else if (safariVersion) {
                check = function () {
                    var i = 0,
                        list,
                        o = DOCUMENT.readyState;

                    if (o != 'loaded' && o != 'complete') {
                        timer(check, 0);
                    }
                    else {
                        if (numStyles === undefined) {
                            numStyles = 0;
                            if (list = DOCUMENT.getElementsByTagName('style')) {
                                numStyles += list.length;
                            }
                            if (list = DOCUMENT.getElementsByTagName('link')) {
                                for (; o = list[i++]; ) {
                                    if (getAttribute(o, 'rel') == 'stylesheet') {
                                        numStyles++;
                                    }
                                }
                            }
                        }
                        if (DOCUMENT.styleSheets.length != numStyles) {
                            timer(check, 0);
                        }
                        else {
                            ready();
                        }
                    }
                };
            }

            if (check) {
                check();
            }

            attachEvent(WINDOW, 'load', ready);

            return function (func) {
                if (hasReady) {
                    func();
                }
                else {
                    list.push(func);
                }
            };
        })();
//{else}//
    /**
     * 获取 Element 对象指定位置的 Element 对象。
     * @private
     *
     * @param {HTMLElement} el Element 对象
     * @param {string} direction Element 对象遍历的属性
     * @return {HTMLElement} 指定位置的 Element 对象
     */
    function matchNode(el, direction) {
        for (; el; el = el[direction]) {
            if (el.nodeType == 1) {
                break;
            }
        }
        return el;
    }

    try {
        DOCUMENT.execCommand("BackgroundImageCache", false, true);
    }
    catch (e) {
    }
//{/if}//
//{if 0}//
})();
//{/if}//

//{if 0}//
(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ext = core.ext,
        string = core.string,
        util = core.util,
        ui = core.ui,

        undefined,
        WINDOW = window,
        DOCUMENT = document,
        DATE = Date,
        MATH = Math,
        REGEXP = RegExp,
        ABS = MATH.abs,
        MAX = MATH.max,
        MIN = MATH.min,
        ISNAN = isNaN,

        USER_AGENT = navigator.userAgent,
        isStrict = DOCUMENT.compatMode == 'CSS1Compat',
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,
        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,

        indexOf = array.indexOf,
        remove = array.remove,
        addClass = dom.addClass,
        contain = dom.contain,
        createDom = dom.create,
        getAttribute = dom.getAttribute,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getStyle = dom.getStyle,
        insertHTML = dom.insertHTML,
        ready = dom.ready,
        removeDom = dom.remove,
        removeClass = dom.removeClass,
        setStyle = dom.setStyle,
        toCamelCase = string.toCamelCase,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,
        extend = util.extend,
        getView = util.getView,
        inherits = util.inherits,
        timer = util.timer,
        toNumber = util.toNumber;
//{/if}//
//{if $phase == "define"}//
    var NORMAL  = core.NORMAL  = 0,
        LOADING = core.LOADING = 1,
        REPAINT = core.REPAINT = 2;

//__gzip_unitize__event
    var $bind,
        $connect,
        $clearState,
        $create,
        $fastCreate,
        calcHeightRevise,
        calcLeftRevise,
        calcTopRevise,
        calcWidthRevise,
        createControl,
        disposeControl,
        drag,

        /**
         * 从指定的 Element 对象开始，依次向它的父节点查找绑定的 ECUI 控件。
         * findControl 方法，会返回从当前 Element 对象开始，依次向它的父 Element 查找到的第一个绑定(参见 $bind 方法)的 ECUI 控件。findControl 方法一般在控件创建时使用，用于查找父控件对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {ecui.ui.Control} ECUI 控件对象，如果不能找到，返回 null
         */
        findControl = core.findControl = function (el) {
            for (; el; el = getParent(el)) {
                if (el.getControl) {
                    return el.getControl();
                }
            }

            return null;
        },
        getActived,
        getAttributeName,
        getFocused,
        getHovered,
        getKey,
        getMouseX,
        getMouseY,
        getOptions,
        getScrollNarrow,
        getStatus,
        inheritsControl,
        intercept,
        isContentBox,
        loseFocus,
        mask,
        needInitClass,
        query,
        restore,
        setFocused,
        triggerEvent,
        wrapEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ];

    (function () {
        /**
         * 创建 ECUI 事件对象。
         * @public
         *
         * @param {string} type 事件类型
         * @param {Event} event 浏览器原生事件对象，忽略将自动填充
         */
        ///__gzip_original__UI_EVENT_CLASS
        var UI_EVENT = ui.Event = function (type, event) {
                this.type = type;

                if (event) {
                    this.pageX = event.pageX;
                    this.pageY = event.pageY;
                    this.which = event.which;
                    this.target = event.target;
                    this._oNative = event;
                }
                else {
                    this.pageX = mouseX;
                    this.pageY = mouseY;
                    this.which = keyCode;
                    this.target = DOCUMENT;
                }
            },
            UI_EVENT_CLASS = UI_EVENT.prototype,

            ecuiName = 'ecui',        // Element 中用于自动渲染的 ecui 属性名称
            isGlobalId,               // 是否自动将 ecui 的标识符全局化
            structural,               // DOM结构生成的方式，0表示填充所有内容，1表示不填充控件的class，2表示完全不填充

            flgContentBox,            // 在计算宽度与高度时，是否需要修正内填充与边框样式的影响
            flgFixedOffset,           // 在计算相对位置时，是否需要修正边框样式的影响
            scrollNarrow,             // 浏览器滚动条相对窄的一边的长度

            initRecursion = 0,        // init 操作的递归次数
            lastClientWidth,          // 浏览器之前的宽度

            plugins = {},             // 扩展组件列表
            maskElements = [],        // 遮罩层组

            mouseX,                   // 当前鼠标光标的X轴坐标
            mouseY,                   // 当前鼠标光标的Y轴坐标
            keyCode = 0,              // 当前键盘按下的键值，解决keypress与keyup中得不到特殊按键的keyCode的问题
            lastClick,                // 上一次产生点击事件的信息

            status,                   // 框架当前状态
            allControls = [],         // 全部生成的控件，供释放控件占用的内存使用
            independentControls = [], // 独立的控件，即使用create($create)方法创建的控件
            namedControls,            // 所有被命名的控件的集合
            uniqueIndex = 0,          // 控件的唯一序号
            connectedControls = {},   // 等待关联的控件集合

            activedControl,           // 当前环境下被激活的控件，即鼠标左键按下时对应的控件，直到左键松开后失去激活状态
            hoveredControl,           // 当前环境下鼠标悬停的控件
            focusedControl,           // 当前环境下拥有焦点的控件

            eventListeners = {},      // 控件事件监听描述对象

            envStack = [],            // 高优先级事件调用时，保存上一个事件环境的栈
            currEnv = {               // 当前操作的环境

                // 鼠标点击时控件如果被屏弊需要取消点击事件的默认处理，此时链接将不能提交
                click: function (event) {
                    event =wrapEvent(event);

                    //__transform__control_o
                    var control = findControl(event.target);

                    if (control && control.isDisabled()) {
                        event.preventDefault();
                    }
                },

                // 鼠标左键按下需要改变框架中拥有焦点的控件
                mousedown: function (event) {
                    if (activedControl) {
                        // 如果按下鼠标左键后，使用ALT+TAB使浏览器失去焦点然后松开鼠标左键，
                        // 需要恢复激活控件状态，第一次点击失效
                        bubble(activedControl, 'deactivate');
                        activedControl = null;
                        return;
                    }

                    event = wrapEvent(event);
                    //edit by coocon
                    //这很卑鄙，但是因为disable的日历控件，想点击失效item也不消失，
                    //所以就传入control的_sPrimary, 走个后门
                    var except = 'ui-monthview-item';
                    //__transform__control_o
                    var control = event.getControl(except),
                        // 修复ie下跨iframe导致的事件类型错误的问题
                        flag = ieVersion < 8 && isScrollClick(event),
                        target = control;

                    if (!(lastClick && isDblClick())) {
                        lastClick = {time: new DATE().getTime()};
                    }

                    if (control) {
                        if (flag) {
                            // IE8以下的版本，如果为控件添加激活样式，原生滚动条的操作会失效
                            // 常见的表现是需要点击两次才能进行滚动操作，而且中途不能离开控件区域
                            // 以免触发悬停状态的样式改变。
                            return;
                        }
                        if (control._bDisabled) {
                            //如果是点击的日历控件 就直接触发一个mousedown事件之后返回，也不用blur
                            mousedown(control, event);
                            return; 
                        }

                        for (; target; target = target.getParent()) {
                            if (target.isFocusable()) {
                                if (!(target != control && target.contain(focusedControl))) {
                                    // 允许获得焦点的控件必须是当前激活的控件，或者它没有焦点的时候才允许获得
                                    // 典型的用例是滚动条，滚动条不需要获得焦点，如果滚动条的父控件没有焦点
                                    // 父控件获得焦点，否则焦点不发生变化
                                    setFocused(target);
                                }
                                break;
                            }
                        }

                        if (!flag) {
                            //点击的滚动条
                         //   if(isScrollClick(event)) {
                          //      return;
                          //  }

                            // 如果不是在原生滚动条区域，进行左键按下的处理
                            mousedown(control, event);
                        }
                    }
                    else {
                        if (control = findControl(target = event.target)) {
                            // 如果点击的是失效状态的控件，检查是否需要取消文本选择
                            onselectstart(control, event);
                            // 检查是否INPUT/SELECT/TEXTAREA/BUTTON标签，需要失去焦点
                            if (target.tagName == 'INPUT' || target.tagName == 'SELECT' ||
                                    target.tagName == 'TEXTAREA' || target.tagName == 'BUTTON') {
                                timer(function () {
                                    target.blur();
                                });
                            }
                        }
                        // 点击到了空白区域，取消控件的焦点
                        setFocused();
                        // 正常情况下 activedControl 是 null，如果是down按下但未点击到控件，此值为undefined
                        activedControl = undefined;
                    }
                },

                // 鼠标移入的处理，需要计算是不是位于当前移入的控件之外，如果是需要触发移出事件
                mouseover: function (event) {
                    if (currEnv.type != 'drag' && currEnv.type != 'zoom') {
                        event = wrapEvent(event);

                        //__transform__control_o
                        var control = event.getControl(),
                            parent = getCommonParent(control, hoveredControl);

                        bubble(hoveredControl, 'mouseout', event, parent);
                        bubble(control, 'mouseover', event, parent);

                        hoveredControl = control;
                    }
                },

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__transform__control_o
                    var control = event.getControl();

                    bubble(control, 'mousemove', event);
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__control_o
                    var control = event.getControl(),
                        commonParent;

                    if (activedControl !== null) {
                        // 如果为 null 表示之前没有触发 mousedown 事件就触发了 mouseup，
                        // 这种情况出现在鼠标在浏览器外按下了 down 然后回浏览器区域 up，
                        // 或者是 ie 系列浏览器在触发 dblclick 之前会触发一次单独的 mouseup，
                        // dblclick 在 ie 下的事件触发顺序是 mousedown/mouseup/click/mouseup/dblclick
                        bubble(control, 'mouseup', event);

                        if (activedControl) {
                            commonParent = getCommonParent(control, activedControl);
                            bubble(commonParent, 'click', event);
                            // 点击事件在同时响应鼠标按下与弹起周期的控件上触发(如果之间未产生鼠标移动事件)
                            // 模拟点击事件是为了解决控件的 Element 进行了 remove/append 操作后 click 事件不触发的问题
                            if (lastClick) {
                                if (isDblClick() && lastClick.target == control) {
                                    bubble(commonParent, 'dblclick', event);
                                    lastClick = null;
                                }
                                else {
                                    lastClick.target = control;
                                }
                            }
                            bubble(activedControl, 'deactivate', event);
                        }

                        // 将 activeControl 的设置复位，此时表示没有鼠标左键点击
                        activedControl = null;
                    }
                }
            },

            dragEnv = { // 拖曳操作的环境
                type: 'drag',

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target,
                        // 计算期待移到的位置
                        expectX = target.getX() + mouseX - currEnv.x,
                        expectY = target.getY() + mouseY - currEnv.y,
                        // 计算实际允许移到的位置
                        x = MIN(MAX(expectX, currEnv.left), currEnv.right),
                        y = MIN(MAX(expectY, currEnv.top), currEnv.bottom);

                    if (triggerEvent(target, 'dragmove', event, [x, y])) {
                        target.setPosition(x, y);
                    }

                    currEnv.x = mouseX + target.getX() - expectX;
                    currEnv.y = mouseY + target.getY() - expectY;
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target;
                    triggerEvent(target, 'dragend', event);
                    activedControl = currEnv.actived;
                    restore();

                    currEnv.mouseover(event);
                    currEnv.mouseup(event);
                }
            },

            interceptEnv = { // 强制点击拦截操作的环境
                type: 'intercept',

                mousedown: function (event) {
                    event = wrapEvent(event);


                    //__transform__target_o
                    var target = currEnv.target,
                        env = currEnv,
                        control = event.getControl();

                    lastClick = null;

                    if (!isScrollClick(event)) {
                        if (control && !control.isFocusable()) {
                            // 需要捕获但不激活的控件是最高优先级处理的控件，例如滚动条
                            mousedown(control, event);
                        }
                        else if (triggerEvent(target, 'intercept', event)) {
                            // 默认仅拦截一次，框架自动释放环境
                            restore();
                        }
                        else if (!event.cancelBubble) {
                            if (env == currEnv) {
                                // 不改变当前操作环境表示希望继续进行点击拦截操作
                                // 例如弹出菜单点击到选项上时，不自动关闭并对下一次点击继续拦截
                                if (control) {
                                    mousedown(control, event);
                                }
                            }
                            else {
                                // 手动释放环境会造成向外层环境的事件传递
                                currEnv.mousedown(event);
                            }
                        }
                    }
                }
            },

            zoomEnv = { // 缩放操作的环境
                type: 'zoom',

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__gzip_original__minWidth
                    //__gzip_original__maxWidth
                    //__gzip_original__minHeight
                    //__gzip_original__maxHeight
                    //__transform__target_o
                    var target = currEnv.target,
                        width = currEnv.width = mouseX - currEnv.x + currEnv.width,
                        height = currEnv.height = mouseY - currEnv.y + currEnv.height,
                        minWidth = currEnv.minWidth,
                        maxWidth = currEnv.maxWidth,
                        minHeight = currEnv.minHeight,
                        maxHeight = currEnv.maxHeight;

                    currEnv.x = mouseX;
                    currEnv.y = mouseY;

                    width = minWidth > width ? minWidth : maxWidth < width ? maxWidth : width;
                    height = minHeight > height ? minHeight : maxHeight < height ? maxHeight : height;

                    // 如果宽度或高度是负数，需要重新计算定位
                    target.setPosition(currEnv.left + MIN(width, 0), currEnv.top + MIN(height, 0));
                    if (triggerEvent(target, 'zoom', event)) {
                        target.setSize(ABS(width), ABS(height));
                    }
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target;
                    triggerEvent(target, 'zoomend', event);
                    activedControl = currEnv.actived;
                    restore();

                    repaint();
                    currEnv.mouseover(event);
                    currEnv.mouseup(event);
                }
            },

            /**
             * 初始化指定的 Element 对象对应的 DOM 节点树。
             * init 方法将初始化指定的 Element 对象及它的子节点，如果这些节点拥有初始化属性(参见 getAttributeName 方法)，将按照规则为它们绑定 ECUI 控件，每一个节点只会被绑定一次，重复的绑定无效。页面加载完成时，将会自动针对 document.body 执行这个方法，相当于自动执行以下的语句：ecui.init(document.body)
             * @public
             *
             * @param {Element} el Element 对象
             */
            init = core.init = function (el) {
                if (!initEnvironment() && el) {
                    var i = 0,
                        list = [],
                        options = el.all || el.getElementsByTagName('*'),
                        elements = [el],
                        o, namedMap = {};

                    if (!(initRecursion++)) {
                        // 第一层 init 循环的时候需要关闭resize事件监听，防止反复的重入
                        detachEvent(WINDOW, 'resize', repaint);
                    }

                    for (; o = options[i++]; ) {
                        if (getAttribute(o, ecuiName)) {
                            elements.push(o);
                        }
                    }

                    for (i = 0; el = elements[i]; i++) {
                        options = getOptions(el);
                        // 以下使用 el 替代 control
                        if (o = options.type) {
                            options.main = el;
                            list.push($create(ui[toCamelCase(o.charAt(0).toUpperCase() + o.slice(1))], options));
                            if (options.id) {
                                 namedMap[options.id] = list[list.length - 1];
                            }
                        }
                    }

                    for (i = 0; o = list[i++]; ) {
                        o.cache();
                    }

                    for (i = 0; o = list[i++]; ) {
                        o.init();
                    }

                    if (!(--initRecursion)) {
                        attachEvent(WINDOW, 'resize', repaint);
                    }

                    return namedMap;
                }
            },

            /**
             * 重绘浏览器区域的控件。
             * repaint 方法在页面改变大小时自动触发，一些特殊情况下，例如包含框架的页面，页面变化时不会触发 onresize 事件，需要手工调用 repaint 函数重绘所有的控件。
             * @public
             */
            repaint = core.repaint = function () {
                var i = 0,
                    list = [],
                    widthList = [],
                    o;

                if (ieVersion) {
                    // 防止 ie6/7 下的多次重入
                    o = (isStrict ? DOCUMENT.documentElement : DOCUMENT.body).clientWidth;
                    if (lastClientWidth != o) {
                        lastClientWidth = o;
                    }
                    else {
                        // 如果高度发生变化，相当于滚动条的信息发生变化，因此需要产生scroll事件进行刷新
                        onscroll(new UI_EVENT('scroll'));
                        return;
                    }
                }

                status = REPAINT;
                o = currEnv.type;
                // 隐藏所有遮罩层
                mask(false);
                if (o != 'zoom') {
                    // 改变窗体大小需要清空拖拽状态
                    if (o == 'drag') {
                        currEnv.mouseup();
                    }
                    // 按广度优先查找所有正在显示的控件，保证子控件一定在父控件之后
                    for (o = null; o !== undefined; o = list[i++]) {
                        for (var j = 0, controls = query({parent: o}); o = controls[j++]; ) {
                            if (o.isShow() && o.isResizable()) {
                                list.push(o);
                            }
                        }
                    }

                    for (i = 0; o = list[i++]; ) {
                        // 避免在resize中调用repaint从而引起反复的reflow
                        o.repaint = blank;
                        triggerEvent(o, 'resize');
                        delete o.repaint;

                        if (ieVersion < 8) {
                            // 修复ie6/7下宽度自适应错误的问题
                            o = getStyle(j = o.getMain());
                            if (o.width == 'auto' && o.display == 'block') {
                                j.style.width = '100%';
                            }
                        }
                    }

                    if (ieVersion < 8) {
                        // 由于强制设置了100%，因此改变ie下控件的大小必须从内部向外进行
                        // 为避免多次reflow，增加一次循环
                        for (i = 0; o = list[i]; ) {
                            widthList[i++] = o.getMain().offsetWidth;
                        }
                        for (; o = list[i--]; ) {
                            o.getMain().style.width =
                                widthList[i] - (flgContentBox ? o.$getBasicWidth() * 2 : 0) + 'px';
                        }
                    }

                    for (i = 0; o = list[i++]; ) {
                        o.cache(true, true);
                    }
                    for (i = 0; o = list[i++]; ) {
                        o.$setSize(o.getWidth(), o.getHeight());
                    }
                }

                if (ieVersion < 8) {
                    // 解决 ie6/7 下直接显示遮罩层，读到的浏览器大小实际未更新的问题
                    timer(mask, 0, null, true);
                }
                else {
                    mask(true);
                }
                status = NORMAL;
            };

        /**
         * 使一个 Element 对象与一个 ECUI 控件 在逻辑上绑定。
         * 一个 Element 对象只能绑定一个 ECUI 控件，重复绑定会自动取消之前的绑定。
         * @protected
         *
         * @param {HTMLElement} el Element 对象
         * @param {ecui.ui.Control} control ECUI 控件
         */
        $bind = core.$bind = function (el, control) {
            el._cControl = control;
            el.getControl = getControlByElement;
        };

        /**
         * 清除控件的状态。
         * 控件在销毁、隐藏与失效等情况下，需要使用 $clearState 方法清除已经获得的焦点与激活等状态。
         * @protected
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        $clearState = core.$clearState = function (control) {
            var o = control.getParent();

            loseFocus(control);
            if (control.contain(activedControl)) {
                bubble(activedControl, 'deactivate', null, activedControl = o);
            }
            if (control.contain(hoveredControl)) {
                bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
            }
        };

        /**
         * 为两个 ECUI 控件 建立连接。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方式)方式，控件创建时，需要的关联控件也许还未创建。$connect 方法提供将指定的函数滞后到对应的控件创建后才调用的模式。如果 targetId 对应的控件还未创建，则调用会被搁置，直到需要的控件创建成功后，再自动执行(参见 create 方法)。
         * @protected
         *
         * @param {Object} caller 发起建立连接请求的对象
         * @param {Function} func 用于建立连接的方法，即通过调用 func.call(caller, ecui.get(targetId)) 建立连接
         * @param {string} targetId 被连接的 ECUI 控件 标识符，即在标签的 ecui 属性中定义的 id 值
         */
        $connect = core.$connect = function (caller, func, targetId) {
            if (targetId) {
                var target = namedControls[targetId];
                if (target) {
                    func.call(caller, target);
                }
                else {
                    (connectedControls[targetId] = connectedControls[targetId] || [])
                        .push({func: func, caller: caller});
                }
            }
        };

        /**
         * 创建 ECUI 控件。
         * $create 方法创建控件时不会自动渲染控件。在大批量创建控件时，为了加快渲染速度，应该首先使用 $create 方法创建所有控件完成后，再批量分别调用控件的 cache、init 与 repaint 方法渲染控件。options 对象支持的属性如下：
         * id         {string} 当前控件的 id，提供给 $connect 与 get 方法使用
         * main       {HTMLElement} 与控件绑捆的 Element 对象(参见 getMain 方法)，如果忽略此参数将创建 Element 对象与控件绑捆
         * parent     {ecui.ui.Control} 父控件对象或者父 Element 对象
         * primary    {string} 控件的基本样式(参见 getMainClass 方法)，如果忽略此参数将使用主元素的 className 属性
         * @protected
         *
         * @param {Function} type 控件的构造函数
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        $create = core.$create = function (type, options) {
            type = type.client || type;
            options = options || {};

            //__gzip_original__parent
            var i = 0,
                parent = options.parent,
                el = options.main,
                o = options.primary || '',
                className;

            options.uid = 'ecui-' + (++uniqueIndex);

            if (el) {
                if (structural) {
                    className = el.className;
                }
                else {
                    el.className = className = el.className + ' ' + o + type.agent.TYPES;
                }

                // 如果没有指定基本样式，使用控件的样式作为基本样式
                if (!o) {
                    /\s*([^\s]+)/.test(className);
                    options.primary = REGEXP.$1;
                }

                // 如果指定的元素已经初始化，直接返回
                if (el.getControl) {
                    return el.getControl();
                }
            }
            else {
                // 没有传入主元素，需要自动生成，此种情况比较少见
                el = options.main = createDom(o + type.agent.TYPES);
                if (!o) {
                    options.primary = type.agent.types[0];
                }
            }

            // 生成控件
            type = new type(el, options);

            if (parent) {
//{if 0}//
                if (parent instanceof ui.Control) {
//{else}//                if (parent instanceof UI_CONTROL) {
//{/if}//
                    type.setParent(parent);
                }
                else {
                    type.appendTo(parent);
                }
            }
            else {
                type.$setParent(findControl(getParent(type.getOuter())));
            }

            oncreate(type, options);
            independentControls.push(type);

            // 处理所有的关联操作
            if (el = connectedControls[options.id]) {
                for (connectedControls[options.id] = null; o = el[i++]; ) {
                    o.func.call(o.caller, type);
                }
            }

            return type;
        };

        /**
         * 快速创建 ECUI 控件。
         * $fastCreate 方法仅供控件生成自己的部件使用，生成的控件不在控件列表中注册，不自动刷新也不能通过 query 方法查询(参见 $create 方法)。$fastCreate 方法通过分解 Element 对象的 className 属性得到样式信息，其中第一个样式为类型样式，第二个样式为基本样式。
         * @protected
         *
         * @param {Function} type 控件的构造函数
         * @param {HTMLElement} el 控件对应的 Element 对象
         * @param {ecui.ui.Control} parent 控件的父控件
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        $fastCreate = core.$fastCreate = function (type, el, parent, options) {
            type = type.client || type;
            options = options || {};

            options.uid = 'ecui-' + (++uniqueIndex);
            if (!options.primary) {
                /\s*([^\s]+)/.test(el.className);
                options.primary = REGEXP.$1;
            }

            type = new type(el, options);
            type.$setParent(parent);

            oncreate(type, options);

            return type;
        };

        /**
         * 添加控件的事件监听函数。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {string} name 事件名称
         * @param {Function} caller 监听函数
         */
        core.addEventListener = function (control, name, caller) {
            name = control.getUID() + name;
            (eventListeners[name] = eventListeners[name] || []).push(caller);
        };

        /**
         * 获取高度修正值(即计算 padding, border 样式对 height 样式的影响)。
         * IE 的盒子模型不完全遵守 W3C 标准，因此，需要使用 calcHeightRevise 方法计算 offsetHeight 与实际的 height 样式之间的修正值。
         * @public
         *
         * @param {CssStyle} style CssStyle 对象
         * @return {number} 高度修正值
         */
        calcHeightRevise = core.calcHeightRevise = function (style) {
            return flgContentBox ? toNumber(style.borderTopWidth) + toNumber(style.borderBottomWidth) +
                    toNumber(style.paddingTop) + toNumber(style.paddingBottom)
                : 0;
        };

        /**
         * 获取左定位修正值(即计算 border 样式对 left 样式的影响)。
         * opera 等浏览器，offsetLeft 与 left 样式的取值受到了 border 样式的影响，因此，需要使用 calcLeftRevise 方法计算 offsetLeft 与实际的 left 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 左定位修正值
         */
        calcLeftRevise = core.calcLeftRevise = function (el) {
            //__transform__style_o
            var style = getStyle(el.offsetParent);
            return !firefoxVersion || style.overflow != 'visible' && getStyle(el, 'position') == 'absolute' ?
                toNumber(style.borderLeftWidth) * flgFixedOffset : 0;
        };

        /**
         * 获取上定位修正值(即计算 border 样式对 top 样式的影响)。
         * opera 等浏览器，offsetTop 与 top 样式的取值受到了 border 样式的影响，因此，需要使用 calcTopRevise 方法计算 offsetTop 与实际的 top 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 上定位修正值
         */
        calcTopRevise = core.calcTopRevise = function (el) {
            //__transform__style_o
            var style = getStyle(el.offsetParent);
            return !firefoxVersion || style.overflow != 'visible' && getStyle(el, 'position') == 'absolute' ?
                toNumber(style.borderTopWidth) * flgFixedOffset : 0;
        };

        /**
         * 获取宽度修正值(即计算 padding,border 样式对 width 样式的影响)。
         * IE 的盒子模型不完全遵守 W3C 标准，因此，需要使用 calcWidthRevise 方法计算 offsetWidth 与实际的 width 样式之间的修正值。
         * @public
         *
         * @param {CssStyle} style CssStyle 对象
         * @return {number} 宽度修正值
         */
        calcWidthRevise = core.calcWidthRevise = function (style) {
            return flgContentBox ? toNumber(style.borderLeftWidth) + toNumber(style.borderRightWidth) +
                    toNumber(style.paddingLeft) + toNumber(style.paddingRight)
                : 0;
        };

        /**
         * 创建 ECUI 控件。
         * 标准的创建 ECUI 控件 的工厂方法，适用于少量创建控件，生成的控件不需要任何额外的调用即可正常的显示，对于批量创建控件，请使用 $create 方法。options 对象支持的属性如下：
         * id        {string} 当前控件的 id，提供给 $connect 与 get 方法使用
         * main      {HTMLElement} 与控件绑捆的 Element 对象(参见 getMain 方法)，如果忽略此参数将创建 Element 对象与控件绑捆
         * parent    {ecui.ui.Control} 父控件对象或者父 Element 对象
         * primary   {string} 控件的基本样式(参见 getMainClass 方法)，如果忽略此参数将使用主元素的 className 属性
         * @public
         *
         * @param {string|Function} type 控件的类型名或控件的构造函数
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        createControl = core.create = function (type, options) {
            type = $create('string' == typeof(type) ? ui[type] : type, options);
            type.cache();
            type.init();
            return type;
        };

        /**
         * 释放 ECUI 控件及其子控件占用的内存。
         * @public
         *
         * @param {ecui.ui.Control|HTMLElement} control 需要释放的控件对象或包含控件的 Element 对象
         */
        disposeControl = core.dispose = function (control) {
            var i = allControls.length,
//{if 0}//
                type = control instanceof ui.Control,
//{else}//                type = control instanceof UI_CONTROL,
//{/if}//
                namedMap = {},
                controls = [],
                o;

            if (type) {
                $clearState(control);
            }
            else {
                o = findControl(getParent(control));
                if (focusedControl && contain(control, focusedControl.getOuter())) {
                    setFocused(o);
                }
                if (activedControl && contain(control, activedControl.getOuter())) {
                    bubble(activedControl, 'deactivate', null, activedControl = o);
                }
                if (hoveredControl && contain(control, hoveredControl.getOuter())) {
                    bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
                }
            }

            for (o in namedControls) {
                namedMap[namedControls[o].getUID()] = o;
            }

            for (; i--; ) {
                o = allControls[i];
                if (type ? control.contain(o) : !!o.getOuter() && contain(control, o.getOuter())) {
                    // 需要删除的控件先放入一个集合中等待遍历结束后再删除，否则控件链将产生变化
                    controls.push(o);
                    remove(independentControls, o);
                    if (o = namedMap[o.getUID()]) {
                        delete namedControls[o];
                    }
                    allControls.splice(i, 1);
                }
            }

            for (; o = controls[++i]; ) {
                o.$dispose();
            }
        };
        
        /**
         * 释放 ECUI 控件及其子控件占用的内存。
         * 与公共的dispose方法相比只会清除已命名的子控件，对于未命名的控件（一般是由控件生成的）需要手动以独立模式调用$dispose进行清除工作
         * 由于公共的dispose方法会对所有的控件进行包含关系检查，因此在页面有大量控件的情况下（大表格+大树）会由于大量的contain调用严重影响性能....
         * @private
         *
         * @param {ecui.ui.Control|HTMLElement} control 需要释放的控件对象或包含控件的 Element 对象
         * @param {Boolean} singel 以单独模式清除控件，该模式下不会自动清除任何子控件 如果没有子控件通过该模式能提高运行速度
         */
        core.$dispose = function (control, singelMode) {
            var type = control instanceof ui.Control,
                namedMap = {},
                controls = [],
                all = [],
                o, i;

            if (type) {
                $clearState(control);
            }
            else {
                o = findControl(getParent(control));
                if (focusedControl && contain(control, focusedControl.getOuter())) {
                    setFocused(o);
                }
                if (activedControl && contain(control, activedControl.getOuter())) {
                    bubble(activedControl, 'deactivate', null, activedControl = o);
                }
                if (hoveredControl && contain(control, hoveredControl.getOuter())) {
                    bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
                }
            }

            for (o in namedControls) {
                namedMap[namedControls[o].getUID()] = o;
                all.push(namedControls[o]);
            }

            if (singelMode) {
                all = [control];
            }

            for (i = 0; o = all[i]; i++) {
                if (type ? control.contain(o) : !!o.getOuter() && contain(control, o.getOuter())) {
                    // 需要删除的控件先放入一个集合中等待遍历结束后再删除，否则控件链将产生变化
                    controls.push(o);
                    remove(independentControls, o);
                    remove(allControls, o);
                    if (o = namedMap[o.getUID()]) {
                        delete namedControls[o];
                    }
                }
            }

            for (i = 0; o = controls[i]; i++) {
                o.$dispose();
            }
        };
        /**
         * 将指定的 ECUI 控件 设置为拖拽状态。
         * 只有在鼠标左键按下时，才允许调用 drag 方法设置待拖拽的 {'controls'|menu}，在拖拽操作过程中，将依次触发 ondragstart、ondragmove 与 ondragend 事件。range 参数支持的属性如下：
         * top    {number} 控件允许拖拽到的最小Y轴坐标
         * right  {number} 控件允许拖拽到的最大X轴坐标
         * bottom {number} 控件允许拖拽到的最大Y轴坐标
         * left   {number} 控件允许拖拽到的最小X轴坐标
         * @public
         *
         * @param {ecui.ui.Control} control 需要进行拖拽的 ECUI 控件对象
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} range 控件允许拖拽的范围，省略参数时，控件默认只允许在 offsetParent 定义的区域内拖拽，如果 
         *                       offsetParent 是 body，则只允许在当前浏览器可视范围内拖拽
         */
        drag = core.drag = function (control, event, range) {
            if (event.type == 'mousedown') {
                //__gzip_original__currStyle
                var parent = control.getOuter().offsetParent,
                    style = getStyle(parent);

                // 拖拽范围默认不超出上级元素区域
                extend(dragEnv, parent.tagName == 'BODY' || parent.tagName == 'HTML' ? getView() : {
                    top: 0,
                    right: parent.offsetWidth - toNumber(style.borderLeftWidth) - toNumber(style.borderRightWidth),
                    bottom: parent.offsetHeight - toNumber(style.borderTopWidth) - toNumber(style.borderBottomWidth),
                    left: 0
                });
                extend(dragEnv, range);
                dragEnv.right = MAX(dragEnv.right - control.getWidth(), dragEnv.left);
                dragEnv.bottom = MAX(dragEnv.bottom - control.getHeight(), dragEnv.top);

                initDragAndZoom(control, event, dragEnv, 'drag');
            }
        };

        /**
         * 获取指定名称的 ECUI 控件。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方式)创建的控件，如果在 ecui 属性中指定了 id，就可以通过 get 方法得到控件，也可以在 Element 对象上使用 getControl 方法。
         * @public
         *
         * @param {string} id ECUI 控件的名称，通过 Element 对象的初始化选项 id 定义
         * @return {ecui.ui.Control} 指定名称的 ECUI 控件对象，如果不存在返回 null
         */
        core.get = function (id) {
            initEnvironment();
            return namedControls[id] || null;
        };

        /**
         * 获取当前处于激活状态的 ECUI 控件。
         * 激活状态，指鼠标在控件区域左键从按下到弹起的全过程，无论鼠标移动到哪个位置，被激活的控件对象不会发生改变。处于激活状态的控件及其父控件，都具有激活状态样式。
         * @public
         *
         * @return {ecui.ui.Control} 处于激活状态的 ECUI 控件，如果不存在返回 null
         */
        getActived = core.getActived = function () {
            return activedControl || null;
        };

        /**
         * 获取当前的初始化属性名。
         * getAttributeName 方法返回页面静态初始化(参见 ECUI 使用方式)使用的属性名，通过在 BODY 节点的 data-ecui 属性中指定，默认使用 ecui 作为初始化属性名。
         * @public
         *
         * @return {string} 当前的初始化属性名
         */
        getAttributeName = core.getAttributeName = function () {
            return ecuiName;
        };

        /**
         * 获取当前处于焦点状态的控件。
         * 焦点状态，默认优先处理键盘/滚轮等特殊事件。处于焦点状态的控件及其父控件，都具有焦点状态样式。通常鼠标左键的点击将使控件获得焦点状态，之前拥有焦点状态的控件将失去焦点状态。
         * @public
         *
         * @return {ecui.ui.Control} 处于焦点状态的 ECUI 控件，如果不存在返回 null
         */
        getFocused = core.getFocused = function () {
            return focusedControl || null;
        };

        /**
         * 获取当前处于悬停状态的控件。
         * 悬停状态，指鼠标当前位于控件区域。处于悬停状态的控件及其父控件，都具有悬停状态样式。
         * @public
         *
         * @return {ecui.ui.Control} 处于悬停状态的 ECUI 控件，如果不存在返回 null
         */
        getHovered = core.getHovered = function () {
            return hoveredControl;
        };

        /**
         * 获取当前有效的键值码。
         * getKey 方法返回最近一次 keydown 事件的 keyCode/which 值，用于解决浏览器的 keypress 事件中特殊按键(例如方向键等)没有编码值的问题。
         * @public
         *
         * @return {number} 键值码
         */
        getKey = core.getKey = function () {
            return keyCode;
        };

        /**
         * 获取当前鼠标光标的页面X轴坐标或相对于控件内部区域的X轴坐标。
         * getMouseX 方法计算相对于控件内部区域的X轴坐标时，按照浏览器盒子模型的标准，需要减去 Element 对象的 borderLeftWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的X轴坐标，否则获取鼠标相对于控件内部区域的X轴坐标
         * @return {number} X轴坐标值
         */
        getMouseX = core.getMouseX = function (control) {
            if (control) {
                control = control.getBody();
                return mouseX - getPosition(control).left - toNumber(getStyle(control, 'borderLeftWidth'));
            }
            return mouseX;
        };

        /**
         * 获取当前鼠标光标的页面Y轴坐标或相对于控件内部区域的Y轴坐标。
         * getMouseY 方法计算相对于控件内部区域的Y轴坐标时，按照浏览器盒子模型的标准，需要减去 Element 对象的 borderTopWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的Y轴坐标，否则获取鼠标相对于控件内部区域的Y轴坐标
         * @return {number} Y轴坐标值
         */
        getMouseY = core.getMouseY = function (control) {
            if (control) {
                control = control.getBody();
                return mouseY - getPosition(control).top - toNumber(getStyle(control, 'borderTopWidth'));
            }
            return mouseY;
        };

        /**
         * 获取所有被命名的控件。
         * @public
         *
         * @return {Object} 所有被命名的控件集合
         */
        core.getNamedControls = function () {
            return extend({}, namedControls);
        };

        /**
         * 从 Element 对象中获取初始化选项对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} attributeName 当前的初始化属性名(参见 getAttributeName 方法)
         * @return {Object} 初始化选项对象
         */
        getOptions = core.getOptions = function (el, attributeName) {
            attributeName = attributeName || ecuiName;

            var text = getAttribute(el, attributeName),
                options;

            if (text) {
                el.removeAttribute(attributeName);
                if (core.onparseoptions) {
                    if (options = core.onparseoptions(text)) {
                        return options;
                    }
                }

                for (
                    options = {};
                    /^(\s*;)?\s*(ext\-)?([\w\-]+)\s*(:\s*([^;\s]+(\s+[^;\s]+)*)\s*)?($|;)/.test(text);
                ) {
                    text = REGEXP["$'"];

                    el = REGEXP.$5;
                    attributeName = REGEXP.$2 ? (options.ext = options.ext || {}) : options;
                    attributeName[toCamelCase(REGEXP.$3)] =
                        !el || el == 'true' ? true : el == 'false' ? false : ISNAN(+el) ? el : +el;
                }

                return options;
            }
            else {
                return {};
            }
        };

        /**
         * 获取浏览器滚动条的厚度。
         * getScrollNarrow 方法对于垂直滚动条，返回的是滚动条的宽度，对于水平滚动条，返回的是滚动条的高度。
         * @public
         *
         * @return {number} 浏览器滚动条相对窄的一边的长度
         */
        getScrollNarrow = core.getScrollNarrow = function () {
            return scrollNarrow;
        };

        /**
         * 获取框架当前的状态。
         * getStatus 方法返回框架当前的工作状态，目前支持三类工作状态：NORMAL(正常状态)、LOADING(加载状态)与REPAINT(刷新状态)
         * @public
         *
         * @return {boolean} 框架当前的状态
         */
        getStatus = core.getStatus = function () {
            return status;
        };

        /**
         * 控件继承。
         * @public
         *
         * @param {Function} superClass 父控件类
         * @param {string} type 子控件的类型样式
         * @param {Function} preprocess 控件正式生成前对选项信息与主元素结构信息调整的预处理函数
         * @param {Function} subClass 子控件的标准构造函数，如果忽略将直接调用父控件类的构造函数
         * @return {Function} 新控件的构造函数
         */
        inheritsControl = core.inherits = function (superClass, type, preprocess, subClass) {
            var agent = function (options) {
                    return createControl(agent.client, options);
                },
                client = agent.client = function (el, options) {
                    if (agent.preprocess) {
                        el = agent.preprocess.call(this, el, options) || el;
                    }
                    if (superClass) {
                        superClass.client.call(this, el, options);
                    }
                    if (subClass) {
                        subClass.call(this, el, options);
                    }
                };

            agent.preprocess = preprocess;

            if (superClass) {
                inherits(agent, superClass);

                if (type && type.charAt(0) == '*') {
                    (agent.types = superClass.types.slice())[0] = type.slice(1);
                }
                else {
                    agent.types = (type ? [type] : []).concat(superClass.types);
                }
            }
            else {
                // ecui.ui.Control的特殊初始化设置
                agent.types = [];
            }
            agent.TYPES = ' ' + agent.types.join(' ');

            inherits(client, agent);
            client.agent = agent;

            return agent;
        };

        /**
         * 设置框架拦截之后的一次点击，并将点击事件发送给指定的 ECUI 控件。
         * intercept 方法将下一次的鼠标点击事件转给指定控件的 $intercept 方法处理，相当于拦截了一次框架的鼠标事件点击操作，框架其它的状态不会自动改变，例如拥有焦点的控件不会改变。如果 $intercept 方法不阻止冒泡，将自动调用 restore 方法。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        intercept = core.intercept = function (control) {
            interceptEnv.target = control;
            setEnv(interceptEnv);
        };

        /**
         * 判断容器默认是否基于 content-box 属性进行布局。
         * isContentBox 返回的是容器默认的布局方式，针对具体的元素，需要访问 box-sizing 样式来确认它的布局方式。
         * @public
         *
         * @return {boolean} 容器是否使用 content-box 属性布局
         */
        isContentBox = core.isContentBox = function () {
            return flgContentBox;
        };

        /**
         * 使控件失去焦点。
         * loseFocus 方法不完全是 setFocused 方法的逆向行为。如果控件及它的子控件不处于焦点状态，执行 loseFocus 方法不会发生变化。如果控件或它的子控件处于焦点状态，执行 loseFocus 方法将使控件失去焦点状态，如果控件拥有父控件，此时父控件获得焦点状态。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        loseFocus = core.loseFocus = function (control) {
            if (control.contain(focusedControl)) {
                setFocused(control.getParent());
            }
        };

        /**
         * 使用一个层遮罩整个浏览器可视化区域。
         * 遮罩层的 z-index 样式默认取值为 32767，请不要将 Element 对象的 z-index 样式设置大于 32767。当框架中至少一个遮罩层工作时，body 标签将增加一个样式 ecui-mask，IE6/7 的原生 select 标签可以使用此样式进行隐藏，解决强制置顶的问题。
         * @public
         *
         * @param {number} opacity 透明度，如 0.5，如果省略参数将关闭遮罩层
         * @param {number} zIndex 遮罩层的 zIndex 样式值，如果省略使用 32767
         */
        mask = core.mask = function (opacity, zIndex) {
            //__gzip_original__body
            var i = 0,
                body = DOCUMENT.body,
                o = getView(),
                // 宽度向前扩展2屏，向后扩展2屏，是为了解决翻屏滚动的剧烈闪烁问题
                // 不直接设置为整个页面的大小，是为了解决IE下过大的遮罩层不能半透明的问题
                top = MAX(o.top - o.height * 2, 0),
                left = MAX(o.left - o.width * 2, 0),
                text = ';top:' + top + 'px;left:' + left +
                    'px;width:' + MIN(o.width * 5, o.pageWidth - left) +
                    'px;height:' + MIN(o.height * 5, o.pageHeight - top) + 'px;display:';

            if ('boolean' == typeof opacity) {
                text += opacity ? 'block' : 'none'; 
                for (; o = maskElements[i++]; ) {
                    o.style.cssText += text;
                }
            }
            else if (opacity === undefined) {
                removeDom(maskElements.pop());
                if (!maskElements.length) {
                    removeClass(body, 'ecui-mask');
                }
            }
            else {
                if (!maskElements.length) {
                    addClass(body, 'ecui-mask');
                }
                maskElements.push(o = body.appendChild(createDom(
                    '',
                    'position:absolute;background-color:#000;z-index:' + (zIndex || 32767)
                )));
                setStyle(o, 'opacity', opacity);
                o.style.cssText += text + 'block';
            }
        };

        /**
         * 判断是否需要初始化 class 属性。
         * @public
         *
         * @return {boolean} 是否需要初始化 class 属性
         */
        needInitClass = core.needInitClass = function () {
            return !structural;
        };

        /**
         * 查询满足条件的控件列表。
         * query 方法允许按多种条件组合查询满足需要的控件，如果省略条件表示不进行限制。condition参数对象支持的属性如下：
         * type   {Function} 控件的类型构造函数
         * parent {ecui.ui.Control} 控件的父控件对象
         * custom {Function} 自定义查询函数，传入的参数是控件对象，query 方法会将自己的 this 指针传入查询函数中
         * @public
         *
         * @param {Object} condition 查询条件，如果省略将返回全部的控件
         * @return {Array} 控件列表
         */
        query = core.query = function (condition) {
            condition = condition || {};

            //__gzip_original__parent
            for (
                var i = 0,
                    result = [],
                    parent = condition.parent,
                    custom = condition.custom,
                    o;
                o = independentControls[i++];
            ) {
                if ((!condition.type || (o instanceof condition.type)) &&
                        (parent === undefined || (o.getParent() === parent)) &&
                        (!custom || custom.call(this, o))) {
                    result.push(o);
                }
            }

            return result;
        };

        /**
         * 移除控件的事件监听函数。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {string} name 事件名称
         * @param {Function} caller 监听函数
         */
        core.removeEventListener = function (control, name, caller) {
            if (name = eventListeners[control.getUID() + name]) {
                remove(name, caller);
            }
        };

        /**
         * 恢复当前框架的状态到上一个状态。
         * restore 用于恢复调用特殊操作如 drag、intercept 与 zoom 后改变的框架环境，包括各框架事件处理函数的恢复、控件的焦点设置等。
         * @public
         */
        restore = core.restore = function () {
            if (ieVersion) {
                if (currEnv.type == 'drag' || currEnv.type == 'zoom') {
                    // 取消IE的窗体外事件捕获，如果普通状态也设置，会导致部分区域无法点击
                    DOCUMENT.body.releaseCapture();
                }
            }
            setHandler(currEnv, true);
            setHandler(currEnv = envStack.pop());
        };

        /**
         * 使 ECUI 控件 得到焦点。
         * setFocused 方法将指定的控件设置为焦点状态，允许不指定需要获得焦点的控件，则当前处于焦点状态的控件将失去焦点，需要将处于焦点状态的控件失去焦点还可以调用 loseFocus 方法。如果控件处于失效状态，设置它获得焦点状态将使所有控件失去焦点状态。需要注意的是，如果控件处于焦点状态，当通过 setFocused 方法设置它的子控件获得焦点状态时，虽然处于焦点状态的控件对象发生了变化，但是控件不会触发 onblur 方法，此时控件逻辑上仍然处于焦点状态。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        setFocused = core.setFocused = function (control) {
            if (control && control.isDisabled()) {
                // 处于失效状态的控件不允许获得焦点状态
                control = null;
            }

            var parent = getCommonParent(focusedControl, control);

            bubble(focusedControl, 'blur', null, parent);
            bubble(focusedControl = control, 'focus', null, parent);
        };

        /**
         * 触发事件。
         * triggerEvent 会根据事件返回值或 event 的新状态决定是否触发默认事件处理。
         * @public
         *
         * @param {ecui.ui.Control} control 控件对象
         * @param {string} name 事件名
         * @param {ecui.ui.Event} event 事件对象，可以为 false 表示直接阻止默认事件处理
         * @param {Array} args 事件的其它参数
         * @return {boolean} 是否阻止默认事件处理
         */
        triggerEvent = core.triggerEvent = function (control, name, event, args) {
            if (args && event) {
                args.splice(0, 0, event);
            }
            else if (event) {
                args = [event];
            }
            else {
                event = {returnValue: event, preventDefault: UI_EVENT_CLASS.preventDefault};
                args = args || [];
            }

            if (listeners = eventListeners[control.getUID() + name]) {
                for (var i = 0, listeners, o; o = listeners[i++]; ) {
                    o.apply(control, args);
                }
            }

            if ((control['on' + name] && control['on' + name].apply(control, args) === false) ||
                    event.returnValue === false ||
                    (control['$' + name] && control['$' + name].apply(control, args) === false)) {
                event.preventDefault();
            }

            return event.returnValue !== false;
        };

        /**
         * 包装事件对象。
         * event 方法将浏览器产生的鼠标与键盘事件标准化并添加 ECUI 框架需要的信息到事件对象中。标准化的属性如下：
         * pageX           {number} 鼠标的X轴坐标
         * pageY           {number} 鼠标的Y轴坐标
         * which           {number} 触发事件的按键码
         * target          {HTMLElement} 触发事件的 Element 对象
         * returnValue     {boolean}  是否进行默认处理
         * cancelBubble    {boolean}  是否取消冒泡
         * exit            {Function} 终止全部事件操作
         * getControl      {Function} 获取触发事件的 ECUI 控件 对象
         * getNative       {Function} 获取原生的事件对象
         * preventDefault  {Function} 阻止事件的默认处理
         * stopPropagation {Function} 事件停止冒泡
         * @public
         *
         * @param {Event} event 事件对象
         * @return {ecui.ui.Event} 标准化后的事件对象
         */
        wrapEvent = core.wrapEvent = function (event) {
            if (event instanceof UI_EVENT) {
                // 防止事件对象被多次包装
                return event;
            }

            var body = DOCUMENT.body,
                html = getParent(body);

            if (ieVersion) {
                event = WINDOW.event;
                event.pageX = html.scrollLeft + body.scrollLeft - html.clientLeft + event.clientX - body.clientLeft;
                event.pageY = html.scrollTop + body.scrollTop - html.clientTop + event.clientY - body.clientTop;
                event.target = event.srcElement;
                event.which = event.keyCode;
            }

            if (event.type == 'mousemove') {
                lastClick = null;
            }
            mouseX = event.pageX;
            mouseY = event.pageY;

            return new UI_EVENT(event.type, event);
        };

        /**
         * 将指定的 ECUI 控件 设置为缩放状态。
         * zoom 方法将控件设置为缩放，缩放的值允许负数，用于表示反向的缩放，调用它会触发控件对象的 onzoomstart 事件，在整个 zoom 的周期中，还将触发 onzoom 与 onzoomend 事件，在释放鼠标按键时缩放操作周期结束。range 参数支持的属性如下：
         * minWidth  {number} 控件允许缩放的最小宽度 
         * maxWidth  {number} 控件允许缩放的最大宽度 
         * minHeight {number} 控件允许缩放的最小高度 
         * maxHeight {number} 控件允许缩放的最大高度 
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} range 控件允许的缩放范围参数
         */
        core.zoom = function (control, event, range) {
            if (event.type == 'mousedown') {
                // 保存现场环境
                if (range) {
                    extend(zoomEnv, range);
                }
                zoomEnv.top = control.getY();
                zoomEnv.left = control.getX();
                zoomEnv.width = control.getWidth();
                zoomEnv.height = control.getHeight();

                initDragAndZoom(control, event, zoomEnv, 'zoom');
            }
        };

        /**
         * 键盘事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        currEnv.keydown = currEnv.keypress = currEnv.keyup = function (event) {
            event = wrapEvent(event);

            //__gzip_original__type
            //__gzip_original__which
            var type = event.type,
                which = event.which;

            if (type == 'keydown') {
                keyCode = which;
            }
            bubble(focusedControl, type, event);
            if (type == 'keyup' && keyCode == which) {
                // 一次多个键被按下，只有最后一个被按下的键松开时取消键值码
                keyCode = 0;
            }
        };

        /**
         * 双击事件与选中内容开始事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        if (ieVersion) {
            // IE下双击事件不依次产生 mousedown 与 mouseup 事件，需要模拟
            currEnv.dblclick = function (event) {
                currEnv.mousedown(event);
                currEnv.mouseup(event);
            };

            // IE下取消对文字的选择不能仅通过 mousedown 事件进行
            currEnv.selectstart = function (event) {
                event = wrapEvent(event);
                onselectstart(findControl(event.target), event);
            };
        }

        /**
         * 滚轮事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        currEnv[firefoxVersion ? 'DOMMouseScroll' : 'mousewheel'] = function (event) {
            event = wrapEvent(event);
            event.detail =
                event._oNative.detail === undefined ? event._oNative.wheelDelta / -40 : event._oNative.detail;

            // 拖拽状态下，不允许滚动
            if (currEnv.type == 'drag') {
                event.preventDefault();
            }
            else {
                bubble(hoveredControl, 'mousewheel', event);
                if (!event.cancelBubble) {
                    bubble(focusedControl, 'mousewheel', event);
                }
            }
        };

        /**
         * 获取触发事件的 ECUI 控件 对象
         * @public
         * @param {string=} opt_except 我知道这很卑鄙，但是点击日历disabled的item不想
         * 消隐藏控件，所以传入设置一个标识，用来走个后门，可以返回disabled的control
         * @return {ecui.ui.Control} 控件对象
         */
        UI_EVENT_CLASS.getControl = function (opt_except) {
            var o = findControl(this.target);
          
            if (o && !o.isDisabled()) {
                for (; o; o = o.getParent()) {
                    if (o.isCapturable()) {
                        return o;
                    }
                }
            }
            if (o && o._sPrimary == opt_except) {
                for (; o; o = o.getParent()) {
                    if (o.isCapturable()) {
                        return o;
                    }
                }
            }
            
            return null;
        };

        /**
         * 获取原生的事件对象。
         * @public
         *
         * @return {Object} 原生的事件对象
         */
        UI_EVENT_CLASS.getNative = function () {
            return this._oNative;
        };

        /**
         * 阻止事件的默认处理。
         * @public
         */
        UI_EVENT_CLASS.preventDefault = function () {
            this.returnValue = false;
            if (this._oNative) {
                if (ieVersion) {
                    this._oNative.returnValue = false;
                }
                else {
                    this._oNative.preventDefault();
                }
            }
        };

        /**
         * 事件停止冒泡。
         * @public
         */
        UI_EVENT_CLASS.stopPropagation = function () {
            this.cancelBubble = true;
            if (this._oNative) {
                if (ieVersion) {
                    this._oNative.cancelBubble = false;
                }
                else {
                    this._oNative.stopPropagation();
                }
            }
        };

        /**
         * 终止全部事件操作。
         * @public
         */
        UI_EVENT_CLASS.exit = function () {
            this.preventDefault();
            this.stopPropagation();
        };

        /**
         * 冒泡处理控件事件。
         * @private
         *
         * @param {ecui.ui.Control} start 开始冒泡的控件
         * @param {string} type 事件类型
         * @param {ecui.ui.Event} 事件对象
         * @param {ecui.ui.Control} end 终止冒泡的控件，如果不设置将一直冒泡至顶层
         */
        function bubble(start, type, event, end) {
            event = event || new UI_EVENT(type);
            event.cancelBubble = false;
            for (; start != end; start = start.getParent()) {
                event.returnValue = undefined;
                triggerEvent(start, type, event);
                if (event.cancelBubble) {
                    return;
                }
            }
        }

        /**
         * 获取两个控件的公共父控件。
         * @private
         *
         * @param {ecui.ui.Control} control1 控件1
         * @param {ecui.ui.Control} control2 控件2
         * @return {ecui.ui.Control} 公共的父控件，如果没有，返回 null
         */
        function getCommonParent(control1, control2) {
            if (control1 != control2) {
                var i = 0,
                    list1 = [],
                    list2 = [];

                for (; control1; control1 = control1.getParent()) {
                    list1.push(control1);
                }
                for (; control2; control2 = control2.getParent()) {
                    list2.push(control2);
                }

                list1.reverse();
                list2.reverse();

                // 过滤父控件序列中重复的部分
                for (; list1[i] == list2[i]; i++) {}
                control1 = list1[i - 1];
            }

            return control1 || null;
        }

        /**
         * 获取当前 Element 对象绑定的 ECUI 控件。
         * 与控件关联的 Element 对象(例如通过 init 方法初始化，或者使用 $bind 方法绑定，或者使用 create、$fastCreate 方法生成控件)，会被添加一个 getControl 方法用于获取它绑定的 ECUI 控件，更多获取控件的方法参见 get。
         * @private
         *
         * @return {ecui.ui.Control} 与 Element 对象绑定的 ECUI 控件
         */
        function getControlByElement() {
            return this._cControl;
        }

        /**
         * 初始化拖拽与缩放操作的环境。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} env 操作环境对象
         * @return {string} type 操作的类型，只能是drag或者zoom
         */
        function initDragAndZoom(control, event, env, type) {
            var currStyle = control.getOuter().style,
                // 缓存，防止多次reflow
                x = control.getX(),
                y = control.getY();

            currStyle.left = x + 'px';
            currStyle.top = y + 'px';
            currStyle.position = 'absolute';

            env.target = control;
            env.actived = activedControl;
            setEnv(env);

            // 清除激活的控件，在drag中不需要针对激活控件移入移出的处理
            activedControl = null;

            triggerEvent(control, type + 'start', event);

            if (ieVersion) {
                // 设置IE的窗体外事件捕获，如果普通状态也设置，会导致部分区域无法点击
                DOCUMENT.body.setCapture();
            }
        }

        /**
         * 初始化ECUI工作环境。
         * @private
         *
         * @return {boolean} 是否执行了初始化操作
         */
        function initEnvironment() {
            if (!namedControls) {
                status = LOADING;

                // 自动加载插件
                for (o in ext) {
                    plugins[o] = ext[o];
                }

                // 设置全局事件处理
                for (o in currEnv) {
                    attachEvent(DOCUMENT, o, currEnv[o]);
                }

                namedControls = {};

                var o = getOptions(DOCUMENT.body, 'data-ecui');

                ecuiName = o.name || ecuiName;
                isGlobalId = o.globalId;
                structural = indexOf(['class', 'all'], o.structural) + 1;

                insertHTML(
                    DOCUMENT.body,
                    'BEFOREEND',
                    '<div style="position:absolute;overflow:scroll;top:-90px;left:-90px;width:80px;height:80px;' +
                        'border:1px solid"><div style="position:absolute;top:0px;height:90px"></div></div>'
                );
                // 检测Element宽度与高度的计算方式
                o = DOCUMENT.body.lastChild;
                flgContentBox = o.offsetWidth > 80;
                flgFixedOffset = o.lastChild.offsetTop;
                scrollNarrow = o.offsetWidth - o.clientWidth - 2;
                removeDom(o);

                attachEvent(WINDOW, 'resize', repaint);
                attachEvent(WINDOW, 'unload', function () {
                    for (var i = 0; o = allControls[i++]; ) {
                        o.$dispose();
                    }

                    // 清除闭包中引用的 Element 对象
                    DOCUMENT = maskElements = null;
                });
                attachEvent(WINDOW, 'scroll', onscroll);

                init(DOCUMENT.body);
                addClass(DOCUMENT.body, 'ecui-loaded');

                status = NORMAL;
                return true;
            }
        }

        /**
         * 判断是否为允许的双击时间间隔。
         * @private
         *
         * @return {boolean} 是否为允许的双击时间间隔
         */
        function isDblClick() {
            return lastClick.time > new DATE().getTime() - 200;
        }

        /**
         * 判断点击是否发生在滚动条区域。
         * @private
         *
         * @param {ecui.ui.Event} event 事件对象
         * @return {boolean} 点击是否发生在滚动条区域
         */
        function isScrollClick(event) {
            var target = event.target,
                pos = getPosition(target),
                style = getStyle(target);
            return event.pageX - pos.left - toNumber(style.borderLeftWidth) >= target.clientWidth !=
                event.pageY - pos.top - toNumber(style.borderTopWidth) >= target.clientHeight;
        }

        /**
         * 处理鼠标点击。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         */
        function mousedown(control, event) {
            bubble(activedControl = control, 'activate', event);
            bubble(control, 'mousedown', event);
            onselectstart(control, event);
        }

        /**
         * 控件对象创建后的处理。
         * @private
         *
         * @param {ecui.ui.Control} control 
         * @param {Object} options 控件初始化选项
         */
        function oncreate(control, options) {
            if (control.oncreate) {
                control.oncreate(options);
            }
            allControls.push(control);

            if (options.id) {
                namedControls[options.id] = control;
                if (isGlobalId) {
                    WINDOW[options.id] = control;
                }
            }

            if (options.ext) {
                for (var o in options.ext) {
                    if (plugins[o]) {
                        plugins[o](control, options.ext[o], options);
                        if (o = control['$init' + o.charAt(0).toUpperCase() + toCamelCase(o.slice(1))]) {
                            o.call(control, options);
                        }
                    }
                }
            }
        }

        /**
         * 窗体滚动时的事件处理。
         * @private
         */
        function onscroll(event) {
            event = wrapEvent(event);
            for (var i = 0, o; o = independentControls[i++]; ) {
                triggerEvent(o, 'pagescroll', event);
            }
            mask(true);
        }

        /**
         * 文本选择开始处理。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         */
        function onselectstart(control, event) {
            for (; control; control = control.getParent()) {
                if (!control.isUserSelect()) {
                    event.preventDefault();
                    return;
                }
            }
        }

        /**
         * 设置 ecui 环境。
         * @private
         *
         * @param {Object} env 环境描述对象
         */
        function setEnv(env) {
            var o = {};
            setHandler(currEnv, true);

            extend(o, currEnv);
            extend(o, env);
            o.x = mouseX;
            o.y = mouseY;
            setHandler(o);

            envStack.push(currEnv);
            currEnv = o;
        }

        /**
         * 设置document节点上的鼠标事件。
         * @private
         *
         * @param {Object} env 环境描述对象，保存当前的鼠标光标位置与document上的鼠标事件等
         * @param {boolean} remove 如果为true表示需要移除data上的鼠标事件，否则是添加鼠标事件
         */
        function setHandler(env, remove) {
            for (var i = 0, func = remove ? detachEvent : attachEvent, o; i < 5; ) {
                if (env[o = eventNames[i++]]) {
                    func(DOCUMENT, o, env[o]);
                }
            }
        }

        ready(init);
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Control - ECUI 的核心组成部分，定义所有控件的基本操作。
基础控件是 ECUI 的核心组成部分，对 DOM 树上的节点区域进行封装。基础控件扩展了 Element 节点的标准事件(例如得到与失去焦点、激活等)，提供了方法对控件的基本属性(例如控件大小、位置与显示状态等)进行改变，是一切控件实现的基础。基本控件拥有四种状态：焦点(focus)、悬停(hover)、激活(active)与失效(disabled)。控件在创建过程中分为三个阶段：首先是填充控件所必须的 DOM 结构，然后缓存控件的属性信息，最后进行初始化真正的渲染并显示控件。

基础控件直接HTML初始化的例子，id指定名称，可以通过ecui.get(id)的方式访问控件:
<div ecui="type:control;id:demo">
  <!-- 这里放控件包含的内容 -->
  ...
</div>

属性
_bCapturable        - 控件是否响应浏览器事件状态
_bUserSelect        - 控件是否允许选中内容
_bFocusable         - 控件是否允许获取焦点
_bDisabled          - 控件的状态，为true时控件不处理任何事件
_bCached            - 控件是否已经读入缓存
_bCreated           - 控件是否已经完全生成
_sUID               - 控件的内部ID
_sPrimary           - 控件定义时的基本样式
_sClass             - 控件的当前样式
_sWidth             - 控件的基本宽度值，可能是百分比或者空字符串
_sHeight            - 控件的基本高度值，可能是百分比或者空字符串
_sDisplay           - 控件的布局方式，在hide时保存，在show时恢复
_eMain              - 控件的基本标签对象
_eBody              - 控件用于承载子控件的载体标签，通过$setBody函数设置这个值，绑定当前控件
_cParent            - 父控件对象
_aStatus            - 控件当前的状态集合
$$width             - 控件的宽度缓存
$$height            - 控件的高度缓存
$$bodyWidthRevise   - 内容区域的宽度修正缓存
$$bodyHeightRevise  - 内容区域的高度修正缓存
$$borderTopWidth    - 上部边框线宽度缓存
$$borderLeftWidth   - 左部边框线宽度缓存
$$borderRightWidth  - 右部边框线宽度缓存
$$borderBottomWidth - 下部边框线宽度缓存
$$paddingTop        - 上部内填充宽度缓存
$$paddingLeft       - 左部内填充宽度缓存
$$paddingRight      - 右部内填充宽度缓存
$$paddingBottom     - 下部内填充宽度缓存
$$position          - 控件布局方式缓存
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        REGEXP = RegExp,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        remove = array.remove,
        addClass = dom.addClass,
        getParent = dom.getParent,
        getStyle = dom.getStyle,
        removeClass = dom.removeClass,
        removeDom = dom.remove,
        blank = util.blank,
        timer = util.timer,
        toNumber = util.toNumber,

        REPAINT = core.REPAINT,

        $bind = core.$bind,
        $clearState = core.$clearState,
        calcLeftRevise = core.calcLeftRevise,
        calcTopRevise = core.calcTopRevise,
        disposeControl = core.dispose,
        findControl = core.findControl,
        getActived = core.getActived,
        getFocused = core.getFocused,
        getHovered = core.getHovered,
        getStatus = core.getStatus,
        inheritsControl = core.inherits,
        isContentBox = core.isContentBox,
        loseFocus = core.loseFocus,
        query = core.query,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ];
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_CONTROL
    ///__gzip_original__UI_CONTROL_CLASS
    /**
     * 初始化基础控件。
     * options 对象支持的属性如下：
     * type       控件的类型样式
     * primary    控件的基本样式
     * current    控件的当前样式
     * capturable 是否需要捕获鼠标事件，默认捕获
     * userSelect 是否允许选中内容，默认允许
     * focusable  是否允许获取焦点，默认允许
     * resizable  是否允许改变大小，默认允许
     * disabled   是否失效，默认有效
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CONTROL = ui.Control =
        inheritsControl(
            null,
            null,
            null,
            function (el, options) {
                $bind(el, this);

                this._bDisabled = !!options.disabled;
                this._sUID = options.uid;
                this._sPrimary = options.primary || '';
                this._sClass = options.current || this._sPrimary;
                this._eMain = this._eBody = el;
                this._cParent = null;

                this._bCapturable = options.capturable !== false;
                this._bUserSelect = options.userSelect !== false;
                this._bFocusable = options.focusable !== false;
                if (options.resizable !== false) {
                    this._bResizable = true;
                    el = el.style;
                    this._sWidth = el.width;
                    this._sHeight = el.height;
                }
                else {
                    this._bResizable = false;
                }

                this._aStatus = ['', ' '];
            }
        ),
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_CONTROL_READY_LIST,
        UI_CONTROL_QUERY_SHOW = {custom: function (control) {
            return this != control && this.contain(control) && control.isShow();
        }};
//{else}//
    /**
     * 设置控件的父对象。
     * @private
     *
     * @param {ecui.ui.Control} control 需要设置的控件对象
     * @param {HTMLElement} parent 父控件对象
     * @param {HTMLElement} parentElement 父 Element 对象
     */
    function UI_CONTROL_ALTER_PARENT(control, parent, parentElement) {
        var oldParent = control._cParent,
            el = control.getOuter(),
            flag = control._bCreated && control.isShow();

        // 触发原来父控件的移除子控件事件
        if (parent != oldParent) {
            if (oldParent) {
                if (!triggerEvent(oldParent, 'remove', null, [control])) {
                    return;
                }
            }
            if (parent) {
                if (!triggerEvent(parent, 'append', null, [control])) {
                    parent = parentElement = null;
                }
            }
        }

        if (parentElement != getParent(el)) {
            if (parentElement) {
                parentElement.appendChild(el);
            }
            else {
                removeDom(el);
            }
            // 当 DOM 树位置发生改变时，$setParent必须被执行
            control.$setParent(parent);
        }

        if (flag != (control._bCreated && control.isShow())) {
            triggerEvent(control, flag ? 'hide' : 'show', false);
        }
    }

    /**
     * 控件获得激活事件的默认处理。
     * 控件获得激活时，添加状态样式 -active。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$activate = function () {
        this.alterClass('+active');
    };

    /**
     * 控件失去焦点事件的默认处理。
     * 控件失去焦点时，移除状态样式 -focus。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$blur = function () {
        this.alterClass('-focus');
    };

    /**
     * 缓存控件的属性。
     * $cache 方法缓存部分控件属性的值，在初始化时避免频繁的读写交替操作，加快渲染的速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @protected
     *
     * @param {CssStyle} style 主元素的 Css 样式对象
     * @param {boolean} cacheSize 是否需要缓存控件的大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     */
    UI_CONTROL_CLASS.$cache = function (style, cacheSize) {
        if (ieVersion < 8) {
            o = style.borderWidth;
            if (o.indexOf(' ') > 0) {
                o = o.split(' ');
                this.$$borderTopWidth = toNumber(o[0]);
                this.$$borderRightWidth = toNumber(o[1]);
                this.$$borderBottomWidth = o[2] ? toNumber(o[2]) : this.$$borderTopWidth;
                this.$$borderLeftWidth = o[3] ? toNumber(o[3]) : this.$$borderRightWidth = toNumber(o[1]);
            }
            else {
                this.$$borderTopWidth = this.$$borderLeftWidth = this.$$borderRightWidth = this.$$borderBottomWidth =
                    toNumber(o);
            }
            o = style.padding;
            if (o.indexOf(' ') > 0) {
                o = o.split(' ');
                this.$$paddingTop = toNumber(o[0]);
                this.$$paddingRight = toNumber(o[1]);
                this.$$paddingBottom = o[2] ? toNumber(o[2]) : this.$$paddingTop;
                this.$$paddingLeft = o[3] ? toNumber(o[3]) : this.$$paddingRight;
            }
            else {
                this.$$paddingTop = this.$$paddingLeft = this.$$paddingRight = this.$$paddingBottom = toNumber(o);
            }
        }
        else {
            for (
                var i = 0,
                    list = [
                        'borderTopWidth', 'borderLeftWidth', 'borderRightWidth', 'borderBottomWidth',
                        'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'
                    ],
                    o;
                o = list[i++];
            ) {
                this['$$' + o] = toNumber(style[o]);
            }
        }

        this.$$position = style.position;

        if (cacheSize !== false) {
            o = isContentBox();
            this.$$width = this._eMain.offsetWidth || toNumber(style.width) + (o ? this.$getBasicWidth() : 0);
            this.$$height = this._eMain.offsetHeight || toNumber(style.height) + (o ? this.$getBasicHeight() : 0);
        }
    };

    /**
     * 控件失去激活事件的默认处理。
     * 控件失去激活时，移除状态样式 -active。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$deactivate = function () {
        this.alterClass('-active');
    };

    /**
     * 销毁控件的默认处理。
     * 页面卸载时将销毁所有的控件，释放循环引用，防止在 IE 下发生内存泄漏，$dispose 方法的调用不会受到 ondispose 事件返回值的影响。
     * @protected
     */
    UI_CONTROL_CLASS.$dispose = function () {
        try {
            triggerEvent(this, 'dispose', false);
        }
        catch (e) {
        }
        this._eMain.getControl = undefined;
        this._eMain = this._eBody = null;
        // 取消 $ready 的操作，防止控件在 onload 结束前被 dispose，从而引发 $ready 访问的信息错误的问题
        this.$ready = blank;
    };

    /**
     * 控件获得焦点事件的默认处理。
     * 控件获得焦点时，添加状态样式 -focus。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$focus = function () {
        this.alterClass('+focus');
    };

    /**
     * 获取控件的基本高度。
     * 控件的基本高度指控件基本区域与用户数据存放区域的高度差值，即主元素与内部元素(如果相同则忽略其中之一)的上下边框宽度(border-width)与上下内填充宽度(padding)之和。
     * @public
     *
     * @return {number} 控件的基本高度
     */
    UI_CONTROL_CLASS.$getBasicHeight = function () {
        return this.$$borderTopWidth + this.$$borderBottomWidth + this.$$paddingTop + this.$$paddingBottom;
    };

    /**
     * 获取控件的基本宽度。
     * 控件的基本宽度指控件基本区域与用户数据存放区域的宽度差值，即主元素与内部元素(如果相同则忽略其中之一)的左右边框宽度(border-width)与左右内填充宽度(padding)之和。
     * @public
     *
     * @return {number} 控件的基本宽度
     */
    UI_CONTROL_CLASS.$getBasicWidth = function () {
        return this.$$borderLeftWidth + this.$$borderRightWidth + this.$$paddingLeft + this.$$paddingRight;
    };

    /**
     * 获取指定的部件。
     * $getSection 方法返回控件的一个部件对象，部件对象也是 ECUI 控件，是当前控件的组成成份，不可缺少，请不要轻易的对部件对象进行操作。
     * @protected
     *
     * @param {string} name 部件名称
     * @return {ecui.ui.Control} 部件对象
     */
    UI_CONTROL_CLASS.$getSection = function (name) {
        return this['_u' + name];
    };

    /**
     * 隐藏控件。
     * $hide 方法直接隐藏控件，控件失去激活、悬停与焦点状态，不检查控件之前的状态，因此不会导致浏览器的刷新操作。
     * @protected
     */
    UI_CONTROL_CLASS.$hide = function () {
        if (this._sDisplay === undefined) {
            if (this._bCreated) {
                for (var i = 0, list = query.call(this, UI_CONTROL_QUERY_SHOW), o; o = list[i++]; ) {
                    triggerEvent(o, 'hide', false);
                }
            }

            o = this.getOuter().style;

            // 保存控件原来的 display 值，在显示时恢复
            this._sDisplay = o.display;
            o.display = 'none';
            // 控件隐藏时需要清除状态
            $clearState(this);
        }
    };

    /**
     * 设置控件容器支持坐标定位。
     * $locate 方法执行后，容器内部 Element 对象的 offsetParent 将指向主元素(参见 getMain 方法)。
     * @protected
     */
    UI_CONTROL_CLASS.$locate = function () {
        if (this.$$position == 'static') {
            this._eMain.style.position = this.$$position = 'relative';
        }
    };

    /**
     * 鼠标移出事件的默认处理。
     * 鼠标移出控件区域时，控件失去悬停状态，移除状态样式 -hover。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseout = function () {
        this.alterClass('-hover');
    };

    /**
     * 鼠标移入事件的默认处理。
     * 鼠标移入控件区域时，控件获得悬停状态，添加状态样式 -hover。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseover = function () {
        this.alterClass('+hover');
    };

    /**
     * 控件大小变化事件的默认处理。
     * @protected
     */
    UI_CONTROL_CLASS.$resize = function () {
        //__gzip_original__el
        //__gzip_original__currStyle
        var el = this._eMain,
            currStyle = el.style;

        currStyle.width = this._sWidth;
        if (ieVersion < 8 && getStatus() != REPAINT) {
            // 修复ie6/7下宽度自适应错误的问题
            var style = getStyle(el);
            if (style.width == 'auto' && style.display == 'block') {
                currStyle.width = '100%';
                currStyle.width = el.offsetWidth - (isContentBox() ? this.$getBasicWidth() * 2 : 0) + 'px';
            }
        }
        currStyle.height = this._sHeight;
    };

    /**
     * 设置控件的内层元素。
     * ECUI 控件 逻辑上分为外层元素、主元素与内层元素，外层元素用于控制控件自身布局，主元素是控件生成时捆绑的 Element 对象，而内层元素用于控制控件对象的子控件与文本布局，三者允许是同一个 Element 对象。
     * @protected
     *
     * @param {HTMLElement} el Element 对象
     */
    UI_CONTROL_CLASS.$setBody = function (el) {
        this._eBody = el;
    };

    /**
     * 直接设置父控件。
     * 相对于 setParent 方法，$setParent 方法仅设置控件对象逻辑上的父对象，不进行任何逻辑上的检查，用于某些特殊情况下的设定，如下拉框控件中的选项框子控件需要使用 $setParent 方法设置它的逻辑父控件为下拉框控件。
     * @protected
     *
     * @param {ecui.ui.Control} parent ECUI 控件对象
     */
    UI_CONTROL_CLASS.$setParent = function (parent) {
        this._cParent = parent;
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_CONTROL_CLASS.$setSize = function (width, height) {
        //__gzip_original__style
        var style = this._eMain.style,
            o = this._eMain.tagName,
            fixedSize = isContentBox() && o != 'BUTTON' && o != 'INPUT';

        // 防止负宽度IE下出错
        if (width && (o = width - (fixedSize ? this.$getBasicWidth() : 0)) > 0) {
            style.width = o + 'px';
            this.$$width = width;
        }

        // 防止负高度IE下出错
        if (height && (o = height - (fixedSize ? this.$getBasicHeight() : 0)) > 0) {
            style.height = o + 'px';
            this.$$height = height;
        }
    };

    /**
     * 显示控件。
     * $show 方法直接显示控件，不检查控件之前的状态，因此不会导致浏览器的刷新操作。
     * @protected
     */
    UI_CONTROL_CLASS.$show = function () {
        this.getOuter().style.display = this._sDisplay || '';
        this._sDisplay = undefined;

        if (this._bCreated) {
            for (var i = 0, list = query.call(this, UI_CONTROL_QUERY_SHOW), o; o = list[i++]; ) {
                triggerEvent(o, 'show', false);
            }
        }
    };

    /**
     * 为控件添加/移除一个扩展样式。
     * 扩展样式分别附加在类型样式与当前样式之后(参见 getTypes 与 getClass 方法)，使用-号进行分隔。如果类型样式为 ui-control，当前样式为 demo，扩展样式 hover 后，控件主元素将存在四个样式，分别为 ui-control、demo、ui-control-hover 与 demo-hover。
     * @public
     *
     * @param {string} className 扩展样式名，以+号开头表示添加扩展样式，以-号开头表示移除扩展样式
     */
    UI_CONTROL_CLASS.alterClass = function (className) {
        var flag = className.charAt(0) == '+';

        if (flag) {
            className = '-' + className.slice(1) + ' ';
        }
        else {
            className += ' ';
        }

        (flag ? addClass : removeClass)(this._eMain, this.getTypes().concat([this._sClass, '']).join(className));

        if (flag) {
            this._aStatus.push(className);
        }
        else {
            remove(this._aStatus, className);
        }
    };

    /**
     * 将控件添加到页面元素中。
     * appendTo 方法设置父元素，并使用 findControl 查找父控件对象。如果父控件发生变化，原有的父控件若存在，将触发移除子控件事件(onremove)，并解除控件与原有父控件的关联，新的父控件若存在，将触发添加子控件事件(onappend)，如果此事件返回 false，添加失败，相当于忽略 parentElement 参数。
     * @public
     *
     * @param {HTMLElement} parentElement 父 Element 对象，忽略参数控件将移出 DOM 树
     */
    UI_CONTROL_CLASS.appendTo = function (parentElement) {
        UI_CONTROL_ALTER_PARENT(this, parentElement && findControl(parentElement), parentElement);
    };

    /**
     * 控件失去焦点状态。
     * blur 方法将使控件失去焦点状态，参见 loseFocus 方法。
     * @public
     */
    UI_CONTROL_CLASS.blur = function () {
        loseFocus(this);
    };

    /**
     * 缓存控件的属性。
     * cache 方法验证控件是否已经缓存，如果未缓存将调用 $cache 方法缓存控件属性的值。在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @public
     *
     * @param {boolean} cacheSize 是否需要缓存控件的大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     * @param {boolean} force 是否需要强制刷新缓存，相当于之前执行了 clearCache 方法，默认不强制刷新
     */
    UI_CONTROL_CLASS.cache = function (cacheSize, force) {
        if (force || !this._bCached) {
            this._bCached = true;
            this.$cache(getStyle(this._eMain), cacheSize);
        }
    };

    /**
     * 清除控件的缓存。
     * 在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @public
     */
    UI_CONTROL_CLASS.clearCache = function () {
        this._bCached = false;
    };

    /**
     * 判断是否包含指定的控件。
     * contain 方法判断指定的控件是否逻辑上属于当前控件的内部区域，即当前控件是指定的控件的某一级父控件。
     * @public
     *
     * @param {ecui.ui.Control} control ECUI 控件
     * @return {boolean} 是否包含指定的控件
     */
    UI_CONTROL_CLASS.contain = function (control) {
        for (; control; control = control._cParent) {
            if (control == this) {
                return true;
            }
        }
        return false;
    };

    /**
     * 控件获得失效状态。
     * 控件获得失效状态时，添加状态样式 -disabled(参见 alterClass 方法)。disable 方法导致控件失去激活、悬停、焦点状态，所有子控件的 isDisabled 方法返回 true，但不会设置子控件的失效状态样式。
     * @public
     *
     * @return {boolean} 控件失效状态是否改变
     */
    UI_CONTROL_CLASS.disable = function () {
        if (!this._bDisabled) {
            this.alterClass('+disabled');
            this._bDisabled = true;
            $clearState(this);
            return true;
        }
        return false;
    };

    /**
     * 销毁控件。
     * dispose 方法销毁控件及其所有的子控件，相当于调用 ecui.dispose(this) 方法。
     * @public
     */
    UI_CONTROL_CLASS.dispose = function () {
        disposeControl(this);
    };

    /**
     * 控件解除失效状态。
     * 控件解除失效状态时，移除状态样式 -disabled(参见 alterClass 方法)。enable 方法仅解除控件自身的失效状态，如果其父控件失效，isDisabled 方法返回 true。
     * @public
     *
     * @return {boolean} 控件失效状态是否改变
     */
    UI_CONTROL_CLASS.enable = function () {
        if (this._bDisabled) {
            this.alterClass('-disabled');
            this._bDisabled = false;
            return true;
        }
        return false;
    };

    /**
     * 控件获得焦点状态。
     * 如果控件没有处于焦点状态，focus 方法将设置控件获取焦点状态，参见 isFocused 与 setFocused 方法。
     * @public
     */
    UI_CONTROL_CLASS.focus = function () {
        if (!this.isFocused()) {
            setFocused(this);
        }
    };

    /**
     * 获取控件的内层元素。
     * getBody 方法返回用于控制子控件与文本布局的内层元素。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getBody = function () {
        return this._eBody;
    };

    /**
     * 获取控件内层可使用区域的高度。
     * getBodyHeight 方法返回能被子控件与文本填充的控件区域高度，相当于盒子模型的 content 区域的高度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyHeight = function () {
        return this.getHeight() - this.getMinimumHeight();
    };

    /**
     * 获取控件内层可使用区域的宽度。
     * getBodyWidth 方法返回能被子控件与文本填充的控件区域宽度，相当于盒子模型的 content 区域的宽度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyWidth = function () {
        return this.getWidth() - this.getMinimumWidth();
    };

    /**
     * 获取控件的当前样式。
     * getClass 方法返回控件当前使用的样式，扩展样式分别附加在类型样式与当前样式之后，从而实现控件的状态样式改变，详细的描述请参见 alterClass 方法。当前样式与 getPrimary 方法返回的基本样式存在区别，在控件生成初期，当前样式等于基本样式，基本样式在初始化后无法改变，setClass 方法改变当前样式。
     * @public
     *
     * @return {string} 控件的当前样式
     */
    UI_CONTROL_CLASS.getClass = function () {
        return this._sClass;
    };

    /**
     * 获取控件的内容。
     * @public
     *
     * @return {string} HTML 片断
     */
    UI_CONTROL_CLASS.getContent = function () {
        return this._eBody.innerHTML;
    };

    /**
     * 获取控件区域的高度。
     * @public
     *
     * @return {number} 控件的高度
     */
    UI_CONTROL_CLASS.getHeight = function () {
        this.cache();
        return this.$$height;
    };

    /**
     * 获取控件的主元素。
     * getMain 方法返回控件生成时定义的 Element 对象(参见 create 方法)。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getMain = function () {
        return this._eMain;
    };

    /**
     * 获取控件的最小高度。
     * setSize 方法不允许设置小于 getMinimumHeight 方法返回的高度值。
     * @public
     *
     * @return {number} 控件的最小高度
     */
    UI_CONTROL_CLASS.getMinimumHeight = function () {
        this.cache();
        return this.$getBasicHeight() + (this.$$bodyHeightRevise || 0);
    };

    /**
     * 获取控件的最小宽度。
     * @public
     *
     * @return {number} 控件的最小宽度
     */
    UI_CONTROL_CLASS.getMinimumWidth = function () {
        this.cache();
        return this.$getBasicWidth() + (this.$$bodyWidthRevise || 0);
    };

    /**
     * 获取控件的外层元素。
     * getOuter 方法返回用于控制控件自身布局的外层元素。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getOuter = function () {
        return this._eMain;
    };

    /**
     * 获取父控件。
     * 控件接收的事件将向父控件冒泡处理，getParent 返回的结果是 ECUI 的逻辑父控件，父控件与子控件不一定存在 DOM 树层面的父子级关系。
     * @public
     *
     * @return {ecui.ui.Control} 父控件对象
     */
    UI_CONTROL_CLASS.getParent = function () {
        return this._cParent || null;
    };

    /**
     * 获取控件的基本样式。
     * getPrimary 方法返回控件生成时指定的 primary 参数(参见 create 方法)。基本样式与通过 getClass 方法返回的当前样式存在区别，在控件生成初期，当前样式等于基本样式，基本样式在初始化后无法改变，setClass 方法改变当前样式。
     * @public
     *
     * @return {string} 控件的基本样式
     */
    UI_CONTROL_CLASS.getPrimary = function () {
        return this._sPrimary;
    };

    /**
     * 获取控件的类型。
     * @public
     *
     * @return {string} 控件的类型
     */
    UI_CONTROL_CLASS.getType = function () {
        return this.constructor.agent.types[0];
    };

    /**
     * 获取控件的类型样式组。
     * getTypes 方法返回控件的类型样式组，类型样式在控件继承时指定。
     * @public
     *
     * @return {Array} 控件的类型样式组
     */
    UI_CONTROL_CLASS.getTypes = function () {
        return this.constructor.agent.types.slice();
    };

    /**
     * 获取控件的内部唯一标识符。
     * getUID 方法返回的 ID 不是初始化选项中指定的 id，而是框架为每个控件生成的内部唯一标识符。
     * @public
     *
     * @return {string} 控件 ID
     */
    UI_CONTROL_CLASS.getUID = function () {
        return this._sUID;
    };

    /**
     * 获取控件区域的宽度。
     * @public
     *
     * @return {number} 控件的宽度
     */
    UI_CONTROL_CLASS.getWidth = function () {
        this.cache();
        return this.$$width;
    };

    /**
     * 获取控件的相对X轴坐标。
     * getX 方法返回控件的外层元素的 offsetLeft 属性值。如果需要得到控件相对于整个文档的X轴坐标，请调用 getOuter 方法获得外层元素，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} X轴坐标
     */
    UI_CONTROL_CLASS.getX = function () {
        var el = this.getOuter();

        return this.isShow() ? el.offsetLeft - calcLeftRevise(el) : 0;
    };

    /**
     * 获取控件的相对Y轴坐标。
     * getY 方法返回控件的外层元素的 offsetTop 属性值。如果需要得到控件相对于整个文档的Y轴坐标，请调用 getOuter 方法获得外层元素，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} Y轴坐标
     */
    UI_CONTROL_CLASS.getY = function () {
        var el = this.getOuter();

        return this.isShow() ? el.offsetTop - calcTopRevise(el) : 0;
    };

    /**
     * 隐藏控件。
     * 如果控件处于显示状态，调用 hide 方法会触发 onhide 事件，控件转为隐藏状态，并且控件会自动失去激活、悬停与焦点状态。如果控件已经处于隐藏状态，则不执行任何操作。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_CONTROL_CLASS.hide = function () {
        if (this.isShow()) {
            triggerEvent(this, 'hide');
        }
    };

    /**
     * 控件初始化。
     * init 方法在控件缓存读取后调用，有关控件生成的完整过程描述请参见 基础控件。
     * @public
     */
    UI_CONTROL_CLASS.init = function () {
        if (!this._bCreated) {
            if (this._bDisabled) {
                this.alterClass('+disabled');
            }
            this.$setSize(this.getWidth(), this.getHeight());

            if (UI_CONTROL_READY_LIST === null) {
                // 页面已经加载完毕，直接运行 $ready 方法
                this.$ready();
            }
            else {
                if (!UI_CONTROL_READY_LIST) {
                    // 页面未加载完成，首先将 $ready 方法的调用存放在调用序列中
                    // 需要这么做的原因是 ie 的 input 回填机制，一定要在 onload 之后才触发
                    // ECUI 应该避免直接使用 ecui.get(xxx) 导致初始化，所有的代码应该在 onload 之后运行
                    UI_CONTROL_READY_LIST = [];
                    timer(function () {
                        for (var i = 0, o; o = UI_CONTROL_READY_LIST[i++]; ) {
                            o.$ready();
                        }
                        UI_CONTROL_READY_LIST = null;
                    });
                }
                if (this.$ready != blank) {
                    UI_CONTROL_READY_LIST.push(this);
                }
            }
            this._bCreated = true;
        }
    };

    /**
     * 判断控件是否处于激活状态。
     * @public
     *
     * @return {boolean} 控件是否处于激活状态
     */
    UI_CONTROL_CLASS.isActived = function () {
        return this.contain(getActived());
    };

    /**
     * 判断是否响应浏览器事件。
     * 控件不响应浏览器事件时，相应的事件由父控件进行处理。
     * @public
     *
     * @return {boolean} 控件是否响应浏览器事件
     */
    UI_CONTROL_CLASS.isCapturable = function () {
        return this._bCapturable;
    };

    /**
     * 判断控件是否处于失效状态。
     * 控件是否处于失效状态，影响控件是否处理事件，它受到父控件的失效状态的影响。可以通过 enable 与 disable 方法改变控件的失效状态，如果控件失效，它所有的子控件也会失效
     * @public
     *
     * @return {boolean} 控件是否失效
     */
    UI_CONTROL_CLASS.isDisabled = function () {
        return this._bDisabled || (!!this._cParent && this._cParent.isDisabled());
    };

    /**
     * 判断是否允许获得焦点。
     * 控件不允许获得焦点时，被点击时不会改变当前处于焦点状态的控件，但此时控件拥有框架事件响应的最高优先级。
     * @public
     *
     * @return {boolean} 控件是否允许获取焦点
     */
    UI_CONTROL_CLASS.isFocusable = function () {
        return this._bFocusable;
    };

    /**
     * 判断控件是否处于焦点状态。
     * @public
     *
     * @return {boolean} 控件是否处于焦点状态
     */
    UI_CONTROL_CLASS.isFocused = function () {
        return this.contain(getFocused());
    };

    /**
     * 判断控件是否处于悬停状态。
     * @public
     *
     * @return {boolean} 控件是否处于悬停状态
     */
    UI_CONTROL_CLASS.isHovered = function () {
        return this.contain(getHovered());
    };

    /**
     * 判断控件是否允许改变大小。
     * @public
     *
     * @return {boolean} 控件是否允许改变大小
     */
    UI_CONTROL_CLASS.isResizable = function () {
        return this._bResizable;
    };

    /**
     * 判断是否处于显示状态。
     * @public
     *
     * @return {boolean} 控件是否显示
     */
    UI_CONTROL_CLASS.isShow = function () {
        return !!this.getOuter().offsetWidth;
    };

    /**
     * 判断是否允许选中内容。
     * @public
     *
     * @return {boolean} 控件是否允许选中内容
     */
    UI_CONTROL_CLASS.isUserSelect = function () {
        return this._bUserSelect;
    };

    /**
     * 控件完全刷新。
     * 对于存在数据源的控件，render 方法根据数据源重新填充控件内容，重新计算控件的大小进行完全的重绘。
     * @public
     */
    UI_CONTROL_CLASS.render = function () {
        this.resize();
    };

    /**
     * 控件刷新。
     * repaint 方法不改变控件的内容与大小进行重绘。控件如果生成后不位于文档 DOM 树中，样式无法被正常读取，控件显示后如果不是预期的效果，需要调用 repaint 方法刷新。
     * @public
     */
    UI_CONTROL_CLASS.repaint = function () {
        this.cache(true, true);
        this.$setSize(this.getWidth(), this.getHeight());
    };

    /**
     * 控件重置大小并刷新。
     * resize 方法重新计算并设置控件的大小，浏览器可视化区域发生变化时，可能需要改变控件大小，框架会自动调用控件的 resize 方法。
     */
    UI_CONTROL_CLASS.resize = function () {
        if (this._bResizable) {
            this.$resize();
            this.repaint();
        }
    };

    /**
     * 设置控件可使用区域的大小。
     * @public
     *
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    UI_CONTROL_CLASS.setBodySize = function (width, height) {
        this.setSize(width && width + this.getMinimumWidth(), height && height + this.getMinimumHeight());
    };

    /**
     * 设置控件的当前样式。
     * setClass 方法改变控件的当前样式，扩展样式分别附加在类型样式与当前样式之后，从而实现控件的状态样式改变，详细的描述请参见 alterClass 方法。控件的当前样式通过 getClass 方法获取。
     * @public
     *
     * @param {string} currClass 控件的当前样式名称
     */
    UI_CONTROL_CLASS.setClass = function (currClass) {
        var i = 0,
            oldClass = this._sClass,
            classes = this.getTypes(),
            list = [];

        currClass = currClass || this._sPrimary;

        // 如果基本样式没有改变不需要执行
        if (currClass != oldClass) {
            classes.splice(0, 0, this._sClass = currClass);
            for (; classes[i]; ) {
                list[i] = this._aStatus.join(classes[i++]);
            }
            classes[0] = oldClass;
            this._eMain.className =
                list.join('') +
                    this._eMain.className.split(/\s+/).join('  ').replace(
                        new REGEXP('(^| )(' + classes.join('|') + ')(-[^ ]+)?( |$)', 'g'),
                        ''
                    );
        }
    };

    /**
     * 设置控件的内容。
     * @public
     *
     * @param {string} html HTML 片断
     */
    UI_CONTROL_CLASS.setContent = function (html) {
        this._eBody.innerHTML = html;
    };

    /**
     * 设置当前控件的父控件。
     * setParent 方法设置父控件，将当前控件挂接到父控件对象的内层元素中。如果父控件发生变化，原有的父控件若存在，将触发移除子控件事件(onremove)，并解除控件与原有父控件的关联，新的父控件若存在，将触发添加子控件事件(onappend)，如果此事件返回 false，添加失败，相当于忽略 parent 参数。
     * @public
     *
     * @param {ecui.ui.Control} parent 父控件对象，忽略参数控件将移出 DOM 树
     */
    UI_CONTROL_CLASS.setParent = function (parent) {
        UI_CONTROL_ALTER_PARENT(this, parent, parent && parent._eBody);
    };

    /**
     * 设置控件的坐标。
     * setPosition 方法设置的是控件的 left 与 top 样式，受到 position 样式的影响。
     * @public
     *
     * @param {number} x 控件的X轴坐标
     * @param {number} y 控件的Y轴坐标
     */
    UI_CONTROL_CLASS.setPosition = function (x, y) {
        var style = this.getOuter().style;
        style.left = x + 'px';
        style.top = y + 'px';
    };

    /**
     * 设置控件的大小。
     * 需要设置的控件大小如果低于控件允许的最小值，将忽略对应的宽度或高度的设置。
     * @public
     *
     * @param {number} width 控件的宽度
     * @param {number} height 控件的高度
     */
    UI_CONTROL_CLASS.setSize = function (width, height) {
        if (this._bResizable) {
            this.cache();

            //__gzip_original__style
            var style = this._eMain.style;

            // 控件新的大小不允许小于最小值
            if (width < this.getMinimumWidth()) {
                width = 0;
            }
            if (height < this.getMinimumHeight()) {
                height = 0;
            }

            this.$setSize(width, height);

            if (width) {
                this._sWidth = style.width;
            }
            if (height) {
                this._sHeight = style.height;
            }
        }
    };

    /**
     * 显示控件。
     * 如果控件处于隐藏状态，调用 show 方法会触发 onshow 事件，控件转为显示状态。如果控件已经处于显示状态，则不执行任何操作。
     * @public
     */
    UI_CONTROL_CLASS.show = function () {
        if (!this.isShow()) {
            triggerEvent(this, 'show');
            return true;
        }
        return false;
    };

    (function () {
        // 初始化事件处理函数，以事件名命名，这些函数行为均是判断控件是否可操作/是否需要调用事件/是否需要执行缺省的事件处理，对应的缺省事件处理函数名以$开头后接事件名，处理函数以及缺省事件处理函数参数均为事件对象，仅执行一次。
        for (var i = 0, o; o = eventNames[i++]; ) {
            UI_CONTROL_CLASS['$' + o] = UI_CONTROL_CLASS['$' + o] || blank;
        }

        // 初始化空操作的一些缺省处理
        UI_CONTROL_CLASS.$intercept = UI_CONTROL_CLASS.$append = UI_CONTROL_CLASS.$remove =
            UI_CONTROL_CLASS.$zoomstart = UI_CONTROL_CLASS.$zoom = UI_CONTROL_CLASS.$zoomend =
            UI_CONTROL_CLASS.$dragstart = UI_CONTROL_CLASS.$dragmove = UI_CONTROL_CLASS.$dragend =
            UI_CONTROL_CLASS.$ready = UI_CONTROL_CLASS.$pagescroll = blank;
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
InputControl - 定义输入数据的基本操作。
输入控件，继承自基础控件，实现了对原生 InputElement 的功能扩展，包括光标的控制、输入事件的实时响应(每次改变均触发事件)，以及 IE 下不能动态改变输入框的表单项名称的模拟处理。
** 在IE6下原生Input会有上下3px的间距，只能通过设置父元素的overflow:hidden解决，本控件未对这种情况进行特殊设置，请注意 **

输入控件直接HTML初始化的例子:
<input ecui="type:input-control" type="password" name="passwd" value="1111">
或:
<div ecui="type:input-control;name:passwd;value:1111;inputType:password"></div>
或:
<div ecui="type:input-control">
  <input type="password" name="passwd" value="1111">
</div>

属性
_bHidden - 输入框是否隐藏
_eInput  - INPUT对象
_aValidateRules - 验证规则
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        REGEXP = RegExp,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        createDom = dom.create,
        insertBefore = dom.insertBefore,
        setInput = dom.setInput,
        setStyle = dom.setStyle,
        encodeHTML = string.encodeHTML,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,
        timer = util.timer,

        $bind = core.$bind,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        wrapEvent = core.wrapEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_INPUT_CONTROL
    ///__gzip_original__UI_INPUT_CONTROL_CLASS
    /**
     * 初始化输入控件。
     * options 对象支持的属性如下：
     * name         输入框的名称
     * value        输入框的默认值
     * checked      输入框是否默认选中(radio/checkbox有效)
     * inputType    输入框的类型，默认为 text
     * hidden       输入框是否隐藏，隐藏状态下将不会绑定键盘事件
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_INPUT_CONTROL = ui.InputControl =
        inheritsControl(
            UI_CONTROL,
            null,
            function (el, options) {
                if (el.tagName == 'INPUT' || el.tagName == 'TEXTAREA') {
                    // 根据表单项初始化
                    var input = el;

                    insertBefore(el = createDom(input.className, input.style.cssText, 'span'), input).appendChild(input);
                    input.className = '';
                }
                else {
                    input = el.getElementsByTagName('INPUT')[0] || el.getElementsByTagName('TEXTAREA')[0];

                    if (!input) {
                        input = setInput(null, options.name, options.inputType);
                        input.defaultValue = input.value =
                            options.value === undefined ? '' : options.value.toString();
                        el.appendChild(input);
                    }
                }

                setStyle(el, 'display', 'inline-block');

                input.style.border = '0px';
                if (options.hidden) {
                    input.style.display = 'none';
                }
                if (options.checked) {
                    input.defaultChecked = input.checked = true;
                }

                return el;
            },
            function (el, options) {
                this._bHidden = options.hidden;
                this._eInput = el.getElementsByTagName('INPUT')[0] || el.getElementsByTagName('TEXTAREA')[0];

                if (util.validator) {
                    this._aValidateRules = util.validator.collectRules(options);
                }

                UI_INPUT_CONTROL_BIND_EVENT(this);
            }
        ),
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_INPUT_CONTROL_INPUT = {};
//{else}//

    /**
     * 表单提交事件处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    function UI_INPUT_CONTROL_FORM_SUBMIT(event) {
        event = wrapEvent(event);

        //__transform__elements_list
        //__transform__el_o
        for (var i = 0, elements = event.target.elements, el; el = elements[i++]; ) {
            if (el.getControl) {
                triggerEvent(el.getControl(), 'submit', event);
            }
        }
    }

    /**
     * 为控件的 INPUT 节点绑定事件。
     * @private
     *
     * @param {ecui.ui.Edit} control 输入控件对象
     */
    function UI_INPUT_CONTROL_BIND_EVENT(control) {
        $bind(control._eInput, control);
        if (!control._bHidden) {
            // 对于IE或者textarea的变化，需要重新绑定相关的控件事件
            for (var name in UI_INPUT_CONTROL_INPUT) {
                attachEvent(control._eInput, name, UI_INPUT_CONTROL_INPUT[name]);
            }
        }
    }

    /**
     * 输入框失去/获得焦点事件处理函数。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_INPUT.blur = UI_INPUT_CONTROL_INPUT.focus = function (event) {
        //__gzip_original__type
        var type = event.type;
        if(wrapEvent(event).target.getControl) {
            event = wrapEvent(event).target.getControl();

            // 设置默认失去焦点事件，阻止在blur/focus事件中再次回调
            event['$' + type] = UI_CONTROL_CLASS['$' + type];
            event[type]();

            delete event['$' + type];
        }
    };

    /**
     * 拖拽内容到输入框时处理函数。
     * 为了增加可控性，阻止该行为。[todo] firefox下无法阻止，后续升级
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_INPUT.dragover = UI_INPUT_CONTROL_INPUT.drop = function (event) {
        wrapEvent(event).exit();
    };

    /**
     * 输入框输入内容事件处理函数。
     * @private
     *
     * @param {Event} event 事件对象
     */
    if (ieVersion) {
        UI_INPUT_CONTROL_INPUT.propertychange = function (event) {
            if (event.propertyName == 'value') {
                triggerEvent(wrapEvent(event).target.getControl(), 'change');
            }
        };
    }
    else {
        UI_INPUT_CONTROL_INPUT.input = function (event) {
            triggerEvent(this.getControl(), 'change');
        };
    }

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$dispose = function () {
        this._eInput.getControl = undefined;
        this._eInput = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 输入重置事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_CLASS.$reset = function () {
        this.$ready();
    };

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$setParent = function (parent) {
        UI_CONTROL_CLASS.$setParent.call(this, parent);
        if (parent = this._eInput.form) {
            if (parent.getControl) {
                parent.getControl().addItem(this.getName(), this);
            }
        }
    };

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this._eInput.style.width = this.getBodyWidth() + 'px';
        this._eInput.style.height = this.getBodyHeight() + 'px';
    };

    /**
     * 输入提交事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_CLASS.$submit = blank;

    /**
     * 输入控件获得失效需要设置输入框不提交。
     * @override
     */
    UI_INPUT_CONTROL_CLASS.disable = function () {
        if (UI_CONTROL_CLASS.disable.call(this)) {
            var body = this.getBody();

            if (this._bHidden) {
                this._eInput.disabled = true;
            }
            else {
                body.removeChild(this._eInput);
                if (this._eInput.type != 'password') {
                    // 如果输入框是密码框需要直接隐藏，不允许将密码显示在浏览器中
                    body.innerHTML = encodeHTML(this._eInput.value);
                }
            }

            return true;
        }
        return false;
    };

    /**
     * 输入控件解除失效需要设置输入框可提交。
     * @override
     */
    UI_INPUT_CONTROL_CLASS.enable = function () {
        if (UI_CONTROL_CLASS.enable.call(this)) {
            var body = this.getBody();

            if (this._bHidden) {
                this._eInput.disabled = false;
            }
            else {
                body.innerHTML = '';
                body.appendChild(this._eInput);
            }

            return true;
        }
        return false;
    };

    /**
     * 获取控件的输入元素。
     * @public
     *
     * @return {HTMLElement} InputElement 对象
     */
    UI_INPUT_CONTROL_CLASS.getInput = function () {
        return this._eInput;
    };

    /**
     * 获取控件的名称。
     * 输入控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称可以使用 setName 方法改变。
     * @public
     *
     * @return {string} INPUT 对象名称
     */
    UI_INPUT_CONTROL_CLASS.getName = function () {
        return this._eInput.name;
    };

    /**
     * 获取当前当前选区的结束位置。
     * @public
     *
     * @return {number} 输入框当前选区的结束位置
     */
    UI_INPUT_CONTROL_CLASS.getSelectionEnd = ieVersion ? function () {
        var range = DOCUMENT.selection.createRange().duplicate();

        range.moveStart('character', -this._eInput.value.length);
        return range.text.length;
    } : function () {
        return this._eInput.selectionEnd;
    };

    /**
     * 获取当前选区的起始位置。
     * @public
     *
     * @return {number} 输入框当前选区的起始位置，即输入框当前光标的位置
     */
    UI_INPUT_CONTROL_CLASS.getSelectionStart = ieVersion ? function () {
        //__gzip_original__length
        var range = DOCUMENT.selection.createRange().duplicate(),
            length = this._eInput.value.length;

        range.moveEnd('character', length);
        return length - range.text.length;
    } : function () {
        return this._eInput.selectionStart;
    };

    /**
     * 获取控件的值。
     * getValue 方法返回提交时表单项的值，使用 setValue 方法设置。
     * @public
     *
     * @return {string} 控件的值
     */
    UI_INPUT_CONTROL_CLASS.getValue = function () {
        return this._eInput.value;
    };

    /**
     * 设置输入框光标的位置。
     * @public
     *
     * @param {number} pos 位置索引
     */
    UI_INPUT_CONTROL_CLASS.setCaret = ieVersion ? function (pos) {
        var range = this._eInput.createTextRange();
        range.collapse();
        range.select();
        range.moveStart('character', pos);
        range.collapse();
        range.select();
    } : function (pos) {
        this._eInput.setSelectionRange(pos, pos);
    };

    /**
     * 设置控件的名称。
     * 输入控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 表单项名称
     */
    UI_INPUT_CONTROL_CLASS.setName = function (name) {
        var el = setInput(this._eInput, name || '');
        if (this._eInput != el) {
            UI_INPUT_CONTROL_BIND_EVENT(this);
            this._eInput = el;
        }
    };

    /**
     * 设置控件的值。
     * setValue 方法设置提交时表单项的值，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 控件的值
     */
    UI_INPUT_CONTROL_CLASS.setValue = function (value) {
        //__gzip_original__input
        var input = this._eInput,
            func = UI_INPUT_CONTROL_INPUT.propertychange;

        // 停止事件，避免重入引发死循环
        if (func) {
            detachEvent(input, 'propertychange', func);
        }
        input.value = value;
        if (func) {
            attachEvent(input, 'propertychange', func);
        }
    };

    /**
     * 验证控件
     *
     * @return {Boolean} 验证结果
     */
    UI_INPUT_CONTROL_CLASS.validate = function() {
       return true; 
    };

    /**
     * 根据当前的值设置默认值
     */
    UI_INPUT_CONTROL_CLASS.setDefaultValue = function () {
        var value = this.getValue();
        this._eInput.defaultValue = value;
    };

    (function () {
        function build(name) {
            UI_INPUT_CONTROL_CLASS['$' + name] = function () {
                UI_CONTROL_CLASS['$' + name].call(this);

                //__gzip_original__input
                var input = this._eInput;

                detachEvent(input, name, UI_INPUT_CONTROL_INPUT[name]);
                try {
                    input[name]();
                }
                catch (e) {
                }
                attachEvent(input, name, UI_INPUT_CONTROL_INPUT[name]);
            };
        }

        build('blur');
        build('focus');
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Button - 定义按钮的基本操作。
按钮控件，继承自基础控件，屏蔽了激活状态的向上冒泡，并且在激活(active)状态下鼠标移出控件区域会失去激活样式，移入控件区域再次获得激活样式，按钮控件中的文字不可以被选中。

按钮控件直接HTML初始化的例子:
<div ecui="type:button">
  <!-- 这里放按钮的文字 -->
  ...
</div>
或
<button ecui="type:button">
  <!-- 这里放按钮的文字 -->
  ...
</button>
或
<input ecui="type:button" value="按钮文字" type="button">

属性
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        setText = dom.setText,
        setDefault = util.setDefault,

        inheritsControl = core.inherits,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_BUTTON
    ///__gzip_original__UI_BUTTON_CLASS
    /**
     * 初始化基础控件。
     * options 对象支持的属性如下：
     * text 按钮的文字
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BUTTON = ui.Button =
        inheritsControl(
            UI_CONTROL,
            'ui-button',
            function (el, options) {
                setDefault(options, 'userSelect', false);
                if (options.text) {
                    setText(el, options.text);
                }
            }
        ),
        UI_BUTTON_CLASS = UI_BUTTON.prototype;
//{else}//
    /**
     * 按钮控件获得激活时需要阻止事件的冒泡。
     * @override
     */
    UI_BUTTON_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        event.stopPropagation();
    };

    /**
     * 如果控件处于激活状态，移除状态样式 -active，移除状态样式不失去激活状态。
     * @override
     */
    UI_BUTTON_CLASS.$mouseout = function (event) {
        UI_CONTROL_CLASS.$mouseout.call(this, event);
        if (this.isActived()) {
            this.alterClass('-active');
        }
    };

    /**
     * 如果控件处于激活状态，添加状态样式 -active。
     * @override
     */
    UI_BUTTON_CLASS.$mouseover = function (event) {
        UI_CONTROL_CLASS.$mouseover.call(this, event);
        if (this.isActived()) {
            this.alterClass('+active');
        }
    };

    /**
     * 设置控件的文字。
     * @public
     *
     * @param {string} text 控件的文字
     */
    UI_BUTTON_CLASS.setText = function (text) {
        setText(this.getBody(), text);
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Scrollbar - 定义在区间轴内移动的基本操作。
滚动条控件，继承自基础控件，是滚动行为的虚拟实现，不允许直接初始化，它的子类通常情况下也不会被直接初始化，而是作为控件的一部分用于控制父控件的行为。

属性
_nTotal         - 滚动条区域允许设置的最大值
_nStep          - 滚动条移动一次时的基本步长
_nValue         - 滚动条当前设置的值
_oStop          - 定时器的句柄，用于连续滚动处理
_uPrev          - 向前滚动按钮
_uNext          - 向后滚动按钮
_uThumb         - 滑动按钮

滑动按钮属性
_oRange         - 滑动按钮的合法滑动区间
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        FLOOR = MATH.floor,
        MAX = MATH.max,
        MIN = MATH.min,

        children = dom.children,
        blank = util.blank,
        setDefault = util.setDefault,
        timer = util.timer,

        $fastCreate = core.$fastCreate,
        drag = core.drag,
        getActived = core.getActived,
        getMouseX = core.getMouseX,
        getMouseY = core.getMouseY,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SCROLLBAR
    ///__gzip_original__UI_SCROLLBAR_CLASS
    ///__gzip_original__UI_VSCROLLBAR
    ///__gzip_original__UI_VSCROLLBAR_CLASS
    ///__gzip_original__UI_HSCROLLBAR
    ///__gzip_original__UI_HSCROLLBAR_CLASS
    /**
     * 初始化滚动条控件。
     * @protected
     *
     * @param {Object} options 初始化选项
     */
    var UI_SCROLLBAR = ui.Scrollbar =
        inheritsControl(
            UI_CONTROL,
            'ui-scrollbar',
            function (el, options) {
                setDefault(options, 'userSelect', false);
                setDefault(options, 'focusable', false);

                var type = this.getType();

                el.innerHTML =
                    '<div class="' +
                        type + '-prev' + this.Button.TYPES +
                        '" style="position:absolute;top:0px;left:0px"></div><div class="' +
                        type + '-next' + this.Button.TYPES +
                        '" style="position:absolute;top:0px;left:0px"></div><div class="' +
                        this.Thumb.TYPES + '" style="position:absolute"></div>';
            },
            function (el, options) {
                // 使用 el 代替 children
                el = children(el);

                // 初始化滚动条控件
                this._nValue = this._nTotal = 0;
                this._nStep = 1;

                // 创建向前/向后滚动按钮与滑动按钮
                this._uPrev = $fastCreate(this.Button, el[0], this, {focusable: false});
                this._uNext = $fastCreate(this.Button, el[1], this, {focusable: false});
                this._uThumb = $fastCreate(this.Thumb, el[2], this, {focusable: false});

                this._oStop = blank;
            }
        ),
        UI_SCROLLBAR_CLASS = UI_SCROLLBAR.prototype,

        /**
         * 初始化滚动条控件的滑动按钮部件。
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_SCROLLBAR_THUMB_CLASS =
            (UI_SCROLLBAR_CLASS.Thumb = inheritsControl(UI_BUTTON, 'ui-scrollbar-thumb')).prototype,

        /**
         * 初始化滚动条控件的按钮部件。
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_SCROLLBAR_BUTTON_CLASS =
            (UI_SCROLLBAR_CLASS.Button = inheritsControl(UI_BUTTON, 'ui-scrollbar-button')).prototype;
//{else}//
    /**
     * 控扭控件自动滚动。
     * @private
     *
     * @param {ecui.ui.Scrollbar} scrollbar 滚动条控件
     * @param {number} step 单次滚动步长，为负数表示向前滚动，否则是向后滚动
     * @param {number} interval 触发时间间隔，默认40ms
     */
    function UI_SCROLLBAR_AUTO_SCROLL(scrollbar, step, interval) {
        var value = scrollbar._nValue,
            direction = scrollbar.getMouseDirection();

        // 如果有没有结束的自动滚动，需要先结束，这种情况出现在快速的多次点击时
        scrollbar._oStop();

        if (direction == -1 && step < 0 || direction == 1 && step > 0) {
            scrollbar.setValue(value + step);
        }
        else {
            // 如果因为鼠标位置的原因无法自动滚动，需要强制设置值变化属性
            value = -1;
        }

        // 如果滚动条的值发生变化，将进行下一次的自动滚动，否则滚动条已经到达两端停止自动滚动
        scrollbar._oStop = scrollbar._nValue != value ?
            timer(UI_SCROLLBAR_AUTO_SCROLL, interval || 200, null, scrollbar, step, 40) : blank;
    }

    /**
     * 滚动条值发生改变后的处理。
     * 滚动条的值发生改变后，将触发父控件的 onscroll 事件，如果事件返回值不为 false，则调用父控件的 $scroll 方法。
     * @private
     *
     * @param {ecui.ui.Scrollbar} scrollbar 滚动条控件
     */
    function UI_SCROLLBAR_CHANGE(scrollbar) {
        var parent = scrollbar.getParent(),
            uid;

        if (parent) {
            parent.$scroll();
            if (!UI_SCROLLBAR[uid = parent.getUID()]) {
                // 根据浏览器的行为，无论改变滚动条的值多少次，在一个脚本运行周期只会触发一次onscroll事件
                timer(function () {
                    delete UI_SCROLLBAR[uid];
                    triggerEvent(parent, 'scroll', false);
                });
                UI_SCROLLBAR[uid] = true;
            }
        }
    }

    /**
     * 滑动按钮获得激活时，触发滑动按钮进入拖拽状态。
     * @override
     */
    UI_SCROLLBAR_THUMB_CLASS.$activate = function (event) {
        UI_BUTTON_CLASS.$activate.call(this, event);

        drag(this, event, this._oRange);
    };

    /**
     * @override
     */
    UI_SCROLLBAR_THUMB_CLASS.$dragmove = function (event, x, y) {
        UI_BUTTON_CLASS.$dragmove.call(this, event, x, y);

        var parent = this.getParent(),
            value = parent.$calculateValue(x, y);

        // 应该滚动step的整倍数
        parent.$setValue(value == parent._nTotal ? value : value - value % parent._nStep);
        UI_SCROLLBAR_CHANGE(parent);
    };

    /**
     * 设置滑动按钮的合法拖拽区间。
     * @public
     *
     * @param {number} top 允许拖拽的最上部区域
     * @param {number} right 允许拖拽的最右部区域
     * @param {number} bottom 允许拖拽的最下部区域
     * @param {number} left 允许拖拽的最左部区域
     */
    UI_SCROLLBAR_THUMB_CLASS.setRange = function (top, right, bottom, left) {
        this._oRange = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
    };

    /**
     * 滚动条按钮获得激活时，将开始自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$activate = function (event) {
        UI_BUTTON_CLASS.$activate.call(this, event);

        var parent = this.getParent();
        UI_SCROLLBAR_AUTO_SCROLL(parent, parent.getMouseDirection() * MAX(parent._nStep, 5));
    };

    /**
     * 滚动条按钮失去激活时，将停止自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$deactivate = function (event) {
        UI_BUTTON_CLASS.$deactivate.call(this, event);
        this.getParent()._oStop();
    };

    /**
     * 滚动条按钮鼠标移出时，如果控件处于直接激活状态，将暂停自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$mouseout = function (event) {
        UI_BUTTON_CLASS.$mouseout.call(this, event);
        if (getActived() == this) {
            this.getParent()._oStop(true);
        }
    };

    /**
     * 滚动条按钮鼠标移入时，如果控件处于直接激活状态，将恢复自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$mouseover = function (event) {
        UI_BUTTON_CLASS.$mouseover.call(this, event);
        if (getActived() == this) {
            this.getParent()._oStop(true);
        }
    };

    /**
     * 滚动条获得激活时，将开始自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        UI_SCROLLBAR_AUTO_SCROLL(this, this.getMouseDirection() * this.$getPageStep());
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        this._uPrev.cache(true, true);
        this._uNext.cache(true, true);
        this._uThumb.cache(true, true);
    };

    /**
     * 滚动条失去激活时，将停止自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$deactivate = function (event) {
        UI_CONTROL_CLASS.$deactivate.call(this, event);
        this._oStop();
    };

    /**
     * 隐藏滚动条控件时，滚动条控件的当前值需要复位为0，参见 setValue 方法。
     * @override
     */
    UI_SCROLLBAR_CLASS.$hide = function () {
        UI_CONTROL_CLASS.$hide.call(this);
        UI_SCROLLBAR_CLASS.setValue.call(this, 0);
    };

    /**
     * 滚动条鼠标移出时，如果控件处于直接激活状态，将暂停自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$mouseout = function (event) {
        UI_CONTROL_CLASS.$mouseout.call(this, event);
        if (getActived() == this) {
            this._oStop(true);
        }
    };

    /**
     * 滚动条鼠标移入时，如果控件处于直接激活状态，将恢复自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$mouseover = function (event) {
        UI_CONTROL_CLASS.$mouseover.call(this, event);
        if (getActived() == this) {
            this._oStop(true);
        }
    };

    /**
     * 设置滚动条控件的单页步长。
     * 滚动条控件的单页步长决定在点击滚动条空白区域(即非按钮区域)时滚动一页移动的距离，如果不设置单页步长，默认使用最接近滚动条长度的合理步长(即单项步长最接近总长度的整数倍)。
     * @protected
     *
     * @param {number} step 单页步长
     */
    UI_SCROLLBAR_CLASS.$setPageStep = function (step) {
        this._nPageStep = step;
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
    };

    /**
     * 直接设置控件的当前值。
     * $setValue 仅仅设置控件的参数值，不进行合法性验证，也不改变滑动按钮的位置信息，用于滑动按钮拖拽时同步设置当前值。
     * @protected
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLLBAR_CLASS.$setValue = function (value) {
        this._nValue = value;
    };

    /**
     * 获取滚动条控件的单次滚动步长。
     * getStep 方法返回滚动条控件发生滚动时，移动的最小步长值，通过 setStep 设置。
     * @public
     *
     * @return {number} 单次滚动步长
     */
    UI_SCROLLBAR_CLASS.getStep = function () {
        return this._nStep;
    };

    /**
     * 获取滚动条控件的最大值。
     * getTotal 方法返回滚动条控件允许滚动的最大值，最大值、当前值与滑动按钮控件的实际位置互相影响，通过 setTotal 设置。
     * @public
     *
     * @return {number} 控件的最大值
     */
    UI_SCROLLBAR_CLASS.getTotal = function () {
        return this._nTotal;
    };

    /**
     * 获取滚动条控件的当前值。
     * getValue 方法返回滚动条控件的当前值，最大值、当前值与滑动按钮控件的实际位置互相影响，但是当前值不允许超过最大值，通过 setValue 方法设置。
     * @public
     *
     * @return {number} 滚动条控件的当前值
     */
    UI_SCROLLBAR_CLASS.getValue = function () {
        return this._nValue;
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uPrev.init();
        this._uNext.init();
        this._uThumb.init();
    };

    /**
     * 设置滚动条控件的单次滚动步长。
     * setStep 方法设置的值必须大于0，否则不会进行操作。
     * @public
     *
     * @param {number} value 单次滚动步长
     */
    UI_SCROLLBAR_CLASS.setStep = function (value) {
        if (value > 0) {
            this._nStep = value;
        }
    };

    /**
     * 设置滚动条控件的最大值。
     * setTotal 方法设置的值不能为负数，当前值如果大于最大值，设置当前值为新的最大值，最大值发生改变将导致滑动按钮刷新。
     * @public
     *
     * @param {number} value 控件的最大值
     */
    UI_SCROLLBAR_CLASS.setTotal = function (value) {
        if (value >= 0 && this._nTotal != value) {
            this._nTotal = value;
            // 检查滚动条控件的当前值是否已经越界
            if (this._nValue > value) {
                // 值发生改变时触发相应的事件
                this._nValue = value;
                UI_SCROLLBAR_CHANGE(this);
            }
            this.$flushThumb();
        }
    };

    /**
     * 设置滚动条控件的当前值。
     * setValue 方法设置的值不能为负数，也不允许超过使用 setTotal 方法设置的控件的最大值，如果当前值不合法，将自动设置为最接近合法值的数值，当前值发生改变将导致滑动按钮控件刷新。
     * @public
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLLBAR_CLASS.setValue = function (value) {
        value = MIN(MAX(0, value), this._nTotal);
        if (this._nValue != value) {
            // 值发生改变时触发相应的事件
            this._nValue = value;
            UI_SCROLLBAR_CHANGE(this);
            this.$flushThumb();
        }
    };

    /**
     * 滚动条控件当前值移动指定的步长次数。
     * 参数 value 必须是整数, 正数则向最大值方向移动，负数则向0方向移动，允许移动的区间在0-最大值之间，参见 setStep、setTotal 与 setValue 方法。
     * @public
     *
     * @param {number} n 移动的步长次数
     */
    UI_SCROLLBAR_CLASS.skip = function (n) {
        this.setValue(this._nValue + n * this._nStep);
    };
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化垂直滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_VSCROLLBAR = ui.VScrollbar = inheritsControl(UI_SCROLLBAR, 'ui-vscrollbar'),
        UI_VSCROLLBAR_CLASS = UI_VSCROLLBAR.prototype;
//{else}//
    /**
     * 计算滑动按钮拖拽时的当前值。
     * 滑动按钮拖拽时，根据位置计算对应的当前值，然后通过 $setValue 方法直接设置。
     * @protected
     *
     * @param {number} x 滑动按钮实际到达的X轴坐标
     * @param {number} y 滑动按钮实际到达的Y轴坐标
     */
    UI_VSCROLLBAR_CLASS.$calculateValue = function (x, y) {
        //__gzip_original__range
        var thumb = this._uThumb,
            range = thumb._oRange;
        return (y - range.top) / (range.bottom - this._uPrev.getHeight() - thumb.getHeight()) * this._nTotal;
    };

    /**
     * 滑动按钮刷新。
     * 当滚动条控件的大小或最大值/当前值发生变化时，滑动按钮的大小与位置需要同步改变，参见 setSize、setValue 与 setTotal 方法。
     * @protected
     */
    UI_VSCROLLBAR_CLASS.$flushThumb = function () {
        // 计算滑动按钮高度与位置
        var thumb = this._uThumb,
            total = this._nTotal,
            height = this.getHeight(),
            prevHeight = this._uPrev.getHeight(),
            bodyHeight = this.getBodyHeight(),
            thumbHeight = MAX(FLOOR(bodyHeight * height / (height + total)), thumb.getMinimumHeight() + 5);

        if (total) {
            thumb.$setSize(0, thumbHeight);
            thumb.setPosition(0, prevHeight + FLOOR((this._nValue / total) * (bodyHeight - thumbHeight)));
            thumb.setRange(prevHeight, 0, bodyHeight + prevHeight, 0);
        }
    };

    /**
     * 获取单页的步长。
     * 如果使用 $setPageStep 方法设置了单页的步长，$getPageStep 方法直接返回设置的步长，否则 $getPageStep 返回最接近滚动条控件长度的步长的整数倍。
     * @protected
     *
     * @return {number} 单页的步长
     */
    UI_VSCROLLBAR_CLASS.$getPageStep = function () {
        var height = this.getHeight();
        return this._nPageStep || height - height % this._nStep;
    };

    /**
     * @override
     */
    UI_VSCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_SCROLLBAR_CLASS.$setSize.call(this, width, height);

        //__gzip_original__next
        var bodyWidth = this.getBodyWidth(),
            prevHeight = this.$$paddingTop,
            next = this._uNext;

        // 设置滚动按钮与滑动按钮的信息
        this._uPrev.$setSize(bodyWidth, prevHeight);
        next.$setSize(bodyWidth, this.$$paddingBottom);
        this._uThumb.$setSize(bodyWidth);
        next.setPosition(0, this.getBodyHeight() + prevHeight);

        this.$flushThumb();
    };

    /**
     * 获取鼠标相对于滑动按钮的方向。
     * 鼠标如果在滑动按钮之前，返回 -1，鼠标如果在滑动按钮之后，返回 1，否则返回 0。
     * @protected
     *
     * @return {number} 鼠标相对于滑动按钮的方向数值
     */
    UI_VSCROLLBAR_CLASS.getMouseDirection = function () {
        return getMouseY(this) < this._uThumb.getY() ?
            -1 : getMouseY(this) > this._uThumb.getY() + this._uThumb.getHeight() ? 1 : 0;
    };
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化水平滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_HSCROLLBAR = ui.HScrollbar = inheritsControl(UI_SCROLLBAR, 'ui-hscrollbar'),
        UI_HSCROLLBAR_CLASS = UI_HSCROLLBAR.prototype;
//{else}//
    /**
     * 计算滑动按钮拖拽时的当前值。
     * 滑动按钮拖拽时，根据位置计算对应的当前值，然后通过 $setValue 方法直接设置。
     * @protected
     *
     * @param {number} x 滑动按钮实际到达的X轴坐标
     * @param {number} y 滑动按钮实际到达的Y轴坐标
     */
    UI_HSCROLLBAR_CLASS.$calculateValue = function (x, y) {
        //__gzip_original__range
        var thumb = this._uThumb,
            range = thumb._oRange;
        return (x - range.left) / (range.right - this._uPrev.getWidth() - thumb.getWidth()) * this._nTotal;
    };

    /**
     * 滑动按钮刷新。
     * 当滚动条控件的大小或最大值/当前值发生变化时，滑动按钮的大小与位置需要同步改变，参见 setSize、setValue 与 setTotal 方法。
     * @protected
     */
    UI_HSCROLLBAR_CLASS.$flushThumb = function () {
        // 计算滑动按钮高度与位置
        var thumb = this._uThumb,
            total = this._nTotal,
            width = this.getWidth(),
            prevWidth = this._uPrev.getWidth(),
            bodyWidth = this.getBodyWidth(),
            thumbWidth = MAX(FLOOR(bodyWidth * width / (width + total)), thumb.getMinimumWidth() + 5);

        if (total) {
            thumb.$setSize(thumbWidth);
            thumb.setPosition(prevWidth + FLOOR((this._nValue / total) * (bodyWidth - thumbWidth)), 0);
            thumb.setRange(0, bodyWidth + prevWidth, 0, prevWidth);
        }
    };

    /**
     * 获取单页的步长。
     * 如果使用 $setPageStep 方法设置了单页的步长，$getPageStep 方法直接返回设置的步长，否则 $getPageStep 返回最接近滚动条控件长度的步长的整数倍。
     * @protected
     *
     * @return {number} 单页的步长
     */
    UI_HSCROLLBAR_CLASS.$getPageStep = function () {
        var width = this.getWidth();
        return width - width % this._nStep;
    };

    /**
     * @override
     */
    UI_HSCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_SCROLLBAR_CLASS.$setSize.call(this, width, height);

        //__gzip_original__next
        var bodyHeight = this.getBodyHeight(),
            prevWidth = this.$$paddingLeft,
            next = this._uNext;

        // 设置滚动按钮与滑动按钮的信息
        this._uPrev.$setSize(prevWidth, bodyHeight);
        next.$setSize(this.$$paddingRight, bodyHeight);
        this._uThumb.$setSize(0, bodyHeight);
        next.setPosition(this.getBodyWidth() + prevWidth, 0);

        this.$flushThumb();
    };

    /**
     * 获取鼠标相对于滑动按钮的方向。
     * 鼠标如果在滑动按钮之前，返回 -1，鼠标如果在滑动按钮之后，返回 1，否则返回 0。
     * @protected
     *
     * @return {number} 鼠标相对于滑动按钮的方向数值
     */
    UI_HSCROLLBAR_CLASS.getMouseDirection = function () {
        return getMouseX(this) < this._uThumb.getX() ?
            -1 : getMouseX(this) > this._uThumb.getX() + this._uThumb.getWidth() ? 1 : 0;
    };
//{/if}//
//{if 0}//
})();
//{/if}//

﻿/*
Panel - 定义在一个小区域内截取显示大区域内容的基本操作。
截面控件，继承自基础控件，用于显示实际的内容区域超过控件显示区域的信息，通过拖拽滚动条显示完整的内容，截面控件可以设置参数决定是否自动显示水平/垂直滚动条，如果设置不显示水平/垂直滚动条，水平/垂直内容超出的部分将直接被截断，当设置两个滚动条都不显示时，截面控件从显示效果上等同于基础控件。在截面控件上滚动鼠标滑轮，将控制截面控件往垂直方向(如果没有垂直滚动条则在水平方向)前移或者后移滚动条，在获得焦点后，通过键盘的方向键也可以操作截面控件的滚动条。

截面控件直接HTML初始化的例子:
<div ecui="type:panel">
  <!-- 这里放内容 -->
  ...
</div>

属性
_bAbsolute           - 是否包含绝对定位的Element
_nWheelDelta         - 鼠标滚轮滚动一次的差值
_eBrowser            - 用于浏览器原生的滚动条实现的Element
_uVScrollbar         - 垂直滚动条控件
_uHScrollbar         - 水平滚动条控件
_uCorner             - 夹角控件
$$mainWidth          - layout区域的实际宽度
$$mainHeight         - layout区域的实际高度
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,
        FLOOR = MATH.floor,

        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getStyle = dom.getStyle,
        moveElements = dom.moveElements,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        calcHeightRevise = core.calcHeightRevise,
        calcWidthRevise = core.calcWidthRevise,
        findControl = core.findControl,
        getKey = core.getKey,
        getScrollNarrow = core.getScrollNarrow,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        wrapEvent = core.wrapEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_VSCROLLBAR = ui.VScrollbar,
        UI_HSCROLLBAR = ui.HScrollbar;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生滚动条控件。
     * @protected
     *
     * @param {Object} options 初始化选项
     */
    ///__gzip_original__UI_BROWSER_SCROLLBAR
    ///__gzip_original__UI_BROWSER_SCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_VSCROLLBAR
    ///__gzip_original__UI_BROWSER_VSCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_HSCROLLBAR
    ///__gzip_original__UI_BROWSER_HSCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_CORNER
    ///__gzip_original__UI_BROWSER_CORNER_CLASS
    ///__gzip_original__UI_PANEL
    ///__gzip_original__UI_PANEL_CLASS
    var UI_BROWSER_SCROLLBAR =
        inheritsControl(
            UI_CONTROL,
            null,
            null,
            function (el, options) {
                detachEvent(el, 'scroll', UI_BROWSER_SCROLLBAR_SCROLL);
                attachEvent(el, 'scroll', UI_BROWSER_SCROLLBAR_SCROLL);
            }
        ),
        UI_BROWSER_SCROLLBAR_CLASS = UI_BROWSER_SCROLLBAR.prototype;
//{else}//
    /**
     * 原生滚动条滚动处理。
     * 滚动条滚动后，将触发父控件的 onscroll 事件，如果事件返回值不为 false，则调用父控件的 $scroll 方法。
     * @private
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    function UI_BROWSER_SCROLLBAR_SCROLL(event) {
        triggerEvent(findControl(getParent(wrapEvent(event).target)), 'scroll');
    }

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.$hide = UI_BROWSER_SCROLLBAR_CLASS.hide = function () {
        this.getMain().style[this._aProperty[0]] = 'hidden';
        UI_BROWSER_SCROLLBAR_CLASS.setValue.call(this, 0);
    };

    /**
     * 直接设置控件的当前值。
     * @protected
     *
     * @param {number} value 控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.$setValue = function (value) {
        this.getMain()[this._aProperty[1]] = MIN(MAX(0, value), this.getTotal());
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.$show = UI_BROWSER_SCROLLBAR_CLASS.show = function () {
        this.getMain().style[this._aProperty[0]] = 'scroll';
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.getHeight = function () {
        return this._aProperty[4] ? this.getMain()[this._aProperty[4]] : getScrollNarrow();
    };

    /**
     * 获取滚动条控件的最大值。
     * getTotal 方法返回滚动条控件允许滚动的最大值，最大值、当前值与滑动块控件的实际位置互相影响，通过 setTotal 设置。
     * @public
     *
     * @return {number} 控件的最大值
     */
    UI_BROWSER_SCROLLBAR_CLASS.getTotal = function () {
        return toNumber(this.getMain().lastChild.style[this._aProperty[2]]);
    };

    /**
     * 获取滚动条控件的当前值。
     * getValue 方法返回滚动条控件的当前值，最大值、当前值与滑动按钮控件的实际位置互相影响，但是当前值不允许超过最大值，通过 setValue 方法设置。
     * @public
     *
     * @return {number} 滚动条控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.getValue = function () {
        return this.getMain()[this._aProperty[1]];
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.getWidth = function () {
        return this._aProperty[3] ? this.getMain()[this._aProperty[3]] : getScrollNarrow();
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.isShow = function () {
        return this.getMain().style[this._aProperty[0]] != 'hidden';
    };

    /**
     * 设置滚动条控件的最大值。
     * setTotal 方法设置的值不能为负数，当前值如果大于最大值，设置当前值为新的最大值，最大值发生改变将导致滑动按钮刷新。
     * @public
     *
     * @param {number} value 控件的最大值
     */
    UI_BROWSER_SCROLLBAR_CLASS.setTotal = function (value) {
        this.getMain().lastChild.style[this._aProperty[2]] = value + 'px';
    };

    /**
     * 设置滚动条控件的当前值。
     * @public
     *
     * @param {number} value 控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.setValue = function (value) {
        this.$setValue(value);
        triggerEvent(this.getParent(), 'scroll');
    };

    UI_BROWSER_SCROLLBAR_CLASS.$cache =
        UI_BROWSER_SCROLLBAR_CLASS.$getPageStep = UI_BROWSER_SCROLLBAR_CLASS.$setPageStep =
        UI_BROWSER_SCROLLBAR_CLASS.$setSize = UI_BROWSER_SCROLLBAR_CLASS.alterClass =
        UI_BROWSER_SCROLLBAR_CLASS.cache = UI_BROWSER_SCROLLBAR_CLASS.getStep =
        UI_BROWSER_SCROLLBAR_CLASS.init = UI_BROWSER_SCROLLBAR_CLASS.setPosition =
        UI_BROWSER_SCROLLBAR_CLASS.setStep = UI_BROWSER_SCROLLBAR_CLASS.skip = blank;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生垂直滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_VSCROLLBAR =
        inheritsControl(
            UI_BROWSER_SCROLLBAR,
            null,
            null,
            function (el, options) {
                this._aProperty = ['overflowY', 'scrollTop', 'height', null, 'offsetHeight'];
            }
        );
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生水平滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_HSCROLLBAR =
        inheritsControl(
            UI_BROWSER_SCROLLBAR,
            null,
            null,
            function (el, options) {
                this._aProperty = ['overflowX', 'scrollLeft', 'width', 'offsetWidth', null];
            }
        );
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化夹角控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_CORNER = inheritsControl(UI_CONTROL),
        UI_BROWSER_CORNER_CLASS = UI_BROWSER_CORNER.prototype;
//{else}//
    (function () {
        for (var name in UI_CONTROL_CLASS) {
            UI_BROWSER_CORNER_CLASS[name] = blank;
        }
    })();
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化截面控件，截面控件支持自动展现滚动条控件，允许指定需要自动展现的垂直或水平滚动条。
     * options 对象支持的属性如下：
     * vScroll    是否自动展现垂直滚动条，默认展现
     * hScroll    是否自动展现水平滚动条，默认展现
     * browser    是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * absolute   是否包含绝对定位的Element，默认不包含
     * wheelDelta 鼠标滚轮的步长，即滚动一次移动的最小步长单位，默认总步长(差值*步长)为不大于20像素的最大值
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_PANEL = ui.Panel =
        inheritsControl(
            UI_CONTROL,
            'ui-panel',
            function (el, options) {
                var vscroll = options.vScroll !== false,
                    hscroll = options.hScroll !== false,
                    type = this.getType(),
                    o = createDom(
                        type + '-body',
                        'position:absolute;top:0px;left:0px' + (hscroll ? ';white-space:nowrap' : '')
                    );

                el.style.overflow = 'hidden';
                moveElements(el, o, true);

                el.innerHTML =
                    (options.browser ?
                        '<div style="position:absolute;top:0px;left:0px;overflow:auto;padding:0px;border:0px">' +
                            '<div style="width:1px;height:1px;padding:0px;border:0px"></div></div>'
                        : (vscroll ?
                            '<div class="' + type + '-vscrollbar' + this.VScrollbar.TYPES +
                                '" style="position:absolute"></div>' : '') +
                                (hscroll ?
                                    '<div class="' + type + '-hscrollbar' + this.HScrollbar.TYPES +
                                        '" style="position:absolute"></div>' : '') +
                                (vscroll && hscroll ?
                                    '<div class="' + type + '-corner' + UI_CONTROL.TYPES +
                                        '" style="position:absolute"></div>' : '')
                    ) + '<div class="' + type +
                            '-layout" style="position:relative;overflow:hidden;padding:0px"></div>';

                el.lastChild.appendChild(o);
            },
            function (el, options) {
                var i = 0,
                    browser = options.browser,
                    vscroll = options.vScroll !== false,
                    hscroll = options.hScroll !== false,
                    list = [
                        [vscroll, '_uVScrollbar', browser ? UI_BROWSER_VSCROLLBAR : this.VScrollbar],
                        [hscroll, '_uHScrollbar', browser ? UI_BROWSER_HSCROLLBAR : this.HScrollbar],
                        [vscroll && hscroll, '_uCorner', browser ? UI_BROWSER_CORNER : UI_CONTROL]
                    ],
                    o;

                this.$setBody(el.lastChild.lastChild);

                this._bAbsolute = options.absolute;
                this._nWheelDelta = options.wheelDelta;

                el = el.firstChild;
                if (browser) {
                    this._eBrowser = el;
                }

                // 生成中心区域的Element层容器，滚动是通过改变容器的left与top属性实现
                for (; o = list[i++]; ) {
                    if (o[0]) {
                        this[o[1]] = $fastCreate(o[2], el, this);
                        if (!browser) {
                            el = el.nextSibling;
                        }
                    }
                }
            }
        ),
        UI_PANEL_CLASS = UI_PANEL.prototype;
//{else}//

    UI_PANEL_CLASS.VScrollbar = UI_VSCROLLBAR;
    UI_PANEL_CLASS.HScrollbar = UI_HSCROLLBAR;

    /**
     * @override
     */
    UI_PANEL_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        var body = this.getBody(),
            mainWidth = body.offsetWidth,
            mainHeight = body.offsetHeight;

        style = getStyle(getParent(body));
        this.$$bodyWidthRevise = calcWidthRevise(style);
        this.$$bodyHeightRevise = calcHeightRevise(style);

        // 考虑到内部Element绝对定位的问题，中心区域的宽度与高度修正
        if (this._bAbsolute) {
            for (
                var i = 0,
                    list = body.all || body.getElementsByTagName('*'),
                    pos = getPosition(body);
                // 以下使用 body 代替临时的 DOM 节点对象
                body = list[i++];
            ) {
                if (body.offsetWidth && getStyle(body, 'position') == 'absolute') {
                    style = getPosition(body);
                    mainWidth = MAX(mainWidth, style.left - pos.left + body.offsetWidth);
                    mainHeight = MAX(mainHeight, style.top - pos.top + body.offsetHeight);
                }
            }
        }

        this.$$mainWidth = mainWidth;
        this.$$mainHeight = mainHeight;

        if (this._uVScrollbar) {
             this._uVScrollbar.cache(true, true);
        }
        if (this._uHScrollbar) {
             this._uHScrollbar.cache(true, true);
        }
        if (this._uCorner) {
            this._uCorner.cache(true, true);
        }
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.$dispose = function () {
        this._eBrowser = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 接管对方向键的处理。
     * @override
     */
    UI_PANEL_CLASS.$keydown = UI_PANEL_CLASS.$keypress = function (event) {
        var which = getKey(),
            o = which % 2 ? this._uHScrollbar : this._uVScrollbar;

        if (which >= 37 && which <= 40 && !event.target.value) {
            if (o) {
                o.skip(which + which % 2 - 39);
            }
            return false;
        }
    };

    /**
     * 如果有垂直滚动条，则垂直滚动条随滚轮滚动。
     * @override
     */
    UI_PANEL_CLASS.$mousewheel = function (event) {
        if (this.isHovered()) {
            o = this._uVScrollbar;

            if (o && o.isShow()) {
                // 计算滚动的次数，至少要滚动一次
                var value = o.getValue(),
                    delta = this._nWheelDelta || FLOOR(20 / o.getStep()) || 1,
                    o;

                o.skip(event.detail > 0 ? delta : -delta);
                event.stopPropagation();
                // 如果截面已经移动到最后，不屏弊缺省事件
                return value == o.getValue();
            }
        }
    };

    /**
     * 控件的滚动条发生滚动的默认处理。
     * 如果控件包含滚动条，滚动条滚动时触发 onscroll 事件，如果事件返回值不为 false，则调用 $scroll 方法。
     * @protected
     */
    UI_PANEL_CLASS.$scroll = function () {
        var style = this.getBody().style;
        style.left = -MAX(this.getScrollLeft(), 0) + 'px';
        style.top = -MAX(this.getScrollTop(), 0) + 'px';
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();

        var basicWidth = this.$getBasicWidth(),
            basicHeight = this.$getBasicHeight(),
            paddingWidth = this.$$paddingLeft + this.$$paddingRight,
            paddingHeight = this.$$paddingTop + this.$$paddingBottom,
            bodyWidth = this.getWidth() - basicWidth,
            bodyHeight = this.getHeight() - basicHeight,
            mainWidth = this.$$mainWidth,
            mainHeight = this.$$mainHeight,
            browser = this._eBrowser,
            vscroll = this._uVScrollbar,
            hscroll = this._uHScrollbar,
            corner = this._uCorner,
            vsWidth = vscroll ? vscroll.getWidth() : 0,
            hsHeight = hscroll ? hscroll.getHeight() : 0, 
            innerWidth = bodyWidth - vsWidth,
            innerHeight = bodyHeight - hsHeight,
            hsWidth = innerWidth + paddingWidth,
            vsHeight = innerHeight + paddingHeight;

        // 设置垂直与水平滚动条与夹角控件的位置
        if (vscroll) {
            vscroll.setPosition(hsWidth, 0);
        }
        if (hscroll) {
            hscroll.setPosition(0, vsHeight);
        }
        if (corner) {
            corner.setPosition(hsWidth, vsHeight);
        }

        if (mainWidth <= bodyWidth && mainHeight <= bodyHeight) {
            // 宽度与高度都没有超过截面控件的宽度与高度，不需要显示滚动条
            if (vscroll) {
                vscroll.$hide();
            }
            if (hscroll) {
                hscroll.$hide();
            }
            if (corner) {
                corner.$hide();
            }
            innerWidth = bodyWidth;
            innerHeight = bodyHeight;
        }
        else {
            while (true) {
                if (corner) {
                    // 宽度与高度都超出了显示滚动条后余下的宽度与高度，垂直与水平滚动条同时显示
                    if (mainWidth > innerWidth && mainHeight > innerHeight) {
                        hscroll.$setSize(hsWidth);
                        hscroll.setTotal(browser ? mainWidth + basicWidth : mainWidth - innerWidth);
                        hscroll.$show();
                        vscroll.$setSize(0, vsHeight);
                        vscroll.setTotal(browser ? mainHeight + basicHeight : mainHeight - innerHeight);
                        vscroll.$show();
                        corner.$setSize(vsWidth, hsHeight);
                        corner.$show();
                        break;
                    }
                    corner.$hide();
                }
                if (hscroll) {
                    if (mainWidth > bodyWidth) {
                        // 宽度超出控件的宽度，高度没有超出显示水平滚动条后余下的高度，只显示水平滚动条
                        hscroll.$setSize(bodyWidth + paddingWidth);
                        hscroll.setTotal(browser ? mainWidth + basicWidth : mainWidth - bodyWidth);
                        hscroll.$show();
                        if (vscroll) {
                            vscroll.$hide();
                        }
                        innerWidth = bodyWidth;
                    }
                    else {
                        hscroll.$hide();
                    }
                }
                if (vscroll) {
                    if (mainHeight > bodyHeight) {
                        // 高度超出控件的高度，宽度没有超出显示水平滚动条后余下的宽度，只显示水平滚动条
                        vscroll.$setSize(0, bodyHeight + paddingHeight);
                        vscroll.setTotal(browser ? mainHeight + basicHeight : mainHeight - bodyHeight);
                        vscroll.$show();
                        if (hscroll) {
                            hscroll.$hide();
                        }
                        innerHeight = bodyHeight;
                    }
                    else {
                        vscroll.$hide();
                    }
                }
                break;
            }
        }

        innerWidth -= this.$$bodyWidthRevise;
        innerHeight -= this.$$bodyHeightRevise;

        if (vscroll) {
            vscroll.$setPageStep(innerHeight);
        }
        if (hscroll) {
            hscroll.$setPageStep(innerWidth);
        }
    
        // 设置内部定位器的大小，以下使用 corner 表示 style
        if (browser) {
            corner = browser.style;
            corner.width = bodyWidth + paddingWidth + 'px';
            corner.height = bodyHeight + paddingHeight + 'px';
        }

        corner = getParent(this.getBody()).style;
        corner.width = innerWidth + 'px';
        corner.height = innerHeight + 'px';
    };

    /**
     * 获取水平滚动条的当前值。
     * getScrollLeft 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 水平滚动条的当前值，如果没有水平滚动条返回 -1
     */
    UI_PANEL_CLASS.getScrollLeft = function () {
        var o = this._uHScrollbar;
        return o ? o.getValue() : -1;
    };

    /**
     * 获取垂直滚动条的当前值。
     * getScrollTop 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 垂直滚动条的当前值，如果没有垂直滚动条返回 -1
     */
    UI_PANEL_CLASS.getScrollTop = function () {
        var o = this._uVScrollbar;
        return o ? o.getValue() : -1;
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        if (this._uVScrollbar) {
            this._uVScrollbar.init();
        }
        if (this._uHScrollbar) {
            this._uHScrollbar.init();
        }
        if (this._uCorner) {
            this._uCorner.init();
        }
    };

    /**
     * 控件显示区域复位。
     * reset 方法设置水平滚动条或者垂直滚动条的当前值为 0。
     * @public
     */
    UI_PANEL_CLASS.reset = function () {
        if (this._uVScrollbar) {
            this._uVScrollbar.setValue(0);
        }
        if (this._uHScrollbar) {
            this._uHScrollbar.setValue(0);
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Item/Items - 定义选项操作相关的基本操作。
选项控件，继承自基础控件，用于弹出菜单、下拉框、交换框等控件的单个选项，通常不直接初始化。选项控件必须用在使用选项组接口(Items)的控件中。
选项组不是控件，是一组对选项进行操作的方法的集合，提供了基本的增/删操作，通过将 ecui.ui.Items 对象下的方法复制到类的 prototype 属性下继承接口，最终对象要正常使用还需要在类构造器中调用 $initItems 方法。
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,

        indexOf = array.indexOf,
        remove = array.remove,
        children = dom.children,
        createDom = dom.create,
        insertBefore = dom.insertBefore,
        trim = string.trim,
        blank = util.blank,
        callSuper = util.callSuper,

        $fastCreate = core.$fastCreate,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_ITEM
    ///__gzip_original__UI_ITEMS
    /**
     * 初始化选项控件。
     * @public
     *
     * @param {string|Object} options 对象
     */
    var UI_ITEM = ui.Item =
        inheritsControl(
            UI_CONTROL,
            'ui-item',
            function (el, options) {
                el.style.overflow = 'hidden';
            }
        ),
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items = {};
//{else}//
    /**
     * 选项控件的点击事件将触发选项组的 onitemclick 事件。
     * @override
     */
    UI_ITEM_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);

        var parent = this.getParent();
        if (parent) {
            triggerEvent(parent, 'itemclick', event, [indexOf(UI_ITEMS[parent.getUID()], this)]);
        }
    };

    /**
     * 选项组只允许添加选项控件，添加成功后会自动调用 $alterItems 方法。
     * @override
     */
    UI_ITEMS.$append = function (child) {
        // 检查待新增的控件是否为选项控件
        if (!(child instanceof (this.Item || UI_ITEM)) || callSuper(this, '$append') === false) {
            return false;
        }
        UI_ITEMS[this.getUID()].push(child);
        this.$alterItems();
    };

    /**
     * @override
     */
    UI_ITEMS.$cache = function (style, cacheSize) {
        callSuper(this, '$cache');

        for (var i = 0, list = UI_ITEMS[this.getUID()], o; o = list[i++]; ) {
            o.cache(true, true);
        }
    };

    /**
     * @override
     */
    UI_ITEMS.$dispose = function () {
        delete UI_ITEMS[this.getUID()];
        callSuper(this, '$dispose');
    };

    /**
     * 初始化选项组对应的内部元素对象。
     * 选项组假设选项的主元素在内部元素中，因此实现了 Items 接口的类在初始化时需要调用 $initItems 方法自动生成选项控件，$initItems 方法内部保证一个控件对象只允许被调用一次，多次的调用无效。
     * @protected
     */
    UI_ITEMS.$initItems = function () {
        // 防止因为选项变化引起重复刷新，以及防止控件进行多次初始化操作
        this.$alterItems = this.$initItems = blank;

        UI_ITEMS[this.getUID()] = [];

        // 初始化选项控件
        for (var i = 0, list = children(this.getBody()), o; o = list[i++]; ) {
            this.add(o);
        }

        delete this.$alterItems;
    };

    /**
     * 选项组移除子选项后会自动调用 $alterItems 方法。
     * @override
     */
    UI_ITEMS.$remove = function (child) {
        callSuper(this, '$remove');
        remove(UI_ITEMS[this.getUID()], child);
        this.$alterItems();
    };

    /**
     * 添加子选项控件。
     * add 方法中如果位置序号不合法，子选项控件将添加在末尾的位置。
     * @public
     *
     * @param {string|HTMLElement|ecui.ui.Item} item 控件的 html 内容/控件对应的主元素对象/选项控件
     * @param {number} index 子选项控件需要添加的位置序号
     * @param {Object} options 子控件初始化选项
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.add = function (item, index, options) {
        var list = UI_ITEMS[this.getUID()],
            o;

        if (item instanceof UI_ITEM) {
            // 选项控件，直接添加
            item.setParent(this);
        }
        else {
            // 根据是字符串还是Element对象选择不同的初始化方式
            if ('string' == typeof item) {
                this.getBody().appendChild(o = createDom());
                o.innerHTML = item;
                item = o;
            }

            o = this.Item || UI_ITEM;
            item.className = trim(item.className) + ' ' + this.getType() + '-item' + o.TYPES;

            options = options || getOptions(item);
            options.parent = this;
            options.select = false;
            list.push(item = $fastCreate(o, item, this, options));
            this.$alterItems();
        }

        // 改变选项控件的位置
        if (item.getParent() && (o = list[index]) && o != item) {
            insertBefore(item.getOuter(), o.getOuter());
            list.splice(index, 0, list.pop());
        }

        return item;
    };

    /**
     * 向选项组最后添加子选项控件。
     * append 方法是 add 方法去掉第二个 index 参数的版本。
     * @public
     *
     * @param {string|Element|ecui.ui.Item} item 控件的 html 内容/控件对应的主元素对象/选项控件
     * @param {Object} 子控件初始化选项
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.append = function (item, options) {
        this.add(item, undefined, options);
    };

    /**
     * 获取全部的子选项控件。
     * @public
     *
     * @return {Array} 子选项控件数组
     */
    UI_ITEMS.getItems = function () {
        return UI_ITEMS[this.getUID()].slice();
    };

    /**
     * @override
     */
    UI_ITEMS.init = function () {
        callSuper(this, 'init');
        this.$alterItems();
    };

    /**
     * 移除子选项控件。
     * @public
     *
     * @param {number|ecui.ui.Item} item 选项控件的位置序号/选项控件
     * @return {ecui.ui.Item} 被移除的子选项控件
     */
    UI_ITEMS.remove = function (item) {
        if ('number' == typeof item) {
            item = UI_ITEMS[this.getUID()][item];
        }
        if (item) {
            item.setParent();
        }
        return item || null;
    };

    /**
     * 设置控件内所有子选项控件的大小。
     * @public
     *
     * @param {number} itemWidth 子选项控件的宽度
     * @param {number} itemHeight 子选项控件的高度
     */
    UI_ITEMS.setItemSize = function (itemWidth, itemHeight) {
        for (var i = 0, list = UI_ITEMS[this.getUID()], o; o = list[i++]; ) {
            o.$setSize(itemWidth, itemHeight);
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Checkbox - 定义单个设置项选择状态的基本操作。
复选框控件，继承自输入控件，实现了对原生 InputElement 复选框的功能扩展，支持复选框之间的主从关系定义。当一个复选框的“从复选框”选中一部分时，“主复选框”将处于半选状态，这种状态逻辑意义上等同于未选择状态，但显示效果不同，复选框的主从关系可以有多级。复选框控件适用所有在一组中允许选择多个目标的交互，并不局限于此分组的表现形式(文本、图片等)。

复选框控件直接HTML初始化的例子:
<input ecui="type:checkbox;subject:china" name="city" value="beijing" checked="checked" type="checkbox">
或
<div ecui="type:checkbox;name:city;value:beijing;checked:true;subject:china"></div>
或
<div ecui="type:checkbox;subject:china">
  <input name="city" value="beijing" checked="checked" type="checkbox">
</div>

属性
_bDefault        - 默认的选中状态
_nStatus         - 复选框当前的状态，0--全选，1--未选，2--半选
_cSubject        - 主复选框
_aDependents     - 所有的从属复选框
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        ui = core.ui,
        util = core.util,

        undefined,

        remove = array.remove,
        setDefault = util.setDefault,

        $connect = core.$connect,
        getKey = core.getKey,
        inheritsControl = core.inherits,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_CHECKBOX
    ///__gzip_original__UI_CHECKBOX_CLASS
    /**
     * 初始化复选框控件。
     * options 对象支持的属性如下：
     * subject 主复选框 ID，会自动与主复选框建立关联后，作为主复选框的从属复选框之一
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CHECKBOX = ui.Checkbox =
        inheritsControl(
            UI_INPUT_CONTROL,
            'ui-checkbox',
            function (el, options) {
                setDefault(options, 'hidden', true);
                setDefault(options, 'inputType', 'checkbox');
            },
            function (el, options) {
                // 保存节点选中状态，用于修复IE6/7下移动DOM节点时选中状态发生改变的问题
                this._bDefault = this.getInput().defaultChecked;
                this._aDependents = [];

                $connect(this, this.setSubject, options.subject);
            }
        ),
        UI_CHECKBOX_CLASS = UI_CHECKBOX.prototype;
//{else}//
    /**
     * 改变复选框状态。
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框对象
     * @param {number} status 新的状态，0--全选，1--未选，2--半选
     */
    function UI_CHECKBOX_CHANGE(control, status) {
        if (status !== control._nStatus) {
            // 状态发生改变时进行处理
            control.setClass(control.getPrimary() + ['-checked', '', '-part'][status]);

            control._nStatus = status;

            var el = control.getInput();
            el.defaultChecked = el.checked = !status;

            // 如果有主复选框，刷新主复选框的状态
            if (control._cSubject) {
                UI_CHECKBOX_FLUSH(control._cSubject);
            }
        }
    }

    /**
     * 复选框控件刷新，计算所有从复选框，根据它们的选中状态计算自身的选中状态。
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框控件
     */
    function UI_CHECKBOX_FLUSH(control) {
        for (var i = 0, status, o; o = control._aDependents[i++]; ) {
            if (status !== undefined && status != o._nStatus) {
                status = 2;
                break;
            }
            status = o._nStatus;
        }

        if (status !== undefined) {
            UI_CHECKBOX_CHANGE(control, status);
        }
    }

    /**
     * 控件点击时改变当前的选中状态。
     * @override
     */
    UI_CHECKBOX_CLASS.$click = function (event) {
        UI_INPUT_CONTROL_CLASS.$click.call(this, event);
        this.setChecked(!!this._nStatus);
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$dispose = function () {
        var arr = this._aDependents.slice(0),
            i, o;

        this.setSubject();
        for (i = 0; o = arr[i]; i++) {
            o.setSubject();
        }
        UI_INPUT_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 接管对空格键的处理。
     * @override
     */
    UI_CHECKBOX_CLASS.$keydown = UI_CHECKBOX_CLASS.$keypress = UI_CHECKBOX_CLASS.$keyup = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type].call(this, event);
        if (getKey() == 32) {
            // 屏蔽空格键，防止屏幕发生滚动
            if (event.type == 'keyup') {
                this.setChecked(!!this._nStatus);
            }
            event.preventDefault();
        }
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$ready = function () {
        if (!this._aDependents.length) {
            // 如果控件是主复选框，应该直接根据从属复选框的状态来显示自己的状态
            UI_CHECKBOX_CHANGE(this, this.getInput().checked ? 0 : 1);
        }
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$reset = function (event) {
        // 修复IE6/7下移动DOM节点时选中状态发生改变的问题
        this.getInput().checked = this._bDefault;
        UI_INPUT_CONTROL_CLASS.$reset.call(this, event);
    };

    /**
     * 获取全部的从属复选框。
     * 复选框控件调用 setSubject 方法指定了主复选框后，它就是主复选框的从属复选框之一。
     * @public
     *
     * @return {Array} 复选框控件数组
     */
    UI_CHECKBOX_CLASS.getDependents = function () {
        return this._aDependents.slice();
    };

    /**
     * 获取主复选框。
     * getSubject 方法返回调用 setSubject 方法指定的主复选框控件。
     * @public
     *
     * @return {ecui.ui.Checkbox} 复选框控件
     */
    UI_CHECKBOX_CLASS.getSubject = function () {
        return this._cSubject || null;
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_CHECKBOX_CLASS.isChecked = function () {
        return !this._nStatus;
    };

    /**
     * 设置复选框控件选中状态。
     * @public
     *
     * @param {boolean} checked 是否选中
     */
    UI_CHECKBOX_CLASS.setChecked = function (checked) {
        UI_CHECKBOX_CHANGE(this, checked ? 0 : 1);
        // 如果有从属复选框，全部改为与当前复选框相同的状态
        for (var i = 0, o; o = this._aDependents[i++]; ) {
            o.setChecked(checked);
        }
    };

    /**
     * override
     */
    UI_CHECKBOX_CLASS.setDefaultValue = function () {
        this._bDefault = this.isChecked();
    };

    /**
     * 设置主复选框。
     * setSubject 方法指定主复选框控件后，可以通过访问主复选框控件的 getDependents 方法获取列表，列表中即包含了当前的控件。请注意，控件从 DOM 树上被移除时，不会自动解除主从关系，联动可能出现异情，此时请调用 setSubject 方法传入空参数解除主从关系。
     * @public
     *
     * @param {ecui.ui.Checkbox} checkbox 主复选框
     */
    UI_CHECKBOX_CLASS.setSubject = function (checkbox) {
        var oldSubject = this._cSubject;
        if (oldSubject != checkbox) {
            this._cSubject = checkbox;

            if (oldSubject) {
                // 已经设置过主复选框，需要先释放引用
                remove(oldSubject._aDependents, this);
                UI_CHECKBOX_FLUSH(oldSubject);
            }

            if (checkbox) {
                checkbox._aDependents.push(this);
                UI_CHECKBOX_FLUSH(checkbox);
            }
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Radio - 定义一组选项中选择唯一选项的基本操作。
单选框控件，继承自输入框控件，实现了对原生 InputElement 单选框的功能扩展，支持对选中的图案的选择。单选框控件适用所有在一组中只允许选择一个目标的交互，并不局限于此分组的表现形式(文本、图片等)。

单选框控件直接HTML初始化的例子:
<input ecui="type:radio" name="city" value="beijing" checked="checked" type="radio">
或
<div ecui="type:radio;name:city;value:beijing;checked:true"></div>
或
<div ecui="type:radio">
  <input name="city" value="beijing" checked="checked" type="radio">
</div>

属性
_bDefault  - 默认的选中状态
*/
//{if 0}//
(function () {

    var core = ecui,
        ui = core.ui,
        util = core.util,

        undefined,

        setDefault = util.setDefault,

        getKey = core.getKey,
        inheritsControl = core.inherits,
        query = core.query,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_RADIO
    ///__gzip_original__UI_RADIO_CLASS
    /**
     * 初始化单选框控件。
     * options 对象支持的属性如下：
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_RADIO = ui.Radio =
        inheritsControl(
            UI_INPUT_CONTROL,
            'ui-radio',
            function (el, options) {
                setDefault(options, 'hidden', true);
                setDefault(options, 'inputType', 'radio');
            },
            function (el, options) {
                // 保存节点选中状态，用于修复IE6/7下移动DOM节点时选中状态发生改变的问题
                this._bDefault = this.getInput().defaultChecked;
            }
        ),
        UI_RADIO_CLASS = UI_RADIO.prototype;
//{else}//
    /**
     * 单选框控件刷新。
     * @private
     *
     * @param {ecui.ui.Radio} control 单选框控件
     * @param {boolean|undefined} checked 新的状态，如果忽略表示不改变当前状态
     */
    function UI_RADIO_FLUSH(control, checked) {
        if (checked !== undefined) {
            var el = control.getInput();
            el.defaultChecked = el.checked = checked;
        }
        control.setClass(control.getPrimary() + (control.isChecked() ? '-checked' : ''));
    }

    /**
     * 控件点击时将控件设置成为选中状态，同时取消同一个单选框控件组的其它控件的选中状态。
     * @override
     */
    UI_RADIO_CLASS.$click = function (event) {
        UI_INPUT_CONTROL_CLASS.$click.call(this, event);
        this.setChecked(true);
    };

    /**
     * 接管对空格键的处理。
     * @override
     */
    UI_RADIO_CLASS.$keydown = UI_RADIO_CLASS.$keypress = UI_RADIO_CLASS.$keyup = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type].call(this, event);
        if (event.which == 32) {
            if (event.type == 'keyup' && getKey() == 32) {
                this.setChecked(true);
            }
            event.preventDefault();
        }
    };

    /**
     * @override
     */
    UI_RADIO_CLASS.$ready = function () {
        UI_RADIO_FLUSH(this);
    };

    /**
     * @override
     */
    UI_RADIO_CLASS.$reset = function (event) {
        // 修复IE6/7下移动DOM节点时选中状态发生改变的问题
        this.getInput().checked = this._bDefault;
        UI_INPUT_CONTROL_CLASS.$reset.call(this, event);
    };

    /**
     * 获取与当前单选框同组的全部单选框。
     * getItems 方法返回包括当前单选框在内的与当前单选框同组的全部单选框，同组的单选框选中状态存在唯一性。
     * @public
     *
     * @return {Array} 单选框控件数组
     */
    UI_RADIO_CLASS.getItems = function () {
        //__gzip_original__form
        var i = 0,
            list = this.getInput(),
            form = list.form,
            o = list.name,
            result = [];

        if (!o) {
            return [this];
        }
        else if (form) {
            // 必须 name 也不为空，否则 form[o] 的值在部分浏览器下将是空
            for (list = form[o]; o = list[i++]; ) {
                if (o.getControl) {
                    result.push(o.getControl());
                }
            }
            return result;
        }
        else {
            return query({type: UI_RADIO, custom: function (control) {
                return !control.getInput().form && control.getName() == o;
            }});
        }
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_RADIO_CLASS.isChecked = function () {
        return this.getInput().checked;
    };

    /**
     * 设置单选框控件选中状态。
     * 将控件设置成为选中状态，会取消同一个单选框控件组的其它控件的选中状态。
     * @public
     *
     * @param {boolean} checked 是否选中
     */
    UI_RADIO_CLASS.setChecked = function (checked) {
        if (this.isChecked() != checked) {
            if (checked) {
                for (var i = 0, list = this.getItems(), o; o = list[i++]; ) {
                    UI_RADIO_FLUSH(o, o == this);
                }
            }
            else {
                UI_RADIO_FLUSH(this, false);
            }
        }
    };

    /**
     * override
     */
    UI_RADIO_CLASS.setDefaultValue = function () {
        this._bDefault = this.isChecked();
    };
//{/if}//
//{if 0}//
})();
//{/if}//

﻿/*
Select - 定义模拟下拉框行为的基本操作。
下拉框控件，继承自输入控件，实现了选项组接口，扩展了原生 SelectElement 的功能，允许指定下拉选项框的最大选项数量，在屏幕显示不下的时候，会自动显示在下拉框的上方。在没有选项时，下拉选项框有一个选项的高度。下拉框控件允许使用键盘与滚轮操作，在下拉选项框打开时，可以通过回车键或鼠标点击选择，上下键选择选项的当前条目，在关闭下拉选项框后，只要拥有焦点，就可以通过滚轮上下选择选项。

下拉框控件直接HTML初始化的例子:
<select ecui="type:select" name="sex">
  <option value="male" selected="selected">男</option>
  <option value="female">女</option>
</select>
或
<div ecui="type:select;name:sex;value:male">
  <div ecui="value:male">男</div>
  <div ecui="value:female">女</div>
</div>

属性
_nOptionSize  - 下接选择框可以用于选择的条目数量
_cSelected    - 当前选中的选项
_uText        - 下拉框的文本框
_uButton      - 下拉框的按钮
_uOptions     - 下拉选择框
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getText = dom.getText,
        insertAfter = dom.insertAfter,
        insertBefore = dom.insertBefore,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        encodeHTML = string.encodeHTML,
        extend = util.extend,
        getView = util.getView,
        setDefault = util.setDefault,

        $fastCreate = core.$fastCreate,
        getAttributeName = core.getAttributeName,
        getFocused = core.getFocused,
        inheritsControl = core.inherits,
        intercept = core.intercept,
        mask = core.mask,
        restore = core.restore,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_SCROLLBAR = ui.Scrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SELECT
    ///__gzip_original__UI_SELECT_CLASS
    /**
     * 初始化下拉框控件。
     * options 对象支持的属性如下：
     * browser        是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * optionSize     下拉框最大允许显示的选项数量，默认为5
     * optionsElement 下拉选项主元素
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_SELECT = ui.Select =
        inheritsControl(
            UI_INPUT_CONTROL,
            'ui-select',
            function (el, options) {
                var name = el.name || options.name || '',
                    type = this.getType(),

                    id = options.id || 'id_notset',
                    optionsEl = createDom(
                        type + '-options' + this.Options.TYPES,
                        'position:absolute;z-index:65535;display:none'
                    );

                optionsEl.setAttribute('ecui_id', id);
                   
                setDefault(options, 'hidden', true);

                if (el.tagName == 'SELECT') {
                    var i = 0,
                        list = [],
                        elements = el.options,
                        o = el;

                    options.value = el.value;

                    // 移除select标签
                    el = insertBefore(createDom(el.className, el.style.cssText, 'span'), el);
                    removeDom(o);

                    // 转化select标签
                    for (; o = elements[i]; ) {
                        // 这里的text不进行转义，特殊字符不保证安全
                        list[i++] =
                            '<div ' + getAttributeName() + '="value:' + encodeHTML(o.value) + '">' +
                                o.text + '</div>';
                    }
                    optionsEl.innerHTML = list.join('');
                }
                else {
                    moveElements(el, optionsEl);
                }

                el.innerHTML =
                    '<span class="' + type + '-text' + UI_ITEM.TYPES + '"></span><span class="' + type + '-button' +
                        UI_BUTTON.TYPES + '" style="position:absolute"></span><input name="' + name + '" value="' +
                        encodeHTML(options.value || '') + '">';

                el.appendChild(optionsEl);

                return el;
            },
            function (el, options) {
                el = children(el);

                this._uText = $fastCreate(UI_ITEM, el[0], this, {capturable: false});
                this._uButton = $fastCreate(UI_BUTTON, el[1], this, {capturable: false});

                this._uOptions = $fastCreate(
                    this.Options,
                    removeDom(el[3]),
                    this,
                    {hScroll: false, browser: options.browser}
                );

                this.$setBody(this._uOptions.getBody());
                // 初始化下拉区域最多显示的选项数量
                this._nOptionSize = options.optionSize || 5;

                this.$initItems();
            }
        ),
        UI_SELECT_CLASS = UI_SELECT.prototype,

        /**
         * 初始化下拉框控件的下拉选项框部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SELECT_OPTIONS_CLASS = (UI_SELECT_CLASS.Options = inheritsControl(UI_PANEL)).prototype,

        /**
         * 初始化下拉框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SELECT_ITEM_CLASS =
            (UI_SELECT_CLASS.Item = inheritsControl(
                UI_ITEM,
                null,
                null,
                function (el, options) {
                    this._sValue = options.value === undefined ? getText(el) : '' + options.value;
                }
            )).prototype;
//{else}//
    /**
     * 下拉框刷新。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    function UI_SELECT_FLUSH(control) {
        var options = control._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            el = options.getOuter(),
            pos = getPosition(control.getOuter()),
            selected = control._cSelected,
            optionTop = pos.top + control.getHeight();

        if (!getParent(el)) {
            // 第一次显示时需要进行下拉选项部分的初始化，将其挂载到 DOM 树中
            DOCUMENT.body.appendChild(el);
            control.cache(false, true);
            control.$alterItems();
        }

        if (options.isShow()) {
            if (selected) {
                setFocused(selected);
            }
            scrollbar.setValue(scrollbar.getStep() * indexOf(control.getItems(), selected));

            // 以下使用control代替optionHeight
            control = options.getHeight();

            // 如果浏览器下部高度不够，将显示在控件的上部
            options.setPosition(
                pos.left,
                optionTop + control <= getView().bottom ? optionTop : pos.top - control
            );
        }
    }

    /**
     * 改变下拉框当前选中的项。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     * @param {ecui.ui.Select.Item} item 新选中的项
     */
    function UI_SELECT_CHANGE_SELECTED(control, item) {
        if (item !== control._cSelected) {
            control._uText.setContent(item ? item.getBody().innerHTML : '');
            UI_INPUT_CONTROL_CLASS.setValue.call(control, item ? item._sValue : '');
            control._cSelected = item;
            if (control._uOptions.isShow()) {
                setFocused(item);
            }
        }
    }

    extend(UI_SELECT_CLASS, UI_ITEMS);

    /**
     * 销毁选项框部件时需要检查是否展开，如果展开需要先关闭。
     * @override
     */
    UI_SELECT_OPTIONS_CLASS.$dispose = function () {
        this.hide();
        UI_PANEL_CLASS.$dispose.call(this);
    };

    /**
     * 关闭选项框部件时，需要恢复强制拦截的环境。
     * @override
     */
    UI_SELECT_OPTIONS_CLASS.$hide = function () {
        UI_PANEL_CLASS.$hide.call(this);
        mask();
        restore();
    };

    /**
     * 对于下拉框选项，鼠标移入即自动获得焦点。
     * @override
     */
    UI_SELECT_ITEM_CLASS.$mouseover = function (event) {
        UI_ITEM_CLASS.$mouseover.call(this, event);
        setFocused(this);
    };

    /**
     * 获取选项的值。
     * getValue 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 选项的值
     */
    UI_SELECT_ITEM_CLASS.getValue = function () {
        return this._sValue;
    };

    /**
     * 设置选项的值。
     * setValue 方法设置选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @param {string} value 选项的值
     */
    UI_SELECT_ITEM_CLASS.setValue = function (value) {
        var parent = this.getParent();
        this._sValue = value;
        if (parent && this == parent._cSelected) {
            // 当前被选中项的值发生变更需要同步更新控件的值
            UI_INPUT_CONTROL_CLASS.setValue.call(parent, value);
        }
    };

    /**
     * 下拉框控件激活时，显示选项框，产生遮罩层阻止对页面内 DOM 节点的点击，并设置框架进入强制点击拦截状态。
     * @override
     */
    UI_SELECT_CLASS.$activate = function (event) {
        if (!(event.getControl() instanceof UI_SCROLLBAR)) {
            UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
            this._uOptions.show();
            // 拦截之后的点击，同时屏蔽所有的控件点击事件
            intercept(this);
            mask(0, 65534);
            UI_SELECT_FLUSH(this);
            event.stopPropagation();
        }
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生添加/移除操作时调用此方法。虚方法，子控件必须实现。
     * @protected
     */
    UI_SELECT_CLASS.$alterItems = function () {
        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            step = this.getBodyHeight(),
            width = this.getWidth(),
            itemLength = this.getItems().length;

        if (getParent(options.getOuter())) {
            // 设置选项框
            scrollbar.setStep(step);

            // 为了设置激活状态样式, 因此必须控制下拉框中的选项必须在滚动条以内
            this.setItemSize(
                width - options.getMinimumWidth() - (itemLength > optionSize ? scrollbar.getWidth() : 0),
                step
            );

            // 设置options框的大小，如果没有元素，至少有一个单位的高度
            options.$$mainHeight = itemLength * step + options.$$bodyHeightRevise;
            options.$setSize(width, (MIN(itemLength, optionSize) || 1) * step + options.getMinimumHeight());
        }
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$cache = function (style, cacheSize) {
        (getParent(this._uOptions.getOuter()) ? UI_ITEMS : UI_INPUT_CONTROL_CLASS)
            .$cache.call(this, style, cacheSize);
        this._uText.cache(false, true);
        this._uButton.cache(false, true);
        this._uOptions.cache(false, true);
    };

    /**
     * 控件在下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框。
     * @override
     */
    UI_SELECT_CLASS.$intercept = function (event) {
        //__transform__control_o
        this._uOptions.hide();
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof this.Item) {
                if (control != this._cSelected) {
                    // 检查点击是否在当前下拉框的选项上
                    UI_SELECT_CHANGE_SELECTED(this, control);
                    triggerEvent(this, 'change');
                }
                break;
            }
        }
        event.exit();
    };

    /**
     * 接管对上下键与回车/ESC键的处理。
     * @override
     */
    UI_SELECT_CLASS.$keydown = UI_SELECT_CLASS.$keypress = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type](event);

        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            which = event.which,
            list = this.getItems(),
            length = list.length,
            focus = getFocused();

        if (this.isFocused()) {
            // 当前不能存在鼠标操作，否则屏蔽按键
            if (which == 40 || which == 38) {
                if (length) {
                    if (options.isShow()) {
                        setFocused(list[which = MIN(MAX(0, indexOf(list, focus) + which - 39), length - 1)]);
                        which -= scrollbar.getValue() / scrollbar.getStep();
                        scrollbar.skip(which < 0 ? which : which >= optionSize ? which - optionSize + 1 : 0);
                    }
                    else {
                        this.setSelectedIndex(MIN(MAX(0, indexOf(list, this._cSelected) + which - 39), length - 1));
                    }
                }
                return false;
            }
            else if (which == 27 || which == 13 && options.isShow()) {
                // 回车键选中，ESC键取消
                options.hide();
                if (which == 13) {
                    UI_SELECT_CHANGE_SELECTED(this, focus);
                    //触发change事件
                    triggerEvent(this, 'change');
                }
                return false;
            }
        }
    };

    /**
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。
     * @override
     */
    UI_SELECT_CLASS.$mousewheel = function (event) {
        if (this.isFocused()) {
            var options = this._uOptions,
                list = this.getItems(),
                length = list.length;

            if (options.isShow()) {
                options.$mousewheel(event);
            }
            else {
                //options表示当前选项的index
                options = indexOf(list, this._cSelected) + (event.detail > 0 ? 1 : -1)
                this.setSelectedIndex(
                    length ?
                        MIN(MAX(0, options), length - 1) : null
                );
                if (options >= 0 && options < length) {
                    //鼠标滚动触发change事件
                    triggerEvent(this, 'change');
                }
            }

            event.exit();
        }
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$ready = function () {
        this.setValue(this.getValue());
    };

    /**
     * 下拉框移除子选项时，如果选项是否被选中，需要先取消选中。
     * @override
     */
    UI_SELECT_CLASS.remove = function (item) {
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }
        if (item == this._cSelected) {
            UI_SELECT_CHANGE_SELECTED(this);
        }
        return UI_ITEMS.remove.call(this, item);
    };

    /**
     * 添加选项需要根据情况继续cache操作
     * @override
     */
    UI_SELECT_CLASS.add = function (item, index, options) {
        item = UI_ITEMS.add.call(this, item, index, options);
        if (getParent(this._uOptions.getOuter())) {
            item.cache(true, true);
        }
        return item;
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$setSize = function (width, height) {
        UI_INPUT_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
        height = this.getBodyHeight();

        // 设置文本区域
        this._uText.$setSize(width = this.getBodyWidth() - height, height);

        // 设置下拉按钮
        this._uButton.$setSize(height, height);
        this._uButton.setPosition(width, 0);
    };

    /**
     * 获取被选中的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 选项控件
     */
    UI_SELECT_CLASS.getSelected = function () {
        return this._cSelected || null;
    };

    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_SELECT_CLASS.setOptionSize = function (value) {
        this._nOptionSize = value;
        this.$alterItems();
        UI_SELECT_FLUSH(this);
    };

    /**
     * 根据序号选中选项。
     * @public
     *
     * @param {number} index 选项的序号
     */
    UI_SELECT_CLASS.setSelectedIndex = function (index) {
        UI_SELECT_CHANGE_SELECTED(this, this.getItems()[index]);
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件的值，设置的值必须与一个子选项的值相等，否则将被设置为空，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 需要选中的值
     */
    UI_SELECT_CLASS.setValue = function (value) {
        for (var i = 0, list = this.getItems(), o; o = list[i++]; ) {
            if (o._sValue == value) {
                UI_SELECT_CHANGE_SELECTED(this, o);
                return;
            }
        }

        // 找不到满足条件的项，将选中的值清除
        UI_SELECT_CHANGE_SELECTED(this);
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Label - 定义事件转发的基本操作。
标签控件，继承自基础控件，将事件转发到指定的控件上，通常与 Radio、Checkbox 等控件联合使用，扩大点击响应区域。

标签控件直接HTML初始化的例子:
<div ecui="type:label;for:checkbox"></div>

属性
_cFor - 被转发的控件对象
*/
//{if 0}//
(function () {

    var core = ecui,
        ui = core.ui,
        util = core.util,

        inheritsControl = core.inherits,
        $connect = core.$connect,
        triggerEvent = core.triggerEvent,
        blank = util.blank,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,

        AGENT_EVENT = ['click', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化标签控件。
     * options 对象支持的属性如下：
     * for 被转发的控件 id
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_LABEL
    var UI_LABEL = ui.Label = inheritsControl(
            UI_CONTROL,
            'ui-label',
            null,
            function (el, options) {
                this._bResizable = false;
                $connect(this, this.setFor, options['for']);
            }
        ),
        UI_LABEL_CLASS = UI_LABEL.prototype;
//{else}//
    /**
     * 设置控件的事件转发接收控件。
     * setFor 方法设置事件转发的被动接收者，如果没有设置，则事件不会被转发。
     * @public
     *
     * @param {ecui.ui.Control} control 事件转发接收控件
     */
    UI_LABEL_CLASS.setFor = function (control) {
        this._cFor = control;
    };


    UI_LABEL_CLASS.$setSize = blank;

    // 设置事件转发
    (function () {
        var i, name;
        
        for (i = 0; name = AGENT_EVENT[i]; i++) {
            UI_LABEL_CLASS['$' + name]  = (function (name) {
                return function (event) {
                    UI_CONTROL_CLASS['$' + name].call(this, event);

                    var control = this._cFor;
                    if (control && !control.isDisabled()) {
                        triggerEvent(control, name, event);
                    }
                };
            })(name);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
Form - 定义独立于文档布局的内容区域的基本操作。
窗体控件，继承自基础控件，仿真浏览器的多窗体效果，如果在其中包含 iframe 标签，可以在当前页面打开一个新的页面，避免了使用 window.open 在不同浏览器下的兼容性问题。多个窗体控件同时工作时，当前激活的窗体在最上层。窗体控件的标题栏默认可以拖拽，窗体可以设置置顶方式显示，在置顶模式下，只有当前窗体可以响应操作。窗体控件的 z-index 从4096开始，页面开发请不要使用大于或等于4096的 z-index 值。

窗体控件直接HTML初始化的例子:
<div ecui="type:form;hide:true">
  <label>窗体的标题</label>
  <!-- 这里放窗体的内容 -->
  ...
</div>

属性
_bFlag          - 初始是否自动隐藏/是否使用showModal激活
_bAutoTitle     - 标题栏是否自适应宽度
_bAutoHeight    - 高度是否自适应
_bAutoCenter    - 显示时位置是否自动居中
_uTitle         - 标题栏
_uClose         - 关闭按钮
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        util = core.util,

        undefined,
        MATH = Math,
        MAX = MATH.max,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getStyle = dom.getStyle,
        moveElements = dom.moveElements,
        encodeHTML = string.encodeHTML,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        calcHeightRevise = core.calcHeightRevise,
        calcWidthRevise = core.calcWidthRevise,
        drag = core.drag,
        inheritsControl = core.inherits,
        loseFocus = core.loseFocus,
        mask = core.mask,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = ui.Control.prototype,
        UI_BUTTON = ui.Button;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_FORM
    ///__gzip_original__UI_FORM_CLASS
    /**
     * 初始化窗体控件。
     * options 对象支持的属性如下：
     * hide         初始是否自动隐藏
     * autoTitle    title是否自适应宽度，默认自适应宽度
     * autoCenter   显示时位置是否自动居中，默认不处理
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_FORM = ui.Form =
        inheritsControl(
            UI_CONTROL,
            'ui-form',
            function (el, options) {
                // 生成标题控件与内容区域控件对应的Element对象
                var type = this.getType(),
                    o = createDom(type + '-body', 'position:relative;overflow:auto'),
                    titleEl = first(el);

                moveElements(el, o, true);

                if (titleEl && titleEl.tagName == 'LABEL') {
                    el.innerHTML =
                        '<div class="' + type + '-close' + this.Close.TYPES + '" style="position:absolute"></div>';
                    el.insertBefore(titleEl, el.firstChild);
                    titleEl.className = type + '-title' + this.Title.TYPES;
                    titleEl.style.position = 'absolute';
                }
                else {
                    el.innerHTML =
                        '<label class="' + type + '-title' + this.Title.TYPES +
                            '" style="position:absolute">'+ (options.title ? encodeHTML(options.title) : '') +'</label><div class="' + type + '-close' + this.Close.TYPES +
                            '" style="position:absolute"></div>';
                    titleEl = el.firstChild;
                }

                el.style.overflow = 'hidden';
                el.appendChild(o);
            },
            function (el, options) {
                this._bAutoHeight = !el.style.height;
                el = children(el);

                this._bFlag = options.hide;
                this._bAutoTitle = options.autoTitle !== false;
                this._bAutoCenter = options.autoCenter === true;

                // 初始化标题区域
                this._uTitle = $fastCreate(this.Title, el[0], this, {userSelect: false});

                // 初始化关闭按钮
                this._uClose = $fastCreate(this.Close, el[1], this);
                if (options.closeButton === false) {
                    this._uClose.$hide();
                }

                this.$setBody(el[2]);
            }
        ),
        UI_FORM_CLASS = UI_FORM.prototype,

        /**
         * 初始化窗体控件的标题栏部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_FORM_TITLE_CLASS = (UI_FORM_CLASS.Title = inheritsControl(UI_CONTROL)).prototype,

        /**
         * 初始化窗体控件的关闭按钮部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_FORM_CLOSE_CLASS = (UI_FORM_CLASS.Close = inheritsControl(UI_BUTTON)).prototype,

        UI_FORM_ALL = [],   // 当前显示的全部窗体
        UI_FORM_MODAL = 0;  // 当前showModal的窗体数
//{else}//
    /**
     * 刷新所有显示的窗体的zIndex属性。
     * @protected
     *
     * @param {ecui.ui.Form} form 置顶显示的窗体
     */
    function UI_FORM_FLUSH_ZINDEX(form) {
        UI_FORM_ALL.push(UI_FORM_ALL.splice(indexOf(UI_FORM_ALL, form), 1)[0]);

        // 改变当前窗体之后的全部窗体z轴位置，将当前窗体置顶
        for (var i = 0, j = UI_FORM_ALL.length - UI_FORM_MODAL, o; o = UI_FORM_ALL[i++]; ) {
            o.getOuter().style.zIndex = i > j ? 32767 + (i - j) * 2 : 4095 + i;
        }
    }

    /**
     * 标题栏激活时触发拖动，如果当前窗体未得到焦点则得到焦点。
     * @override
     */
    UI_FORM_TITLE_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        drag(this.getParent(), event);
    };

    /**
     * 窗体关闭按钮点击关闭窗体。
     * @override
     */
    UI_FORM_CLOSE_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);
        this.getParent().hide();
    };

    /**
     * @override
     */
    UI_FORM_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        style = getStyle(this.getMain().lastChild);
        this.$$bodyWidthRevise = calcWidthRevise(style);
        this.$$bodyHeightRevise = calcHeightRevise(style);
        this._uTitle.cache(true, true);
        this._uClose.cache(true, true);
    };

    /**
     * 销毁窗体时需要先关闭窗体，并不再保留窗体的索引。
     * @override
     */
    UI_FORM_CLASS.$dispose = function () {
        if (indexOf(UI_FORM_ALL, this) >= 0) {
            // 窗口处于显示状态，需要强制关闭
            // 避免在unload时子元素已经被dispose导致getOuter函数报错
            try {
                this.$hide();
            }
            catch(e) {}
        }
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 窗体控件获得焦点时需要将自己置于所有窗体控件的顶部。
     * @override
     */
    UI_FORM_CLASS.$focus = function () {
        UI_CONTROL_CLASS.$focus.call(this);
        UI_FORM_FLUSH_ZINDEX(this);
    };

    /**
     * 窗体隐藏时将失去焦点状态，如果窗体是以 showModal 方式打开的，隐藏窗体时，需要恢复页面的状态。
     * @override
     */
    UI_FORM_CLASS.$hide = function () {
        // showModal模式下隐藏窗体需要释放遮罩层
        var i = indexOf(UI_FORM_ALL, this);
        if (i >= 0) {
            UI_FORM_ALL.splice(i, 1);
        }

        if (i > UI_FORM_ALL.length - UI_FORM_MODAL) {
            if (this._bFlag) {
                if (i == UI_FORM_ALL.length) {
                    mask();
                }
                else {
                    // 如果不是最后一个，将遮罩层标记后移
                    UI_FORM_ALL[i]._bFlag = true;
                }
                this._bFlag = false;
            }
            UI_FORM_MODAL--;
        }

        UI_CONTROL_CLASS.$hide.call(this);
        loseFocus(this);
    };

    /**
     * @override
     */
    UI_FORM_CLASS.$setSize = function (width, height) {
        if (this._bAutoHeight) {
            height = null;
        }
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();

        var style = this.getMain().lastChild.style;

        style.width = this.getBodyWidth() + 'px';
        if (!this._bAutoHeight) {
            style.height = this.getBodyHeight() + 'px';
        }
        if (this._bAutoTitle) {
            this._uTitle.$setSize(this.getWidth() - this.$getBasicWidth());
        }
    };

    /**
     * 窗体显示时将获得焦点状态。
     * @override
     */
    UI_FORM_CLASS.$show = function () {
        UI_FORM_ALL.push(this);
        UI_CONTROL_CLASS.$show.call(this);
        setFocused(this);
    };

    /**
     * 窗体居中显示。
     * @public
     */
    UI_FORM_CLASS.center = function () {
        o = this.getOuter();
        o.style.position = this.$$position = 'absolute';
        o = o.offsetParent;

        if (!o || o.tagName == 'BODY' || o.tagName == 'HTML') {
            var o = getView(),
                x = o.right + o.left,
                y = o.bottom + o.top;
        }
        else {
            x = o.offsetWidth;
            y = o.offsetHeight;
        }

        this.setPosition(MAX((x - this.getWidth()) / 2, 0), MAX((y - this.getHeight()) / 2, 0));
    };

    /**
     * 如果窗体是以 showModal 方式打开的，只有位于最顶层的窗体才允许关闭。
     * @override
     */
    UI_FORM_CLASS.hide = function () {
        for (var i = indexOf(UI_FORM_ALL, this), o; o = UI_FORM_ALL[++i]; ) {
            if (o._bFlag) {
                return false;
            }
        }
        return UI_CONTROL_CLASS.hide.call(this);
    };

    /**
     * @override
     */
    UI_FORM_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uTitle.init();
        this._uClose.init();
        if (this._bFlag) {
            this._bFlag = false;
            this.$hide();
        }
        else {
            this.$show();
        }
    };

    /**
     * 设置窗体控件标题。
     * @public
     *
     * @param {string} text 窗体标题
     */
    UI_FORM_CLASS.setTitle = function (text) {
        this._uTitle.setContent(text || '');
    };

    /**
     * @override
     */
    UI_FORM_CLASS.show = function () {
        if (UI_FORM_MODAL && indexOf(UI_FORM_ALL, this) < UI_FORM_ALL.length - UI_FORM_MODAL) {
            // 如果已经使用showModal，对原来不是showModal的窗体进行处理
            UI_FORM_MODAL++;
        }

        var result = UI_CONTROL_CLASS.show.call(this);
        if (!result) {
            UI_FORM_FLUSH_ZINDEX(this);
        }
        else if (this._bAutoCenter) {
            this.center();
        }

        return result;
    };

    /*
     * @override
     */
    UI_FORM_CLASS.$resize = function () {
        var style = this.getMain().lastChild.style; 

        UI_CONTROL_CLASS.$resize.call(this);
        style.width = '';
        style.height = '';
    };

    /**
     * override
     * 自适应高度时getHeight需要实时计算
     */
    UI_FORM_CLASS.getHeight = function () {
        if (this._bAutoHeight) {
            this.cache(true, true);
        }
        return UI_CONTROL_CLASS.getHeight.call(this);
    }

    /**
     * 窗体以独占方式显示
     * showModal 方法将窗体控件以独占方式显示，此时鼠标点击窗体以外的内容无效，关闭窗体后自动恢复。
     * @public
     *
     * @param {number} opacity 遮罩层透明度，默认为0.05
     */
    UI_FORM_CLASS.showModal = function (opacity) {
        if (!this._bFlag) {
            if (indexOf(UI_FORM_ALL, this) < UI_FORM_ALL.length - UI_FORM_MODAL) {
                UI_FORM_MODAL++;
            }

            mask(opacity !== undefined ? opacity : 0.05, 32766 + UI_FORM_MODAL * 2);

            this._bFlag = true;
            if (!UI_CONTROL_CLASS.show.call(this)) {
                UI_FORM_FLUSH_ZINDEX(this);
            }
            else if (this._bAutoCenter) {
                this.center(); 
            }
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
TreeView - 定义树形视图的基本操作。
树视图控件，继承自基础控件，不可以被改变大小，可以包含普通子控件或者子树视图控件，普通子控件显示在它的文本区域，如果是子树视图控件，将在专门的子树视图控件区域显示。子树视图控件区域可以被收缩隐藏或是展开显示，默认情况下点击树视图控件就改变子树视图控件区域的状态。

树视图控件直接HTML初始化的例子:
<div ecui="type:tree-view;">
  <!-- 显示的文本，如果没有label整个内容就是节点的文本 -->
  <label>公司</label>
  <!-- 子控件 -->
  <div>董事会</div>
  <div>监事会</div>
  <div>
    <label>总经理</label>
    <div>行政部</div>
    <div>人事部</div>
    <div>财务部</div>
    <div>市场部</div>
    <div>销售部</div>
    <div>技术部</div>
  </div>
</div>

属性
_bCollapsed    - 是否收缩子树
_eChildren     - 子控件区域Element对象
_aChildren     - 子控件集合
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        indexOf = array.indexOf,
        remove = array.remove,
        addClass = dom.addClass,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getStyle = dom.getStyle,
        insertAfter = dom.insertAfter,
        removeClass = dom.removeClass,
        trim = string.trim,
        extend = util.extend,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        getMouseX = core.getMouseX,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_TREE_VIEW
    ///__gzip_original__UI_TREE_VIEW_CLASS
    /**
     * 初始化树视图控件。
     * options 对象支持的属性如下：
     * collapsed      子树区域是否收缩，默认为展开
     * expandSelected 是否展开选中的节点，如果不自动展开，需要点击左部的小区域图标才有效，默认自动展开
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_TREE_VIEW = ui.TreeView =
        inheritsControl(
            UI_CONTROL,
            'ui-treeview',
            function (el, options) {
                options.resizable = false;

                var o = first(el);

                // 检查是否存在label标签，如果是需要自动初始化树的子结点
                if (o && o.tagName == 'LABEL') {
                    // 初始化子控件
                    for (
                        var i = 0,
                            list = children(el).slice(1),
                            childItems = UI_TREE_VIEW_SETITEMS(this, el.appendChild(createDom()));
                        o = list[i++];
                    ) {
                        childItems.appendChild(o);
                    }

                    addClass(
                        el,
                        options.current = options.primary + (options.collapsed ? '-collapsed' : '-expanded')
                    );

                    if (options.collapsed) {
                        childItems.style.display = 'none';
                    }
                }
            },
            function (el, options) {
                var childTrees = this._aChildren = [];

                this._bCollapsed = options.collapsed || false;
                this._bExpandSelected = options.expandSelected !== false;

                // 初始化子控件
                for (
                    var i = 0,
                        list = children(el.lastChild),
                        o;
                    o = list[i];
                ) {
                    delete options.current;
                    (childTrees[i++] = UI_TREE_VIEW_CREATE_CHILD(o, this, options)).$setParent(this);
                }
            }
        ),
        UI_TREE_VIEW_CLASS = UI_TREE_VIEW.prototype;
//{else}//
    /**
     * 设置树视图控件的选项组 Element 对象。
     * @private
     *
     * @param {ecui.ui.TreeView} tree 树视图控件
     * @param {HTMLElement} items 子树选项组的 Element 对象
     * @return {HTMLElement} items 子树选项组的 Element 对象
     */
    function UI_TREE_VIEW_SETITEMS(tree, items) {
        tree._eChildren = items;
        items.className = tree.getType() + '-children';
        items.style.cssText = '';
        return items;
    }

    /**
     * 树视图控件刷新，根据子树视图控件的数量及显示的状态设置样式。
     * @private
     *
     * @param {ecui.ui.TreeView} control 树视图控件
     */
    function UI_TREE_VIEW_FLUSH(control) {
        control.setClass(
            control.getPrimary() + (control._aChildren.length ? control._bCollapsed ? '-collapsed' : '-expanded' : '')
        );
    }

    /**
     * 建立子树视图控件。
     * @private
     *
     * @param {HTMLElement} el 子树的 Element 对象
     * @param {ecui.ui.TreeView} parent 父树视图控件
     * @param {Object} options 初始化选项，参见 create 方法
     * @return {ecui.ui.TreeView} 子树视图控件
     */
    function UI_TREE_VIEW_CREATE_CHILD(el, parent, options) {
        el.className = (trim(el.className) || parent.getPrimary()) + parent.constructor.agent.TYPES;
        return $fastCreate(parent.constructor, el, null, extend(extend({}, options), getOptions(el)));
    }

    /**
     * 收缩/展开子树区域。
     * @private
     *
     * @param {ecui.ui.TreeView} control 树视图控件
     * @param {boolean} status 是否隐藏子树区域
     * @return {boolean} 状态是否改变
     */
    function UI_TREE_VIEW_SET_COLLAPSE(control, status) {
        if (control._eChildren && control._bCollapsed != status) {
            control._eChildren.style.display = (control._bCollapsed = status) ? 'none' : '';
            UI_TREE_VIEW_FLUSH(control);
        }
    }

    /**
     * 控件点击时改变子树视图控件的显示/隐藏状态。
     * @override
     */
    UI_TREE_VIEW_CLASS.$click = function (event) {
        if (event.getControl() == this) {
            UI_CONTROL_CLASS.$click.call(this, event);

            if (getMouseX(this) <= toNumber(getStyle(this.getBody(), 'paddingLeft'))) {
                // 以下使用 event 代替 name
                this[event = this.isCollapsed() ? 'expand' : 'collapse']();
                triggerEvent(this, event);
            }
            else {
                this.select();
            }
        }
    };

    /**
     * @override
     */
    UI_TREE_VIEW_CLASS.$dispose = function () {
        this._eChildren = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 隐藏树视图控件的同时需要将子树区域也隐藏。
     * @override
     */
    UI_TREE_VIEW_CLASS.$hide = function () {
        UI_CONTROL_CLASS.$hide.call(this);

        if (this._eChildren) {
            this._eChildren.style.display = 'none';
        }
    };

    /**
     * 树视图控件改变位置时，需要将自己的子树区域显示在主元素之后。
     * @override
     */
    UI_TREE_VIEW_CLASS.$setParent = function (parent) {
        var root = this.getRoot(),
            o = this.getParent();

        if (this == root._cSelected || this == root) {
            // 如果当前节点被选中，需要先释放选中
            // 如果当前节点是根节点，需要释放选中
            if (root._cSelected) {
                root._cSelected.alterClass('-selected');
            }
            root._cSelected = null;
        }
        else {
            remove(o._aChildren, this);
            UI_TREE_VIEW_FLUSH(o);
        }

        UI_CONTROL_CLASS.$setParent.call(this, parent);

        // 将子树区域显示在主元素之后
        if (this._eChildren) {
            insertAfter(this._eChildren, this.getOuter());
        }
    };

    /**
     * 显示树视图控件的同时需要将子树视图区域也显示。
     * @override
     */
    UI_TREE_VIEW_CLASS.$show = function () {
        UI_CONTROL_CLASS.$show.call(this);

        if (this._eChildren && !this._bCollapsed) {
            this._eChildren.style.display = '';
        }
    };

    /**
     * 添加子树视图控件。
     * @public
     *
     * @param {string|ecui.ui.TreeView} item 子树视图控件的 html 内容/树视图控件
     * @param {number} index 子树视图控件需要添加的位置序号，不指定将添加在最后
     * @param {Object} options 子树视图控件初始化选项
     * @return {ecui.ui.TreeView} 添加的树视图控件
     */
    UI_TREE_VIEW_CLASS.add = function (item, index, options) {
        var list = this._aChildren,
            o;

        if (!this._eChildren) {
            UI_TREE_VIEW_SETITEMS(this, createDom());
            insertAfter(this._eChildren, this.getOuter());
            this._eChildren.style.display = this._bCollapsed ? 'none' : '';
        }

        if (o = list[index]) {
            o = o.getOuter();
        }
        else {
            index = list.length;
            o = null;
        }

        if ('string' == typeof item) {
            o = this._eChildren.insertBefore(createDom(), o);
            o.innerHTML = item;
            item = UI_TREE_VIEW_CREATE_CHILD(o, this, options);
        }
        else {
            this._eChildren.insertBefore(item.getOuter(), o);
        }

        // 这里需要先 setParent，否则 getRoot 的值将不正确
        item.$setParent(this);
        list.splice(index, 0, item);

        UI_TREE_VIEW_FLUSH(this);

        return item;
    };

    /**
     * 收缩当前树视图控件的子树区域。
     * @public
     */
    UI_TREE_VIEW_CLASS.collapse = function () {
        UI_TREE_VIEW_SET_COLLAPSE(this, true);
    };

    /**
     * 展开当前树视图控件的子树区域。
     * @public
     */
    UI_TREE_VIEW_CLASS.expand = function () {
        UI_TREE_VIEW_SET_COLLAPSE(this, false);
    };

    /**
     * 获取当前树视图控件的所有子树视图控件。
     * @public
     *
     * @return {Array} 树视图控件列表
     */
    UI_TREE_VIEW_CLASS.getChildren = function () {
        return this._aChildren.slice();
    };

    /**
     * 获取当前树视图控件的第一个子树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getFirst = function () {
        return this._aChildren[0] || null;
    };

    /**
     * 获取当前树视图控件的最后一个子树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getLast = function () {
        return this._aChildren[this._aChildren.length - 1] || null;
    };

    /**
     * 获取当前树视图控件的后一个同级树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getNext = function () {
        var parent = this.getParent();
        return parent instanceof UI_TREE_VIEW && parent._aChildren[indexOf(parent._aChildren, this) + 1] || null;
    };

    /**
     * 获取当前树视图控件的前一个同级树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getPrev = function () {
        var parent = this.getParent();
        return parent instanceof UI_TREE_VIEW && parent._aChildren[indexOf(parent._aChildren, this) - 1] || null;
    };

    /**
     * 获取当前树视图控件的根控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件的根控件
     */
    UI_TREE_VIEW_CLASS.getRoot = function () {
        for (
            var o = this, parent;
            // 这里需要考虑Tree位于上一个Tree的节点内部
            (parent = o.getParent()) instanceof UI_TREE_VIEW && indexOf(parent._aChildren, o) >= 0;
            o = parent
        ) {}
        return o;
    };

    /**
     * 获取当前树视图控件选中的节点。
     * @public
     *
     * @return {ecui.ui.TreeView} 选中的节点
     */
    UI_TREE_VIEW_CLASS.getSelected = function () {
        return this.getRoot()._cSelected || null;
    };

    /**
     * @override
     */
    UI_TREE_VIEW_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        for (var i = 0, list = this._aChildren, o; o = list[i++]; ) {
            o.init();
        }
    };

    /**
     * 当前子树区域是否收缩。
     * @public
     *
     * @return {boolean} true 表示子树区域收缩，false 表示子树区域展开
     */
    UI_TREE_VIEW_CLASS.isCollapsed = function () {
        return !this._eChildren || this._bCollapsed;
    };

    /**
     * 将当前节点设置为选中。
     * @public
     */
    UI_TREE_VIEW_CLASS.select = function () {
        var root = this.getRoot();

        if (root._cSelected != this) {
            if (root._cSelected) {
                root._cSelected.alterClass('-selected');
            }
            this.alterClass('+selected');
            root._cSelected = this;
        }

        if (this._bExpandSelected) {
            this.expand();
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
CheckTree - 定义包含复选框的树形结构的基本操作。
包含复选框的树控件，继承自树控件。每一个选项包含一个复选框进行选择，除非特别的指定，否则子节点的复选框与父节点的复选框
自动联动。

树控件直接HTML初始化的例子:
<div ecui="type:check-tree;fold:true;id:parent;name:part">
    <!-- 当前节点的文本，如果没有整个内容就是节点的文本 -->
    <label>节点的文本</label>
    <!-- 这里放子控件，如果需要fold某个子控件，将子控件的style="display:none"即可 -->
    <li ecui="superior:other">子控件文本</li>
    <li>子控件文本(复选框默认与父控件复选框联动)</li>
    ...
</div>

属性
_oSuperior - 关联的父复选框控件ID，默认与父控件复选框关联
_uCheckbox - 复选框控件
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        inheritsControl = core.inherits,
        createDom = dom.create,

        $connect = core.$connect,
        $fastCreate = core.$fastCreate,

        UI_CHECKBOX = ui.Checkbox,

        UI_TREE_VIEW = ui.TreeView,
        UI_TREE_VIEW_CLASS = UI_TREE_VIEW.prototype;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化复选树控件。
     * options 对象支持的属性如下：
     * name 复选框的表单项的默认名称
     * value 复选框的表单项的值
     * superior 父复选框的标识，如果为true表示自动使用上级树节点作为父复选框，其它等价false的值表示不联动
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_CHECK_TREE
    var UI_CHECK_TREE = ui.CheckTree = 
        inheritsControl(
            UI_TREE_VIEW,
            'ui-check-tree',
            null,
            function (el, options) {
                this._oSuperior = options.superior;

                for (
                    var i = 0,
                        checkbox = this._uCheckbox = $fastCreate(
                            UI_CHECKBOX,
                            el.insertBefore(createDom(UI_CHECKBOX.types[0]), el.firstChild),
                            this,
                            {name: options.name, value: options.value, disabled: options.disabled}
                        ),
                        list = this.getChildren();
                    el = list[i++];
                ) {
                    options = el._oSuperior
                    if (options !== false) {
                        el = el._uCheckbox;
                        if (!options) {
                            el.setSubject(checkbox);
                        }
                        else {
                            $connect(el, el.setSubject, options);
                        }
                    }
                }
            }
        ),
        UI_CHECK_TREE_CLASS = UI_CHECK_TREE.prototype;
//{else}//
    /**
     * 计算控件的缓存。
     * 控件缓存部分核心属性的值，提高控件属性的访问速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法(setSize、alterClass 等)直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @protected
     *
     * @param {CssStyle} style 基本 Element 对象的 Css 样式对象
     * @param {boolean} cacheSize 是否需要缓存控件大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     */
    UI_CHECK_TREE_CLASS.$cache = function (style, cacheSize) {
        UI_TREE_VIEW_CLASS.$cache.call(this, style, cacheSize);
        this._uCheckbox.cache(true, true);
    };

    /**
     * 控件渲染完成后初始化的默认处理。
     * $init 方法在控件渲染完成后调用，参见 create 与 init 方法。
     * @protected
     */
    UI_CHECK_TREE_CLASS.init = function () {
        UI_TREE_VIEW_CLASS.init.call(this);
        this._uCheckbox.init();
    };

    /**
     * 获取包括当前树控件在内的全部选中的子树控件。
     * @public
     *
     * @return {Array} 全部选中的树控件列表
     */
    UI_CHECK_TREE_CLASS.getChecked = function () {
        for (var i = 0, list = this.getChildren(), result = this.isChecked() ? [this] : [], o; o = list[i++]; ) {
            result = result.concat(o.getChecked());    
        }
        return result;
    };

    /**
     * 获取当前树控件复选框的表单项的值。
     * @public
     *
     * @return {string} 表单项的值
     */
    UI_CHECK_TREE_CLASS.getValue = function () {
        return this._uCheckbox.getValue();
    };

    /**
     * 判断树控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_CHECK_TREE_CLASS.isChecked = function () {
        return this._uCheckbox.isChecked();
    };

    /**
     * 设置当前树控件复选框选中状态。
     * @public
     *
     * @param {boolean} 是否选中当前树控件复选框
     */
    UI_CHECK_TREE_CLASS.setChecked = function (status) {
        this._uCheckbox.setChecked(status);    
    };

    UI_CHECK_TREE_CLASS.disable = function () {
        this._uCheckbox.disable();
        UI_TREE_VIEW_CLASS.disable.call(this);
    };

    UI_CHECK_TREE_CLASS.enable = function () {
        this._uCheckbox.enable();
        UI_CHECK_TREE_CLASS.enable.call(this);
    };

    UI_CHECK_TREE_CLASS.add = function (item, index, options) {
        var con = UI_TREE_VIEW_CLASS.add.call(this, item, index, options);
        if (con._oSuperior !== false) {
            if (!con._oSuperior) {
                con._uCheckbox.setSubject(this._uCheckbox);
            }
            else {
                con._uCheckbox.setSubject(con._oSuperior);
            }
        }
        return con;
    };

    UI_CHECK_TREE_CLASS.$ready = function () {
        this._uCheckbox.$ready();
    }
//{/if}//
//{if 0}//
})();
//{/if}//

/*
MonthView - 定义日历显示的基本操作。
日历视图控件，继承自基础控件，不包含年/月/日的快速选择与切换，如果需要实现这些功能，请将下拉框(选择月份)、输入框(输入年份)等组合使用建立新的控件或直接在页面上布局并调用接口。

日历视图控件直接HTML初始化的例子:
<div ecui="type:month-view;year:2009;month:11"></div>

属性
_nYear      - 年份
_nMonth     - 月份(0-11)
_aCells     - 日历控件内的所有单元格，其中第0-6项是日历的头部星期名称
_oBegin     - 起始日期 小于这个日期的日历单元格会被disabled
_oEnd       - 结束日期 大于这个日期的日历单元格会被disabled
_oDate      - 当前选择日期
_uSelected  - 当前选择的日历单元格

子控件属性
_nDay       - 从本月1号开始计算的天数，如果是上个月，是负数，如果是下个月，会大于当月最大的天数
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,

        DATE = Date,

        indexOf = array.indexOf,
        addClass = dom.addClass,
        getParent = dom.getParent,
        removeClass = dom.removeClass,
        setText = dom.setText,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_MONTH_VIEW
    ///__gzip_original__UI_MONTH_VIEW_CLASS
    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_MONTH_VIEW = ui.MonthView =
        inheritsControl(
            UI_CONTROL,
            'ui-monthview',
            function (el, options) {
                var i = 0,
                    type = this.getType(),
                    list = [];

                el.style.overflow = 'auto';

                for (; i < 7; ) {
                    list[i] =
                        '<td class="' + type + '-title' + this.Cell.TYPES + '">' +
                            UI_MONTH_VIEW.WEEKNAMES[i++] + '</td>';
                }
                list[i] = '</tr></thead><tbody><tr>';
                for (; ++i < 50; ) {
                    list[i] =
                        '<td class="' + type + '-item' + this.Cell.TYPES + '"></td>' +
                            (i % 7 ? '' : '</tr><tr>');
                }

                el.innerHTML =
                    '<table cellspacing="0"><thead><tr>' + list.join('') + '</tr></tbody></table>';
            },
            function (el, options) {
                this._aCells = [];
                for (var i = 0, list = el.getElementsByTagName('TD'), o; o = list[i]; ) {
                    // 日历视图单元格禁止改变大小
                    this._aCells[i++] = $fastCreate(this.Cell, o, this, {resizable: false});
                }

                this._oBegin = new Date(options.begin);
                this._oEnd = new Date(options.end);

                this.setView(options.year, options.month);
            }
        ),
        UI_MONTH_VIEW_CLASS = UI_MONTH_VIEW.prototype,

        /**
         * 初始化日历控件的单元格部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_MONTH_VIEW_CELL_CLASS = (UI_MONTH_VIEW_CLASS.Cell = inheritsControl(UI_CONTROL)).prototype;
//{else}//
    UI_MONTH_VIEW.WEEKNAMES = ['一', '二', '三', '四', '五', '六', '日'];

    /**
     * 选中某个日期单元格
     * @private
     *
     * @param {Object} 日期单元格对象
     */
    function UI_MONTH_VIEW_CLASS_SETSELECTED(control, o) {
        if (control._uSelected == o) {
            return;
        }
        
        if (control._uSelected) {
            control._uSelected.alterClass('-selected');
        }

        if (o) {
            o.alterClass('+selected');
        }
        control._uSelected = o;
    };

    /**
     * 点击时，根据单元格类型触发相应的事件。
     * @override
     */
    UI_MONTH_VIEW_CELL_CLASS.$click = function (event) {
        var parent = this.getParent(),
            index = indexOf(parent._aCells, this),
            curDate = parent._oDate;

        if (index < 7) {
            triggerEvent(parent, 'titleclick', event, [index]);
        }
        else {
            index = new DATE(parent._nYear, parent._nMonth, this._nDay);
            //change事件可以取消，返回false会阻止选中
            if ((!curDate || index.getTime() != curDate.getTime()) && triggerEvent(parent, 'change', event, [index])) {
                parent._oDate = new DATE(parent._nYear, parent._nMonth, this._nDay);
                UI_MONTH_VIEW_CLASS_SETSELECTED(parent, this);
            }
        }
    };

    /**
     * 获取日历控件当前显示的月份。
     * @public
     *
     * @return {number} 月份(1-12)
     */
    UI_MONTH_VIEW_CLASS.getMonth = function () {
        return this._nMonth + 1;
    };

    /**
     * 获取日历控件当前显示的年份。
     * @public
     *
     * @return {number} 年份(19xx-20xx)
     */
    UI_MONTH_VIEW_CLASS.getYear = function () {
        return this._nYear;
    };

    /**
     * 日历显示移动指定的月份数。
     * 参数为正整数则表示向当前月份之后的月份移动，负数则表示向当前月份之前的月份移动，设置后日历控件会刷新以显示新的日期。
     * @public
     *
     * @param {number} offsetMonth 日历移动的月份数
     */
    UI_MONTH_VIEW_CLASS.move = function (offsetMonth) {
        var time = new DATE(this._nYear, this._nMonth + offsetMonth, 1);
        this.setView(time.getFullYear(), time.getMonth() + 1);
    };

    /**
     * 设置日历的显示范围
     * 只有在两参数的闭区间外的日期单元格会被disabled
     * @public
     *
     * @param {Date} begin 起始日期，如果为null则表示不设置起始日期
     * @param {Date} end 结束日期，如果为null则表示不设置结束日期
     * @param {Boolean} isSilent 如果为true则只设置不刷新页面
     */
    UI_MONTH_VIEW_CLASS.setRange = function (begin, end, isSilent) {
        this._oBegin = begin;
        this._oEnd = end;
        if (!isSilent) {
            this.setView(this.getYear(), this.getMonth());
        }
    };

    /**
     * 设置日历当前选择日期，并切换到对应的月份
     * @public
     *
     * @param {Date} date 日期
     */
    UI_MONTH_VIEW_CLASS.setDate = function (date) {
        this.$setDate(date);
        this.setView(date.getFullYear(), date.getMonth() + 1);
    };

    /**
     * 获取当前日历选择的日期
     * @public
     *
     * @return {Date} 日期
     */
    UI_MONTH_VIEW_CLASS.getDate = function () {
        return this._oDate;
    };

    /*
     * 设置日历的当前选择日历
     * @private
     *
     * @param {Date} date 日期
     */
    UI_MONTH_VIEW_CLASS.$setDate = function (date) {
        this._oDate = date ? new DATE(date.getFullYear(), date.getMonth(), date.getDate()) : null;
    };

    /**
     * 设置日历控件当前显示的月份。
     * @public
     *
     * @param {number} year 年份(19xx-20xx)，如果省略使用浏览器的当前年份
     * @param {number} month 月份(1-12)，如果省略使用浏览器的当前月份
     */
    UI_MONTH_VIEW_CLASS.setView = function (year, month) {
        //__gzip_original__date
        var i = 7,
            today = new DATE(),
            year = year || today.getFullYear(),
            month = month ? month - 1 : today.getMonth(),
            // 得到上个月的最后几天的信息，用于补齐当前月日历的上月信息位置
            o = new DATE(year, month, 0),
            day = 1 - o.getDay(),
            lastDayOfLastMonth = o.getDate(),
            // 得到当前月的天数
            lastDayOfCurrMonth = new DATE(year, month + 1, 0).getDate(),
            begin = this._oBegin, end = this._oEnd, selected = this._oDate,
            curDate;

        this._nYear = year;
        this._nMonth = month;

        //设置日期范围
        //begin = begin && begin.getFullYear() == year && begin.getMonth() == month ? begin.getDate() : 0 ;
        //end = end && end.getFullYear() == year && end.getMonth() == month ? end.getDate() : 31;
        begin = begin ? new Date(begin.getFullYear(), begin.getMonth(), begin.getDate()).getTime() : 0
        end = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime() : Number.MAX_VALUE;

        selected = selected && selected.getFullYear() == year && selected.getMonth() == month ? selected.getDate() : 0;

        UI_MONTH_VIEW_CLASS_SETSELECTED(this, null);

        for (; o = this._aCells[i++]; ) {
            if (month = day > 0 && day <= lastDayOfCurrMonth) {
                curDate = new Date(this._nYear, this._nMonth, day).getTime();
                if (begin > curDate || end < curDate) {
                    o.disable();
                }
                else {
                    o.enable();
                    //恢复选择的日期
                    if (day == selected) {
                        UI_MONTH_VIEW_CLASS_SETSELECTED(this, o);
                    }
                }
            }
            else {
                o.disable();
            }

            if (i == 36 || i == 43) {
                (o.isDisabled() ? addClass : removeClass)(getParent(o.getOuter()), this.getType() + '-extra');
            }

            setText(
                o.getBody(),
                month ? day : day > lastDayOfCurrMonth ? day - lastDayOfCurrMonth : lastDayOfLastMonth + day
            );
            o._nDay = day++;
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/**
 * liteTable - 简单表格
 *
 */

(function () {

    var core = ecui,
        string = core.string,
        ui = core.ui,
        util = core.util,
        string = core.string,

        undefined,

        extend = util.extend,
        blank = util.blank,
        attachEvent = util.attachEvent,
        encodeHTML = string.encodeHTML,

        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;

    var UI_LITE_TABLE = ui.LiteTable =
        inheritsControl(
            UI_CONTROL,
            'ui-lite-table',
            function (el, options) {
                options.resizable = false;
            },
            function (el, options) {
                this._aData = [];
                this._aFields = [];
                this._eCheckboxAll = null;
                this._aCheckboxs = [];
                this._sEmptyText = options.emptyText || '暂无数据';
                this._bCheckedHighlight = options.checkedHighlight === true;
            }
        ),

        UI_LITE_TABLE_CLASS = UI_LITE_TABLE.prototype,

        DELEGATE_EVENTS = ['click', 'mouseup', 'mousedown'],

        // 默认处理函数
        DEFAULT_EVENTS = {
            'click th.ui-lite-table-hcell-sort': function (event, control) {
                var field = this.getAttribute('data-field'),
                    orderby;

                if (this.className.indexOf('-sort-desc') >= 0) {
                    orderby = 'asc';
                }
                else if (this.className.indexOf('-sort-asc') >= 0) {
                    orderby = 'desc'
                }
                else {
                    orderby = this.getAttribute('data-orderby') || 'desc';
                }

                triggerEvent(control, 'sort', null, [field, orderby]);
            },
            'click input.ui-lite-table-checkbox-all': function (event, control) {
                control.$refreshCheckbox(this.checked);
            },
            'click input.ui-lite-table-checkbox': function (event, control) {
                control.$refreshCheckbox();
            }
        };

    function copyArray(data) {
        var res = [], i, item;

        for (i = 0; item = data[i]; i++) {
            res.push(extend({}, item));
        }

        return res;
    }

    function getHanlderByType(events, type) {
        var handlers = [], item;

        events = extend({}, events);
        events = extend(events, DEFAULT_EVENTS);

        for (var key in events) {
            item = {handler: events[key]};
            key = key.split(/\s+/);
            if (key[0] == type) {
                item.selector = key[1];
                handlers.push(item);
            }
        }

        return handlers;
    }

    function checkElementBySelector(ele, selector) {
        var tagName, value, type, res = true;

        if (!ele && !selector) {
            return false;
        }

        selector.replace(/^([^.#]*)([.#]?)(.*)$/, function ($0, $1, $2, $3) {
            tagName = $1;
            type = $2;
            value = $3;
        });

        if (tagName && ele.tagName.toLowerCase() != tagName) {
            res = false;
        }

        if (type == '.' && !new RegExp('(^|\\s+)' + value + '(\\s+|$)').test(ele.className)) {
            res = false;
        }

        if (type == '#' && ele.id != value) {
            res = false;
        }

        return res;
    }

    function buildTabeBody(fields, datasource, type) {
        var i, item, j, field, html = [], str,
            className;

        for (i = 0; item = datasource[i]; i++) {
            html.push('<tr class="'+ type +'-row">')
            for (j = 0; field = fields[j]; j++) {
                className = type + '-cell';
                if (field.align) {
                    className += ' ' + type + '-cell-align-' + field.align;
                }
                else if (field.checkbox) {
                    className += ' ' + type + '-cell-align-center';
                }
                html.push('<td class="'+ className +'">');
                if (field.checkbox) {
                    html.push('<input type="checkbox" value="'+ item[field.content] + '" class="'+ type +'-checkbox"');
                    if (field.checkedField && item[field.checkedField] == true) {
                        html.push(' checked="checked"');
                    }
                    html.push(' />');
                }
                else {
                    if (typeof field.content == 'function') {
                        html.push(field.content.call(null, item, i));
                    }
                    else {
                        str = item[field.content];
                        if (!str && str != 0) {
                            str = '&nbsp;';
                        }
                        else {
                            str = encodeHTML(str + '');
                        }
                        html.push(str);
                    }
                }
                html.push('</td>')
            }
            html.push('</tr>')
        }

        return html.join('');
    };

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.$setSize = blank;

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.init = function () {
        var i, item, ele = this.getOuter(),
            control = this;

        UI_CONTROL_CLASS.init.call(this);

        // 添加控件全局的事件监听
        // 只支持click mousedown mouseup
        for (i = 0; item = DELEGATE_EVENTS[i]; i++) {
            attachEvent(ele, item, (function (name) {
                return function (event) {
                    var e = event || window.event;
                    e.targetElement = e.target || e.srcElement;
                    control.$fireEventHanlder(name, e);
                }
            })(item));
        }
    }

    /**
     * 设置表格的数据
     * @public
     * 
     * @param {Array} datasource 表格数据
     * @param {Object} sortInfo 排序信息
     *          {String} sortby 排序字段
     *          {String} orderby 排序方式
     * @param {Boolean} isSilent 静默模式 如果true的话 不会立刻重绘表格 需要手动调用render
     */
    UI_LITE_TABLE_CLASS.setData = function (datasource, sortInfo, isSilent) {
        this._aData = copyArray(datasource);
        if (sortInfo) {
            this._sSortby = sortInfo.sortby || '';
            this._sOrderby = sortInfo.orderby || '';
        }

        !isSilent && this.render();
    };

    UI_LITE_TABLE_CLASS.getData = function () {
        return copyArray(this._aData);
    };

    UI_LITE_TABLE_CLASS.getDataByField = function (o, field) {
        var i, item;

        field = field || 'id';
        for (i = 0; item = this._aData[i]; i++) {
            if (item[field] == o) {
                return extend({}, item);
            }
        }

        return null;
    };

    /**
     * 设置表格的列信息
     * @public
     * 
     * @param {Array} fields 列信息
     * @param {Boolean} isSilent 静默模式 如果true的话 不会立刻重绘表格 需要手动调用render
     */
    UI_LITE_TABLE_CLASS.setFields = function (fields, isSilent) {
        this._aFields = copyArray(fields);

        !isSilent && this.render();
    };

    /**
     * 获取当前选择的行单选框value
     * @public
     */
    UI_LITE_TABLE_CLASS.getSelection = function () {
        var ids = [], i, item;

        for (i = 0; item = this._aCheckboxs[i]; i++) {
            item.checked && ids.push(item.value);
        }

        return ids;
    };

    /**
     * 重新绘制表格
     * @public
     */
    UI_LITE_TABLE_CLASS.render = function () {
        var type = this.getTypes()[0],
            html = ['<table cellpadding="0" cellspacing="0" width="100%" class="'+ type +'-table">'],
            i, item, className,
            fields = this._aFields, datasource = this._aData;

        if (!fields || fields.length <= 0) {
            return;
        }

        html.push('<tr class="'+ type +'-head">');
        // 渲染表头
        for (i = 0; item = fields[i]; i++ ) {
            className = type + '-hcell';
            if (item.checkbox) {
                className += ' ' + type + '-hcell-checkbox';
                html.push('<th class="'+ className +'"><input type="checkbox" class="'+ type +'-checkbox-all" /></th>');
                continue;
            }
            html.push('<th');
            if (item.width) {
                html.push(' width="' + item.width + '"');
            }
            if (item.sortable) {
                className += ' ' + type + '-hcell-sort';
                if (item.field && item.field == this._sSortby) {
                    className += ' ' + type + '-hcell-sort-' + this._sOrderby;
                }
                html.push(' data-field="'+ item.field +'"');
                if (item.orderby) {
                    html.push(' data-orderby="' + item.orderby + '"');
                }
            }
            html.push(' class="' + className + '">' + item.title + '</th>');
        }
        html.push('</tr>');

        // 渲染无数据表格
        if (!datasource || datasource.length <= 0) {
            html.push('<tr class="'+ type +'-row"><td colspan="'
                    + fields.length +'" class="'+ type +'-cell-empty">'+ this._sEmptyText +'</td></tr>');
        }
        else {
           html.push(buildTabeBody(fields, datasource, type));
        }

        html.push('</table>');

        this.setContent(html.join(''));
        // 重新捕获所有的行当选框
        this.$bindCheckbox();
        if (this._eCheckboxAll) {
            this.$refreshCheckbox();
        }
    };

    /**
     * 获取表格当前所有行单选框的引用
     * @private
     */
    UI_LITE_TABLE_CLASS.$bindCheckbox = function () {
        var inputs = this.getBody().getElementsByTagName('input'),
            i, item, type = this.getTypes()[0];

        this._aCheckboxs = [];
        this._eCheckboxAll = null;

        for (i = 0; item = inputs[i]; i++) {
            if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox-all') >= 0) {
                this._eCheckboxAll = item;
            }
            else if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox') >= 0) {
                this._aCheckboxs.push(item);
            }
        }
    };

    /**
     * 刷新表格的行单选框
     * @private
     *
     * @param {Boolean} checked 全选/全不选 如果忽略此参数则根据当前表格的实际选择情况来设置“全选”的勾选状态
     */
    UI_LITE_TABLE_CLASS.$refreshCheckbox = function (checked) {
        var i, item, newChecked = true, tr;

        for (i = 0; item = this._aCheckboxs[i]; i++) {
            tr = item.parentNode.parentNode;
            if (checked !== undefined) {
                item.checked = checked;
            }
            else {
                newChecked = item.checked && newChecked;
            }

            if (item.checked && this._bCheckedHighlight) {
                tr.className += ' highlight';
            }
            else if (this._bCheckedHighlight) {
                tr.className = tr.className.replace(/\s+highlight/g, '');
            }
        }

        this._eCheckboxAll.checked = checked !== undefined ? checked : newChecked;
    };

    /**
     * 触发表格events中定义的事件
     * @private
     *
     * @param {String} eventType 事件类型
     * @param {Event} nativeEvent 原生事件参数
     */
    UI_LITE_TABLE_CLASS.$fireEventHanlder = function (eventType, nativeEvent) {
        var events = getHanlderByType(this.events, eventType),
            i, item, target = nativeEvent.targetElement, selector;

        for (i = 0; item = events[i]; i++) {
            if (checkElementBySelector(target, item.selector)) {
                item.handler.call(target, nativeEvent, this);
            }
        }
    };

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.$dispose = function () {
        this._aCheckboxs = [];
        this._eCheckboxAll = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };
})();

/*
Table - 定义由行列构成的表格的基本操作。
表格控件，继承自截面控件，对基本的 TableElement 功能进行了扩展，表头固定，不会随表格的垂直滚动条滚动而滚动，在行列滚动时，支持整行整列移动，允许直接对表格的数据进行增加/删除/修改操作。

表格控件直接HTML初始化的例子:
<div ecui="type:table">
  <table>
    <!-- 表头区域 -->
    <thead>
      <tr>
        <th style="width:200px;">公司名</th>
        <th style="width:200px;">url</th>
        <th style="width:250px;">地址</th>
        <th style="width:100px;">创办时间</th>
      </tr>
    </thead>
    <!-- 内容行区域 -->
    <tbody>
      <tr>
        <td>百度</td>
        <td>www.baidu.com</td>
        <td>中国北京中关村</td>
        <td>1999</td>
      </tr>
    </tbody>
  </table>
</div>

属性
_aHCells     - 表格头单元格控件对象
_aRows       - 表格数据行对象
_uHead       - 表头区域

表头列属性
$$pos        - 列的坐标

行属性
$$pos        - 行的坐标
_aElements   - 行的列Element对象，如果当前列需要向左合并为null，需要向上合并为false
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        MATH = Math,
        REGEXP = RegExp,
        MAX = MATH.max,
        MIN = MATH.min,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getPosition = dom.getPosition,
        getAttribute = dom.getAttribute,
        getParent = dom.getParent,
        insertBefore = dom.insertBefore,
        insertHTML = dom.insertHTML,
        next = dom.next,
        removeDom = dom.remove,
        trim = string.trim,
        extend = util.extend,
        toNumber = util.toNumber,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        disposeControl = core.dispose,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ],

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_SCROLLBAR_CLASS = ui.Scrollbar.prototype,
        UI_VSCROLLBAR = ui.VScrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_TABLE
    ///__gzip_original__UI_TABLE_CLASS
    /**
     * 初始化表格控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_TABLE = ui.Table =
        inheritsControl(
            UI_PANEL,
            'ui-table',
            function (el, options) {
                var list, o,
                    type = this.getType();

                options.wheelDelta = 1;
                if (el.tagName == 'TABLE') {
                    var table = el;
                    insertBefore(el = createDom(table.className), table).appendChild(table);
                    if (options.width) {
                        el.style.width = options.width;
                    }
                    if (options.height) {
                        el.style.height = options.height;
                    }
                    table.className = '';
                }

                o = el.getElementsByTagName('TABLE')[0];
                list = children(o);

                o.setAttribute('cellSpacing', '0');

                if (list[0].tagName != 'THEAD') {
                    insertBefore(createDom('', '', 'thead'), list[0])
                        .appendChild(children(list[0])[0]);
                }
                
                return el;
            },
            function (el, options) {
                var i = 0,
                    type = this.getType(),
                    rows = this._aRows = [],
                    cols = this._aHCells = [],
                    colspans = [],
                    o = el.getElementsByTagName('TABLE')[0],
                    list = children(o),
                    j = list[0],
                    headRowCount = 1;

                o = children(list[0]);
                headRowCount = o.length;
                list = o.concat(children(list[1]));

                // 设置滚动条操作
                if (o = this.$getSection('VScrollbar')) {
                    o.setValue = UI_TABLE_SCROLL_SETVALUE;
                }
                if (o = this.$getSection('HScrollbar')) {
                    o.setValue = UI_TABLE_SCROLL_SETVALUE;
                }

                // 初始化表格区域
                o = createDom(type + '-head' + UI_CONTROL.TYPES, 'position:absolute;top:0px;overflow:hidden');
                o.innerHTML =
                    '<div style="white-space:nowrap;position:absolute"><table cellspacing="0"><tbody>' +
                        '</tbody></table></div>';
                (this._uHead = $fastCreate(UI_CONTROL, this.getMain().appendChild(o), this)).$setBody(j);

                // 以下初始化所有的行控件
                for (; o = list[i]; i++) {
                    o.className = trim(o.className) + this.Row.TYPES;
                    // list[i] 保存每一行的当前需要处理的列元素
                    list[i] = first(o);
                    colspans[i] = 1;
                    (rows[i] = $fastCreate(this.Row, o, this))._aElements = [];
                }

                for (j = 0; ; j++) {
                    for (i = 0; o = rows[i]; i++) {
                        if (colspans[i]-- > 1) {
                            continue;
                        }
                        if (el = list[i]) {
                            if (o._aElements[j] === undefined) {
                                o._aElements[j] = el;
                                // 当前元素处理完成，将list[i]指向下一个列元素
                                list[i] = next(el);

                                var rowspan = +getAttribute(el, 'rowSpan') || 1,
                                    colspan = colspans[i] = +getAttribute(el, 'colSpan') || 1;

                                while (rowspan--) {
                                    if (!rowspan) {
                                        colspan--;
                                    }
                                    for (o = colspan; o--; ) {
                                        rows[i + rowspan]._aElements.push(rowspan ? false : null);
                                    }
                                }
                            }
                        }
                        //如果此单元格是被行合并的，则继续处理下一个单元格
                        else if (o._aElements[j] === false) {
                            continue;
                        }
                        else {
                            // 当前行处理完毕，list[i]不再保存行内需要处理的下一个元素
                            for (j = 0; ; j++) {
                                // 以下使用 type 临时表示列的初始化参数
                                type = {};
                                for (i = 0; o = rows[i]; i++) {
                                    el = o._aElements[j];
                                    if (el === undefined) {
                                        this._aHeadRows = this._aRows.splice(0, headRowCount);
                                        return;
                                    }
                                    else if (el) {
                                        if (i < headRowCount) {
                                            extend(type, getOptions(el));
                                            el.className = trim(el.className) + this.HCell.TYPES;
                                            cols[j] = $fastCreate(this.HCell, el, this);
                                            cols[j]._oOptions = extend({}, type); //防止子列options影响父列
                                        }
                                        else {
                                            el.className =
                                                (trim(el.className) || type.primary || '') + this.Cell.TYPES;
                                            el.getControl = UI_TABLE_GETCONTROL();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ),
        UI_TABLE_CLASS = UI_TABLE.prototype,

        /**
         * 初始化表格控件的行部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_ROW_CLASS = (UI_TABLE_CLASS.Row = inheritsControl(UI_CONTROL, 'ui-table-row')).prototype,

        /**
         * 初始化表格控件的列部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_HCELL_CLASS = (UI_TABLE_CLASS.HCell = inheritsControl(UI_CONTROL, 'ui-table-hcell')).prototype,

        /**
         * 初始化表格控件的单元格部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_CELL_CLASS = (UI_TABLE_CLASS.Cell = inheritsControl(
            UI_CONTROL,
            'ui-table-cell',
            function (el, options) {
                // 单元格控件不能改变大小
                options.resizable = false;
            }
        )).prototype,

        /**
         * 在需要时初始化单元格控件。
         * 表格控件的单元格控件不是在初始阶段生成，而是在单元格控件第一次被调用时生成，参见核心的 getControl 方法。
         * @private
         *
         * @return {Function} 初始化单元格函数
         */
        UI_TABLE_GETCONTROL = ieVersion == 8 ? function () {
            // 为了防止写入getControl属性而导致的reflow如此处理
            var control;
            return function () {
                return (control = control || UI_TABLE_CREATE_CELL(this));
            };
        } : function () {
            return UI_TABLE_INIT_CELL;
        };
//{else}//
    /**
     * 初始化单元格。
     * @private
     *
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    function UI_TABLE_INIT_CELL() {
        this.getControl = null;
        return UI_TABLE_CREATE_CELL(this);
    }

    /**
     * 建立单元格控件。
     * @private
     *
     * @param {HTMLElement} main 单元格控件主元素
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    function UI_TABLE_CREATE_CELL(main) {
        // 获取单元格所属的行控件
        var row = getParent(main).getControl(),
            table = row.getParent();

        return $fastCreate(
            table.Cell,
            main,
            row,
            extend({}, table._aHCells[indexOf(row._aElements, main)]._oOptions)
        );
    }

    /**
     * 表格控件初始化一行。
     * @private
     *
     * @param {ecui.ui.Table.Row} row 行控件
     */
    function UI_TABLE_INIT_ROW(row) {
        for (var i = 0, list = row.getParent()._aHCells, el, o; o = list[i]; ) {
            if ((el = row._aElements[i++]) && el != o.getMain()) {
                o = o.getWidth() - o.getMinimumWidth();
                while (row._aElements[i] === null) {
                    o += list[i++].getWidth();
                }
                el.style.width = o + 'px';
            }
        }
    }

    /**
     * 表格控件改变显示区域值。
     * 表格控件改变显示区域时，每次尽量移动一个完整的行或列的距离。
     * @private
     *
     * @param {number} value 控件的当前值
     */
    function UI_TABLE_SCROLL_SETVALUE(value) {
        //__gzip_original__length
        var i = 1,
            list = this.getParent()[this instanceof UI_VSCROLLBAR ? '_aRows' : '_aHCells'],
            length = list.length,
            oldValue = this.getValue();

        value = MIN(MAX(0, value), this.getTotal());

        if (value == oldValue) {
            return;
        }

        if (value > oldValue) {
            if (length == 1) {
                UI_SCROLLBAR_CLASS.setValue.call(this, this.getTotal());
                return;
            }
            for (; ; i++) {
                // 计算后移的新位置
                if (value <= list[i].$$pos) {
                    if (oldValue < list[i - 1].$$pos) {
                        i--;
                    }
                    break;
                }
            }
        }
        else {
            for (i = length; i--; ) {
                // 计算前移的新位置
                if (value >= list[i].$$pos) {
                    if (i < length - 1 && oldValue > list[i + 1].$$pos) {
                        i++;
                    }
                    break;
                }
            }
        }

        UI_SCROLLBAR_CLASS.setValue.call(this, list[i].$$pos);
    }

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$dispose = function () {
        this._aElements = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 获取一行内所有单元格的主元素。
     * $getElement 方法返回的主元素数组可能包含 false/null 值，分别表示当前单元格被向上或者向左合并。
     * @protected
     *
     * @return {Array} 主元素数组
     */
    UI_TABLE_ROW_CLASS.$getElements = function () {
        return this._aElements.slice();
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$hide = function () {
        var i = 0,
            table = this.getParent(),
            index = indexOf(table._aRows, this),
            nextRow = table._aRows[index + 1],
            j,
            cell,
            o;

        for (; table._aHCells[i]; i++) {
            o = this._aElements[i];
            if (o === false) {
                o = table.$getElement(index - 1, i);
                // 如果单元格向左被合并，cell == o
                if (cell != o) {
                    o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') - 1);
                    cell = o;
                }
            }
            else if (o && (j = +getAttribute(o, 'rowSpan')) > 1) {
                // 如果单元格包含rowSpan属性，需要将属性添加到其它行去
                o.setAttribute('rowSpan', j - 1);
                for (j = i + 1; ; ) {
                    cell = nextRow._aElements[j++];
                    if (cell || cell === undefined) {
                        break;
                    }
                }

                o.getControl().$setParent(nextRow);
                nextRow.getBody().insertBefore(o, cell || null);
            }
        }

        UI_CONTROL_CLASS.$hide.call(this);
        table.repaint();
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$show = function () {
        var i = 0,
            table = this.getParent(),
            index = indexOf(table._aRows, this),
            nextRow = table._aRows[index + 1],
            j,
            cell,
            o;

        for (; table._aHCells[i]; i++) {
            o = this._aElements[i];
            if (o === false) {
                o = table.$getElement(index - 1, i);
                // 如果单元格向左被合并，cell == o
                if (cell != o) {
                    o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') + 1);
                    cell = o;
                }
            }
            else if (o && nextRow && nextRow._aElements[i] === false) {
                // 如果单元格包含rowSpan属性，需要从其它行恢复
                o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') + 1);
                for (j = i + 1; ; ) {
                    cell = this._aElements[j++];
                    if (cell || cell === undefined) {
                        break;
                    }
                }

                o.getControl().$setParent(this);
                this.getBody().insertBefore(o, cell || null);
            }
        }

        UI_CONTROL_CLASS.$show.call(this);
        table.resize();
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} colIndex 列序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_ROW_CLASS.getCell = function (colIndex) {
        return this._aElements[colIndex] ? this._aElements[colIndex].getControl() : null;
    };

    /**
     * 获取全部单元格控件。
     * @public
     *
     * @return {Array} 单元格控件数组
     */
    UI_TABLE_ROW_CLASS.getCells = function () {
        for (var i = this._aElements.length, result = []; i--; ) {
            result[i] = this.getCell(i);
        }
        return result;
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.setSize = function (width, height) {
        for (var i = this._aElements.length, oldHeight = this.getHeight(); i--; ) {
            if (this._aElements[i]) {
                this._aElements[i].getControl().$setSize(null, height);
            }
        }
        this.getParent()[height > oldHeight ? 'resize' : 'repaint']();
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.$hide = function () {
        this.$setStyles('display', 'none', -this.getWidth());
    };

    /**
     * 设置整列的样式。
     * $setStyles 方法批量设置一列所有单元格的样式。
     * @protected
     *
     * @param {string} name 样式的名称
     * @param {string} value 样式的值
     * @param {number} widthRevise 改变样式后表格宽度的变化，如果省略表示没有变化
     */
    UI_TABLE_HCELL_CLASS.$setStyles = function (name, value, widthRevise) {
        //__gzip_original__cols
        var i = 0,
            table = this.getParent(),
            rows = table._aHeadRows.concat(table._aRows),
            body = this.getBody(),
            cols = table._aHCells,
            index = indexOf(cols, this),
            o = getParent(getParent(getParent(body))).style,
            j;

        body.style[name] = value;
        if (widthRevise) {
            o.width = first(table.getBody()).style.width = toNumber(o.width) + widthRevise + 'px';
        }

        for (; o = rows[i++]; ) {
            // 以下使用 body 表示列元素列表
            body = o._aElements;
            o = body[index];
            if (o) {
                o.style[name] = value;
            }
            if (widthRevise && o !== false) {
                for (j = index; !(o = body[j]); j--) {}

                var width = -cols[j].getMinimumWidth(),
                    colspan = 0;

                do {
                    if (!cols[j].getOuter().style.display) {
                        width += cols[j].getWidth();
                        colspan++;
                    }
                }
                while (body[++j] === null);

                if (width > 0) {
                    o.style.display = '';
                    o.style.width = width + 'px';
                    o.setAttribute('colSpan', colspan);
                }
                else {
                    o.style.display = 'none';
                }
            }
        }
        if (widthRevise > 0) {
            table.resize();
        }
        else {
            table.repaint();
        }
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.$show = function () {
        this.$setStyles('display', '', this.getWidth());
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} rowIndex 行序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_HCELL_CLASS.getCell = function (rowIndex) {
        return this.getParent().getCell(rowIndex, indexOf(this._aHCells, this));
    };

    /**
     * 获取全部单元格控件。
     * @public
     *
     * @return {Array} 单元格控件数组
     */
    UI_TABLE_HCELL_CLASS.getCells = function () {
        for (var i = 0, index = indexOf(this.getParent()._aHCells, this), o, result = []; o = this.getParent()._aRows[i]; ) {
            result[i++] = o.getCell(index);
        }
        return result;
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.setSize = function (width) {
        var oldWidth = this.getWidth();
        // 首先对列表头控件设置宽度，否则在计算合并单元格时宽度可能错误
        this.$setSize(width);
        this.$setStyles('width', width - this.$getBasicWidth() + 'px', width - oldWidth);
    };

    /**
     * @override
     */
    UI_TABLE_CELL_CLASS.getHeight = function () {
        return this.getOuter().offsetHeight;
    };

    /**
     * @override
     */
    UI_TABLE_CELL_CLASS.getWidth = function () {
        return this.getOuter().offsetWidth;
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$cache = function (style, cacheSize) {
        UI_PANEL_CLASS.$cache.call(this, style, cacheSize);

        this._uHead.cache(false, true);

        // 以下使用 style 表示临时对象 o
        this.$$paddingTop = this._uHead.getBody().offsetHeight;

        for (var i = 0, pos = 0; style = this._aRows[i++]; ) {
            style.$$pos = pos;
            style.cache(true, true);
            if (!style.getOuter().style.display) {
                pos += style.getHeight();
            }
        }
        for (i = 0, pos = 0; style = this._aHCells[i++]; ) {
            style.$$pos = pos;
            style.cache(true, true);
            if (!style.getOuter().style.display) {
                pos += style.getWidth();
            }
        }
        this.$$mainWidth = pos;
    };

    /**
     * 获取单元格主元素。
     * $getElement 方法在合法的行列序号内一定会返回一个 Element 对象，如果当前单元格被合并，将返回合并后的 Element 对象。
     * @protected
     *
     * @param {number} rowIndex 单元格的行数，从0开始
     * @param {number} colIndex 单元格的列数，从0开始
     * @return {HTMLElement} 单元格主元素对象
     */
    UI_TABLE_CLASS.$getElement = function (rowIndex, colIndex) {
        //__gzip_original__rows
        var rows = this._aRows,
            cols = rows[rowIndex] && rows[rowIndex]._aElements,
            col = cols && cols[colIndex];

        if (col === undefined) {
            col = null;
        }
        else if (!col) {
            for (; col === false; col = (cols = rows[--rowIndex]._aElements)[colIndex]) {}
            for (; !col; col = cols[--colIndex]) {}
        }
        return col;
    };

    /**
     * 页面滚动事件的默认处理。
     * @protected
     */
    UI_TABLE_CLASS.$pagescroll = function () {
        UI_PANEL_CLASS.$pagescroll.call(this);
        if (!this._uVScrollbar) {
            this._uHead.getOuter().style.top =
                MAX(getView().top - getPosition(this.getOuter()).top, 0) + 'px';
        }
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$scroll = function () {
        UI_PANEL_CLASS.$scroll.call(this);
        this._uHead.getMain().lastChild.style.left = this.getBody().style.left;
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$setSize = function (width, height) {
        var body = this.getBody(),
            vscroll = this.$getSection('VScrollbar'),
            hscroll = this.$getSection('HScrollbar'),
            mainWidth = this.$$mainWidth,
            mainHeight = this.$$mainHeight,
            vsWidth = vscroll && vscroll.getWidth(),
            hsHeight = hscroll && hscroll.getHeight(),
            basicWidth = this.$getBasicWidth(),
            basicHeight = this.$getBasicHeight(),
            mainWidthRevise = mainWidth + basicWidth,
            mainHeightRevise = mainHeight + basicHeight,
            bodyWidth = width - basicWidth,
            bodyHeight = height - basicHeight,
            o;

        this.getMain().style.paddingTop = this.$$paddingTop + 'px';
        first(body).style.width = this._uHead.getMain().lastChild.lastChild.style.width = mainWidth + 'px';

        // 计算控件的宽度与高度自动扩展
        if (mainWidth <= bodyWidth && mainHeight <= bodyHeight) {
            width = mainWidthRevise;
            height = mainHeightRevise;
        }
        else if (!(vscroll && hscroll &&
            mainWidth > bodyWidth - vsWidth && mainHeight > bodyHeight - hsHeight)
        ) {
            o = mainWidthRevise + (!vscroll || bodyHeight >= mainHeight ? 0 : vsWidth);
            width = hscroll ? MIN(width, o) : o;
            o = mainHeightRevise + (!hscroll || bodyWidth >= mainWidth ? 0 : hsHeight);
            height = vscroll ? MIN(height, o) : o;
        }

        UI_PANEL_CLASS.$setSize.call(this, width, height);

        this._uHead.$setSize(toNumber(getParent(body).style.width), this.$$paddingTop);
    };

    /**
     * 增加一列。
     * options 对象对象支持的属性如下：
     * width   {number} 列的宽度
     * primary {string} 列的基本样式
     * title   {string} 列的标题
     * @public
     *
     * @param {Object} options 列的初始化选项
     * @param {number} index 被添加的列的位置序号，如果不合法将添加在末尾
     * @return {ecui.ui.Table.HCell} 表头单元格控件
     */
    UI_TABLE_CLASS.addColumn = function (options, index) {
        var i = 0,
            headRowCount = this._aHeadRows.length,
            rows = this._aHeadRows.concat(this._aRows),
            primary = options.primary || '',
            el = createDom(primary + this.HCell.TYPES, '', 'td'),
            col = $fastCreate(this.HCell, el, this),
            row,
            o;

        el.innerHTML = options.title || '';

        primary += this.Cell.TYPES;
        for (; row = rows[i]; i++) {
            o = row._aElements[index];
            if (o !== null) {
                // 没有出现跨列的插入列操作
                for (j = index; !o; ) {
                    o = row._aElements[++j];
                    if (o === undefined) {
                        break;
                    }
                }
                if (i < headRowCount) {
                    row._aElements.splice(index, 0, row.getBody().insertBefore(el, o));
                    el.setAttribute('rowSpan', headRowCount - i);
                    this._aHCells.splice(index, 0, col);
                    i = headRowCount - 1;
                }
                else {
                    row._aElements.splice(index, 0, o = row.getBody().insertBefore(createDom(primary, '', 'td'), o));
                    o.getControl = UI_TABLE_GETCONTROL();
                }
            }
            else {
                // 出现跨列的插入列操作，需要修正colspan的属性值
                var cell = this.$getElement(i - headRowCount, index),
                    j = +getAttribute(cell, 'rowspan') || 1;

                cell.setAttribute('colSpan', +getAttribute(cell, 'colSpan') + 1);
                row._aElements.splice(index, 0, o);
                for (; --j; ) {
                    rows[++i]._aElements.splice(index, 0, false);
                }
            }
        }

        col.cache();
        col.$setSize(options.width);
        col.$setStyles('width', el.style.width, options.width);
        col._oOptions = extend({}, options);

        return col;
    };

    /**
     * 增加一行。
     * @public
     *
     * @param {Array} data 数据源(一维数组)
     * @param {number} index 被添加的行的位置序号，如果不合法将添加在最后
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.addRow = function (data, index) {
        var i = 0,
            j = 1,
            body = this.getBody().lastChild.lastChild,
            el = createDom(),
            html = ['<table><tbody><tr class="' + this.Row.TYPES + '">'],
            rowCols = [],
            row = this._aRows[index],
            col;

        if (!row) {
            index = this._aRows.length;
        }

        for (; col = this._aHCells[i]; ) {
            if (row && row._aElements[i] === false || data[i] === false) {
                rowCols[i++] = false;
            }
            else {
                // 如果部分列被隐藏，colspan/width 需要动态计算
                rowCols[i] = true;
                html[j++] = '<td class="' + this.Cell.TYPES + '" style="';
                for (
                    var o = i,
                        colspan = col.isShow() ? 1 : 0,
                        width = col.getWidth() - col.getMinimumWidth();
                    (col = this._aHCells[++i]) && data[i] === null;
                ) {
                    rowCols[i] = null;
                    if (col.isShow()) {
                        colspan++;
                        width += col.getWidth();
                    }
                }
                rowCols[o] = true;
                html[j++] = (colspan ? 'width:' + width + 'px" colSpan="' + colspan : 'display:none') + '">' +
                    (data[o] || '') + '</td>';
            }
        }

        html[j] = '</tr></tbody></table>';
        el.innerHTML = html.join('');
        el = el.lastChild.lastChild.lastChild;

        body.insertBefore(el, row ? row.getOuter() : null);
        row = $fastCreate(this.Row, el, this);
        this._aRows.splice(index--, 0, row);

        // 以下使用 col 表示上一次执行了rowspan++操作的单元格，同一个单元格只需要增加一次
        for (i = 0, el = el.firstChild, col = null; this._aHCells[i]; i++) {
            if (o = rowCols[i]) {
                rowCols[i] = el;
                el.getControl = UI_TABLE_GETCONTROL();
                el = el.nextSibling;
            }
            else if (o === false) {
                o = this.$getElement(index, i);
                if (o != col) {
                    o.setAttribute('rowSpan', (+getAttribute(o, 'rowSpan') || 1) + 1);
                    col = o;
                }
            }
        }

        row._aElements = rowCols;
        this.resize();
        return row;
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} rowIndex 行序号，从0开始
     * @param {number} colIndex 列序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_CLASS.getCell = function (rowIndex, colIndex) {
        rowIndex = this._aRows[rowIndex];
        return rowIndex && rowIndex.getCell(colIndex) || null;
    };

    /**
     * 获取表格列的数量。
     * @public
     *
     * @return {number} 表格列的数量
     */
    UI_TABLE_CLASS.getColumnCount = function () {
        return this._aHCells.length;
    };

    /**
     * 获取表头单元格控件。
     * 表头单元格控件提供了一些针对整列进行操作的方法，包括 hide、setSize(仅能设置宽度) 与 show 方法等。
     * @public
     *
     * @param {number} index 列序号，从0开始
     * @return {ecui.ui.Table.HCell} 表头单元格控件
     */
    UI_TABLE_CLASS.getHCell = function (index) {
        return this._aHCells[index] || null;
    };

    /**
     * 获取全部的表头单元格控件。
     * @public
     *
     * @return {Array} 表头单元格控件数组
     */
    UI_TABLE_CLASS.getHCells = function () {
        return this._aHCells.slice();
    };

    /**
     * 获取行控件。
     * @public
     *
     * @param {number} index 行数，从0开始
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.getRow = function (index) {
        return this._aRows[index] || null;
    };

    /**
     * 获取表格行的数量。
     * @public
     *
     * @return {number} 表格行的数量
     */
    UI_TABLE_CLASS.getRowCount = function () {
        return this._aRows.length;
    };

    /**
     * 获取全部的行控件。
     * @public
     *
     * @return {Array} 行控件列表
     */
    UI_TABLE_CLASS.getRows = function () {
        return this._aRows.slice();
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.init = function () {
        insertBefore(this._uHead.getBody(), this._uHead.getMain().lastChild.lastChild.firstChild);
        this.$$mainHeight -= this.$$paddingTop;

        UI_PANEL_CLASS.init.call(this);

        for (var i = 0, o; o = this._aHCells[i++]; ) {
            o.$setSize(o.getWidth());
        }
        for (i = 0; o = this._aHeadRows[i++]; ) {
            UI_TABLE_INIT_ROW(o);
        }
        for (i = 0; o = this._aRows[i++]; ) {
            UI_TABLE_INIT_ROW(o);
        }
    };

    /**
     * 移除一列并释放占用的空间。
     * @public
     *
     * @param {number} index 列序号，从0开始计数
     */
    UI_TABLE_CLASS.removeColumn = function (index) {
        var i = 0,
            cols = this._aHCells,
            o = cols[index];

        if (o) {
            o.hide();

            removeDom(o.getOuter());
            disposeControl(o);
            cols.splice(index, 1);

            for (; o = this._aRows[i++]; ) {
                cols = o._aElements;
                if (o = cols[index]) {
                    if (cols[index + 1] === null) {
                        // 如果是被合并的列，需要保留
                        cols.splice(index + 1, 1);
                        continue;
                    }
                    removeDom(o);
                    if (o.getControl != UI_TABLE_GETCONTROL()) {
                        disposeControl(o.getControl());
                    }
                }
                cols.splice(index, 1);
            }
        }
    };

    /**
     * 移除一行并释放占用的空间。
     * @public
     *
     * @param {number} index 行序号，从0开始计数
     */
    UI_TABLE_CLASS.removeRow = function (index) {
        var i = 0,
            row = this._aRows[index],
            rowNext = this._aRows[index + 1],
            body = row.getBody(),
            o;

        if (row) {
            row.hide();
            for (; this._aHCells[i]; i++) {
                if (o = row._aElements[i]) {
                    if (getParent(o) != body) {
                        rowNext._aElements[i] = o;
                        for (; row._aElements[++i] === null; ) {
                            rowNext._aElements[i] = null;
                        }
                        i--;
                    }
                }
            }

            removeDom(row.getOuter());
            disposeControl(row);
            this._aRows.splice(index, 1);

            this.repaint();
        }
    };

    // 初始化事件转发信息
    (function () {
        function build(name) {
            var type = name.replace('mouse', '');

            name = '$' + name;

            UI_TABLE_ROW_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                triggerEvent(this.getParent(), 'row' + type, event);
            };

            UI_TABLE_CELL_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                triggerEvent(this.getParent().getParent(), 'cell' + type, event);
            };
        }

        for (var i = 0; i < 7; ) {
            build(eventNames[i++]);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
LockedTable - 定义允许左右锁定若干列显示的高级表格的基本操作。
允许锁定左右两列的高级表格控件，继承自表格控件，内部包含两个部件——锁定的表头区(基础控件)与锁定的行内容区(基础控件)。

锁定列高级表格控件直接HTML初始化的例子:
<div ecui="type:locked-table;left-lock:2;right-lock:1">
    <table>
        <!-- 当前节点的列定义，如果有特殊格式，需要使用width样式 -->
        <thead>
            <tr>
                <th>标题</th>
                ...
            </tr>
        </thead>
        <tbody>
            <!-- 这里放单元格序列 -->
            <tr>
                <td>单元格一</td>
                ...
            </tr>
            ...
        </tbody>
    </table>
</div>

属性
_nLeft       - 最左部未锁定列的序号
_nRight      - 最右部未锁定列的后续序号，即未锁定的列序号+1
_aLockedRow  - 用于显示锁定区域的行控件数组
_uLockedHead - 锁定的表头区
_uLockedMain - 锁定的行内容区

表格行与锁定行属性
_eFill       - 用于控制中部宽度的单元格
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        MAX = MATH.max,
        REGEXP = RegExp,
        USER_AGENT = navigator.userAgent,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getAttribute = dom.getAttribute,
        insertBefore = dom.insertBefore,
        removeDom = dom.remove,
        blank = util.blank,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        disposeControl = core.dispose,
        $bind = core.$bind,
        inheritsControl = core.inherits,

        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ],

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_TABLE = ui.Table,
        UI_TABLE_CLASS = UI_TABLE.prototype,
        UI_TABLE_ROW = UI_TABLE_CLASS.Row,
        UI_TABLE_ROW_CLASS = UI_TABLE_ROW.prototype;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化高级表格控件。
     * options 对象支持的属性如下：
     * left-lock  左边需要锁定的列数
     * right-lock 右边需要锁定的列数
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_LOCKED_TABLE
    //__gzip_original__UI_LOCKED_TABLE_ROW
    var UI_LOCKED_TABLE = ui.LockedTable =
        inheritsControl(
            UI_TABLE,
            '*locked-table',
            null,
            function (el, options) {
                var i = 0,
                    type = this.getType(),
                    headRows = this._aHeadRows,
                    rows = headRows.concat(this._aRows),
                    lockedEl = createDom('', 'position:absolute;top:0px;left:0px;overflow:hidden'),
                    list = [],
                    lockedRows = this._aLockedRow = [],
                    lockedHeadRows = this._aLockedHeadRow = [],
                    o;

                this._nLeft = options.leftLock || 0;
                this._nRight = this.getColumnCount() - (options.rightLock || 0);

                // 以下使用 options 代替 rows
                for (; el = rows[i]; ) {
                    el = el.getMain();
                    list[i++] =
                        '<tr class="' + el.className + '" style="' + el.style.cssText +
                            '"><td style="padding:0px;border:0px"></td></tr>';
                }

                lockedEl.innerHTML =
                    '<div class="' + type + '-locked-head" style="position:absolute;top:0px;left:0px"><div style="white-space:nowrap;position:absolute"><table cellspacing="0"><thead>' + list.splice(0, headRows.length).join('') + '</thead></table></div></div><div class="' + type + '-locked-layout" style="position:absolute;left:0px;overflow:hidden"><div style="white-space:nowrap;position:absolute;top:0px;left:0px"><table cellspacing="0"><tbody>' + list.join('') + '</tbody></table></div></div>';
                // 初始化锁定的表头区域，以下使用 list 表示临时变量
                o = this._uLockedHead = $fastCreate(UI_CONTROL, lockedEl.firstChild, this);
                o.$setBody(el = o.getMain().lastChild.lastChild.firstChild);

                for (i = 0, list = children(el); o = list[i]; ) {
                    lockedHeadRows[i] = UI_LOCKED_TABLE_CREATE_LOCKEDROW(o, headRows[i++]);
                }

                o = this._uLockedMain = $fastCreate(UI_CONTROL, el = lockedEl.lastChild, this);
                o.$setBody(el = el.lastChild);

                for (i = 0, list = children(el.lastChild.lastChild); o = list[i]; ) {
                    lockedRows[i] = UI_LOCKED_TABLE_CREATE_LOCKEDROW(o, this._aRows[i++]);
                }
                insertBefore(lockedEl.firstChild, this._uHead.getOuter());
                insertBefore(lockedEl.firstChild, getParent(this.getBody()));
            }
        );
        UI_LOCKED_TABLE_CLASS = UI_LOCKED_TABLE.prototype,

        /**
         * 初始化高级表格控件的行部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_LOCKED_TABLE_ROW_CLASS = (UI_LOCKED_TABLE_CLASS.Row = inheritsControl(UI_TABLE_CLASS.Row)).prototype;
//{else}//
    /**
     * 建立锁定行控件。
     * @private
     *
     * @param {HTMLElement} el 锁定行的 Element 元素
     * @param {ecui.ui.Table.Row} row 表格基本行控件
     */
    function UI_LOCKED_TABLE_CREATE_LOCKEDROW(el, row) {
        $bind(el, row);
        row._eFill = el.lastChild;

        return row;
    }

    /**
     * 拆分行内的单元格到锁定列或基本列中。
     * @private
     *
     * @param {ecui.ui.LockedTable.LockedHead|ecui.ui.LockedTable.LockedRow} locked 锁定表头控件或者锁定行控件
     */
    function UI_LOCKED_TABLE_ROW_SPLIT(locked) {
        var i = 0,
            table = locked.getParent(),
            cols = table.getHCells(),
            list = locked.$getElements(),
            baseBody = locked.getBody(),
            lockedBody = getParent(locked._eFill),
            el = lockedBody.firstChild,
            o;

        for (; cols[i]; ) {
            if (i == table._nLeft) {
                el = baseBody.firstChild;
            }
            if (o = list[i++]) {
                if (el != o) {
                    (i <= table._nLeft || i > table._nRight ? lockedBody : baseBody).insertBefore(o, el);
                }
                else {
                    el = el.nextSibling;
                }
            }
            if (i == table._nRight) {
                el = locked._eFill.nextSibling;
            }
        }
    }

    /**
     * 拆分所有行内的单元格到锁定列或基本列中。
     * @private
     *
     * @param {ecui.ui.LockedTable} table 锁定式表格控件
     */
    function UI_LOCKED_TABLE_ALL_SPLIT(table) {
        for (var i = 0, o; o = table._aLockedHeadRow[i++]; ) {
            UI_LOCKED_TABLE_ROW_SPLIT(o);
        }
        for (var i = 0, o; o = table._aLockedRow[i++]; ) {
            UI_LOCKED_TABLE_ROW_SPLIT(o);
        }
    }

    /**
     * @override
     */
    UI_LOCKED_TABLE_ROW_CLASS.$dispose = function () {
        this._eFill = null;
        UI_TABLE_ROW_CLASS.$dispose.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$cache = function (style, cacheSize) {
        UI_TABLE_CLASS.$cache.call(this, style, cacheSize);

        var i = 0,
            rows = this.getRows(),
            cols = this.getHCells(),
            pos = cols[this._nLeft].$$pos;

        this.$$paddingTop = MAX(this.$$paddingTop, this._uLockedHead.getBody().offsetHeight);
        this.$$mainWidth -=
            (this.$$paddingLeft = pos) +
                (this.$$paddingRight =
                    this._nRight < cols.length ? this.$$mainWidth - cols[this._nRight].$$pos : 0);

        // 以下使用 style 代替临时变量 o
        for (; style = cols[i++]; ) {
            style.$$pos -= pos;
        }

        for (i = 0, pos = 0; style = rows[i++]; ) {
            style.getCell(this._nLeft).cache(false, true);
            style.$$pos = pos;
            pos += MAX(style.getHeight(), style._eFill.offsetHeight);
        }

        if (pos) {
            this.$$mainHeight = pos;
            if (!this._bCreated) {
                this.$$mainHeight += this.$$paddingTop;
            }
        }

        this._uLockedHead.cache(false, true);
        this._uLockedMain.cache(false, true);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$pagescroll = function () {
        UI_TABLE_CLASS.$pagescroll.call(this);
        if (!this._uVScrollbar) {
            this._uLockedHead.getOuter().style.top = this._uHead.getOuter().style.top
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$resize = function () {
        var o = this.getMain().style;
        o.paddingLeft = o.paddingRight = '';
        this.$$paddingLeft = this.$$paddingRight = 0;
        UI_TABLE_CLASS.$resize.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$scroll = function () {
        UI_TABLE_CLASS.$scroll.call(this);
        this._uLockedMain.getBody().style.top = this.getBody().style.top;
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$setSize = function (width, height) {
        var o = this.getMain().style,
            i = 0,
            layout = getParent(this.getBody()),
            lockedHead = this._uLockedHead,
            lockedMain = this._uLockedMain,
            style = getParent(getParent(lockedHead.getBody())).style;

        o.paddingLeft = this.$$paddingLeft + 'px';
        o.paddingRight = this.$$paddingRight + 'px';

        UI_TABLE_CLASS.$setSize.call(this, width, height);
        o = this._uHead.getWidth() + this.$$paddingLeft + this.$$paddingRight;
        lockedHead.$setSize(o, this.$$paddingTop);

        style.height = this.$$paddingTop + 'px';
        this._uLockedMain.$setSize(o, toNumber(layout.style.height));
        style.width = this._uLockedMain.getBody().lastChild.style.width = o + 'px';
        this._uLockedMain.getOuter().style.top = this.$$paddingTop + 'px';

        width = layout.style.width;

        // 统一行高
        // 分别设置表头与内容区域
        var rows = this._aLockedHeadRow,
            minHeight;

        // 设置表头， 处理多行表头的问题
        height = this.$$paddingTop / rows.length; 
        for (i = 0; o = rows[i]; i++) {
            o._eFill.style.width = width;
            o._eFill.style.height = height + 'px';
            o = o.getCell(this._nLeft);
            if (o) {
                //此处处理了
                minHeight = firefoxVersion ? 0 : ((o.$getBasicHeight && o.$getBasicHeight()) || 60);
                //firefox 16版本出了问题 单独fix一下
                if(firefoxVersion && firefoxVersion > 15) {
                    minHeight = o.$getBasicHeight();
                }
                o = o.getOuter();
                style = getAttribute(o, 'rowSpan') || 0;
                if (style) {
                    style = parseInt(style, 10);
                }
                o.style.height = MAX(style * height - minHeight, 0) + 'px';
            }
        }
        
        // 设置表格内容行
        rows = this._aLockedRow;
        for (i = 0; o = rows[i]; i++) {
            o._eFill.style.width = width;

            style = MAX(height = o.getCell(this._nLeft).getOuter().offsetHeight, o._eFill.offsetHeight);
            if (style > o._eFill.offsetHeight) {
                o._eFill.style.height = style + 'px';
            }
            else if (height < style) {
                minHeight = firefoxVersion ? 0 : o.getCell(this._nLeft).$getBasicHeight();
                //firefox 16版本出了问题 单独fix一下
                 if(firefoxVersion && firefoxVersion > 15) {
                    minHeight = o.getCell(this._nLeft).$getBasicHeight()
                }
                o.getCell(this._nLeft).getOuter().style.height = MAX(style - minHeight, 0) + 'px';
            }
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.addColumn = function (options, index) {
        if (index >= 0) {
            if (index < this._nLeft) {
                this._nLeft++;
            }
            if (index < this._nRight) {
                this._nRight++;
            }
        }
        return UI_TABLE_CLASS.addColumn.call(this, options, index);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.removeRow = function (index) {
        var i = 0,  row = this._aRows[index], o,
            lockedTR = row._eFill.parentNode;

        if (row) {
            row.hide();
            o = row.getOuter();
            disposeControl(row);
            removeDom(o, true);
            removeDom(lockedTR, true);
            this._aRows.splice(index, 1);
            this._aLockedRow.splice(index, 1);
            this.repaint();
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.addRow = function (data, index) {

        //__gzip_original__lockedRow
        var row = UI_TABLE_CLASS.addRow.call(this, data, index),
            index = indexOf(this.getRows(), row),
            lockedRow = this._aLockedRow[index],
            el = row.getMain(),
            o = createDom();

        o.innerHTML = '<table cellspacing="0"><tbody><tr class="' + el.className + '" style="' + el.style.cssText +
            '"><td style="padding:0px;border:0px"></td></tr></tbody></table>';

        o = UI_LOCKED_TABLE_CREATE_LOCKEDROW(el = o.lastChild.lastChild.lastChild, row);
        lockedRow = lockedRow ? lockedRow._eFill.parentNode : null;
        this._uLockedMain.getBody().lastChild.lastChild.insertBefore(el, lockedRow);
        this._aLockedRow.splice(index, 0, o);
        UI_LOCKED_TABLE_ROW_SPLIT(o);

        this.repaint();

        return row;
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.init = function () {
        UI_LOCKED_TABLE_ALL_SPLIT(this);
        UI_TABLE_CLASS.init.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.removeColumn = function (index) {
        UI_TABLE_CLASS.removeColumn.call(this, index);
        if (index >= 0) {
            if (index < this._nLeft) {
                this._nLeft--;
            }
            if (index < this._nRight) {
                this._nRight--;
            }
        }
    };

    /**
     * 初始化需要执行关联控制的行控件鼠标事件的默认处理。
     * 行控件鼠标事件发生时，需要通知关联的行控件也同步产生默认的处理。
     * @protected
     */
    (function () {
        function build(name) {
            UI_LOCKED_TABLE_ROW_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                getParent(this._eFill).className = this.getMain().className;
            };
        }

        for (var i = 0; i < 11; ) {
            build('$' + eventNames[i++]);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
MessageBox - 消息框功能。
*/
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,

        createDom = dom.create,

        createControl = core.create,
        disposeControl = core.dispose;
//{/if}//
//{if $phase == "define"}//
    var ECUI_MESSAGEBOX,
        ECUI_MESSAGEBOX_BUTTONS = [];
//{else}//
    /**
     * 消息框点击事件处理。
     * @private
     * 
     * @param {Event} event 事件对象
     */
    function ECUI_MESSAGEBOX_ONCLICK(event) {
        ECUI_MESSAGEBOX.hide();
        if (this._fAction) {
            this._fAction.call(null, event);
        }
    }

    /**
     * 消息框显示提示信息，仅包含确认按钮。
     * @protected
     * 
     * @param {string} text 提示信息文本
     * @param {Array} buttonTexts 按钮的文本数组
     * @param {Array} 按钮配置
     *          {String} text 文本
     *          {String} className 按钮样式
     *          {Function} action 点击事件处理函数
     * @param {Number} opacity 不透明度
     */
    core.$messagebox = function (text, title, buttons, opacity) {
        if (!ECUI_MESSAGEBOX) {
            ECUI_MESSAGEBOX = createControl(
                'Form',
                {
                    main: createDom('ui-form ui-messagebox'),
                    hide: true,
                    parent: document.body,
                    autoCenter: true,
                    closeButton: false
                }
            );

            body = ECUI_MESSAGEBOX.getBody();
            body.innerHTML =
                '<div class="ui-messagebox-text"></div>' +
                '<div class="ui-messagebox-bottom"></div>';
        }

        var i = 0,
            length = buttons.length,
            body = ECUI_MESSAGEBOX.getBody(),
            bottom = body.lastChild,
            o;

        if (!ECUI_MESSAGEBOX.isShow()) {
            while (length > ECUI_MESSAGEBOX_BUTTONS.length) {
                ECUI_MESSAGEBOX_BUTTONS.push(
                    createControl('Button', {element: createDom('ui-button', '', 'span'), parent: bottom})
                );
            }

            disposeControl(body = body.firstChild);
            body.innerHTML = text;

            for (; o = ECUI_MESSAGEBOX_BUTTONS[i]; i++) {
                if (i < length) {
                    o.setContent(buttons[i].text);
                    o.$show();
                    o._fAction = buttons[i].action;
                    o.onclick = ECUI_MESSAGEBOX_ONCLICK;
                    if (buttons[i].className) {
                        o.setClass(buttons[i].className);
                    }
                    else {
                        o.setClass(o.getPrimary());
                    }
                }
                else {
                    o.$hide();
                }
            }

            ECUI_MESSAGEBOX.setTitle(title || '提示');
            ECUI_MESSAGEBOX.showModal(opacity);
        }
    };

    /**
     * 消息框显示提示信息，仅包含确认按钮。
     * @public
     * 
     * @param {string} text 提示信息文本
     * @param {Function} onok 确认按钮点击事件处理函数
     */
    core.alert = function (text, onok) {
        core.$messagebox(text, '提示', [
            {text: '确定', className: 'ui-button-g', action: onok}
        ]);
    };

    /**
     * 消息框显示提示信息，包含确认/取消按钮。
     * @public
     * 
     * @param {string} text 提示信息文本
     * @param {Function} onok 确认按钮点击事件处理函数
     * @param {Function} oncancel 取消按钮点击事件处理函数
     */
    core.confirm = function (text, onok, oncancel) {
        core.$messagebox(text, '确认', [
            {text: '确定', className: 'ui-button-g', action: onok},
            {text: '取消', action: oncancel}
        ]);
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
PopupMenu - 定义弹出菜单项的基本操作。
弹出菜单控件，继承自基础控件，实现了选项组接口。弹出式菜单操作时不会改变当前已经激活的对象，任何点击都将导致弹出菜单消失，弹出菜单默认向右展开子菜单，如果右部已经到达浏览器最边缘，将改为向左显示。

弹出菜单控件直接HTML初始化的例子:
<div ecui="type:popup">
  <!-- 这里放选项内容 -->
  ...
  <div>菜单项</div>
  <!-- 包含子菜单项的菜单项 -->
  <div>
    <label>菜单项</label>
    <!-- 这里放子菜单项 -->
    ...
    <div>子菜单项</div>
  </div>
</div>

属性
_nOptionSize - 弹出菜单选项的显示数量，不设置将全部显示
_uPrev       - 向上滚动按钮
_uNext       - 向下滚动按钮

子菜单项属性
_cSubPopup   - 下级弹出菜单的引用
*/
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        DOCUMENT = document,
        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,

        indexOf = array.indexOf,
        createDom = dom.create,
        first = dom.first,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        blank = util.blank,
        extend = util.extend,
        getView = util.getView,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        intercept = core.intercept,
        restore = core.restore,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化弹出菜单控件。
     * options 对象支持的属性如下：
     * optionSize 弹出菜单选项的显示数量，不设置将全部显示
     * @public
     *
     * @param {Object} options 初始化选项
     */
    ///__gzip_original__UI_POPUP_MENU
    ///__gzip_original__UI_POPUP_MENU_BUTTON
    ///__gzip_original__UI_POPUP_MENU_ITEM
    var UI_POPUP_MENU = ui.PopupMenu =
        inheritsControl(
            UI_CONTROL,
            'ui-popup',
            null,
            function (el, options) {
                //__gzip_original__buttonParams
                var type = this.getType();

                //removeDom(el);
                el.style.cssText += ';position:absolute;overflow:hidden';
                if (this._nOptionSize = options.optionSize) {
                    var o = createDom(type + '-body', 'position:absolute;top:0px;left:0px');

                    moveElements(el, o);

                    el.innerHTML =
                        '<div class="' + type + '-prev' + this.Button.TYPES +
                            '" style="position:absolute;top:0px;left:0px"></div><div class="' +
                            type + '-next' + this.Button.TYPES + '" style="position:absolute"></div>';

                    this.$setBody(el.insertBefore(o, el = el.firstChild));

                    this._uPrev = $fastCreate(this.Button, el, this);
                    this._uNext = $fastCreate(this.Button, el.nextSibling, this);
                }

                // 初始化菜单项
                this.$initItems();
            }
        ),
        UI_POPUP_MENU_CLASS = UI_POPUP_MENU.prototype,

        /**
         * 初始化弹出菜单控件的按钮部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_POPUP_MENU_BUTTON_CLASS = (UI_POPUP_MENU_CLASS.Button = inheritsControl(
            UI_BUTTON,
            null,
            function (el, options) {
                options.userSelect = options.focusable = false;
            }
        )).prototype,

        /**
         * 初始化弹出菜单控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_POPUP_MENU_ITEM_CLASS = (UI_POPUP_MENU_CLASS.Item = inheritsControl(
            UI_ITEM,
            null,
            null,
            function (el, options) {
                var o = first(el),
                    tmpEl;

                if (o && o.tagName == 'LABEL') {
                    moveElements(el, tmpEl = createDom(options.parent.getPrimary() + UI_POPUP_MENU.TYPES));
                    el.appendChild(o);
                    this._cSubPopup = $fastCreate(UI_POPUP_MENU, tmpEl, this, extend({}, options));
                }

                UI_POPUP_MENU_ITEM_FLUSH(this);
            }
        )).prototype,

        UI_POPUP_MENU_CHAIN = [];
//{else}//
    /**
     * 弹出菜单选项样式刷新。
     * @private
     *
     * @param {ecui.ui.PopupMenu.Item} item 选项控件
     */
    function UI_POPUP_MENU_ITEM_FLUSH(item) {
        if (item) {
            item.setClass(item.getPrimary() + (item.getItems().length ? '-branch' : ''));
        }
    }

    extend(UI_POPUP_MENU_CLASS, UI_ITEMS);

    /**
     * @override
     */
    UI_POPUP_MENU_BUTTON_CLASS.$click = function (event) {
        UI_BUTTON_CLASS.$click.call(this, event);

        var parent = this.getParent(),
            style = parent.getBody().style,
            list = parent.getItems(),
            height = list[0].getHeight(),
            prevHeight = parent._uPrev.getHeight(),
            top = (toNumber(style.top) - prevHeight) / height;

        style.top =
            MIN(MAX(parent._uPrev == this ? ++top : --top, parent._nOptionSize - list.length), 0) * height +
                prevHeight + 'px';
    };

    /**
     * @override
     */
    UI_POPUP_MENU_ITEM_CLASS.$click = function (event) {
        UI_ITEM_CLASS.$click.call(this, event);
        if (!this.getItems().length) {
            // 点击最终项将关闭打开的全部弹出菜单
            UI_POPUP_MENU_CHAIN[0].hide();
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_ITEM_CLASS.$deactivate = function (event) {
        UI_ITEM_CLASS.$deactivate.call(this, event);
        if (!this.contain(event.getControl())) {
            // 如果没有在菜单项上形成完整的点击，同样关闭弹出菜单，不触发click事件
            UI_POPUP_MENU_CHAIN[0].hide();
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_ITEM_CLASS.$mouseover = function (event) {
        // 改变菜单项控件的显示状态
        UI_ITEM_CLASS.$mouseover.call(this, event);

        var o = getView(),
            subPopup = this._cSubPopup,
            popup = this.getParent(),
            index = indexOf(UI_POPUP_MENU_CHAIN, popup),
            supPopup = UI_POPUP_MENU_CHAIN[index - 1],
            oldSubPopup = UI_POPUP_MENU_CHAIN[index + 1],
            pos = getPosition(this.getOuter()),
            x = pos.left,
            width;

        if (oldSubPopup != subPopup) {
            // 隐藏之前显示的下级弹出菜单控件
            if (oldSubPopup) {
                oldSubPopup.hide();
            }

            if (this.getItems().length) {
                popup._cExpanded = this;
                this.alterClass('+expanded');

                subPopup.show();

                // 计算子菜单应该显示的位置，以下使用oldSubPopup表示left
                width = subPopup.getWidth();
                oldSubPopup = x + this.getWidth() - 4;
                x -= width - 4;

                // 优先计算延用之前的弹出顺序的应该的位置，显示新的子弹出菜单
                subPopup.setPosition(
                    oldSubPopup + width > o.right || supPopup && supPopup.getX() > popup.getX() && x > o.left ?
                        x : oldSubPopup,
                    pos.top - 4
                );
            }
        }
    };

    /**
     * 添加子选项控件。
     * @public
     *
     * @param {string|Element|ecui.ui.Item} item 选项控件的 html 内容/控件对应的 Element 对象/选项控件
     * @param {number} index 子选项控件需要添加的位置序号
     * @param {Object} options 子控件初始化选项
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_POPUP_MENU_ITEM_CLASS.add = function (item, index, options) {
        var parent = this.getParent();

        return (this._cSubPopup = this._cSubPopup ||
                    $fastCreate(UI_POPUP_MENU, createDom(parent.getPrimary() + parent.constructor.agent.TYPES), this)
        ).add(item, index, options);
    };

    /**
     * 获取全部的子选项控件。
     * @public
     *
     * @return {Array} 子选项控件数组
     */
    UI_POPUP_MENU_ITEM_CLASS.getItems = function () {
        return this._cSubPopup && this._cSubPopup.getItems() || [];
    };

    /**
     * 移除子选项控件。
     * @public
     *
     * @param {number|ecui.ui.Item} item 选项控件的位置序号/选项控件
     * @return {ecui.ui.Item} 被移除的子选项控件
     */
    UI_POPUP_MENU_ITEM_CLASS.remove = function (item) {
        return this._cSubPopup && this._cSubPopup.remove(item);
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$alterItems = function () {
        UI_POPUP_MENU_ITEM_FLUSH(this.getParent());

        if (getParent(this.getOuter())) {
            //__gzip_original__optionSize
            var list = this.getItems(),
                len = list.length,
                height = len && list[0].getHeight(),
                optionSize = this._nOptionSize,
                prev = this._uPrev,
                next = this._uNext,
                prevHeight = 0,
                bodyWidth = this.getBodyWidth();

            this.setItemSize(bodyWidth, height);

            height *= MIN(optionSize, len);
            if (optionSize) {
                if (len > optionSize) {
                    prev.show();
                    next.show();
                    prev.$setSize(bodyWidth);
                    next.$setSize(bodyWidth);

                    // 以下使用 prev 代替向上滚动按钮的高度，使用 next 代替向下滚动按钮的高度
                    prevHeight = prev.getHeight();
                    next.setPosition(0, prevHeight + height);
                    height += prevHeight + next.getHeight();
                }
                else {
                    prev.hide();
                    next.hide();
                }
            }

            this.getBody().style.top = prevHeight + 'px';
            this.setBodySize(0, height);
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$cache = function (style, cacheSize) {
        UI_ITEMS.$cache.call(this, style, cacheSize);

        if (this._uPrev) {
            this._uPrev.cache(true, true);
        }
        if (this._uNext) {
            this._uNext.cache(true, true);
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$dispose = function () {
        // 这里取消展开项的引用，是为了防止全页面 unload 时，展开项在弹出菜单之前被释放了，从而调用 alterClass 恢复状态出错。
        this._cExpanded = null;
        this.hide();
        UI_ITEMS.$dispose.call(this);
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$hide = function () {
        for (var i = indexOf(UI_POPUP_MENU_CHAIN, this), index = i, o; o = UI_POPUP_MENU_CHAIN[i++]; ) {
            // 关闭弹出菜单需要同步关闭所有后续的弹出菜单
            if (o._cExpanded) {
                o._cExpanded.alterClass('-expanded');
            }

            UI_CONTROL_CLASS.$hide.call(o);
        }

        if (index) {
            UI_POPUP_MENU_CHAIN = UI_POPUP_MENU_CHAIN.slice(0, index);
            UI_POPUP_MENU_CHAIN[index - 1]._cExpanded.alterClass('-expanded');
        }
        else {
            UI_POPUP_MENU_CHAIN = [];
            restore();
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$intercept = function (event) {
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof this.Item) {
                // 点击发生在按钮上可能触发点击事件，不默认调用 restore 恢复状态
                return false;
            }
        }
        // 点击发生在其它区域需要关闭弹出菜单，restore 在 $hide 中触发
        UI_POPUP_MENU_CHAIN[0].hide();
        return false;
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$remove = function (item) {
        if (this._cExpanded == item) {
            UI_POPUP_MENU_CHAIN[indexOf(UI_POPUP_MENU_CHAIN, this) + 1].hide();
        }
        UI_ITEMS.$remove.call(this, item);
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.$show = function () {
        UI_CONTROL_CLASS.$show.call(this);

        var o = getView(),
            el = this.getOuter(),
            length = UI_POPUP_MENU_CHAIN.length,
            pos;
        
        if (!getParent(el)) {
            DOCUMENT.body.appendChild(el);
            this.$alterItems();
        }

        pos = getPosition(el);

        // 限制弹出菜单不能超出屏幕
        this.setPosition(
            MIN(MAX(pos.left, o.left), o.right - this.getWidth()),
            MIN(MAX(pos.top, o.top), o.bottom - this.getHeight())
        );

        if (!length) {
            // 第一个弹出菜单，需要屏蔽鼠标点击
            intercept(this);
        }

        el.style.zIndex = 32768 + length;
        UI_POPUP_MENU_CHAIN.push(this);
    };

    /**
     * 弹出菜单无法指定挂载位置。
     * @override
     */
    UI_POPUP_MENU_CLASS.appendTo = UI_POPUP_MENU_CLASS.setParent = blank;

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.cache = function (cacheSize, force) {
        if (getParent(this.getOuter())) {
            UI_CONTROL_CLASS.cache.call(this, cacheSize, force);
        }
    };

    /**
     * @override
     */
    UI_POPUP_MENU_CLASS.repaint = function () {
        if (getParent(this.getOuter())) {
            UI_CONTROL_CLASS.repaint.call(this);
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//
