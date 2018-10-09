const puppeteer = require('puppeteer');
 
const getZodiac = async (celeb) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.astrotheme.com/astrology/${celeb}`);
 
  // Get the "viewport" of the page, as reported by the page.
  const zodSign = await page.evaluate(() => {
    let rawZod = Array.from(document.querySelectorAll('a.lienPosition')).filter(elm => elm.href.includes('0'))[0].textContent
    return rawZod.slice(rawZod.indexOf(' ') + 1)   
  });
 
  console.log(zodSign);
  
 
  await browser.close();
  return zodSign;
};

module.exports = getZodiac