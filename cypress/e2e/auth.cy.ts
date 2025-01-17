import 'cypress-file-upload';
import { useState } from 'react';

describe('Auth', () => {
  it('logs in successfully', () => {
    cy.visit('localhost:3000/login');

    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);
  })

  it('logs out successfully', () => {
    cy.visit('localhost:3000/login');

    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);

    cy.get('[data-cy="profile-icon"]').click();
    cy.get('[data-cy="logout"]').click();
  })

  it('product add successfully', () => {
    cy.visit('http://localhost:3000/login'); 
  
    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);
    cy.url().should('include', 'http://localhost:3000'); 
  
    cy.get('[data-cy="nav-products"]').click({ multiple: true });
    cy.url().should('include', '/products'); 
  
    cy.get('[data-cy="add-product"]').click();
  
    cy.get('[data-cy="add-product-name"]').type('test product');
    cy.get('[data-cy="add-product-price"]').type('100');
    
    cy.get('[data-cy="add-product-submit"]').click();
  
    cy.intercept('POST', '/api/createProduct', {
      statusCode: 200, 
      body: { ok: true }, 
    }).as('createProductRequest');  
  });

  it('product delete successfully', () => {
    cy.visit('http://localhost:3000/login'); 
  
    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);
    cy.url().should('include', 'http://localhost:3000'); 
  
    cy.get('[data-cy="nav-products"]').click({ multiple: true });
    cy.url().should('include', '/products'); 
  
    cy.get('[data-cy="delete-product-1"]').click().wait(1000);

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Product deleted successfully');
    });
  });

  it('purchased successfully', () => {
    cy.visit('http://localhost:3000/login'); 
  
    cy.get('[data-cy="email"]').type('testaccount@gmail.com');
    cy.get('[data-cy="password"]').type('test123'); 
    cy.get('[data-cy="login"]').click().wait(4000);
    cy.url().should('include', 'http://localhost:3000'); 
  
    cy.get('[data-cy="nav-products"]').click({ multiple: true });
    cy.url().should('include', '/products'); 
  
    cy.get('[data-cy="add-to-cart-1"]').click().wait(1000);
  });
});
