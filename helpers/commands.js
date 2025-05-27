async function clickElement(page, selector) {
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
}

module.exports = {
  async chooseDateAndSeat(page, dateIndex = 0, row = 1, seat = 1) {
    await clickElement(page, `.page-nav__day:nth-child(${dateIndex + 1})`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    await clickElement(page, '.movie-seances__time:not(.acceptin-button-disabled)');
    await page.waitForSelector('.buying__info-start', { visible: true });

    const seatSelector = `.buying-scheme__row:nth-child(${row}) .buying-scheme__chair:nth-child(${seat})`;
    await page.waitForSelector(seatSelector, { visible: true });
    await page.click(seatSelector);
  },

  async submitBooking(page) {
    await page.click('.acceptin-button');
    await page.waitForSelector('.ticket__check-title', { timeout: 10000 });
  }
};
