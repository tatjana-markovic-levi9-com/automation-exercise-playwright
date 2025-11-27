import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  public readonly cartInfo: Locator;
  public readonly cartProducts: Locator;
  public readonly emptyCart: Locator;
  private readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.cartInfo = page.locator('#cart_info');
    this.cartProducts = page.locator('#cart_info_table tbody tr');
    this.emptyCart = page.locator('#empty_cart');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
  }

  /**
   * Get a product in cart by its name
   */
  getProductInCart(productName: string): Locator {
    return this.page.locator(`#cart_info_table tbody tr:has-text("${productName}")`);
  }

  /**
   * Delete a product from cart by its name
   */
  async deleteProduct(productName: string) {
    await test.step(`Remove "${productName}" from cart`, async () => {
      const productRow = this.getProductInCart(productName);
      const deleteButton = productRow.locator('.cart_delete a');
      await deleteButton.click();
      
      await productRow.waitFor({ state: 'hidden', timeout: 10000 });
    });
  }

  /**
   * Get the quantity of a product in cart by its name
   * @param productName - The name of the product
   * @returns The quantity as a number
   */
  async getProductQuantity(productName: string): Promise<number> {
    const productRow = this.getProductInCart(productName);
    const quantityButton = productRow.locator('.cart_quantity button');
    const quantityText = await quantityButton.textContent();
    return parseInt(quantityText || '0', 10);
  }


  async proceedToCheckout() {
    await test.step('Proceed to checkout', async () => {
      await this.proceedToCheckoutButton.click();
      await this.waitForPageLoad();
    });
  }
}

