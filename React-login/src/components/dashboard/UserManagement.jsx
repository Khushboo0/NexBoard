import { useState,useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useFetch from '../../hooks/useFetch';
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import Alert from "../common/Alert";
const UserManagement = () =>{
    const {darkMode} = useTheme();
    const [users,setUsers] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const [selectedUser,setSelectedUser] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isDeleting,setIsDeleting] = useState(false);
    const [alertMessage,setAlertMessage] = useState('');
    const [alertType,setAlertType] = useState('');

    const {data, loading, error, refetch} = useFecth('/api/users');

    useEffect(()=>{
        if(data){
            setUsers(data)
        }
    },[data]);

    if(loading) return <LoadingSpinner size="lg"/>

    if(error){
        return(
            <div className="text-center py-10">
                      <p className="text-red-500">Failed to load users</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {error.message || 'An unknown error occurred'}
                      </p>
                      <Button onClick={refetch} className="mt-4">
                        Try Again
                      </Button>
                    </div>
        )
    }
    return(
        <div>
            
        </div>
    )

}

export default UserManagement;