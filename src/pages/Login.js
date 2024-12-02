import React from 'react'
import { Link } from 'react-router-dom'
import { Label, Input, Button } from '@windmill/react-ui'

function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Username</span>
                <Input className="mt-1" type="text"/>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password"/>
              </Label>

              <Button className="mt-4" block tag={Link} to="/app/access-log">
                Log in
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
