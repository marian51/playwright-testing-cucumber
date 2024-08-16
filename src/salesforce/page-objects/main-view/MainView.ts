import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class MainView extends BasePage {
  private readonly iFrame: FrameLocator;
  private readonly widgetsSection: Locator;
  private readonly tabName: Locator;
  private navigationTabLocator: string;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("body");
    this.iFrame = this.page.frameLocator("//iframe[@title='dashboard']");
    this.widgetsSection = this.iFrame.locator("div.widgets");
    this.tabName = this.container.locator("lst-breadcrumbs")
    this.navigationTabLocator = "one-app-nav-bar-item-root";
  }

  async waitForWidgetsSection() {
    await this.widgetsSection.waitFor();
  }

  async clickOnTab(tabName: string) {
    let element: Locator = this.page.locator(this.navigationTabLocator).locator("a", { hasText: new RegExp(`^${tabName}$`) });

    if (!await element.isVisible()) {
      await this.clickOnButton("More");
      this.navigationTabLocator = "one-app-nav-bar-menu-item";
      element = this.page.locator(this.navigationTabLocator).locator("a", { hasText: new RegExp(`^${tabName}$`) });
    }

    await element.click();
  }

  async assertNavigationTabsAreVisible(table: any, lookAtDropdown: boolean) {
    this.navigationTabLocator = lookAtDropdown ? "one-app-nav-bar-menu-item" : "one-app-nav-bar-item-root";
    for (const element of table) {
      const tabElement: Locator = this.page.locator(this.navigationTabLocator).locator("a", { hasText: new RegExp(`^${element.Tab}$`) });
      await tabElement.hover();
      await expect(tabElement).toBeVisible();
    }
  }

  async assertMainViewChanges() {
    expect(this.page.url).not.toEqual(process.env.SF_MAIN_VIEW_URL);
    await expect(this.widgetsSection).toBeHidden();
  }

  async assertTabNameIsDisplayed(tabName: string) {
    await expect(this.tabName).toHaveText(tabName);
    await this.page.waitForTimeout(1000)
  }
}
