export const inputs = {
  page1: [
    {
      label: "Title",
      type: "text",
      name: "title",
      validations: {
        required: true,
      },
    },
    {
      label: "Pick a price you are willing to pay",
      type: "number",
      name: "maxPayment",
      value: 0,
      min: 0,
      style: {
        width: "32%",
        height: "30px",
        paddingLeft: "5px",
        marginLeft: "5px",
        marginRight: "auto",
      },
      validations: {
        numeric: true,
        min: 0,
      },
    },
  ],
  page2: [
    {
      name: "image",
      value: null,
    },
  ],
};

export const textAreas = 
    {
      label: "Description",
      name: "description",
      cols: 30,
      rows: 5,
      validations: {
        required: true,
      },
};

export const buttons = {
  page1: [
    {
      label: "Cancel",
      style: {
        backgroundColor: "#ccc",
      },
    },
    {
      label: "Next",
      style: {
        backgroundColor: "#08c982",
      },
    },
  ],
  page2: [
    {
        label: 'Back',            
        style:{
            backgroundColor:'#ccc'
        }
    },
    {
        label: 'Done',
        style:{
            backgroundColor: '#08c982'
        }
    }
  ]
};
