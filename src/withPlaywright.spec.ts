import { BrowserContext } from 'playwright/lib/client/browserContext';
import { Page } from 'playwright/lib/client/page';
import { Browser } from 'playwright/lib/client/browser';
import { LaunchedPage } from './getLaunchedPage';
import withPlaywright from './withPlaywright';

describe('withPlaywright', () => {
  it('does not call callback when no browser is configured in env', () => {
    const cb = jest.fn();
    withPlaywright(cb);
    expect(cb).not.toHaveBeenCalled();
  });

  it('provides browser, context, page and name to callback', async () => {
    const cb = jest.fn();
    withPlaywright(cb, { browsers: ['chromium'] });

    expect(cb).toHaveBeenCalledTimes(1);

    const [name, pw]: [string, Promise<LaunchedPage>] = cb.mock.calls[0];
    expect(name).toBe('chromium');
    const { browser, context, page } = await pw;
    expect(context).toEqual(expect.any(BrowserContext));
    expect(browser).toEqual(expect.any(Browser));
    expect(page).toEqual(expect.any(Page));
  });
});
