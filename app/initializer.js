const connection = require('./connection');

function initializer() {
    return new Promise((resolve, reject) => {
        connection.connect(function (err) {
              if (err) {
                reject(err);
              } else {
                resolve('Connection with database is established');
              }
            });
        });
}

module.exports = initializer;
