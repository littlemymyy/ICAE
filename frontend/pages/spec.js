

// Mock the authenticate function

const puppeteer = require('puppeteer');

jest.setTimeout(60000);
url = 'http://localhost:3000'
let dialogHandled = false;



describe('ICAE TEST', () => {
    let page;
    let browser;
  
  
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: 'new'});
      page = await browser.newPage(); 
    });
  
    afterAll(async () => {
      await browser.close();
    });



    test('Test doc list', async () => {
        //console.log('test doc list');
        await page.goto(url + '/login/Signln', { waitUntil: 'domcontentloaded' });

        
        await page.waitForSelector('#email');
       // page.on('console', (message) => console.log(`Console: ${message.text()}`));
        await page.type('#email', 'hechuan1949@gmauk.com');
    
        await page.type('#password', '123456');

        //await page.click('#go');
       //  await page.waitForNavigation();
});

});
// describe('GET /check', () => {
//   it('respond with 200', async () => {
//     const respond = await request(baseURL).get('/check');
//     expect(respond.statusCode).toBe(200);
//   });
// });


