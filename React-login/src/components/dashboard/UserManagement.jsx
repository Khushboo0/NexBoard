import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import Alert from "../common/Alert";
const UserManagement = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { data, loading, error, refetch } = useFecth("/api/users");

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) |
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (user)=>{
    setSelectedUser(user);
    setIsModalOpen(true)

  }
  const closeModal = ()=>{
    setSelectedUser(null);
    setIsModalOpen(false)
  }

  const handleDeleteUser = async(userId)=>{
    try{
        setIsDeleting(true);
        await new Promise(resolve=>setTimeout(resolve,1000));
        setUsers(user.filter(user=>user.id !==userId));

        showAlert('User deleted successfully', 'success')
    }
    catch(error){
        showAlert('Failed to delete user', 'error')
    }
    finally{
        setIsDeleting(false);
    }
  }

  const showAlert = (message,type)=>{
    setAlertMessage(message);
    setAlertType(type);

    setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
        
    }, 3000);
  }
  if (loading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load users</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error.message || "An unknown error occurred"}
        </p>
        <Button onClick={refetch} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          User Management
        </h1>
        <Button variant="primary">Add New User</Button>
      </div>
      {alertMessage && (
        <div className="mt-4">
          <Alert
            type={alertType}
            message={alertMessage}
            onClose={() => {
              setAlertMessage("");
              setAlertType("");
            }}
          />
        </div>
      )}
      <div className="mt-6">
        <TextInput
          id="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table
          className={`min-w-full divide-y divide-gray-300 dark:divide-gray-700 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700`}>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-sm italic text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {user.role}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className={`inline-block align-bottom ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium">Edit User</h3>
                <div className="mt-4 space-y-4">
                  <TextInput
                    id="edit-name"
                    label="Name"
                    value={selectedUser.name}
                    // In a real app, you'd handle onChange
                  />
                  <TextInput
                    id="edit-email"
                    label="Email"
                    type="email"
                    value={selectedUser.email}
                    // In a real app, you'd handle onChange
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className={`block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700`}
                      defaultValue={selectedUser.role}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className={`block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700`}
                      defaultValue={selectedUser.status}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button variant="primary" className="sm:ml-3">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
