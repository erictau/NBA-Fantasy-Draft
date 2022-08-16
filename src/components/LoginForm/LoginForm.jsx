import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="container w-25 border p-3">
        <h1>Log In</h1>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <Button type="submit">LOG IN</Button>
        </Form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
