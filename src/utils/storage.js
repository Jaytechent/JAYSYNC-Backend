import storage from 'node-persist';
import fs from 'fs';

const dirPath = '/tmp/node-persist';


if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log('Directory created:', dirPath);
}


await storage.init({ dir: dirPath });
console.log('Node-persist initialized with directory:', dirPath);

export default storage;
