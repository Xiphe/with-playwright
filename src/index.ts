import { LaunchedPage as L } from './getLaunchedPage';
import { PlaywrightBrowser as PWB, BrowserConfig as BC } from './getBrowsers';

export { default } from './withPlaywright';
export { getBrowsers } from './getBrowsers';
export type LaunchedPage = L;
export type PlaywrightBrowser = PWB;
export type BrowserConfig = BC;
