import { getBrowsers, BrowserConfig } from './getBrowsers';
import { getCachedLaunchedPage, LaunchedPage } from './getLaunchedPage';
type Callback = (name: string, launchedPage: Promise<LaunchedPage>) => void;

export default function withPlaywright(
  callBack: Callback,
  config: BrowserConfig = process.env,
) {
  const browsers = getBrowsers(config);

  browsers.forEach((browser) => {
    const launchedPageP = getCachedLaunchedPage(browser);
    callBack(browser, launchedPageP);
  });
}
