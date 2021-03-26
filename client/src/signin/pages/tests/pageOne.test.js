import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pageone from "../PageOne";
import { inputs } from '../elements';
import enzyme, { shallow } from 'enzyme';
import React from 'react';

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


  test.skip("number of select input 1", () => {
    render(<Pageone />);
    const citySelect = screen.getByRole("combobox", {
      name: /city/i,
    });
    expect(citySelect).toBeInTheDocument();
  });

  test.skip("number of buttons", () => {
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

  describe('inputs', ()=>{

    const setup = (props ={})=>{
      return shallow(<Pageone  {...props} />);
    }
    const mockDispatch = jest.fn();
    let originalUseReducer;
    let wrapper;

    beforeEach(()=>{
      originalUseReducer = React.useReducer;
      React.useReducer = jest.fn(()=>[{}, mockDispatch]);
      wrapper = setup();
    });

    afterEach(()=>{
      React.useReducer = originalUseReducer;
    })

    test('updateInput called when input is change',  ()=>{
        const input = wrapper.find({label : 'First name'});
        input.simulate('change', 'hallo');
        expect(mockDispatch).toBeCalled();
    });


  })

});
