import { Page } from "@playwright/test";
import { SpaceContextMenu } from "./SpaceContextMenu.ts";

export class SpaceCreateNewContextMenu extends SpaceContextMenu {

  constructor(page: Page) {
    super(page)
    this.container = this.page.getByTestId("project-menu__create-new");
    this.elementType = "button"
  }
}