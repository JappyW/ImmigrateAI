const fs = require("node:fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

async function saveData(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing file", err);
    } else {
      console.log("Data successfully serialized to file");
    }
  });
}

async function getData() {
  const data = await fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error reading file", err);
    } else {
      try {
        const parsedData = JSON.parse(fileData);
        return fileData;
      } catch (parseErr) {
        console.error("Error parsing JSON", parseErr);
      }
    }
  });

  return data;
}

module.exports = { saveData, getData };
