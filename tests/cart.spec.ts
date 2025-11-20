import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS } from '../utils/testData';

test.describe('Product and Cart functionality', { tag: '@products' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully add a product to cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCart(PRODUCTS.blueTop);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
  });

  test('should successfully add multiple products to cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCart(PRODUCTS.blueTop);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await productsPage.addProductToCart(PRODUCTS.menTshirt);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await productsPage.addProductToCart(PRODUCTS.sleevelessDress);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.menTshirt)).toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).toBeVisible();
  });

  test('should successfully remove a product from cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCart(PRODUCTS.fancyGreenTop);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await productsPage.addProductToCart(PRODUCTS.sleevelessDress);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).toBeVisible();
    
    await cartPage.deleteProduct(PRODUCTS.sleevelessDress);
    
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).not.toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).toBeVisible();
    
    await cartPage.deleteProduct(PRODUCTS.fancyGreenTop);
    
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).not.toBeVisible();
    await expect(cartPage.emptyCart).toBeVisible();
  });

  test('should display correct quantity when adding same product multiple times', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCart(PRODUCTS.blueTop);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await productsPage.addProductToCart(PRODUCTS.blueTop);
    await productsPage.waitForContinueShoppingButton();
    await productsPage.clickContinueShopping();
    
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
    
    const quantity = await cartPage.getProductQuantity(PRODUCTS.blueTop);
    expect(quantity).toBe(2);
  });
});

