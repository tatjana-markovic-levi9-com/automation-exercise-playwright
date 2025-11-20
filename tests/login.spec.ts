import { test, expect } from '../fixtures/page-fixtures';
import { generateUserData, USER, MESSAGE } from '../utils/testData';

test.describe('Verify login functionality', { tag: '@login' }, () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
  });

  test('Verify login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);

    await expect(homePage.loggedInAsText).toBeVisible();
    await expect(homePage.logoutLink).toBeVisible();
  });

  test('Verify login with invalid email', async ({ loginPage }) => {
    await loginPage.login(USER.emailInvalid, USER.existingUserPassword);
    await loginPage.waitForLoginErrorMessage();

    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toHaveText(MESSAGE.loginError);
  });

  test('Verify login with invalid password', async ({ loginPage }) => {
    await loginPage.login(USER.existingUserEmail, USER.passwordInvalid);
    await loginPage.waitForLoginErrorMessage();

    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toHaveText(MESSAGE.loginError);
  });

  test('Verify logout functionality', async ({ loginPage, homePage, page }) => {
    await loginPage.login(USER.existingUserEmail, USER.existingUserPassword);
    
    await expect(homePage.loggedInAsText).toBeVisible();

    await homePage.logout();

    await expect(homePage.loggedInAsText).not.toBeVisible();
  });
});

