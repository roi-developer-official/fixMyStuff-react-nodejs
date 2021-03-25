import { useHistory } from "react-router";
import { Button } from "../../Global_UI";
export default function LoginButton({ isAuth }) {
  const history = useHistory();
  if (!isAuth) {
    return (
      <Button
        className="mobile_login_btn"
        onClick={() => history.push("/Log-in")}
        label="Login"
      ></Button>
    );
  } else {
    return null;
  }
}
