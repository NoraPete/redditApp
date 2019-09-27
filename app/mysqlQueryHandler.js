const connection = require('./connection');

function askDatabase(queryStr, parameters = []) {
  return new Promise((resolve, reject) => {
      connection.query(queryStr, parameters, function(error, result) {
          if(error) {
              reject(error);
          } else {
              resolve(result);
          }
      });
  });
}

module.exports = askDatabase;
