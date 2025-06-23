#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Running: ${command}`);
    exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`⚠️  Warning: ${stderr}`);
      }
      if (stdout) {
        console.log(stdout);
      }
      resolve(stdout);
    });
  });
};

const setupDatabase = async () => {
  try {
    console.log('📁 Setting up database...\n');

    // Run migrations
    console.log('🔄 Running migrations...');
    await runCommand('npx sequelize-cli db:migrate');

    // Run seeders
    console.log('🌱 Running seeders...');
    await runCommand('npx sequelize-cli db:seed:all');

    console.log('\n✅ Database setup completed successfully!');
    console.log('📊 Your Notes API is ready to use with sample data.');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    process.exit(1);
  }
};

// Check if script is run directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase }; 