const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const folderPath = 'C:\\Windows\\Temp';
const permissions = 'FullControl';

const powershellScript = `
$ErrorActionPreference = "Stop"
$folderPath = "${folderPath}"
$permissions = "${permissions}"

try {
    $acl = Get-Acl -Path $folderPath
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone", $permissions, "Allow")
    $acl.AddAccessRule($rule)
    Set-Acl -Path $folderPath -AclObject $acl
}
catch {
    $_.Exception.Message | Out-File -Append "C:\\Path\\To\\Your\\Log\\File.txt"
    exit 1
}
`;

const powershellCommand = `powershell -ExecutionPolicy Bypass -Command "${powershellScript}"`;

console.log('Executing PowerShell command:', powershellCommand);

exec(powershellCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error setting permissions: ${error.message}`);
    console.error(`Command failed: ${powershellCommand}`);
    console.error(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log('Permissions set successfully');

  // Continue with the rest of your logic
});

module.exports = router;
