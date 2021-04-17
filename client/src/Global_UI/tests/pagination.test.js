import { mount } from "enzyme";
import { useState } from "react";
import { Pagination, calculateNumOfPages, limitTheArray } from "../pagination";

const mockChangePage = jest.fn();
let initialProps = {
  currentPage: 1,
  activeStyle: {
    backgroundColor: "#11c58f",
    color: "white",
    border: "none",
  },
  maxPerPage: 8,
  count: 9,
  maxPagesToDisplay: 6,
  changePage: mockChangePage,
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setup = (props = initialProps) => {
  return mount(<Pagination {...props} />);
};

let pages = [];

describe("calculateNumOfPages", () => {
  test("should return 2 pages", () => {
    const numOfPages = calculateNumOfPages(9, 8, 6);
    expect(numOfPages).toBe(2);
  });

  test("should retrun 0 pages", () => {
    const numOfPages = calculateNumOfPages(8, 8, 6);
    expect(numOfPages).toBe(0);
  });

  test("should return 6 pages", () => {
    const numOfPages = calculateNumOfPages(80, 8, 6);
    expect(numOfPages).toBe(6);
  });
});

describe("limit the array", () => {
  test("should return", () => {
    let arr = [1, 2, 3, 4, 5];
    limitTheArray(arr, 5);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test("should return limited array", () => {
    let arr = [3, 4, 5, 6, 7];
    limitTheArray(arr, 5);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test("should retrun limited array", () => {
    let arr = [6, 7, 8, 9, 10, 11];
    limitTheArray(arr, 80 / 8);
    expect(arr).toEqual([1, 6, 7, 8, 9, 10]);
  });
});

describe("pagination", () => {
  beforeEach(() => {
    useState.mockReturnValue([pages, (newPages) => (pages = newPages)]);
  });

  afterEach(() => {
    pages = [];
  });

  test("should declare 2 page", () => {
    setup();
    expect(pages).toEqual([1, 2]);
  });

  test("should declare 0 pages", () => {
    let wrapper = setup();
    wrapper.setProps({ ...initialProps, count: 8 });
    expect(pages).toEqual([]);
  });

  test("should declare max 6 pages", () => {
    let wrapper = setup();
    wrapper.setProps({ ...initialProps, count: 80 });
    expect(pages).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("should render page 1 on all pages", () => {
    const wrapper = setup();
    wrapper.setProps({ ...initialProps, count: 80, currentPage: 6 });

    expect(pages).toEqual([1, 6, 7, 8, 9, 10]);
  });

  test("should update pages on count change", () => {
    const wrapper = setup();
    expect(pages).toEqual([1, 2]);
    wrapper.setProps({ ...initialProps, count: 8 });
    expect(pages).toEqual([]);
    wrapper.setProps({ ...initialProps, count: 80, currentPage: 8 });
    expect(pages).toEqual([1, 6, 7, 8, 9, 10]);
  });

  test("should render 3 pages", () => {
    useState.mockReturnValueOnce([[1, 2, 3], () => {}]);
    const wrapper = setup();
    expect(wrapper.find({ className: "pagination_page" })).toHaveLength(3);
  });

  test("should call change page", async () => {
    useState.mockReturnValueOnce([[1, 2, 3], () => {}]);
    const wrapper = setup();
    let secondPage = wrapper.find({ className: "pagination_page" }).at(1);
    secondPage.simulate("click");
    expect(mockChangePage).toBeCalledWith(2);
  });

  test("should style the currentpage", () => {
    useState.mockReturnValueOnce([[1, 2, 3], () => {}]);
    const wrapper = setup();
    const pages = wrapper.find({ className: "pagination_page" });
    expect(pages.at(0).props().style).toBeDefined();
    expect(pages.at(1).props().style).toEqual({});
  });

  test("shold return null when no pages", ()=>{
    useState.mockReturnValueOnce([[], () => {}]);
    const wrapper = setup();
    const pagination = wrapper.find({ className: "pagination_wrapper" });
    expect(pagination).toHaveLength(0);
    expect(wrapper).toEqual({});
  });


});
