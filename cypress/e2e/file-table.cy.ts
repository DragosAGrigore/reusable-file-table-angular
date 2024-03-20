import { FileTablePage } from "../pages/file-table.page";

describe('File Table tests', () => {
  const fileTablePage = new FileTablePage();

  it('Visits the initial project page', () => {
    fileTablePage
      .visit();
  });

  context('No rows selected', () => {
    it('should have the empty state', () => {
      fileTablePage
        .getSelectAllCheckbox()
        .should('not.be.checked')
        .and('have.attr', 'aria-label', 'Select all rows');

      fileTablePage
        .getSelectedRowsText()
        .should('contain.text', 'None Selected');

      fileTablePage
        .getDownloadButton()
        .should('be.disabled')
        .and('have.attr', 'aria-disabled', 'true');
    });
  });

  context('Select rows with available and different status', () => {
    it('should have the correct state when multiple rows are selected', () => {
      fileTablePage
        .clickElementContaining('Stark')
        .clickElementContaining('Lannister');

      fileTablePage
        .getSelectAllCheckbox()
        .should('have.attr', 'aria-label', 'Select all rows')
        .and('have.prop', 'indeterminate');


      fileTablePage
        .getSelectedRowsText()
        .should('contain.text', 'Selected 2');

      fileTablePage
        .getDownloadButton()
        .should('not.be.disabled')
        .and('have.attr', 'aria-disabled', 'false');
    });

    it('should open the modal after clicking download button', () => {
      fileTablePage
        .clickDownloadButton()
        .getElementContaining('File summary').should('exist');
    });

    it('should contain the selected files in the modal', () => {
      fileTablePage
        .getErrorFileRowsFromModal()
        .should('have.length', 1);

      fileTablePage
        .getSuccessFileRowsFromModal()
        .should('have.length', 1);
    });

    it('should close the modal when clicking confirm', () => {
      fileTablePage
        .closeModal()
        .getElementContaining('File summary')
        .should('not.exist');
    });
  });

  context('Select all rows', () => {
    it('should select all rows when clicking on select all checkbox', () => {
      fileTablePage
        .clickSelectRowsCheckbox()
        .getSelectAllCheckbox()
        .should('be.checked')
        .and('have.attr', 'aria-label', 'De-select all rows');
    });

    it('should open the modal after clicking download button', () => {
      fileTablePage
        .clickDownloadButton()
        .getElementContaining('File summary')
        .should('exist');
    });

    it('should close the modal when clicking confirm', () => {
      fileTablePage
        .closeModal()
        .getElementContaining('File summary')
        .should('not.exist');
    });
  });

  context('De-select all rows', () => {
    it('should de-select all rows when clicking on select all checkbox', () => {
      fileTablePage
        .clickSelectRowsCheckbox()
        .getSelectAllCheckbox()
        .should('not.be.checked')
        .and('have.attr', 'aria-label', 'Select all rows');
    });
  });

  context('Select available row', () => {
    it('should click a scheduled file', () => {
      fileTablePage
        .clickElementContaining('Available');
    });

    it('should open modal with only successfully downloaded files', () => {
      fileTablePage
        .clickDownloadButton()
        .getSuccessFileRowsFromModal()
        .should('have.length', 1);

      fileTablePage
        .getErrorFileRowsFromModal()
        .should('have.length', 0);
    });

    it('should close the modal when clicking confirm', () => {
      fileTablePage
        .closeModal()
        .getElementContaining('File summary')
        .should('not.exist');
    });

    it('should reset state to no rows selected', () => {
      fileTablePage
        .clickSelectRowsCheckbox()
        .clickSelectRowsCheckbox()
        .getSelectAllCheckbox()
        .should('not.be.checked')
    });
  });

  context('Select scheduled row', () => {
    it('should click a scheduled file', () => {
      fileTablePage
        .clickElementContaining('Scheduled');
    });

    it('should open modal with only successfully downloaded files', () => {
      fileTablePage
        .clickDownloadButton()
        .getSuccessFileRowsFromModal()
        .should('have.length', 0);

      fileTablePage
        .getErrorFileRowsFromModal()
        .should('have.length', 1);
    });

    it('should close the modal when clicking confirm', () => {
      fileTablePage
        .closeModal()
        .getElementContaining('File summary')
        .should('not.exist');
    });

    it('should reset state to no rows selected', () => {
      fileTablePage
        .clickSelectRowsCheckbox()
        .clickSelectRowsCheckbox()
        .getSelectAllCheckbox()
        .should('not.be.checked');
    });
  });
})
