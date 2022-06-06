const fs = require("fs");
const path = process.argv[2];

function getFileContents(path) {
  return new Promise((reolve, reject) => {
    fs.exists(path, (exists) => {
      if (exists) {
        console.log("exists", exists);
        fs.stat(path, (err, stats) => {
          if (err) {
            return reject("Error trying to get stats");
          }
          console.log(stats);
          if (stats.size > 0) {
            fs.readFile(path, (err, buffer) => {
              if (err) {
                return reject("Error trying to get stats");
              }
              return reolve(buffer);
            });
          } else {
            return reject('File exists but there is no content');
          }
        });
      } else {
        return reject('File does not exist');
      }
    });
  });
}

getFileContents(path).then(contents => {
  console.info("File was found and the contents were loaded");
}).catch(err => {
  console.error(`There was an error getting contents for ${path}`, err);
  return;
});
