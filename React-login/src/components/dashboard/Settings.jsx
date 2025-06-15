import { useAuth } from "../../contexts/AuthContext";

const Settings = ()=>{
    const {currentUser} = useAuth();
    console.log(currentUser);

    return(
        <>
        </>
    )
}

export default Settings;