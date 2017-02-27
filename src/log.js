/**
 * Copyright 2017 Christopher Haverman
 * All Rights Reserved
 **/

var Logger = function(konsole) {
    this._console = konsole;
};

Logger.prototype.log = function(level, message, obj) {
    if (obj === undefined) {
        this._console.log(message);
    } else {
        var type = obj._type;
        var id = obj._id;
        this._console.log(level + ': ' + type + ' ' + id + ': ' + message);
    }
};

Logger.prototype.debug = function(message, obj) {
    this.log('DEBUG', message, obj);
};

// IGNORE
var exports = {Logger: Logger};
module.exports = exports;
// ENDIGNORE
