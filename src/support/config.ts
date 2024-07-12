import { LaunchOptions } from "@playwright/test";
import dotenv from 'dotenv'

dotenv.config()

const isHeadless = Boolean(process.env.CI)

const browserOptions: LaunchOptions = {
  headless: isHeadless ?? false
};

export const config = {
  browser: 'chromium',
  browserOptions,
  BASE_URL: 'https://playwright.dev',
};