import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS } from '../utils/testData';

test.describe('Product and Cart functionality', { tag: '@products' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully add a product to cart', async ({ productsPage, homePage, cartPage }) => {
    await test.step('Add product to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.blueTop);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Navigate to cart', async () => {
      await homePage.clickCartLink();
    });
    
    await test.step('Verify product is in cart', async () => {
      await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
    });
  });

  test('should successfully add multiple products to cart', async ({ productsPage, homePage, cartPage }) => {
    await test.step('Add first product to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.blueTop);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Add second product to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.menTshirt);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Add third product to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.sleevelessDress);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Navigate to cart', async () => {
      await homePage.clickCartLink();
    });
    
    await test.step('Verify all products are in cart', async () => {
      await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
      await expect(cartPage.getProductInCart(PRODUCTS.menTshirt)).toBeVisible();
      await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).toBeVisible();
    });
  });

  test('should successfully remove a product from cart', async ({ productsPage, homePage, cartPage }) => {
    await test.step('Add two products to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.fancyGreenTop);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
      
      await productsPage.addProductToCart(PRODUCTS.sleevelessDress);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Navigate to cart and verify products', async () => {
      await homePage.clickCartLink();
      
      await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).toBeVisible();
      await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).toBeVisible();
    });
    
    await test.step('Remove first product', async () => {
      await cartPage.deleteProduct(PRODUCTS.sleevelessDress);
    });
    
    await test.step('Verify first product is removed', async () => {
      await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress)).not.toBeVisible();
      await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).toBeVisible();
    });
    
    await test.step('Remove second product', async () => {
      await cartPage.deleteProduct(PRODUCTS.fancyGreenTop);
    });
    
    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop)).not.toBeVisible();
      await expect(cartPage.emptyCart).toBeVisible();
    });
  });

  test('should display correct quantity when adding same product multiple times', async ({ productsPage, homePage, cartPage }) => {
    await test.step('Add same product twice', async () => {
      await productsPage.addProductToCart(PRODUCTS.blueTop);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
      
      await productsPage.addProductToCart(PRODUCTS.blueTop);
      await productsPage.waitForContinueShoppingButton();
      await productsPage.clickContinueShopping();
    });
    
    await test.step('Navigate to cart', async () => {
      await homePage.clickCartLink();
    });
    
    await test.step('Verify product quantity is correct', async () => {
      await expect(cartPage.getProductInCart(PRODUCTS.blueTop)).toBeVisible();
      
      const quantity = await cartPage.getProductQuantity(PRODUCTS.blueTop);
      expect(quantity).toBe(2);
    });
  });
});

