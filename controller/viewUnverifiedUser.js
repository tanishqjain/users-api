const { tableClient } = require("./config");

module.exports = async function (req, res, next) {
  try {
    // Query all records in the table
    // Pagination must be included which is not included yet
    const entities = [];

    let entitiesIter = tableClient.listEntities();
    let i = 1;
    for await (const entity of entitiesIter) {
      entities.push({
        Email: entity.rowKey,
        FirstName: entity.FirstName,
        LastName: entity.LastName
      });
      i++;
    }

    res.send(entities);
  } catch (error) {
    res.send({
      errorCode: error.statusCode,
      message: error.message,
    });
  }
};
