import { LaunchedPage } from './getLaunchedPage';
import withPlaywright from './withPlaywright';
import { AVAILABLE_PLAYWRIGHT_BROWSERS } from './getBrowsers';

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

  it.each(AVAILABLE_PLAYWRIGHT_BROWSERS)(
    'provides browser, context, page and name to callback in %s',
    async () => {
      const cb = jest.fn();
      withPlaywright(cb, { browsers: ['chromium'] });

      expect(cb).toHaveBeenCalledTimes(1);

      const [name, pw]: [string, Promise<LaunchedPage>] = cb.mock.calls[0];
      expect(name).toBe('chromium');
      const { browser, context, page } = await pw;
      expect(context.constructor.name).toBe('BrowserContext');
      expect(browser.constructor.name).toBe('Browser');
      expect(page.constructor.name).toBe('Page');
    },
  );
});
