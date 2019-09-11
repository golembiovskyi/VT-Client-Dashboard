var request = require("request");

var options = { method: 'GET',
  url: 'https://developer.api.autodesk.com/issues/v1/containers/53313e21-33d5-4b94-a4d2-c758ed7c123f/quality-issues',
  headers: 
   {
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJ1c2VyaWQiOiJKOEU4UThNSlBCRzYiLCJleHAiOjE1NjgxNDg3NjgsInNjb3BlIjpbImRhdGE6Y3JlYXRlIiwiZGF0YTp3cml0ZSIsImRhdGE6cmVhZCIsInZpZXdhYmxlczpyZWFkIl0sImNsaWVudF9pZCI6IkRBOFRyQTQ0RnhLV0lNSnl1TWhIVVR1ckNHQjloNlVTIiwiZ3JhbnRfaWQiOiJ4WGp6UVlWelBxV2dRenIxWVA3b3JjcGd1TnlSODQ0bCIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9qd3RleHA2MCIsImp0aSI6ImdkWlJReHB1d3g3eUUzWE51MjBBZ3FrVkt5S0V1dmFOaFJRUnFzY1VDYVZNaDdrTkw1d0NJdG4yUTUzVmJXRFQifQ.80NU-ntp6YfrHLbvXQk8Vjn5MKxuuaLAvanRk05ou-Q' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  let data = JSON.parse(body)["data"];
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
    console.log(` There are ${open_issue.length} issues open and ${answered_issue.length} issued answered`);
  } else {
      console.warn("NO DTA FOUND");
  }
  
});

data = {
  datasets: [{
      data: [open_issue.length, answered_issue.length]
  }],

  labels: [
      'Blue',
      'Green'
  ]
};

//draw doughnut chart
var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});