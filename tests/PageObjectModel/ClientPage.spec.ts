import { Page, expect } from "@playwright/test";
import initPageManager from "./InitPageManager.spec";

export class ClientPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  addClientButton = () => this.page.getByRole("button", { name: "Add Client" });
  uploadButton = () => this.page.getByRole("button", { name: "Upload Image" });
  name = () => this.page.getByLabel("Name*");
  pointOfContact = () =>
    this.page.getByRole("textbox", { name: "Point of Contact" });
  contactemail = () =>
    this.page.getByRole("textbox", { name: "Contact Email" });
  phoneNo = () => this.page.getByRole("textbox", { name: "1 (702) 123-" });
  address = () => this.page.getByRole("textbox", { name: "Address" });
  addButton = () => this.page.getByRole("button", { name: "Add" });
  contactTab = () => this.page.getByRole("tab", { name: "Contacts" });
  contactAdd = () =>
    this.page.getByLabel("Contacts").getByRole("button", { name: "Add" });
  contactName = () => this.page.getByRole("textbox", { name: "Name" });
  contactEmail = () => this.page.getByRole("textbox", { name: "Email" });
  contactNo = () => this.page.getByPlaceholder("1 (702) 123-");
  contactJobTitle = () => this.page.getByRole("textbox", { name: "Job Title" });
  checkbox = () => this.page.getByRole("checkbox");

  async addClient(
    clientName: string,
    clientPOC: string,
    clientEmail: string,
    clientPhone: string,
    clientAddress: string,
  ) {
    await this.addClientButton().click();

    await this.uploadButton().setInputFiles("./e2e/images/client_image.png", {
      timeout: 10000,
    });

    await this.page.waitForTimeout(5000); // wait for image upload

    await this.name().fill(clientName);
    await this.pointOfContact().fill(clientPOC);
    await this.contactemail().fill(clientEmail);
    await this.phoneNo().fill(clientPhone);
    await this.address().fill(clientAddress);

    await this.addButton().click();
  }

  async inviteClientUser(
    userName: string,
    userEmail: string,
    userPhone: string,
    jobTitle: string,
  ) {
    await this.contactTab().click();
    await this.contactAdd().click();

    await this.contactName().fill(userName);
    await this.contactEmail().fill(userEmail);
    await this.contactNo().fill(userPhone);
    await this.contactJobTitle().fill(jobTitle);

    await this.checkbox().check();
    await this.addButton().click();
  }

  async deleteClientUser(userName: string) {
    const { listMenu } = initPageManager(this.page);
    await listMenu.users().click();
    await this.page.getByPlaceholder("Search Users").fill(userName);
    await this.page.locator(`#${userName}_id`).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }

  async verifyClientAddedSuccessfully() {
    await expect(
      this.page.getByRole("heading", { name: "Client added successfully" }),
    ).toBeVisible({ timeout: 10000 });
  }

  async verifyUserInvitedSuccessfully() {
    await expect(
      this.page.getByRole("heading", { name: "User invited successfully" }),
    ).toBeVisible();
  }
}
