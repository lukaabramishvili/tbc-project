describe('Auth', () => {
  it('logs in successfully', () => {
    cy.visit('localhost:3000/login');

    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);
  })

  it('logs out successfully', () => {
    cy.visit('localhost:3000/login');

    cy.get('[data-cy="email"]').type('lukaabramishvili3@gmail.com');
    cy.get('[data-cy="password"]').type('lukaluka'); 
    cy.get('[data-cy="login"]').click().wait(4000);

    cy.get('[data-cy="profile-icon"]').click();
    cy.get('[data-cy="logout"]').click();
  })
})