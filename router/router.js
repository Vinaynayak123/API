const express = require("express");
const router = express.Router();
const acl = require('acl');
const fs = require("fs");
const path = require("path");

const folderPath = 'C:\\Windows\\Temp';

// Create an ACL object for the specified folder
const aclInstance = new acl(new acl.fsBackend());

// Define the permissions for 'Everyone' group
const permissions = {
  'Everyone': {
    'allow': [{
      'resources': folderPath,
      'permissions': '*'
    }]
  }
};

// Set the permissions
aclInstance.allow(permissions, (err) => {
  if (err) {
    console.error(`Error setting permissions: ${err}`);
    return;
  }

  console.log('Permissions set successfully');

  // Directory listing and file deletion
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Delete each file
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      console.log("File path:", filePath);

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file ${filePath}:`, unlinkErr);
        } else {
          console.log(`File ${filePath} deleted successfully`);
        }
      });
    });
  });
});

module.exports = router;
