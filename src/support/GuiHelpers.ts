import { Page } from "@playwright/test";

export async function waitAndCloseSearchPopup(page: Page) {
  try {
    const exploreButton = page.getByRole("button", { name: "Explore" });
    await exploreButton.click({ timeout: 5000 });
    await page.waitForTimeout(5000);
    await page.keyboard.press("Escape");
    console.log("'Introduce Search Bar' has been loaded and successfully closed.");
  } catch (error) {
    console.log("'Introduce Search Bar' has NOT been loaded.");
  } finally {
    console.log("Tests execution continues");
  }
}

export async function waitForPageLoad(page: Page) {
  try {
    await page.locator("cu-web-push-notification-banner").waitFor({ timeout: 5000 });
    console.log("Notifications bar has been loaded.");
  } catch (error) {
    console.log("Notifications bar has NOT been loaded.");
  } finally {
    console.log("Tests execution continues");
  }
}
