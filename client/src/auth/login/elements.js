export const inputs = [
  {
    label: "Email",
    name: "email",
    type: "text",
    validations: {
      required: true,
      email: true,
    },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    validations: {
      required: true,
      minLength: 8,
    },
  },
];

export const buttons = [
  {
    label: "Cancel",
    style: {
      backgroundColor: "#ccc",
    },
  },
  {
    label: "Login",
    style: {
      backgroundColor: "#08c982",
    },
  },
];
