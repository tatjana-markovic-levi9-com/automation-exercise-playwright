import { test, expect } from '../fixtures/page-fixtures';
import { generateUserData, USER, MESSAGE } from '../utils/testData';

test.describe('Verify login functionality', { tag: '@login' }, () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
  });

  test('Verify login with valid credentials', async ({ loginPage, homePage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);
    });

    await test.step('Verify user is logged in', async () => {
      await expect(homePage.loggedInAsText).toBeVisible();
      await expect(homePage.logoutLink).toBeVisible();
    });
  });

  test('Verify login with invalid email', async ({ loginPage }) => {
    await test.step('Attempt login with invalid email', async () => {
      await loginPage.login(USER.emailInvalid, USER.existingUserPassword);
      await loginPage.waitForLoginErrorMessage();
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.loginErrorMessage).toBeVisible();
      await expect(loginPage.loginErrorMessage).toHaveText(MESSAGE.loginError);
    });
  });

  test('Verify login with invalid password', async ({ loginPage }) => {
    await test.step('Attempt login with invalid password', async () => {
      await loginPage.login(USER.existingUserEmail, USER.passwordInvalid);
      await loginPage.waitForLoginErrorMessage();
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.loginErrorMessage).toBeVisible();
      await expect(loginPage.loginErrorMessage).toHaveText(MESSAGE.loginError);
    });
  });

  test('Verify logout functionality', async ({ loginPage, homePage, page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);
      await expect(homePage.loggedInAsText).toBeVisible();
    });

    await test.step('Logout from the application', async () => {
      await homePage.logout();
    });

    await test.step('Verify user is logged out', async () => {
      await expect(homePage.loggedInAsText).not.toBeVisible();
    });
  });
});

