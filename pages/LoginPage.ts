import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  public readonly loginEmailInput: Locator;
  public readonly loginPasswordInput: Locator;
  private readonly loginButton: Locator;
  public readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.loginEmailInput = page.getByTestId('login-email');
    this.loginPasswordInput = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.loginErrorMessage = page.locator('form[action="/login"] p', { hasText: 'Your email or password is incorrect!' });
  }

  async navigateToLogin() {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await test.step('Login with credentials', async () => {
      await this.loginEmailInput.fill(email);
      await this.loginPasswordInput.fill(password);
      await this.loginButton.click();
      await this.waitForPageLoad();
    });
  }

  async waitForLoginErrorMessage() {
    await this.loginErrorMessage.waitFor({ state: 'visible' });
  }
}
