import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Label, Input, Button } from '@windmill/react-ui';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToAccessLog, setRedirectToAccessLog] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Prepare the data to be sent in x-www-form-urlencoded format
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Send POST request to verify login credentials
      const response = await fetch('http://192.168.1.21:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct content type
        },
        body: formData.toString(), // Send the data as a URL-encoded string
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, call the login function from AuthContext
        login();
        setRedirectToAccessLog(true); // Redirect to the protected page
      } else {
        // If login failed, show the error message from the backend
        setErrorMessage(data.error || 'Invalid username or password');
        
        // Clear the error message after 2 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage('An error occurred while trying to log in');
      console.error('Login error:', error);
    }
  };

  const handleInputChange = () => {
    // Clear error message when the user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  if (redirectToAccessLog) {
    return <Redirect to="/app/access-log" />;
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>

              <form onSubmit={handleSubmit}>
                <Label>
                  <span>Username</span>
                  <Input
                    className="mt-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onFocus={handleInputChange} // Clear error on focus
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onFocus={handleInputChange} // Clear error on focus
                  />
                </Label>

                <div
                  className={`text-red-500 mt-2 error-message ${errorMessage ? 'show' : ''}`}
                >
                  {errorMessage}
                </div>

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
