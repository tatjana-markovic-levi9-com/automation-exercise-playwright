import { test, expect } from '../fixtures/page-fixtures';
import { generateUserData, USER, TEST_EMAILS, MESSAGE } from '../utils/testData';
import { createUserInSeparateContext } from '../utils/testHelpers';

test.describe('User Sign Up', () => {

  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('should successfully register a new user with complete information', async ({ signUpPage }) => {
    const userData = generateUserData();
    
    await signUpPage.fillAndSubmitSignUpForm(userData);
    
    await expect(signUpPage.accountCreatedMessage, 'Account created message is visible').toBeVisible();
  });

  test('should show error when trying to sign up with existing email', async ({ signUpPage, browser }) => {
    const setupContext = await browser.newContext();
    const setupPage = await setupContext.newPage();
    
    const existingUser = generateUserData({ email: USER.emailExisting });
    await createUserInSeparateContext(setupPage, existingUser);
    
    await setupContext.close();

    await signUpPage.navigateToSignUp();
    await signUpPage.signUp(USER.name, USER.emailExisting);
    await signUpPage.waitForSignUpErrorMessage();

    await expect(signUpPage.signUpErrorMessage, 'Error message indicates email already exists').toHaveText(MESSAGE.signUpError);
  });

  test('should not allow sign up with invalid email format', async ({ signUpPage }) => {
    await signUpPage.signUp(USER.name, TEST_EMAILS.invalid);

    await expect(signUpPage.signupEmailInput, 'Sign up form still is visible').toBeVisible();
  });

  test('should not allow sign up with empty name field', async ({ signUpPage }) => {
    await signUpPage.signUp('', TEST_EMAILS.valid);

    await expect(signUpPage.signupNameInput, 'Sign up form still is visible').toBeVisible();
  });

  test('should successfully delete a user account', async ({ signUpPage, deleteAccountPage }) => {
    const userData = generateUserData();
    
    await signUpPage.fillAndSubmitSignUpForm(userData);
    await expect(signUpPage.accountCreatedMessage, 'Account is created').toBeVisible();

    await signUpPage.clickContinue();
    await deleteAccountPage.clickDeleteAccount();

    await expect(deleteAccountPage.accountDeletedMessage, 'Account deleted message is visible').toBeVisible();
  });
});

