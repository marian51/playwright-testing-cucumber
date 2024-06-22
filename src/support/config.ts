import { LaunchOptions } from "@playwright/test";

const browserOptions: LaunchOptions = {
  headless: false
};

export const config = {
  browser: 'chromium',
  browserOptions,
  BASE_URL: 'https://playwright.dev',
};