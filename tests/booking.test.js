const { chooseDateAndSeat, submitBooking } = require('../helpers/commands');
const { expectBookingSuccess } = require('../helpers/assertions');

describe('Ticket Booking Suite (DRY, Hooks, Parametrize)', () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('https://qamid.tmweb.ru/client/index.php');
  });

  afterEach(async () => {
    await page.close();
  });

  test.each([
    [1, 3, 4],
    [2, 5, 6]
  ])('Happy path — успешное бронирование (день: %i, ряд: %i, место: %i)', async (day, row, seat) => {
    await chooseDateAndSeat(page, day, row, seat);
    await submitBooking(page);
    await expectBookingSuccess(page);
  });

  test('Sad path — попытка брони без выбора места', async () => {
    await page.click('.page-nav__day:nth-child(3)');
    await page.waitForSelector('.movie-seances__time:not(.acceptin-button-disabled)', { timeout: 10000 });
    await page.click('.movie-seances__time:not(.acceptin-button-disabled)');
    await page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });

    await page.click('.acceptin-button');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const stillOnHallPage = await page.$('.buying-scheme__wrapper') !== null;
    expect(stillOnHallPage).toBe(true);
  });
});
