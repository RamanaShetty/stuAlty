import { auth } from "../configuration/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styling/afterLogin.css";

export const AfterLogin = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async()=>{
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="Login-div">
      {user && (
        <>
          <p className="user-name" onClick={signUserOut}>{user?.displayName.slice(0,10)}</p>
        </>
      )}
    </div>
  );
};
