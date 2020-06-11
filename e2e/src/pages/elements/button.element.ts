import { Locator } from 'protractor';
import { Page } from '../page.po';
import { AbstractButton } from './abstract-button.element';

/**
 * Represents a button that when clicked returns a new predefined page.
 *
 * For a button that can return different pages depending on parameter when clicked check {@link ButtonMultipage}.
 */
export class Button<T extends Page> extends AbstractButton  {

  private typeOfNextPage: { new(): T ;};

  /**
   * Creates a button element that when clicked returns a next page.
   * @param selector Selector for this button.
   * @param typeOfNextPage Type of the next page to be returned when this button is clicked.
   */
  constructor(selector: Locator, typeOfNextPage: { new(): T ;} ) {
    super(selector);
    this.typeOfNextPage = typeOfNextPage;
  }

  /**
   * Clicks the button and returns the next page of type T.
   */
  async click(): Promise<T> {
    await this.clickPlain();
    return new this.typeOfNextPage();
  }

  async isDisplayed(): Promise<boolean> {
    return await this.element.isPresent();
  }

  async isEnabled(): Promise<boolean> {
    return await this.element.isEnabled();
  }

  async getText(): Promise<string> {
    return await this.element.getText();
  }
}