const { When, Then } = require('@cucumber/cucumber');
const { deepStrictEqual } = require('assert');
const answerCategories = {
  id: 1,
  createdAt: new Date('2024-10-29T14:01:25.029Z'),
  updatedAt: new Date('2024-10-29T14:01:25.029Z'),
  type: 'sobremesa',
};

function createCategories(categories) {
  if (categories) {
    return {
      id: 1,
      createdAt: new Date('2024-10-29T14:01:25.029Z'),
      updatedAt: new Date('2024-10-29T14:01:25.029Z'),
      type: 'sobremesa',
    };
  }
}

When('creating a categories', function () {
  this.categories = createCategories({ type: 'sobremesa' });
});

Then('return categories made', function () {
  deepStrictEqual(this.categories, answerCategories);
});
