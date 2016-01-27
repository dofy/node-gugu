var request = require('request'),
    iconv = require('iconv-lite');

var baseurl, ak, memoid, userid, apiid;
var isReady = false;

/**
 * @param   options     咕咕机开发配置
 * @param   callback    Callback
 * {
 *      baseurl: {api url}, // optional
 *      ak: {your ak},
 *      memoid: {memobirdID},
 *      userid: {useridentifying}
 * }
 */
function init(options, callback) {
    isReady = false;

    baseurl = options.baseurl || 'http://open.memobird.cn/home/';
    memoid = options.memoid;
    userid = options.userid;
    ak = options.ak;

    setuserbind(memoid, userid, callback);
}

/**
 * @param   memoid      memobirdID
 * @param   userid      useridentifying
 * @param   callback    Callback
 */
function setuserbind(memoid, userid, callback) {
    baseRequest('setuserbind', {
        memobirdID: memoid,
        useridentifying: userid
    }, function(data) {
        isReady = true;
        apiid = data.showapi_userid;
        callback && callback(data);
    });
}

/**
 * @param   contents    An array of contents(just text)
 * @param   callback    Callback
 */
function printpaper(contents, callback) {
    if(!isReady) {
        return false;
    }
    if(typeof contents === 'string') {
        contents = [contents];
    }
    contents = contents.join('\n') + '\n';
    baseRequest('printpaper', {
        printcontent: 'T:' + iconv.encode(contents, 'gbk').toString('base64'),
        memobirdID: memoid,
        userID: apiid
    }, function(data) {
        callback && callback(data);
    });
}

/**
 * @param   printid     printcontentid
 * @param   callback    Callback
 */
function getprintstatus(printid, callback) {
    if(!isReady) {
        return false;
    }
    baseRequest('getprintstatus', {
        printcontentID: printid
    }, function(data) {
        callback && callback(data);
    });
}

function baseRequest(action, body, callback) {
    request.post(baseurl + action, {
        qs: {
            ak: ak,
            timestamp: new Date()
        },
        json: true,
        body: body
    }, function(err, res, body) {
        callback && callback(body);
    });
}

exports = module.exports = init;
exports.printpaper = printpaper;
exports.setuserbind = setuserbind;
exports.getprintstatus = getprintstatus;
