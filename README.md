# node-gugu

咕咕机 SDK nodejs 封装。

_打印内容暂时只支持文本_


```javascript
var gugu = require('node-gugu');
var printid;

// init gugu
gugu({
    ak: '{your ak}',
    memoid: {memobirdid},
    userid: {useridentifying}
});

// print contents
gugu.printpaper([
    'line one',
    'line two'
], function(data) {
    printid = data.printcontentid;
    console.log(data);
});

// check print status
gugu.getprintstatus(printid, function(data) {
    console.log(data);
});
```

