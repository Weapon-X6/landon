var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  region: "ca-central-1",
});

console.log("Writing entries to Facilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();

try {
  var accessibilitiesData = JSON.parse(
    fs.readFileSync("..\\components\\data\\facilities.json", "utf8")
  );

  accessibilitiesData.forEach(function (facilitiy) {
    var params = {
      TableName: "Facilities",
      Item: {
        name: facilitiy.name,
      },
    };

    dynamodb.put(params, function (err, data) {
      if (err)
        console.error(
          "Unable to load data into table for accessibility",
          facilitiy.name,
          ". Error: ",
          JSON.stringify(err, null, 2)
        );
      else console.log("Added", facilitiy.name, "to table.");
    });
  });
} catch (ex) {
  console.error("   EX_" + ex + '\r\n');
}
