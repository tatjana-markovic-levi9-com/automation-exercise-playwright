import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly continueShoppingButton: Locator;
  private readonly viewCartButton: Locator;
  public readonly productsTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartButton = page.locator('text=View Cart');
    this.productsTitle = page.locator('.features_items h2.title');
  }

  async navigateToProducts() {
    await this.navigateTo('/products');
    await this.waitForPageLoad();
  }

  /**
   * Adds a product to cart by name
   * @param productName - The name of the product to add (e.g., 'Blue Top')
   */
  async addProductToCart(productName: string) {
    const product = this.page.locator('.productinfo').filter({ hasText: productName }).first();
    const addToCartButton = product.locator('a:has-text("Add to cart")');
    await addToCartButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async waitForContinueShoppingButton() {
    await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickViewCartFromModal() {
    await this.viewCartButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.viewCartButton.click();
    await this.waitForPageLoad();
  }
}

