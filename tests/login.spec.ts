import { test, expect } from '../fixtures/page-fixtures';
import { generateUserData, USER, MESSAGE } from '../utils/testData';

test.describe('Verify login functionality', { tag: '@login' }, () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
  });

  test('Verify login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);

    await expect(homePage.loggedInAsText, 'Logged in user name should be visible').toBeVisible();
    await expect(homePage.logoutLink, 'Logout link should be visible').toBeVisible();
  });

  test('Verify login with invalid email', async ({ loginPage }) => {
    await loginPage.login(USER.emailInvalid, USER.existingUserPassword);
    await loginPage.waitForLoginErrorMessage();

    await expect(loginPage.loginErrorMessage, 'Login error message should be visible').toBeVisible();
    await expect(loginPage.loginErrorMessage, 'Error message should indicate invalid credentials').toHaveText(MESSAGE.loginError);
  });

  test('Verify login with invalid password', async ({ loginPage }) => {
    await loginPage.login(USER.existingUserEmail, USER.passwordInvalid);
    await loginPage.waitForLoginErrorMessage();

    await expect(loginPage.loginErrorMessage, 'Login error message should be visible').toBeVisible();
    await expect(loginPage.loginErrorMessage, 'Error message should indicate invalid credentials').toHaveText(MESSAGE.loginError);
  });

  test('Verify logout functionality', async ({ loginPage, homePage, page }) => {
    await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);

    await expect(homePage.loggedInAsText, 'User should be logged in').toBeVisible();

    await homePage.logout();

    await expect(homePage.loggedInAsText, 'User should be logged out').not.toBeVisible();
  });
});

