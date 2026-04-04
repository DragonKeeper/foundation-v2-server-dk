// envify-configs.js
// Script to load JS config files and output .env-ready variables


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadConfig(jsPath) {
  // Read the file and eval the config object
  const code = fs.readFileSync(jsPath, 'utf8');
  // Remove export default if present
  const cleanCode = code.replace(/export default config;?/g, '');
  // Evaluate and return the config object
  const result = eval(cleanCode + '\nconfig;');
  return result;
}

const mainConfigPath = path.resolve(__dirname, '../configs/main/main.js');
const poolConfigPath = path.resolve(__dirname, '../configs/pools/ravencoin.js');

const configMain = loadConfig(mainConfigPath);
const configPool = loadConfig(poolConfigPath);

// Write to .env with pretty-printed JSON
const envPath = path.resolve(__dirname, '../.env');
const envContent =
  "configMain='" + JSON.stringify(configMain, null, 2) + "'\n" +
  "configs='" + JSON.stringify({ ravencoin: configPool }, null, 2) + "'\n";
fs.writeFileSync(envPath, envContent);

console.log('.env file updated with pretty-printed configMain and configs');
