'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notes', [
      {
        title: 'Welcome to Notes App',
        content: 'This is your first note! You can use this app to create, edit, and organize your notes.',
        category: 'general',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Meeting Notes - Project Kickoff',
        content: 'Discussed project timeline, deliverables, and team assignments. Next meeting scheduled for next Tuesday.',
        category: 'work',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Shopping List',
        content: 'Milk, Bread, Eggs, Chicken, Vegetables, Fruits, Yogurt',
        category: 'personal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Book Recommendations',
        content: 'Clean Code by Robert Martin, Design Patterns by Gang of Four, Effective JavaScript by David Herman',
        category: 'learning',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Travel Plans',
        content: 'Plan trip to Bali for summer vacation. Research hotels, flights, and activities.',
        category: 'personal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'API Development Tips',
        content: 'Always validate input data, use proper HTTP status codes, implement error handling, and write comprehensive tests.',
        category: 'work',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  }
};
