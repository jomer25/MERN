import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLoginAuth = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      }

      setError(json.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
 
export default useLoginAuth;
