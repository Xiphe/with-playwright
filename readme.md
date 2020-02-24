# with-playwright

opt-in playwright browsers for testing

## Installation

```bash
npm install playwright with-playwright
```

## Usage

```ts
import withPlaywright from 'with-playwright';

withPlaywright(
  async (name, pw) => {
    const { browser, context, page } = await pw;
    /* Callback is not called when no browsers are configured */
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example-${browserType}.png` });
    await browser.close();
  },
  {
    browsers: ['chromium', 'firefox', 'webkit'],
  },
);
```

## Configuration

Instead passing browsers in the config object, these can be
set using environment variables `WITH_PLAYWRIGHT_BROWSERS` or `BROWSERS`

```bash
BROWSERS=chromium,firefox,webkit ./myScriptWithPlaywright.js
```

If no browsers are set, the callback passed to `withPlaywright` is not
executed.

The idea is to use this in test runners like jest and use environment variables
to opt-into the slower tests that require a real browser.

## License

> The MIT License
>
> Copyright (C) 2016 Hannes Diercks
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
