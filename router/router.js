const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const folderPath = 'C:\\Windows\\Temp';
const permissions = 'FullControl';

const powershellScript = `
$folderPath = "${folderPath}"
$permissions = "${permissions}"

$acl = Get-Acl -Path $folderPath
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone", $permissions, "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path $folderPath -AclObject $acl
`;

const powershellCommand = `powershell -ExecutionPolicy Bypass -Command "${powershellScript}"`;

exec(powershellCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error setting permissions: ${error.message}`);
    console.error(`Command failed: ${powershellCommand}`);
    console.error(`stderr: ${stderr}`);
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
