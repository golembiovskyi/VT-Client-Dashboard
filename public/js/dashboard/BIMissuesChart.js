 var router = express.Router();
  // forge
var forgeSDK = require('forge-apis');
  
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

  modelData = JSON.parse(body)["data"];
  let open_issue = [];
  let answered_issue = [];
  if(data) {
    let nr_issues = data.length;
    console.log(`There are ${nr_issues} issues`);
    data.forEach(issue => {
        switch (issue.attributes.status) {
            case "open":
                open_issue.push(issue);
                break;
            case "answered": 
                answered_issue.push(issue);
                break;
        }
        
    });
  
};

