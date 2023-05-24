import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('AuthContext must be used AuthContextProvider')
  }

  return context;
}
 
export default useAuthContext;