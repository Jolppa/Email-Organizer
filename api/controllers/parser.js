const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

exports.start_parser = async (req, res) => {
  const browser = await puppeteer.launch({ devtools: true });
  try {
    const browserWSEndpoint = browser.wsEndpoint();
    // const page = await browser.newPage();
    const pages = await browser.pages();
    const page = pages[0];
    // await page.setViewport({ width: 1860, height: 1400 });

    await page.goto("https://mail.google.com");

    const email = await page.waitForSelector("#identifierId");
    await email.type(process.env.EMAIL);

    let next_btn = await page.waitForSelector("#identifierNext");
    await next_btn.click();

    await page.waitForTimeout(2000);

    //! Joku mättää
    const password = await page.waitForSelector(
      "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"
      // { visible: true }
    );

    await password.type(process.env.PASSWORD);
    next_btn = await page.waitForSelector("#passwordNext > div > button");
    await page.waitForTimeout(1000);
    await next_btn.click();

    const auth_btn = await page.waitForSelector(
      "#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > ul > li:nth-child(5) > div > div.vxx8jf",
      { visible: true }
    );

    await auth_btn.click();
    await page.waitForTimeout(1000);
    await auth_btn.click();

    res.json({
      success: true,
      wsEndpoint: browserWSEndpoint,
    });
  } catch (error) {
    console.log(error);
    await browser.close();
    res.json({ success: false, error: error });
  }
};

exports.continue_parser = async (req, res) => {
  const { code, webSocket } = req.body;
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocket });
  try {
    console.log("Connected to browser");
    const pages = await browser.pages();
    const page = pages[0];

    await page.waitForNetworkIdle();

    const auth_field = await page.$("#totpPin");

    await auth_field.type(String(code));

    await page.click("#totpNext > div > button > div.VfPpkd-Jh9lGc");

    res.send("asdasdsad");
  } catch (error) {}
};
