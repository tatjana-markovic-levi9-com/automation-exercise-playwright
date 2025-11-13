import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly signupLoginLink: Locator;
  private readonly logoutLink: Locator;
  
  public readonly loggedInAsText: Locator;

  constructor(page: Page) {
    super(page);
    
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.loggedInAsText = page.locator('text=Logged in as');
  }

  async navigateToHome() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
    await this.waitForPageLoad();
  }

  async logout() {
    await this.logoutLink.click();
    await this.waitForPageLoad();
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.loggedInAsText.isVisible();
  }
}

