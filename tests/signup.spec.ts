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
    
    await test.step('Fill and submit sign up form', async () => {
      await signUpPage.fillAndSubmitSignUpForm(userData);
    });
    
    await test.step('Verify account created successfully', async () => {
      await expect(signUpPage.accountCreatedMessage).toBeVisible();
    });
  });

  test('should show error when trying to sign up with existing email', async ({ signUpPage, browser }) => {
    await test.step('Create an existing user account', async () => {
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
    });

    await test.step('Navigate to sign up page', async () => {
      await signUpPage.navigateToSignUp();
    });

    await test.step('Attempt to sign up with existing email', async () => {
      await signUpPage.signUp(USER.name, USER.emailExisting);
      await signUpPage.waitForSignUpErrorMessage();
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(signUpPage.signUpErrorMessage).toHaveText(MESSAGE.signUpError);
    });
  });

  test('should not allow sign up with invalid email format', async ({ signUpPage }) => {
    await test.step('Attempt to sign up with invalid email', async () => {
      await signUpPage.signUp(USER.name, TEST_EMAILS.invalid);
    });

    await test.step('Verify sign up form is still visible', async () => {
      await expect(signUpPage.signupEmailInput).toBeVisible();
    });
  });

  test('should not allow sign up with empty name field', async ({ signUpPage }) => {
    await test.step('Attempt to sign up with empty name', async () => {
      await signUpPage.signUp('', TEST_EMAILS.valid);
    });

    await test.step('Verify sign up form is still visible', async () => {
      await expect(signUpPage.signupNameInput).toBeVisible();
    });
  });

  test('should successfully delete a user account', async ({ signUpPage, deleteAccountPage }) => {
    await test.step('Create a new user account', async () => {
      const userData = generateUserData();
      
      await signUpPage.fillAndSubmitSignUpForm(userData);
      await expect(signUpPage.accountCreatedMessage).toBeVisible();
      await signUpPage.clickContinue();
    });
    
    await test.step('Delete the user account', async () => {
      await deleteAccountPage.clickDeleteAccount();
    });
    
    await test.step('Verify account deleted successfully', async () => {
      await expect(deleteAccountPage.accountDeletedMessage).toBeVisible();
      await deleteAccountPage.clickContinue();
    });
  });
});

