import { getGreeting } from '../support/app.po';

describe('mbs', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to mbs!');
  });
});
