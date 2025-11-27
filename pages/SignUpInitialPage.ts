import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpInitialPage extends BasePage {
  public readonly signupNameInput: Locator;
  public readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;
  public readonly signUpErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.signupNameInput = page.getByTestId('signup-name');
    this.signupEmailInput = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
    this.signUpErrorMessage = page.locator('form[action="/signup"] p', { hasText: 'Email Address already exist!' });
  }

  async navigateToSignUp() {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  /**
   * Fill and submit initial signup form with name and email
   * @param name - User's name
   * @param email - User's email
   */
  async signUp(name: string, email: string) {
    await test.step('Fill and submit signup form with name and email', async () => {
      await this.signupNameInput.fill(name);
      await this.signupEmailInput.fill(email);
      await this.signupButton.click();
      await this.waitForPageLoad();
    });
  }

  async waitForSignUpErrorMessage() {
    await this.signUpErrorMessage.waitFor({ state: 'visible' });
  }
}

