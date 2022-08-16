import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signUp } from '../../utilities/users-service'


export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  })
  const disable = formData.password !== formData.confirm || !formData.password ;

  function handleChange(evt) {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    })
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      delete formData.error
      delete formData.confirm
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData)
      setUser(user)
    } catch(err) {
      // An error occurred
      console.log(err)
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again'})
    }
  }


  return (
    <div>
      <div className="container w-25 border p-3">
        <h1>Sign Up</h1>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Form.Label>Confirm</Form.Label>
          <Form.Control type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <Button type="submit" disabled={disable}>SIGN UP</Button>
        </Form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}