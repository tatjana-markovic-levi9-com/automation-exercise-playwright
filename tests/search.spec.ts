import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS } from '../utils/testData';

test.describe('Search functionality', { tag: '@search' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully search for a product by name', async ({ searchPage }) => {
    await test.step('Search for product', async () => {
      await searchPage.searchForProduct('Top');
    });
        
    await test.step('Verify search returns results', async () => {
      const resultsCount = await searchPage.getSearchResultsCount();
      expect(resultsCount).toBeGreaterThan(0);
    });
  });

  test('should find specific product when searching', async ({ searchPage }) => {
    await test.step('Search for Dress products', async () => {
      await searchPage.searchForProduct('Dress');
    });
    
    await test.step('Verify specific products are found', async () => {
      await expect(searchPage.getProductByName('Sleeveless Dress')).toBeVisible();
      await expect(searchPage.getProductByName('Stylish Dress')).toBeVisible();
    });
  });

  test('should handle search with no results', async ({ searchPage }) => {
    await test.step('Search for non-existent product', async () => {
      await searchPage.searchForProduct('NonExistentProduct12345');
    });
    
    await test.step('Verify no results are found', async () => {
      const resultsCount = await searchPage.getSearchResultsCount();
      expect(resultsCount).toBe(0);
    });
  });
});

