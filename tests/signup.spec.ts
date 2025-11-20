import { test, expect } from '../fixtures/page-fixtures';
import { SignUpPage } from '../pages/SignUpPage';
import { HomePage } from '../pages/HomePage';
import { generateUserData, USER, TEST_EMAILS, MESSAGE } from '../utils/testData';

test.describe('User Sign Up', () => {

  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('should successfully register a new user with complete information', async ({ signUpPage }) => {
    const userData = generateUserData();
    
    await signUpPage.fillAndSubmitSignUpForm(userData);
    
    await expect(signUpPage.accountCreatedMessage).toBeVisible();

  });

  test('should show error when trying to sign up with existing email', async ({ signUpPage, browser }) => {

    const context = await browser.newContext();
    const setupPage = await context.newPage();
    const setupSignUpPage = new SignUpPage(setupPage);
    const setupHomePage = new HomePage(setupPage);

    const existingUser = generateUserData({ email: USER.emailExisting });
    await setupSignUpPage.navigateToSignUp();
    await setupSignUpPage.fillAndSubmitSignUpForm(existingUser);
    await setupSignUpPage.clickContinue();
    await setupHomePage.logout();
    await context.close();

    await signUpPage.navigateToSignUp();

    await signUpPage.signUp(USER.name, USER.emailExisting);
    await signUpPage.waitForSignUpErrorMessage();

    await expect(signUpPage.signUpErrorMessage).toHaveText(MESSAGE.signUpError);
  });

  test('should not allow sign up with invalid email format', async ({ signUpPage }) => {
    await signUpPage.signUp(USER.name, TEST_EMAILS.invalid);

    await expect(signUpPage.signupEmailInput).toBeVisible();
  });

  test('should not allow sign up with empty name field', async ({ signUpPage }) => {
    await signUpPage.signUp('', TEST_EMAILS.valid);

    await expect(signUpPage.signupNameInput).toBeVisible();
  });

  test('should successfully delete a user account', async ({ signUpPage, deleteAccountPage }) => {
    const userData = generateUserData();
    
    await signUpPage.fillAndSubmitSignUpForm(userData);
    await expect(signUpPage.accountCreatedMessage).toBeVisible();
    await signUpPage.clickContinue();
    
    await deleteAccountPage.clickDeleteAccount();
    
    await expect(deleteAccountPage.accountDeletedMessage).toBeVisible();
    await deleteAccountPage.clickContinue();
  });
});

