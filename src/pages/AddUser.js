import React, { useState, useEffect } from 'react';
import { Input, Label } from '@windmill/react-ui';
import PageTitle from '../components/Typography/PageTitle';

const Forms = () => {
  const [userData, setUserData] = useState({
    username: '',
    rfid_tag: ''
  });

  const [users, setUsers] = useState([]); // State to hold fetched users
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading while making the API call
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch("http://localhost:8000/api/add-user/", { // API endpoint for adding user
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(userData), // Send the form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User added successfully:", data);

        // Show success message
        setSuccessMessage("User added successfully!");
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(""); // Hide message
        }, 3000);

        // Optionally refresh the user list after adding a new user
        const updatedUsers = [...users, data]; // Add the newly added user to the users list
        setUsers(updatedUsers);
      } else {
        const errorData = await response.json();
        console.error("Failed to add user:", errorData);
        setErrorMessage("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the API call
    }
  };

  return (
    <>
      <PageTitle>Add User</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <Label>
            <span>Username</span>
            <Input 
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="mt-1"
            />
          </Label>

          <Label className="mt-4">
            <span>RFID Tag</span>
            <Input 
              name="rfid_tag"
              value={userData.rfid_tag}
              onChange={handleChange}
              className="mt-1"
            />
          </Label>

          <button 
            type="submit" 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Adding User...' : 'Add User'}
          </button>
        </form>

        {/* Show success or error message */}
        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default Forms;
