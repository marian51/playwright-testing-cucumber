import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class MainView extends BasePage {
  private readonly iFrame: FrameLocator;
  private readonly widgetsSection: Locator;
  private readonly navigationTabLocator: string;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("body");
    this.iFrame = this.page.frameLocator("//iframe[@title='dashboard']");
    this.widgetsSection = this.iFrame.locator("div.widgets");
    this.navigationTabLocator = "one-app-nav-bar-item-root";
  }

  async waitForWidgetsSection() {
    await this.widgetsSection.waitFor();
  }

  async assertNavigationTabsAreVisible(table: any) {
    for (const element of table) {
      const tabElement: Locator = this.container.locator(this.navigationTabLocator, { hasText: element.Tab });
      await expect(tabElement).toBeVisible();
    }
  }
}
