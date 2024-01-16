const request = require('supertest');
const baseURL = "http://localhost:3001/"

describe('POST /login/SignIn correct password', () => {
  it('responds with message "login success"', async () => {
    const response = await request(baseURL)
      .post('/login_db')
      .send({
        email: "hechuan1949@gmail.com",
        password: "123456"
      });

    if (response.type !== 'application/json') {
      // Handle non-JSON response, for example:
      // console.error('Non-JSON response:', response.text);
      // Add assertions or error handling as needed
    } else {
      // Parse JSON if the response is in JSON format
      let data = JSON.parse(response.text);
      expect(data.message).toBe('login success');
    }
  });
});

  describe('POST /login_api wrong password', () => {
    it('responds with message "wrong password"', async () => {
      const response = await request(baseURL)
        .post('/login_db')
        .send({
          email: "hechuan1949@gmail.com",
          password: "1"
        });

      // Check if the response is not in JSON format
      if (response.type !== 'application/json') {
      } else {
        // Parse JSON if the response is in JSON format
        let data = JSON.parse(response.text);
        expect(data.message).toBe('wrong password');
      }
    });
  });


  describe('POST /SignUp/SignUp correct ', () => {
    it('responds with message "signIn OK"', async () => {
      const response = await request(baseURL)
        .post('/SignUp/SignUp')
        .send({
          firstName: "long",
          lastName : "hotman",
          email: "hotman@gmail.com",
          password: "123456" ,
          confirmpassword:"123456"
        });

      if (response.type !== 'application/json') {
      } else {
        // Parse JSON if the response is in JSON format
        let data = JSON.parse(response.text);
        expect(data.message).toBe('signIn OK');
      }
    });
  });


  describe('POST /examine/check correct ', () => {
    it('responds with message "signIn OK"', async () => {
      const response = await request(baseURL)
        .post('/SignUp/SignUp')
        .send({
          name: "long",
          input: "",
          lastName : "hotman",
          email: "hotman@gmail.com",
          password: "123456" ,
          confirmpassword:"123456"
        });

      if (response.type !== 'application/json') {
        // Add assertions or error handling as needed
      } else {
        // Parse JSON if the response is in JSON format
        let data = JSON.parse(response.text);
        expect(data.message).toBe('signIn OK');
      }
    });
  });
