import { Switch, Route, Link} from "react-router-dom"
import LoginFormPage from "./components/LoginFormPage";
import RegisterFormPage from "./components/RegisterFormPage"
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation/>
      <Switch>
        <Route exact path="/login">
          <LoginFormPage/>
        </Route>
        <Route exact path="/register">
          <RegisterFormPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
