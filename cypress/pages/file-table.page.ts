export class FileTablePage {
  visit(): FileTablePage {
    cy.visit('/');

    return this;
  }

  clickSelectRowsCheckbox(): FileTablePage {
    this.getSelectAllCheckbox().click();

    return this;
  }

  clickElementContaining(containedWord: string): FileTablePage {
    cy.contains(containedWord).click();

    return this;
  }

  clickDownloadButton(): FileTablePage {
    this.getDownloadButton().click();

    return this;
  }

  closeModal(): FileTablePage {
    cy.get('.download-dialog__close-button').click();

    return this;
  }

  getElementContaining(containedString: string): Cypress.Chainable {
    return cy.contains(containedString);
  }


  getDownloadButton(): Cypress.Chainable {
    return cy.get('.file-table-actions__download-button').find('button');
  }

  getSelectAllCheckbox(): Cypress.Chainable {
    return cy.get('.file-table-actions__select-checkbox').then(($el) => {
      cy.wrap($el).find('input[type="checkbox"]');
    });
  }

  getSuccessFileRowsFromModal(): Cypress.Chainable {
    return cy.get('.download-dialog__file-item.download-dialog__file-item--success');
  }

  getErrorFileRowsFromModal(): Cypress.Chainable {
    return cy.get('.download-dialog__file-item:not(.download-dialog__file-item--success)');
  }

  getSelectedRowsText(): Cypress.Chainable {
    return cy.get('.file-table-actions__selected-rows-text');
  }
}
