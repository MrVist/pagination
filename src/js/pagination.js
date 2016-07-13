/**
 * Created by Administrator on 2016/7/11.
 */

//分页插件
(function () {
    'use strict';
    var jQuery = window.jQuery,
        pluginName = 'pagination',
        defaults = {
            'firstText': '首页',
            'lastText': '末页',
            'preText': '上一页',
            'nextText': '下一页',
            'total': '1',
            'current': '1',
            'pages': ['1', '2', '3', '4', '5']
        };

    function Pagination(element, options, callback) {
        this.isFirst = false;
        this.isLast = false;
        this.$element = $(element);
        this.options = options ? $.extend({}, defaults, options) : defaults;
        this.callback = typeof callback === 'function' ? callback : function () {
            return false;
        };
    }

    Pagination.prototype = {
        //初始化方法生成分页数据html
        init: function (options, callback) {
            var _this = this,
                page = '';

            _this.options = options ? $.extend({}, _this.options, options) : _this.options;
            _this.callback = typeof callback === 'function' ? callback : _this.callback;
            //判断是否首页尾页
            _this.isFirst = parseInt(_this.options.current) === 1;
            _this.isLast = parseInt(_this.options.total) === parseInt(_this.options.current);

            for (var i = 0, length = _this.options.pages.length; i < length; i++) {
                var isSelected = parseInt(_this.options.current) === parseInt(_this.options.pages[i]);
                page = page + '<span data-page=\"' + parseInt(_this.options.pages[i]) + '\" ' + (isSelected ? 'class=\"selected\"' : '') + '>' + _this.options.pages[i] + '</span>';
            }

            var html = '<span data-page=\"' + 1 + '\" ' + (_this.isFirst ? 'disabled=\"disabled\"' : '') + '>' + _this.options.firstText + '</span>' +
                '<span data-page=\"' + (parseInt(_this.options.current) - 1) + '\" ' + (_this.isFirst ? 'disabled=\"disabled\"' : '') + '>' + _this.options.preText + '</span>' +
                page +
                '<span data-page=\"' + (parseInt(_this.options.current) + 1) + '\" ' + (_this.isLast ? 'disabled=\"disabled\"' : '') + '>' + _this.options.nextText + '</span>' +
                '<span data-page=\"' + parseInt(_this.options.total) + '\" ' + (_this.isLast ? 'disabled=\"disabled\"' : '') + '>' + _this.options.lastText + '</span>';
            _this.$element.html(html);
            _this.$element.unbind('click.pagination');
            _this.$element.on('click.pagination',function (e) {
                e = e || window.event;
                if (!e.target.getAttribute('disabled') && !isNaN(parseInt(e.target.getAttribute('data-page')))) {
                    _this.callback(e.target.getAttribute('data-page'));
                } else {
                    return false;
                }
            });
        },
        hide: function () {
            this.$element.css('display', 'none');
        },
        show: function () {
            this.$element.css('display', 'block');
        }
    };

    jQuery.fn[pluginName] = function () {
        return new Pagination(this, arguments[0], arguments[1]);
    }
})();