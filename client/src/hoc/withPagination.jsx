import React from "react";
export default function withPagination(WrapperComponent) {
  return class extends React.Component {
    state = {};
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
          <WrapperComponent {...this.props} />
      );
    }
  };
}

