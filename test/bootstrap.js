const puppeteer = require('puppeteer');
const { expect } = require('chai');
const globalVariables = {browser: global.browser, expect: global.expect};

// puppeteer options
const opts = {
  headless: true,
  slowMo: 100,
  timeout: 20000,
  args: ['--use-fake-ui-for-media-stream'] //skip a prompt of getUserMedia
};

// expose variables
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
  console.log(await browser.version());
});

// close browser and reset global variables
after (async function () {
  let page = await global.browser.newPage();

  // Print page's console events
  page.on('console', consoleMessage => console.log(consoleMessage.text()));

  page.goto('http://localhost:9880/stop').then(async ()=>{
    await global.browser.close();

    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
  });
});
