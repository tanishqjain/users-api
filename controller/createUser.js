const { tableClient } = require('./config');

module.exports = async function (req, res, next) {
  console.log("This is the request Body", req.body);

  try {
    if (req.body) {
      // Define an entity to be added to the table
      const entity = {
        PartitionKey: "memberAccount", // Replace 'PartitionKey' with your desired partition key
        RowKey: req.body.email, // Replace 'RowKey' with your desired row key
        FirstName: req.body.givenName,
        LastName: req.body.surname,
      };

      await tableClient.createEntity(entity);

      res.send({
        errorCode: 0,
        message: "Account Creation successful",
      });
    }
  } catch (error) {
    res.send({
        errorCode: error.statusCode,
        message: error.message
    })
  }
};
