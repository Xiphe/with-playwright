import { BrowserContext } from 'playwright-core/lib/client/browserContext';
import { Page } from 'playwright-core/lib/client/page';
import { Browser } from 'playwright-core/lib/client/browser';
import { LaunchedPage } from './getLaunchedPage';
import withPlaywright from './withPlaywright';

if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = ((cb: any) => {
    cb();
  }) as any;
}

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
