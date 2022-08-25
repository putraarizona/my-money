// import "./App.css";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { authIsReady, user } = useAuthContext();
	return (
		<div className="App">
			{authIsReady && (
				<Router>
					<Navbar />
					<Switch>
						<Route exact path="/">
							{user ? <Home /> : <Redirect to="/login" />}
						</Route>
						<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
						<Route path="/signup">{user ? <Redirect to="/" /> : <Signup />}</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			)}
		</div>
	);
}

export default App;
