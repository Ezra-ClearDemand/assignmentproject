import { Page } from "@playwright/test";
import { ProfilePage } from "./ProfilePage.spec";
import { NotificationPage } from "./NotificationIcon.spec";
import { ProjectCreation } from "./ProjectCreation.spec";
import { ProjectDetails } from "./ProjectDetails.spec";
import { TaskCreation } from "./TaskCreation.spec";
import { TaskDetails } from "./TaskDetails.spec";
import { ListMenu } from "./LeftMenu.spec";
import { UserManagementPage } from "./UserManagementPage.spec";
import { OrganizationPage } from "./OrganizationPage.spec";
import { LogTime } from "./LogTime.spec";
import { ExpenseSubmit } from "./ExpenseSubmit.spec";
import { Timesheet } from "./Timesheet.spec";
import { ClientPage } from "./ClientPage.spec";

export class PageManager {
  private page: Page;
  private profilePage: ProfilePage | undefined;
  private notificationPage: NotificationPage | undefined;
  private projectcreation: ProjectCreation | undefined;
  private projectDetails: ProjectDetails | undefined;
  private taskCreation: TaskCreation | undefined;
  private taskDetails: TaskDetails | undefined;
  private listMenu: ListMenu | undefined;
  private organizationPage: OrganizationPage | undefined;
  private userManagementPage: UserManagementPage | undefined;
  private logtime: LogTime | undefined;
  private expenseSubmit: ExpenseSubmit | undefined;
  private timesheet: Timesheet | undefined;
  private client: ClientPage | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  // Initialize ProfilePage
  getProfilePage(): ProfilePage {
    if (!this.profilePage) {
      this.profilePage = new ProfilePage(this.page);
    }
    return this.profilePage;
  }

  // Get instance of NotificationPage
  getNotificationPage(): NotificationPage {
    if (!this.notificationPage) {
      this.notificationPage = new NotificationPage(this.page);
    }
    return this.notificationPage;
  }

  // Get instance of ProjectCreation
  getProjectCreation(): ProjectCreation {
    if (!this.projectcreation) {
      this.projectcreation = new ProjectCreation(this.page);
    }
    return this.projectcreation;
  }

  // Get instance of ProjectCreation
  getProjectDetails(): ProjectDetails {
    if (!this.projectDetails) {
      this.projectDetails = new ProjectDetails(this.page);
    }
    return this.projectDetails;
  }

  // Get instance of TaskCreation
  getTaskCreation(): TaskCreation {
    if (!this.taskCreation) {
      this.taskCreation = new TaskCreation(this.page);
    }
    return this.taskCreation;
  }

  // Get instance of Taskdetails
  getTaskDetails(): TaskDetails {
    if (!this.taskDetails) {
      this.taskDetails = new TaskDetails(this.page);
    }
    return this.taskDetails;
  }

  // Get instance of Listmenu
  getListMenu(): ListMenu {
    if (!this.listMenu) {
      this.listMenu = new ListMenu(this.page);
    }
    return this.listMenu;
  }

  getOrganizationPage(): OrganizationPage {
    if (!this.organizationPage) {
      this.organizationPage = new OrganizationPage(this.page);
    }
    return this.organizationPage;
  }

  getUserManagementPage(): UserManagementPage {
    if (!this.userManagementPage) {
      this.userManagementPage = new UserManagementPage(this.page);
    }
    return this.userManagementPage;
  }

  getLogTime(): LogTime {
    if (!this.logtime) {
      this.logtime = new LogTime(this.page);
    }
    return this.logtime;
  }

  getExpenseSubmit(): ExpenseSubmit {
    if (!this.expenseSubmit) {
      this.expenseSubmit = new ExpenseSubmit(this.page);
    }
    return this.expenseSubmit;
  }
  getTimesheet(): Timesheet {
    if (!this.timesheet) {
      this.timesheet = new Timesheet(this.page);
    }
    return this.timesheet;
  }

  getClientPage(): ClientPage {
    if (!this.client) {
      this.client = new ClientPage(this.page);
    }
    return this.client;
  }
}
