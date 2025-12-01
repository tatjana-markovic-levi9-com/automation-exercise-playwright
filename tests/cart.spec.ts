import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS } from '../utils/testData';

test.describe('Product and Cart functionality', { tag: '@products' }, () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProducts();
  });

  test('should successfully add a product to cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCartAndContinue(PRODUCTS.blueTop);
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop), 'Product is visible in cart').toBeVisible();
  });

  test('should successfully add multiple products to cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCartAndContinue(PRODUCTS.blueTop);
    await productsPage.addProductToCartAndContinue(PRODUCTS.menTshirt);
    await productsPage.addProductToCartAndContinue(PRODUCTS.sleevelessDress);
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop), 'Blue Top is in cart').toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.menTshirt), 'Men Tshirt is in cart').toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress), 'Sleeveless Dress is in cart').toBeVisible();
  });

  test('should successfully remove a product from cart', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCartAndContinue(PRODUCTS.fancyGreenTop);
    await productsPage.addProductToCartAndContinue(PRODUCTS.sleevelessDress);
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop), 'Fancy Green Top is in cart').toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress), 'Sleeveless Dress is in cart').toBeVisible();
    
    await cartPage.deleteProduct(PRODUCTS.sleevelessDress);
    
    await expect(cartPage.getProductInCart(PRODUCTS.sleevelessDress), 'Sleeveless Dress is removed from cart').not.toBeVisible();
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop), 'Fancy Green Top still is in cart').toBeVisible();
    
    await cartPage.deleteProduct(PRODUCTS.fancyGreenTop);
    
    await expect(cartPage.getProductInCart(PRODUCTS.fancyGreenTop), 'Fancy Green Top is removed from cart').not.toBeVisible();
    await expect(cartPage.emptyCart, 'Empty cart message is visible').toBeVisible();
  });

  test('should display correct quantity when adding same product multiple times', async ({ productsPage, homePage, cartPage }) => {
    await productsPage.addProductToCartAndContinue(PRODUCTS.blueTop);
    await productsPage.addProductToCartAndContinue(PRODUCTS.blueTop);
    await homePage.clickCartLink();
    
    await expect(cartPage.getProductInCart(PRODUCTS.blueTop), 'Product is visible in cart').toBeVisible();

    const quantity = await cartPage.getProductQuantity(PRODUCTS.blueTop);
    expect(quantity, 'Product quantity is 2').toBe(2);
  });
});

