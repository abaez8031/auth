import { Switch, Route, Link} from "react-router-dom"
import LoginFormPage from "./components/LoginFormPage";
import RegisterFormPage from "./components/RegisterFormPage"

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginFormPage/>
      </Route>
      <Route exact path="/register">
        <RegisterFormPage/>
      </Route>
    </Switch>
  );
}

export default App;
