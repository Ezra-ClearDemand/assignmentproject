import { Page, Expect } from "@playwright/test";

export class ProjectDetails {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  searchProject = () => this.page.getByPlaceholder("Search Projects");
  deleteButton = () => this.page.getByRole("button", { name: "Delete" });
  yesButton = () => this.page.getByRole("button", { name: "Yes" });
  clockInTab = () => this.page.getByText("Clock In", { exact: true });
  projectBack = () => this.page.getByLabel("breadcrumb").getByText("Projects");
  projectDetailsBack = () =>
    this.page.getByLabel("breadcrumb").getByText("Project Details");
  logTime = () => this.page.getByText("Log Time");
  dailyLogsTab = () => this.page.getByText("Daily Logs", { exact: true });
  SubmitExpense = () => this.page.getByText("Submit Expense");
  timeAndExpense = () => this.page.getByText("Time & Expense");
  taskTab = () =>
    this.page.getByRole("main").getByText("Tasks", { exact: true });
  notesTab = () => this.page.getByText("Notes", { exact: true });
  documentsTab = () =>
    this.page.getByRole("main").getByText("Documents", { exact: true });
  reportsTab = () =>
    this.page.getByRole("main").getByText("Reports", { exact: true });
  membersTab = () => this.page.getByText("Members", { exact: true });
  gridAddMembers = () =>
    this.page.getByRole("grid").getByRole("button", { name: "Add Members" });
  settingsTab = () => this.page.getByText("Settings", { exact: true });
  emailRecipients = () => this.page.getByPlaceholder("Email Recipients");
  saveChangesButton = () =>
    this.page.getByRole("button", { name: "Save Changes" });
  addTaskButton = () => this.page.getByRole("button", { name: "Add Task" });
  addMemberButton = () =>
    this.page.getByRole("button", { name: "Add Members" });
}
