import { auth, provider } from "../configuration/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const validDomain = "@cmrcet.ac.in";
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    // const facult_student = email.slice(0, 10);

    if (email.slice(10) === validDomain) {
      navigate("/");
    } else {
      alert("Invalid Sign In! Please use your college email ID");
      signOut(auth);
    }
  };

  return <button onClick={signInWithGoogle}>LOGIN</button>;
};
