import { Page } from "@playwright/test";

export class TaskDetails {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  taskDetail = () =>
    this.page.getByLabel("breadcrumb").getByText("Task Details");
  clockInTab = () => this.page.getByText("Clock In", { exact: true });
  logTime = () => this.page.getByText("Log Time");
  dailyLogsTab = () => this.page.getByText("Daily Logs", { exact: true });
  reportsTab = () =>
    this.page.getByRole("main").getByText("Reports", { exact: true });
  notesTab = () => this.page.getByText("Notes", { exact: true });
  notes = () => this.page.getByLabel("Notes");
  assignee = () => this.page.getByRole("combobox").first();
  reporter = () => this.page.getByRole("combobox").nth(1);
  documentsTab = () =>
    this.page.getByRole("main").getByText("Documents", { exact: true });
  subTaskButton = () =>
    this.page.getByRole("button", { name: "+ Add Subtasks" });
}
