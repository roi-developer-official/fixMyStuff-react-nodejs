import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryHistory} from 'history';
import Pageone from "../pages/pageOne";
import { mount } from "enzyme";
import React from "react";
import { Router } from "react-router";

describe("page one", () => {
  test("number of text inputs is 2", () => {
    render(<Pageone />);
    const firstName = screen.getByRole("textbox", {
      name: /first name/i,
    });
    const lastName = screen.getByRole("textbox", {
      name: /last name/i,
    });
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });

  test("number of select input 1", () => {
    render(<Pageone />);
    const citySelect = screen.getByRole("combobox", {
      name: /city/i,
    });
    expect(citySelect).toBeInTheDocument();
  });

  test("number of buttons", () => {
    render(<Pageone />);

    const cancelButton = screen.getByRole("button", {
      name: /cancel/i,
    });
    const nextButton = screen.getByRole("button", {
      name: /next/i,
    });
    expect(cancelButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test("should not be visible when show is false", () => {
    const { container } = render(<Pageone show={false} />);
    const showClass = container.children[0].className.split(" ")[1];
    expect(showClass).not.toBe("show");
  });

  test("should  be visible when show is true", () => {
    const { container } = render(<Pageone show={true} />);
    const showClass = container.children[0].className.split(" ")[1];
    expect(showClass).toBe("show");
  });

  describe("inputs and selects", () => {
    const setup = (props = {}) => {
      return mount(<Pageone {...props} />);
    };

    const mockDispatch = jest.fn();
    let originalUseReducer;
    let wrapper;
    let inputEvent;
    let input;
    let select;

    beforeEach(() => {
      inputEvent = {
        target: {
          value: "h",
          name: "firstName",
        },
      };
      originalUseReducer = React.useReducer;
      React.useReducer = jest.fn(() => [{}, mockDispatch]);
      wrapper = setup();
      input = wrapper.find({ "data-test": "firstName" });
      select = wrapper.find({ "data-test": "city" });
    });

    afterEach(() => {
      inputEvent = {
        target: {
          value: "h",
          name: "firstName",
        },
      };
      React.useReducer = originalUseReducer;
    });

    test("updateInput called when input is change with no error", () => {

      expect(input.length).toBe(1);
      input.simulate("change", inputEvent);
      expect(mockDispatch).toBeCalledWith({"name": "firstName", "type": "SET_INPUT", "value": "h", "error" : ""});

      inputEvent.target.name = "city";
      select.simulate('change', inputEvent);
      expect(mockDispatch).toBeCalledWith({"name": "city", "type": "SET_INPUT", "value": "h", "error" : "" });
    });


    test('updateInput called with error on blur', ()=>{
      
      input.simulate("blur");
      expect(mockDispatch).toBeCalledWith({"value" :"", "error": "this field is required", "name": "firstName", "type": "SET_INPUT"})
      
      inputEvent.target.value = "" 
      inputEvent.target.name = "city"
      select.simulate("change", inputEvent);
      select.simulate('blur');
      expect(mockDispatch).toBeCalledWith({ "value": "", "error": "this field is required", "name": "city","type": "SET_INPUT"});
    });

  });

  describe('change page', ()=>{
    const mockChangePage = jest.fn();

    test('wont change the page when the input are not valid', ()=>{
      const wrapper = mount(<Pageone changePage={mockChangePage} />);

      const nextButton = wrapper.find({ name: 'Next'});
      expect(nextButton.length).toBe(1);
      nextButton.simulate('click');
      expect(mockChangePage).not.toBeCalled();

    });

    test('should redirect to / when cancel clicked', ()=>{
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Pageone /> 
        </Router>
      );
      const backButton = screen.getByRole('button' ,{
        name: 'Cancel'
      });
      userEvent.click(backButton);

      expect(history.location.pathname).toBe('/');
    });



  });

});


