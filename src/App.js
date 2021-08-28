import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './Components/Nav';
import { connect } from 'react-redux';
import Login from './Components/Login';
import  Home  from './Components/Home';
import NoMatch from "./Components/NoMatch";
import UserCard from './Components/UserCard';
import NewPoll from "./Components/NewPoll";
import Leaderboard from "./Components/Leaderboard"
function App(props) {
  useEffect(() => {
    props.handleInitialLoad()
  }, [])
  return (
    <Router>
      <div className="App">
        {props.authUser === null ? (
          <Route
            render={() => (
              <Login />
            )}
          />
        ) : (
          <>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home } />
              <Route path="/questions/bad_id" component={NoMatch} />
              <Route path="/questions/:question_id" component={UserCard} />
              <Route path="/add" component={NewPoll} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route component={NoMatch} />
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
   return {
    authUser: state.authUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // setAuthUser: setAuthUser
    handleInitialLoad: () => dispatch({ type: "HANDLEINITIALLOAD" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);





