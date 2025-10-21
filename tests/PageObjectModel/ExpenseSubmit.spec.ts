import { Page } from "@playwright/test";

export class ExpenseSubmit {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  project = () => this.page.locator("form #project-list-id");
  task = () => this.page.locator("#task-list-id");
  user = () => this.page.locator("#user");
  date = () => this.page.getByPlaceholder(" dd mmm yyyy");
  expenseCategory = () => this.page.getByLabel("​", { exact: true });
  expenseAmount = () => this.page.getByPlaceholder("$");
  uploadFile = () =>
    this.page.getByRole("button", { name: "svg-button Upload" });
  message = () => this.page.locator('textarea[name="message"]');
  saveButton = () => this.page.getByRole("button", { name: "Save" });
}
