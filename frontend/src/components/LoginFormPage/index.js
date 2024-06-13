import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/session";
import { Redirect } from "react-router-dom"

const LoginFormPage = () => {
  const currentUser = useSelector(state => state.session.user)
  console.log(currentUser)
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      credential, password
    }
    dispatch(login(user))
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="credential">Email or password</label>
      <input type="text" id="credential" value={credential} onChange={(e) => {
        setCredential(e.target.value)
      }}>
      </input>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}></input>
      <button>Submit</button>
    </form>
    </>
  )
}

export default LoginFormPage;