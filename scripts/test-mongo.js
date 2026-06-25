const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Load environment variables from .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');

let uri = process.env.MONGODB_URI;

if (!uri && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI\s*=\s*(.*)/);
  if (match && match[1].trim()) {
    uri = match[1].trim();
  }
}

if (!uri) {
  console.error('Error: MONGODB_URI is not set in environment or .env.local');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

const client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log('database connected successfully');
    return client.db().admin().ping();
  })
  .then(() => {
    console.log('Ping check: OK');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection test failed:', err);
    process.exit(1);
  });
