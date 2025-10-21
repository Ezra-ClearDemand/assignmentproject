import { PageManager } from "./PageObjectManager.spec";

// Helper function to initialize PageManager and ProjectDetails
function initPageManager(page: any): {
  pageManager: PageManager;
  projectDetails: any;
  profilePage: any;
  notificationPage: any;
  projectCreation: any;
  taskcreation: any;
  taskDetails: any;
  listMenu: any;
  organizationPage: any;
  userManagementPage: any;
  logtime: any;
  expenseSubmit: any;
  timesheets: any;
  clientPage: any;
} {
  const pageManager = new PageManager(page);
  const projectDetails = pageManager.getProjectDetails();
  const profilePage = pageManager.getProfilePage();
  const notificationPage = pageManager.getNotificationPage();
  const projectCreation = pageManager.getProjectCreation();
  const taskcreation = pageManager.getTaskCreation();
  const taskDetails = pageManager.getTaskDetails();
  const listMenu = pageManager.getListMenu();
  const organizationPage = pageManager.getOrganizationPage();
  const userManagementPage = pageManager.getUserManagementPage();
  const logtime = pageManager.getLogTime();
  const expenseSubmit = pageManager.getExpenseSubmit();
  const timesheets = pageManager.getTimesheet();
  const clientPage = pageManager.getClientPage();
  return {
    pageManager,
    projectDetails,
    profilePage,
    notificationPage,
    projectCreation,
    taskcreation,
    taskDetails,
    listMenu,
    userManagementPage,
    organizationPage,
    logtime,
    expenseSubmit,
    timesheets,
    clientPage,
  };
}

export default initPageManager;
