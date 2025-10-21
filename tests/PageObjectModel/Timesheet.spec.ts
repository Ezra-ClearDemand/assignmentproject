import { Page } from "@playwright/test";

export class Timesheet {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  myTimesheet = () => this.page.getByRole("tab", { name: "My Timesheets" });
  searchTimesheet = () => this.page.getByPlaceholder("Search Timesheet");
  resubmitTimesheet = () =>
    this.page.getByRole("button", { name: "Resubmit Timesheet" });
  notes = () => this.page.getByRole("textbox");
  teamTimesheet = () => this.page.getByRole("tab", { name: "Team Timesheets" });
  userDropdown = () => this.page.getByLabel("User");
  correctionRequested = () =>
    this.page.getByRole("button", { name: "Request Correction" });
  addButton = () => this.page.getByLabel("Add", { exact: true });
  sendButton = () => this.page.getByRole("button", { name: "Send" });
  approvedTimesheetButton = () =>
    this.page.getByRole("button", { name: "Approve Timesheet" });
  approvedTimesheet = () =>
    this.page.getByRole("tab", { name: "Approved Timesheets" });
  timesheetReports = () =>
    this.page.getByRole("tab", { name: "Timesheet Reports" });
  payroll = () => this.page.getByRole("button", { name: "For Payroll" });
  clientReport = () => this.page.getByRole("button", { name: "For Clients" });
  generateReport = () =>
    this.page.getByRole("button", { name: "Generate Report" });
  startDate = () => this.page.locator('input[name="startDate"]');
  endDate = () => this.page.locator('input[name="endDate"]');
  client = () => this.page.locator("#client");
  project = () => this.page.getByPlaceholder("Select Project");
  user = () => this.page.locator("#user-id");
}
