module.exports = {
  async expectBookingSuccess(page) {
    const title = await page.$eval('.ticket__check-title', el => el.textContent);
    expect(title).toContain('Вы выбрали билеты');
  }
};