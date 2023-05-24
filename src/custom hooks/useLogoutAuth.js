import useAuthContext from "./useAuthContext"
import useWorkoutContext from "./useWorkoutContext"

const useLogoutAuth = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    workoutDispatch({ type: 'SET_WORKOUT', payload: null })
  }
  return { logout };
}
 
export default useLogoutAuth;