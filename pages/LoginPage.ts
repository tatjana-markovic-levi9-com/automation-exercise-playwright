import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  public readonly loginEmailInput: Locator;
  public readonly loginPasswordInput: Locator;
  private readonly loginButton: Locator;
  public readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('form[action="/login"] p', { hasText: 'Your email or password is incorrect!' });
  }

  async navigateToLogin() {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async waitForLoginErrorMessage() {
    await this.loginErrorMessage.waitFor({ state: 'visible' });
  }
}
