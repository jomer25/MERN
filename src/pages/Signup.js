import { useState } from "react";
import useSignupAuth from "../custom hooks/useSignupAuth";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, loading } = useSignupAuth()

  const handleClickSignup = async (e) => {
    e.preventDefault()

    await signup(email, password);
  }

  return ( 
    <div>
      <form onSubmit={handleClickSignup}>
        <h1>Signup Form</h1>
        <div>
          <label>E mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Signing up': 'Sign up'}</button>
      </form>
    </div>
   );
}
 
export default Signup;