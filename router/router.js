const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const os = require("os");

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

exec(`powershell -ExecutionPolicy Bypass -Command "${powershellScript}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error setting permissions: ${error.message}`);
    return;
  }
  console.log('Permissions set successfully');
  // Define the desired permissions (e.g., read, write, execute for the owner)
const desiredPermissions =
fs.constants.S_IRUSR | fs.constants.S_IWUSR | fs.constants.S_IXUSR;

// Change the permissions of the directory
fs.chmod(folderPath, desiredPermissions, (err) => {
if (err) {
  console.error(`Error changing permissions for ${folderPath}:`, err);
} else {
  console.log(`Permissions for ${folderPath} changed successfully`);
  // Set the temporary directory path to C:\Windows\Temp
  console.log("path Dir", folderPath);
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    // Delete each file
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
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
  

});


module.exports = router;
