import { Page } from "@playwright/test";

export class TaskCreation {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createTask() {
    await this.page.getByRole("button", { name: "Add Task" }).click();
  }

  async createSubTask() {
    await this.page.getByRole("button", { name: "+ Add Subtasks" }).click();
  }
  // Locators
  summary = () => this.page.getByLabel("Summary *");
  taskType = () => this.page.getByLabel("Task Type");
  taskStatus = () => this.page.getByLabel("Status");
  description = () => this.page.getByLabel("Description");
  startDate = () => this.page.getByLabel("Start Date");
  endDate = () => this.page.getByLabel("End Date");
  assignee = () => this.page.getByRole("combobox", { name: "Assignee" });
  priority = () => this.page.getByLabel("Medium");
  billable = () => this.page.getByLabel("Billable", { exact: true });
  nonBillable = () => this.page.getByLabel("Non-billable");
  checkBox = () => this.page.getByRole("checkbox");

  async submitTask() {
    await this.page.getByRole("button", { name: "Add Task" }).click();
  }

  async submitSubTask() {
    await this.page.getByRole("button", { name: "Add Sub Task" }).click();
  }
}
