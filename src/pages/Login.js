import { useState } from "react";
import useLoginAuth from "../custom hooks/useLoginAuth";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, loading } = useLoginAuth()

  const handleClickLogin = async (e) => {
    e.preventDefault()
    
    await login(email, password);
  }

  return ( 
    <div>
      <form onSubmit={handleClickLogin}>
        <h1>Login Form</h1>
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
        <button type="submit" disabled={loading}>{loading ? 'Loggin in': 'Log in'}</button>
      </form>
    </div>
   );
}
 
export default Login;