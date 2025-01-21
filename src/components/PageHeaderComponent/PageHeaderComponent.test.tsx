import { render, RenderResult } from "@testing-library/react";
import { PageHeaderComponent } from "./PageHeaderComponent";

describe("App", () => {
  let pageHeader: RenderResult;

  beforeEach(() => {
    pageHeader = render(<PageHeaderComponent title={"Some title"} />);
  });
  it("should render the title correctly", () => {
    const title = pageHeader.container.querySelector("h1");
    expect(title?.textContent).toEqual("Some title");
  });

  it("should dispatch imageload event and add the class", () => {
    const img = pageHeader.container.querySelector("img");
    const ev = new Event("load");
    img?.dispatchEvent(ev);
    expect(img?.classList.contains("fade-in")).toEqual(true);
  });

  it("should dispatch image error event and add the class", () => {
    const img = pageHeader.container.querySelector("img");
    const ev = new Event("error");
    img?.dispatchEvent(ev);
    expect(img?.classList.contains("hidden")).toEqual(true);
  });
});
