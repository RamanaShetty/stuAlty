import { auth } from "../configuration/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../styling/afterLogin.css";

export const AfterLogin = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async()=>{
    await signOut(auth);
  }

  return (
    <div className="Login-div">
      {user && (
        <>
          <p className="user-name" onClick={signUserOut}>{user?.displayName}</p>
        </>
      )}
    </div>
  );
};
