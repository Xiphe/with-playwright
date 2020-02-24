import { BrowserContext } from 'playwright-core/lib/browserContext';
import { Page } from 'playwright-core/lib/page';
import { CRBrowser } from 'playwright-core/lib/chromium/crBrowser';
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

    const [name, pw] = cb.mock.calls[0];
    expect(name).toBe('chromium');
    const { browser, context, page } = await pw;
    expect(context).toEqual(expect.any(BrowserContext));
    expect(browser).toEqual(expect.any(CRBrowser));
    expect(page).toEqual(expect.any(Page));
  });
});
