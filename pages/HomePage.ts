import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly signupLoginLink: Locator;
  private readonly cartLink: Locator;
  private readonly productsLink: Locator;
  public readonly logoutLink: Locator;
  
  public readonly loggedInAsText: Locator;

  constructor(page: Page) {
    super(page);
    
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.cartLink = page.locator('header a[href="/view_cart"]');
    this.productsLink = page.locator('header a[href="/products"]');
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

  async clickCartLink() {
    await test.step('Navigate to cart', async () => {
      await this.cartLink.click();
      await this.waitForPageLoad();
    });
  }

  async clickProductsLink() {
    await test.step('Navigate to products page', async () => {
      await this.productsLink.click();
      await this.waitForPageLoad();
    });
  }

  async logout() {
    await test.step('Logout from application', async () => {
      await this.logoutLink.click();
      await this.waitForPageLoad();
    });
  }
}
