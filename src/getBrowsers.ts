export const AVAILABLE_PLAYWRIGHT_BROWSERS = [
  'chromium' as const,
  'firefox' as const,
  'webkit' as const,
];

export type PlaywrightBrowser = typeof AVAILABLE_PLAYWRIGHT_BROWSERS[0];

export type BrowserConfig =
  | {
      WITH_PLAYWRIGHT_BROWSERS?: string;
      BROWSERS?: string;
      browsers?: PlaywrightBrowser[];
    }
  | PlaywrightBrowser[];

function isValidBrowser(name: string): name is PlaywrightBrowser {
  if (!AVAILABLE_PLAYWRIGHT_BROWSERS.includes(name as any)) {
    throw new Error(`${name} is not a supported playwright browser`);
  }

  return true;
}

export function getBrowsers(env: BrowserConfig): PlaywrightBrowser[] {
  if (Array.isArray(env)) {
    return env.filter(isValidBrowser);
  }

  if (Array.isArray(env.browsers)) {
    return env.browsers.filter(isValidBrowser);
  }

  return (env.WITH_PLAYWRIGHT_BROWSERS || env.BROWSERS || '')
    .split(',')
    .filter(Boolean)
    .filter(isValidBrowser);
}
