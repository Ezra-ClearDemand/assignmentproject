import { Page } from "@playwright/test";

export class ProjectCreation {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createProject() {
    await this.page.getByRole("button", { name: "Create Project" }).click();
  }

  // Locators
  client = () => this.page.locator("#client");
  projectType = () => this.page.locator("#project-type");
  markAsPublic = () => this.page.getByLabel("Mark as Public");
  nonBillable = () => this.page.getByLabel("Non Billable");
  projectStatus = () => this.page.getByRole("button", { name: "Active" });
  projectManager = () => this.page.locator("input#project-manager");
  projectName = () => this.page.getByLabel("Project Name *");
  billingCode = () => this.page.getByLabel("Billing Code");
  description = () => this.page.getByLabel("Description");
  nextButton = () => this.page.getByRole("button", { name: "Next" });

  async submitProject() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
