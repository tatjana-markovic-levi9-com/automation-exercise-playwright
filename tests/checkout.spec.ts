import { test, expect } from '../fixtures/page-fixtures';
import { PRODUCTS, PAYMENT_CARD, USER } from '../utils/testData';

test.describe('Checkout Flow', { tag: '@checkout' }, () => {

  test('should successfully complete checkout flow with payment', async ({ 
    productsPage,
    cartPage, 
    checkoutPage, 
    paymentPage, 
    orderConfirmationPage,
    homePage,
    loginPage
  }) => {    
    await test.step('Login to the application', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);
    });
    
    await test.step('Add product to cart', async () => {
      await homePage.clickProductsLink();
      await productsPage.addProductToCart(PRODUCTS.blueTop);
      await productsPage.clickViewCartFromModal();
    });
    
    await test.step('Proceed to checkout and verify order details', async () => {
      await cartPage.proceedToCheckout();
      await expect(checkoutPage.addressDetailsHeading).toBeVisible();
      await expect(checkoutPage.reviewOrderHeading).toBeVisible();
    });
    
    await test.step('Place order and navigate to payment', async () => {
      await checkoutPage.clickPlaceOrder();
      await expect(paymentPage.paymentHeading).toBeVisible();
    });
    
    await test.step('Complete payment details', async () => {
      await paymentPage.fillPaymentDetails(PAYMENT_CARD);
      await paymentPage.clickPayAndConfirmOrder();
    });
    
    await test.step('Verify order confirmation', async () => {
      await expect(orderConfirmationPage.orderPlacedHeading).toBeVisible();
      await expect(orderConfirmationPage.successMessage).toBeVisible();
    });
  });

});

