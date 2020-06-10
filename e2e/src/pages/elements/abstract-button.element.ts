import { element, ElementFinder, Locator } from 'protractor';

/**
 * Abstract class for button elements containing common code.
 */
export abstract class AbstractButton  {

  /** DOM element representing this Button. */
  element: ElementFinder;

  /**
   * Creates a button element that when clicked returns a next page.
   * @param selector Selector for this button.
   */
  constructor(selector: Locator) {
    this.element = element(selector);
  }

  /**
   * Clicks the button. Returning of the next page should be covered by extending classes.
   */
  async clickPlain(): Promise<void> {
    await this.element.click();
  }

  /**
   * Checks if this button is displayd.
   */
  async isDisplayed(): Promise<boolean> {
    return await this.element.isPresent();
  }

  /**
   * Gets label of this button.
   */
  async getLabel(): Promise<string> {
    return await this.element.getText();// TODO check if its working
  }

  /**
   * Determied by disabled attribute.
   */
  async isEnabled(): Promise<boolean> {
    return await this.element.isEnabled();
  }
}
