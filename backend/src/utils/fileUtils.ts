import fs from 'fs';

function readJSONFile(filePath: string): any {
  const fileData: Buffer = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

function deleteFile(filePath: string): void {
  fs.unlinkSync(filePath);
}

export { readJSONFile, deleteFile };