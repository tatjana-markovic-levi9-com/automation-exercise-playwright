import { test, expect } from '../fixtures/page-fixtures';

test.describe('Search functionality', { tag: '@search' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully search for a product by name', async ({ searchPage }) => {
    await searchPage.searchForProduct('Top');
        
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount, 'Search should return at least one result').toBeGreaterThan(0);
  });

  test('should find specific product when searching', async ({ searchPage }) => {
    await searchPage.searchForProduct('Dress');
    
    await expect(searchPage.getProductByName('Sleeveless Dress'), 'Sleeveless Dress should be found').toBeVisible();
    await expect(searchPage.getProductByName('Stylish Dress'), 'Stylish Dress should be found').toBeVisible();
  });

  test('should handle search with no results', async ({ searchPage }) => {
    await searchPage.searchForProduct('NonExistentProduct12345');
    
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount, 'Search should return zero results').toBe(0);
  });
});

