const request = require('supertest');
const baseURL = "http://localhost:3000/"

describe('GET /', () => {
  it('respond with 200', async () => {
    const respond = (await request(baseURL).get('/').redirects(2));
    expect(respond.statusCode).toBe(200);
  });
});

  describe('GET /SignUp/SignUp', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/SignUp/SignUp').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /Knowledge/home', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/Knowledge/home').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /examine/check', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/check').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /examine/record', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/check').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /examine/result?gname=rejuran&dataArray=%5B%7B%22no%22%3A28329%2C%22cas%22%3A%227732-18-5%22%2C%22cname%22%3A%22WATER%22%2C%22cmname%22%3A%22water%22%2C%22per%22%3A100%2C%22st%22%3A4%2C%22img%22%3A%22-%22%2C%22des%22%3A%22%22%2C%22bodypart%22%3A%22All+product%22%2C%22color%22%3A%22-%22%2C%22per1%22%3A%22100%22%7D%5D&filltergA=%5B%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22leave%22%5D', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/result?gname=rejuran&dataArray=%5B%7B%22no%22%3A28329%2C%22cas%22%3A%227732-18-5%22%2C%22cname%22%3A%22WATER%22%2C%22cmname%22%3A%22water%22%2C%22per%22%3A100%2C%22st%22%3A4%2C%22img%22%3A%22-%22%2C%22des%22%3A%22%22%2C%22bodypart%22%3A%22All+product%22%2C%22color%22%3A%22-%22%2C%22per1%22%3A%22100%22%7D%5D&filltergA=%5B%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22leave%22%5D').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /examine/record', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/check').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /examine/history ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/history ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });


  describe('GET /examine/history ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/examine/history ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /pif/createByfda ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/createByfda ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /pif/createByfda ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/createByfda ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });


  describe('GET /pif/manage ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/manage ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /pif/productslist ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/productslist ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /pif/showpif ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/showpif ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /pif/upload ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/pif/upload  ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/Add ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/Add ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/Changegroup ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/Changegroup ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/Edit ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/Edit ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/Home ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/Home ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/Showch ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/Showch ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });

  describe('GET /admin/UserManage ', () => {
    it('respond with 200', async () => {
      const respond = (await request(baseURL).get('/admin/UserManage ').redirects(2));
      expect(respond.statusCode).toBe(200);
    });
  });


// describe('GET /check', () => {
//   it('respond with 200', async () => {
//     const respond = await request(baseURL).get('/check');
//     expect(respond.statusCode).toBe(200);
//   });http://localhost:3000/examine/result?gname=rejuran&dataArray=%5B%7B%22no%22%3A28329%2C%22cas%22%3A%227732-18-5%22%2C%22cname%22%3A%22WATER%22%2C%22cmname%22%3A%22water%22%2C%22per%22%3A100%2C%22st%22%3A4%2C%22img%22%3A%22-%22%2C%22des%22%3A%22%22%2C%22bodypart%22%3A%22All+product%22%2C%22color%22%3A%22-%22%2C%22per1%22%3A%22100%22%7D%5D&filltergA=%5B%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22skin%22%2C%22body%22%2C%22powder%22%2C%22hand%22%2C%22leave%22%5D
// });http://localhost:3000/examine/history   http://localhost:3000/pif/createByfda

//http://localhost:3000/pif/manage
//http://localhost:3000/pif/productslist
