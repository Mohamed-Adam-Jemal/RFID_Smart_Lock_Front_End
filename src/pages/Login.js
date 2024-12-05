import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Label, Input, Button } from '@windmill/react-ui';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToAccessLog, setRedirectToAccessLog] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://192.168.1.21:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login successful');
        setRedirectToAccessLog(true); // Trigger redirection
      } else {
        setErrorMessage(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
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
                  />
                </Label>

                {errorMessage && (
                  <div className="text-red-500 mt-2">{errorMessage}</div>
                )}

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
