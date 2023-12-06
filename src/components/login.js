import { auth, provider } from "../configuration/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configuration/firebaseConfig";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const validDomain = "@cmrcet.ac.in";

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (email.slice(email.indexOf("@")) === validDomain) {
        const userId = email.slice(0, email.indexOf("@"));

        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (
          !isNaN(userId[0]) &&
          !isNaN(userId[9]) &&
          userId[2] === "h" &&
          userId[5] === "a"
        ) {
          if (!userDocSnapshot.exists()) {
            const userData = {
              emailID: email,
              role: "Student",
            };
            await setDoc(userDocRef, userData);
          }
        } else {
          if (!userDocSnapshot.exists()) {
            const userData = {
              emailID: email,
              role: "Faculty",
            };
            await setDoc(userDocRef, userData);
          }
        }
        navigate("/");
      } else {
        alert("Invalid Sign In! Please use your college email ID");
        signOut(auth);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={signInWithGoogle}>LOGIN</button>;
};
