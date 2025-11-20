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
    await loginPage.navigateToLogin();
    await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);
    
    await homePage.clickProductsLink();
    await productsPage.addProductToCart(PRODUCTS.blueTop);
    await productsPage.clickViewCartFromModal();
    
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.addressDetailsHeading).toBeVisible();
    await expect(checkoutPage.reviewOrderHeading).toBeVisible();
    
    await checkoutPage.clickPlaceOrder();
    await expect(paymentPage.paymentHeading).toBeVisible();
    
    await paymentPage.fillPaymentDetails(PAYMENT_CARD);
    await paymentPage.clickPayAndConfirmOrder();
    
    await expect(orderConfirmationPage.orderPlacedHeading).toBeVisible();
    await expect(orderConfirmationPage.successMessage).toBeVisible();
  });

});

