import { Page, expect } from "@playwright/test";

export class OrganizationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  organization = () => this.page.getByRole("link", { name: "Organization" });
  organizationNameInput = () =>
    this.page.getByRole("textbox", { name: "Organization Name *" });
  displayNameInput = () =>
    this.page.getByRole("textbox", { name: "Display Name *" });
  addressInput = () => this.page.getByRole("textbox", { name: "Address" });
  contactNumberInput = () => this.page.getByPlaceholder("1 (702) 123-");
  descriptionInput = () =>
    this.page.getByRole("textbox", { name: "Description" });
  saveButton = () => this.page.getByRole("button", { name: "Save Changes" });
  projectType = () => this.page.getByRole("tab", { name: "Project Types" });
  nameInput = () => this.page.getByRole("textbox", { name: "Name" });
  projectTypeDescriptionInput = () =>
    this.page.getByRole("textbox", { name: "Description" });
  addButton = () => this.page.getByRole("button", { name: "Add" });

  async navigateToOrganization() {
    await this.page.getByRole("button", { name: "Admin", exact: true }).click();
    await this.organization().click();
  }

  async uploadImage(imagePath: string) {
    await this.page
      .getByRole("button", { name: "Upload Image" })
      .setInputFiles(imagePath);
    await this.page.waitForTimeout(10000);
  }

  async updateOrganizationDetails(
    orgName: string,
    displayName: string,
    address: string,
    phoneNumber: string,
    description: string,
  ) {
    await this.organizationNameInput().fill(orgName);
    await this.displayNameInput().click();
    const outputname = await this.organizationNameInput().getAttribute("value");
    expect(orgName).toBe(outputname);
    await this.displayNameInput().fill(displayName);
    await this.addressInput().click();
    const outputdisplayname =
      await this.displayNameInput().getAttribute("value");
    expect(displayName).toBe(outputdisplayname);
    await this.addressInput().fill(address);
    await this.contactNumberInput().click();
    const outputaddress = await this.addressInput().getAttribute("value");
    expect(address).toBe(outputaddress);
    const inputcontactnumber = phoneNumber;
    await this.contactNumberInput().fill(inputcontactnumber);
    await this.descriptionInput().click();
    const outputcontactnumber =
      await this.contactNumberInput().getAttribute("value");
    expect(inputcontactnumber).toBe(outputcontactnumber);
    const inputdescription = "mech";
    await this.descriptionInput().fill(description);
    await this.organizationNameInput().click();
    const outputdescription =
      await this.descriptionInput().getAttribute("value");
    expect(inputdescription).toBe(outputdescription);

    await this.saveButton().click();
    await expect(this.page.getByText("Updated Successfully")).toBeVisible();
  }

  async addProjectType(
    projectTypeName: string,
    projectTypeDescription: string,
  ) {
    await this.organization().click();
    await this.projectType().click();
    await this.addButton().click();

    await this.nameInput().fill(projectTypeName);
    expect(await this.nameInput().getAttribute("value")).toBe(projectTypeName);

    await this.projectTypeDescriptionInput().fill(projectTypeDescription);
    await this.addButton().click();
    await expect(
      this.page.getByText(`Project type ${projectTypeName} successfully added`),
    ).toBeVisible();
  }

  async deleteProjectType(projectTypeName: string) {
    await this.page
      .getByPlaceholder("Search Project Types")
      .fill(projectTypeName);
    await this.page.waitForTimeout(3000);
    await this.page.getByTestId("DeleteOutlineIcon").click();
    await this.page.getByRole("button", { name: "Yes" }).click();
    await expect(this.page.getByText("Deleted Successfully")).toBeVisible();
  }
}
