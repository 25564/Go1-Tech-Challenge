const App = require('../app');
const request = require('supertest');
process.env.JWTSecret = 'secret'; // This would be set by an .env file


describe('Test the overall endpoints are working', () => {
  test('It should give 200 Response', done => {
      request(App).get('/events').set({
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
      }).then((response) => {
          expect(response.statusCode).toBe(200);
          done();
      });
  });

  test('Should default to the token location', done => {
    request(App).get('/events').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
      expect(response.body.every(City => City.Location.City === "Brisbane"))
      done();
    });
  });

  test('Location Param should give 200 Response', done => {
    request(App).get('/events/Cairns').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    });
  });

  test('Should return cities from the query', done => {
    request(App).get('/events/Cairns').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
      expect(response.body.every(City => City.Location.City === "Cairns"))
      done();
    });
  });

  test('Should return cities from the query', done => {
    request(App).get('/events/Cairns').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
      expect(response.body.every(City => City.Location.City === "Cairns"))
      done();
    });
  });

  test('Return a maximum of five events', done => {
    request(App).get('/events/Gold%20Coast').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
      expect(response.body.length === 5);
      done();
    });
  });

  test('Invalid Token should 403', done => {
    request(App).get('/events/Cairns').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
    }).then((response) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });
  
  test('Missing Token should 403', (done) => {
    request(App).get('/events/Cairns').then((response) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });

  test('Incorrect endpoint should 403', (done) => {
    request(App).get('/foo/').set({
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwOTk1MDgyMywiZXhwIjoxNjA5OTU0NDgwLCJsb2NhdGlvbiI6ImJyaXNiYW5lIiwianRpIjoiYzlhNjdjZDktMmQ4Ni00ZWVhLTljOGEtMmMyNzI3Y2NlMWQ3In0.9QbIHP7xVgFFXtb6fI6XbrWjEurKzn0WZvdHW8PhzLE",
    }).then((response) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });
});