import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS } from '../utils/testData';

test.describe('Search functionality', { tag: '@search' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully search for a product by name', async ({ searchPage }) => {
    await searchPage.searchForProduct('Top');
        
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });

  test('should find specific product when searching', async ({ searchPage }) => {
    await searchPage.searchForProduct('Dress');
    
    await expect(searchPage.getProductByName('Sleeveless Dress')).toBeVisible();
    await expect(searchPage.getProductByName('Stylish Dress')).toBeVisible();
  });

  test('should handle search with no results', async ({ searchPage }) => {
    await searchPage.searchForProduct('NonExistentProduct12345');
    
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount).toBe(0);
  });
});

