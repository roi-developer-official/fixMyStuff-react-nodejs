import { useHistory } from "react-router";
import { Button } from "../../Global_UI";

export default function LoginButton({ isAuth, className }) {
  const history = useHistory();
  
  if (!isAuth) {
    return (
      <li style={{listStyle:"none"}}>
        <Button
          className={`${className}_login_button`}
          onClick={() => history.push("/Log-in")}
          label="Login"
        ></Button>
      </li>
    );
  } else {
    return null;
  }
}
