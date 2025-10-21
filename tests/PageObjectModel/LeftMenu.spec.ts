import { Page } from "@playwright/test";

export class ListMenu {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  homeMenu = () => this.page.getByRole("button", { name: "Home", exact: true });
  projects = () =>
    this.page.getByRole("link", { name: "Projects", exact: true });
  tasks = () => this.page.getByRole("link", { name: "Tasks", exact: true });
  manageMenu = () =>
    this.page.getByRole("button", { name: "Manage", exact: true });
  documents = () =>
    this.page.getByRole("link", { name: "Documents", exact: true });
  forms = () => this.page.getByRole("link", { name: "Forms", exact: true });
  reports = () => this.page.getByRole("link", { name: "Reports", exact: true });
  timesheets = () =>
    this.page.getByRole("link", { name: "Timesheets", exact: true });
  analyseMenu = () =>
    this.page.getByRole("button", { name: "Analyze", exact: true });
  copilot = () => this.page.getByRole("link", { name: "Copilot", exact: true });
  dashboard = () =>
    this.page.getByRole("link", { name: "Dashboards", exact: true });
  adminMenu = () =>
    this.page.getByRole("button", { name: "Admin", exact: true });
  organization = () =>
    this.page.getByRole("link", { name: "Organization", exact: true });
  clients = () => this.page.getByRole("link", { name: "Clients", exact: true });
  users = () => this.page.getByRole("link", { name: "Users" });
  customFields = () =>
    this.page.getByRole("link", { name: "Custom Fields", exact: true });
  integrateMenu = () =>
    this.page.getByRole("button", { name: "Integrate", exact: true });
  apps = () => this.page.getByRole("link", { name: "Apps", exact: true });
  logTimeButton = () =>
    this.page.getByLabel("Logtime").getByLabel("svg-button");
  expenseButton = () =>
    this.page.getByLabel("Expense").getByLabel("svg-button");
  createProjectButton = () =>
    this.page.getByRole("button", { name: "Create Project" });
  notificationButton = () => this.page.getByTestId("BellOutlineIcon");
  profileButton = () => this.page.getByTestId("PersonIcon");
}
