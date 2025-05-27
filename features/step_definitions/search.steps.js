const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const chai = require("chai");
const expect = chai.expect;

const { chooseDateAndSeat, submitBooking } = require('../../helpers/commands');

setDefaultTimeout(90000);

Before(async function () {
  this.browser = await puppeteer.launch({ headless: false, slowMo: 800 });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('User is on the main page', async function () {
  await this.page.goto('https://qamid.tmweb.ru/client/index.php');
});

When('User select day {int} and choose row {int} seat {int}', async function (day, row, seat) {
  await chooseDateAndSeat(this.page, day, row, seat);
});

When('User select day {int} and a seance', async function (day) {
  await this.page.click(`.page-nav__day:nth-child(${day + 1})`);
  await this.page.waitForSelector('.movie-seances__time:not(.acceptin-button-disabled)', { timeout: 10000 });
  await this.page.click('.movie-seances__time:not(.acceptin-button-disabled)');
  await this.page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });
});

When('User confirm booking', async function () {
  await this.page.click('.acceptin-button');
});

Then('User should see the booking confirmation', async function () {
  await this.page.waitForSelector('.ticket__check-title', { timeout: 20000 });
  const content = await this.page.$eval('.ticket__check-title', el => el.textContent);
  expect(content).to.be.a('string').that.is.not.empty;
});

Then('User should remain on the same page', async function () {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const stillOnSamePage = await this.page.$('.buying-scheme__wrapper') !== null;
  expect(stillOnSamePage).to.be.true;
});
