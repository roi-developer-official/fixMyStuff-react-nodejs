import React from "react";

export default function withAccordion(WrapperComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      let length = props.items.length;
      let isOpen = new Array(length).fill(false, 0, length);
      this.state = {
        isOpen: isOpen,
        isClickedIndexes: [],
      };
      this.handleClick = this.handleClick.bind(this);
      this.closeAll = this.closeAll.bind(this);
    }

    addToIsClickedIndexes(index) {
      if (!this.state.isClickedIndexes.includes(index)) {
        let newIsClickedIndexes = this.state.isClickedIndexes.concat([index]);
        this.setState({ ...this.state, isClickedIndexes: newIsClickedIndexes });
      }
    }

    closeAll() {
      let length = this.props.items.length;
      this.setState({
        ...this.state,
        isClickedIndexes: [],
        isOpen: new Array(length).fill(false, 0, length),
      });
    }

    handleClick(index, isDeleteMode) {
      let newIsOpen;
      let state = !this.state.isOpen[index];
      if (!isDeleteMode) {
        if (!this.props.multy) {
          newIsOpen = this.state.isOpen.map(() => false);
        } else {
          newIsOpen = this.state.isOpen.slice();
        }
        newIsOpen[index] = state;
        this.addToIsClickedIndexes(index);
        this.setState({ isOpen: newIsOpen, isClicked: true });
      }
    }

    getOpenIndexes() {
      let isOpenIndex;
      if (!this.props.multy) {
        isOpenIndex = this.state.isOpen.findIndex((el) => el);
      } else {
        isOpenIndex = this.state.isOpen.filter((el) => el);
      }
      return isOpenIndex;
    }

    render() {
      let isOpenIndex = this.getOpenIndexes();
      return (
        <WrapperComponent
          items={this.props.items}
          isOpenIndex={isOpenIndex}
          handleClick={this.handleClick}
          isClickedIndexes={this.state.isClickedIndexes}
          showDeleteInputs={this.props.showDeleteInputs}
          closeAll={this.closeAll}
        />
      );
    }
  };
}
