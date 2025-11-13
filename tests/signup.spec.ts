import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';
import { generateUserData, USER, TEST_EMAILS } from '../utils/testData';

test.describe('User Sign Up', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigateToSignUp();
  });

  test('should successfully register a new user with complete information', async ({ page }) => {
    const userData = generateUserData();
    
    await signUpPage.fillAndSubmitSignUpForm(userData);
    
    await expect(signUpPage.accountCreatedMessage).toBeVisible();

  });

  test('should show error when trying to sign up with existing email', async ({ page, browser }) => {
    test.setTimeout(60000);

    const context = await browser.newContext();
    const setupPage = await context.newPage();
    const setupSignUpPage = new SignUpPage(setupPage);

    const existingUser = generateUserData({ email: USER.emailExisting });
    await setupSignUpPage.createUserAndLogout(existingUser);
    await context.close();

    const signUpPage = new SignUpPage(page);
    await signUpPage.navigateToSignUp();

    await signUpPage.signUp(USER.name, USER.emailExisting);
    await signUpPage.waitForSignUpErrorMessage();

    await expect(signUpPage.signUpErrorMessage).toHaveText('Email Address already exist!');
  });

  test('should not allow sign up with invalid email format', async ({ page }) => {
    await signUpPage.signUp('Test User', TEST_EMAILS.invalid);

    await expect(signUpPage.signupEmailInput).toHaveAttribute('type', 'email');
    const validationMessage = await signUpPage.signupEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should not allow sign up with empty name field', async ({ page }) => {
    await signUpPage.signUp('', TEST_EMAILS.valid);

    await expect(signUpPage.signupNameInput).toHaveAttribute('required', '');
    const validationMessage = await signUpPage.signupNameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });
});

