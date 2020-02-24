import playwright, { Browser, Page, BrowserContext } from 'playwright';
import { PlaywrightBrowser } from './getBrowsers';

export type LaunchedPage = {
  browser: Browser;
  page: Page;
  context: BrowserContext;
};

const cache: { [key: string]: Promise<LaunchedPage> } = {};

export async function getLaunchedPage(
  name: PlaywrightBrowser,
): Promise<LaunchedPage> {
  const browser = await playwright[name].launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  return {
    browser,
    context,
    page,
  };
}

if (typeof afterAll === 'function') {
  afterAll(async () => {
    for (const key of Object.keys(cache)) {
      await (await cache[key]).browser.close();
      delete cache[key];
    }
  });
}

export function getCachedLaunchedPage(name: PlaywrightBrowser) {
  if (!cache[name]) {
    cache[name] = getLaunchedPage(name);
  }

  return cache[name];
}
