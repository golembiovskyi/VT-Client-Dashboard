const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();


AWS.config.update({ region: 'us-east-2' });

router.get('/clashstatusdata', async (req, res) => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'vt-dashboard-clash-status-report'
    };

    console.log('Scanning vt-dashboard-clash-status-report table...');


    docClient.scan(params, onScan);

    async function onScan(err, data) {
        if (err) {
            console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            // print all the items
            console.log('Scan succeeded!');
            data.Items.forEach(function (item) {
                console.log(item.Title + ':',
                    '--> Open: ' + item.Open,
                    '--> Closed: ' + item.Closed);
            });
            res.json(data.Items)
        }
    }
});

module.exports = router;