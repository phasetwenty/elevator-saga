/**
 * Copyright 2017 Christopher Haverman
 * All Rights Reserved
 **/
/* global describe, it, require */

var assert = require('chai').assert;
var sinon = require('sinon');

var Logger = require('../src/log').Logger;

describe('Logger', function() {
    it('should write a message at the specified level.', function() {
        var logSpy = sinon.spy();
        var mockConsole = {log: logSpy};
        var mockObject = {_id: 1, _type: 'mock'};

        var objectUnderTest = new Logger(mockConsole);
        objectUnderTest.log('HORSE', 'message', mockObject);

        assert.equal(logSpy.getCall(0).args[0], 'HORSE: mock 1: message');
    });
});

