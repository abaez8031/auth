import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/session";
import { Redirect } from "react-router-dom"

const RegisterFormPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      username, email, password
    }
    return dispatch(register(user))
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
  if (currentUser) return <Redirect to="/"></Redirect>
  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (<li key={error}>
            {error}
          </li>))}
        </ul>
      )}
      <input type="email"
      value={email} placeholder="Email"
      onChange={(e) => {
        setEmail(e.target.value)
      }}>
      </input>
      <input type="text"
      value={username} placeholder="Username"
      onChange={(e) => {
        setUsername(e.target.value)
      }}>
      </input>
      <input type="password"
      value={password} placeholder="Password"
      onChange={(e) => {
        setPassword(e.target.value)
      }}>
      </input>
      <button>Submit</button>
    </form>
  )
}

export default RegisterFormPage;