//web services get issue api 

'use strict';    
var request = require('request'); 
var config = require('../config'); 
var utility = require('../utility');

//get issues attributes
function getAttributes(input) {

    return new Promise(function (open, answered) {
    
      request.get({
        url: config.status.getStatus(input.containerId, input.issueId), 
        headers: config.fieldissuev1.httpHeaders(input.credentials.access_token)
      },
    };