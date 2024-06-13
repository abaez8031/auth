import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/session";
import { Redirect } from "react-router-dom"
import "./LoginForm.css"

const LoginFormPage = () => {
  const currentUser = useSelector(state => state.session.user)
  console.log(currentUser)
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  if (currentUser) return <Redirect to="/" />;

  return (
    <>
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
      <ul>
        {errors.map(error => (<li key={error}>
          {error}
        </li>))}
      </ul>)}
      <div>
        <label htmlFor="credential">Email or Username</label>
        <input type="text" id="credential" value={credential} onChange={(e) => {
          setCredential(e.target.value)
        }}>
        </input>
      </div>

      <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}></input>
      </div>

      <button>Submit</button>
    </form>
    </>
  )
}

export default LoginFormPage;