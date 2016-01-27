# node-gugu

咕咕机 SDK nodejs 封装。

_打印内容暂时只支持文本_

## Install

```
npm install node-gugu
```

## How to use

```javascript
var gugu = require('node-gugu');
var printid;

// 初始化 gugu
gugu({
    ak: '{your ak}',
    memoid: '{memobirdid}',
    userid: '{useridentifying}'
}, function(data) {
    console.log('咕咕准备好啦。');
});

// ---------------------------------------
// 咕咕准备好后(setuserbind)可调用如下接口
// 或者在初始化回调中调用(参考 test.js)
// ---------------------------------------

// 打印内容
gugu.printpaper([
    'line one',
    'line two'
], function(data) {
    printid = data.printcontentid;
    console.log(data);
});

// 查看打印状态
gugu.getprintstatus(printid, function(data) {
    console.log(data);
});
```

