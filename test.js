var gugu = require('./lib/index');

gugu({
    ak: '{ak}',
    memoid: '{memobirdid}',
    userid: '{useridentifying}'
}, function(data) {
    console.log(data);
    gugu.printpaper([
        'line one',
        '第二行'
    ], console.log);
});

