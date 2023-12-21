const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const os = require("os");

const tempDirectory = "C:\\Windows\\Temp";

// Define the desired permissions (e.g., read, write, execute for the owner)
const desiredPermissions =
  fs.constants.S_IRUSR | fs.constants.S_IWUSR | fs.constants.S_IXUSR;

// Change the permissions of the directory
fs.chmod(tempDirectory, desiredPermissions, (err) => {
  if (err) {
    console.error(`Error changing permissions for ${tempDirectory}:`, err);
  } else {
    console.log(`Permissions for ${tempDirectory} changed successfully`);
    // Set the temporary directory path to C:\Windows\Temp
    console.log("path Dir", tempDirectory);
    fs.readdir(tempDirectory, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      // Delete each file
      files.forEach((file) => {
        const filePath = path.join(tempDirectory, file);
        console.log("file path", filePath);

        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error deleting file ${filePath}:`, unlinkErr);
          } else {
            console.log(`File ${filePath} deleted successfully`);
          }
        });
      });
    });
  }
});

module.exports = router;
