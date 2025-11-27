import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignUpInitialPage } from '../pages/SignUpInitialPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { SearchPage } from '../pages/SearchPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  signUpInitialPage: SignUpInitialPage;
  accountInformationPage: AccountInformationPage;
  deleteAccountPage: DeleteAccountPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  searchPage: SearchPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  orderConfirmationPage: OrderConfirmationPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  signUpInitialPage: async ({ page }, use) => {
    const signUpInitialPage = new SignUpInitialPage(page);
    await use(signUpInitialPage);
  },

  accountInformationPage: async ({ page }, use) => {
    const accountInformationPage = new AccountInformationPage(page);
    await use(accountInformationPage);
  },

  deleteAccountPage: async ({ page }, use) => {
    const deleteAccountPage = new DeleteAccountPage(page);
    await use(deleteAccountPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },

  orderConfirmationPage: async ({ page }, use) => {
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await use(orderConfirmationPage);
  },
});

export { expect } from '@playwright/test';

