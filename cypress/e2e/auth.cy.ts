import 'cypress-file-upload';

describe('Auth', () => {
  // it('logs in successfully', () => {
  //   cy.visit('https://tbc-project-five.vercel.app/login');

  //   cy.get('[data-cy="email"]').type('testaccount@gmail.com');
  //   cy.get('[data-cy="password"]').type('test123'); 
  //   cy.get('[data-cy="login"]').click().wait(4000);
  // })

  // it('product add successfully', () => {
  //   cy.visit('https://tbc-project-five.vercel.app/login'); 
  
  //   cy.get('[data-cy="email"]').type('testaccount@gmail.com');
  //   cy.get('[data-cy="password"]').type('test123'); 
  //   cy.get('[data-cy="login"]').click().wait(4000);
  //   cy.url().should('include', 'https://tbc-project-five.vercel.app'); 
  
  //   cy.viewport(1280, 800); 

  //   cy.window().then((win) => {
  //     const screenWidth = win.innerWidth;
      
  //     if (screenWidth === 1280) {
  //       cy.get('[data-cy="nav-products"]').click({ multiple: true });

  //     } else {
  //       cy.get('[data-cy="burgerBar"]').click({ multiple: true });
  //     }
  //   });

  //   cy.url().should('include', '/products'); 
  
  //   cy.get('[data-cy="add-product"]').click();
  
  //   cy.get('[data-cy="add-product-name"]').type('test product');
  //   cy.get('[data-cy="add-product-price"]').type('100');
    
  //   cy.get('[data-cy="add-product-submit"]').click().wait(5000);

  //   cy.intercept('POST', '/api/createProduct', {
  //     statusCode: 200, 
  //     body: { ok: true }, 
  //   }).as('createProductRequest');  
  // });

  // it('product delete successfully', () => {
  //   cy.visit('https://tbc-project-five.vercel.app/login'); 
  
  //   cy.get('[data-cy="email"]').type('testaccount@gmail.com');
  //   cy.get('[data-cy="password"]').type('test123'); 
  //   cy.get('[data-cy="login"]').click().wait(4000);
  //   cy.url().should('include', 'https://tbc-project-five.vercel.app'); 
  
  //   cy.viewport(1280, 800); 

  //   cy.window().then((win) => {
  //     const screenWidth = win.innerWidth;
      
  //     if (screenWidth === 1280) {
  //       cy.get('[data-cy="nav-products"]').click({ multiple: true });

  //     } else {
  //       cy.get('[data-cy="burgerBar"]').click({ multiple: true });
  //     }
  //   });    
  //   cy.url().should('include', '/products'); 
  
  //   cy.get('[data-cy="delete-product"]').click().wait(1000);

  //   cy.on('window:alert', (alertText) => {
  //     expect(alertText).to.include('Product deleted successfully');
  //   });
  // });

  
});