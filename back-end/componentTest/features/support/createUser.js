import { After, Given, Then, When } from '@cucumber/cucumber';
import { equal } from 'assert';
import axios from 'axios';

let response;

After(function () {
  this.userData = null;
  response = null;
});

Given('I have the following user data:', async function (dataTable) {
  this.userData = dataTable.hashes()[0];
});

When('I create a user with the following data', async function () {
  try {
    response = await axios.post('http://localhost:3000/users', this.userData);
  } catch (error) {
    response = error.response;
  }
});

Then(
  'I should receive a response with the following data:',
  function (dataTable) {
    const expectedData = dataTable.hashes()[0];
    equal(response.data.name, expectedData.name);
    equal(response.data.email, expectedData.email);
  },
);

Then(
  'I should receive a response with status code {int}',
  function (statusCode) {
    equal(response.status, statusCode);
  },
);
