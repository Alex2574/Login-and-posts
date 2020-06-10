import { AppPage } from '../pages/app.po';
import { browser, logging, protractor } from 'protractor';
import { PostPage } from '../pages/post.po';

describe('workspace-project App', () => {
  let page: AppPage = new AppPage();
  let postPage: PostPage = new PostPage();
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page.navigateTo();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
  it('should show OPEN button of first post ', async () => {
    expect(await postPage.postButton.isDisplayed()).toBe(true);
  });
  it('should click first post', async () => {
    await postPage.postButton.click();
    expect(await browser.wait(EC.urlContains('post/-M3FmQy1BjEM9069EZv_'), 0)).toBeTruthy();
  });
});
