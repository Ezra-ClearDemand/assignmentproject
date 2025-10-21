import { Page } from "@playwright/test";

export class LogTime {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  project = () => this.page.locator("form #project-list-id");
  task = () => this.page.locator("#task-list-id");
  user = () => this.page.locator("#user");
  date = () => this.page.getByPlaceholder(" dd mmm yyyy");
  duration = () => this.page.locator('input[name="duration"]');
  mileage = () => this.page.locator('input[name="mileage"]');
  perdiem = () => this.page.locator('input[name="perDiem"]');
  message = () => this.page.locator('textarea[name="message"]');
  logTime = () => this.page.getByText("Log Time");
  saveButton = () => this.page.getByRole("button", { name: "Save" });
  automaticTimerStop = () => this.page.locator("#automate-timer-stop");
}
