
import { Redirect, Route, Switch } from "react-router-dom";
import './App.css';

import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }} >
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>
        <Route path='/auth' >
          <AuthPage />
        </Route>
        <Route path='/userProfile'>
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
