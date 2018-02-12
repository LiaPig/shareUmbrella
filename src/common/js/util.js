var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
// import throttle from 'lodash.throttle'
// import BpmnModeler from 'bpmn-js/lib/Viewer.js'
// import modeling from 'bpmn-js/lib/features/modelinbpmng'

export default {
    intranet: window.location.href.indexOf("10.150.133.138") > -1,
    // throttle,
  // BpmnModeler,
  // Viewer() {
  //   this.BpmnModeler.prototype._modules.push(require('bpmn-js/lib/features/modeling'));
  //   return BpmnModeler;
  // },
    setLoca(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    },
    getLoca(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    getSrcUrl(url, data) {
        let token = localStorage.getItem('token');
        let urls = this.api;
        if (url.indexOf('?') > -1) {
            urls += url + '&token=' + token;
        } else {
            urls += url + '?token=' + token;
        }
        if (data) {
            for (var i in data) {
                urls += '&' + i + '=' + data[i]
            }
        }
        return urls;
    },
    api: process.env.NODE_ENV === 'production' ? '' : '/apis/',
    resetForm(obj, formName) {
        obj.$refs[formName].resetFields();
    },
    changeArrayToStr(arr, symbol, key) {
        var str = '',
            symbol = symbol || ','
        if (key) {
            for (var i = 0; i < arr.length; i++) {
                str += i == arr.length - 1 ? arr[i][key] : arr[i][key] + symbol;
            }
        } else {
            for (var i = 0; i < arr.length; i++) {
                str += i == arr.length - 1 ? arr[i] : arr[i] + symbol;
            }
        }

        return str;
    },
    changeStrToArr(str) {
        if (!str) {
            return []
        }
        if (str.indexOf(',') > -1) {
            return str.split(',')
        } else {
            return [str]
        }
    },
    getDataFormArr(data, arr, arrkey) {
        let newArr = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][arrkey] == data[i]) {
                    newArr.push(arr[j])
                }
            }
        }
        return newArr;
    },
    getKeyVal(val, arr, key, symbol) {
        var str = '',
            symbol = symbol || ',';

        if (typeof(val) == 'object') {
            for (var i = 0; i < val.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    if (val[i] == arr[j][key]) {
                        str += i == val.length - 1 ? arr[j][key] : arr[j][key] + symbol;
                    }
                }
            }
        } else {
            for (var j = 0; j < arr.length; j++) {
                if (val == arr[j][key]) {
                    str += arr[j][key];
                }
            }
        }

        return str;
    },
    getValName(val, arr, key, name, symbol) {
        var str = '',
            symbol = symbol || ',';

        if (typeof(val) == 'object') {
            for (var i = 0; i < val.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    if (val[i] == arr[j][key]) {
                        str += i == val.length - 1 ? arr[j][name] : arr[j][name] + symbol;
                    }
                }
            }
        } else {
            for (var j = 0; j < arr.length; j++) {
                if (val == arr[j][key]) {
                    str += arr[j][name];
                }
            }
        }

        return str;
    },
    getQueryStringByName: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    removeValFromArr: function(arr,val) {
        for(var i = 0; i < arr.length; i++) {
            if (arr[i] == val){
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    },
    // 获取当前月的第一天
    getCurrentMonthFirst() {
        var date = new Date();
        date.setDate(1);
        return this.formatDate.format(date, 'yyyy-MM-dd');
    },
    // 获取当前月的最后一天
    getCurrentMonthLast() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return this.formatDate.format(new Date(nextMonthFirstDay - oneDay), 'yyyy-MM-dd');
    },
    formatDate: {
        format: function(date, pattern) {
            if (!date) {
                return null;
            }
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            if (!dateString) {
                return null;
            }
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date.getTime();
            }
            return null;
        }
    },
    //获取当前月
    getCurrentMonth: function() {
        var newDate = new Date();
        var currentMonth = newDate.getMonth() + 1;
        var start = newDate.getFullYear() + '-' + currentMonth + '-1';
        start = new Date(start);
        var nextStart = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
        var end = new Date(nextStart.getTime() - 1000 * 60 * 60 * 24);
        return [start, end];
    },
    // 比较时间
    compareTime(start, end) {
        return new Promise((resolve, reject) => {
            if (!start || !end) {
                return
            }
            let starts = this.formatDate.parse(start, 'yyyy-MM-dd hh:mm'),
                ends = this.formatDate.parse(end, 'yyyy-MM-dd hh:mm')
            if (starts > ends) {
                resolve()
            } else if (starts == ends) {
                resolve('时间不能相同！')
            }
        })

    },
    pickerOptions: [{
        text: '今天',
        onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().toDateString());
            end.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]

};
