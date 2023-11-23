import { auth,provider } from "../configuration/firebaseConfig" 
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth,provider);
        console.log(result);

        navigate("/");
    }

    return <button onClick={signInWithGoogle}>LOGIN</button>;
}