const fs = require('fs');

// Baca isi file JSON-nya
const raw = fs.readFileSync('firebase-key.json', 'utf8');

// Parse JSON
const json = JSON.parse(raw);

// Escape newline di private_key
json.private_key = json.private_key.replace(/\n/g, '\\n');

// Tampilkan hasil akhir
console.log(JSON.stringify(json));
