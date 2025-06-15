import { useAuth } from "../../contexts/AuthContext";

const Settings = ()=>{
    const {currentUser} = useAuth();
    console.log(currentUser);

    return(
        <>
         <div>Settings page coming soon</div>;
        </>
    )
}

export default Settings;