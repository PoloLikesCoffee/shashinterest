import React, { useState, useEffect } from 'react';
import Nav from './components/shashinterest/Nav';
import Homeboard from './components/shashinterest/Homeboard';
import PinDetail from './components/shashinterest/PinDetail';
import MyPage from './components/shashinterest/MyPage';
import PinUserDetail from './components/shashinterest/PinUserDetail';
import Explore from './components/shashinterest/Explore';
import History from './components/shashinterest/History';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './components/authentication/Signup';
import Profile from './components/authentication/Profile';
import Login from './components/authentication/Login';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';

const App = () => {
	const [pins, setPins] = useState([]);

	const getPhotos = async (query, limitSearch) => {
		try {
			const response = await fetch(
				`https://api.unsplash.com/search/photos/?page=1&per_page=${limitSearch}&query=${query}&client_id=Cd9K_OQqe-7BneBLLeE3Ri0z2bu7kPXwvOICdZPDGwg`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			alert(error);
		}
	};

	const searchSubmit = (term) => {
		getPhotos(term, 10).then((res) => {
			let results = res.results;
			let newPins = [...results, ...pins];
			setPins(newPins);
		});
	};

	const getDefaultPins = () => {
		let promises = [];
		let pinData = [];
		let defaultPins = [
			'Japan',
			'Osaka',
			'nintendo',
			'retrogaming',
			'Japanese food',
			'Australia',
			'Brisbane',
		];
		defaultPins.forEach((pinTerm) => {
			promises.push(
				getPhotos(pinTerm, 7).then((res) => {
					let results = res.results;
					pinData = pinData.concat(results);
					pinData.sort((a, b) => {
						return 0.5 - Math.random();
					});
				})
			);
		});
		Promise.all(promises).then(() => {
			setPins(pinData);
		});
	};

	useEffect(() => {
		getDefaultPins();
	}, []);

	return (
		<Router basename="/">
			<AuthProvider>
				<Nav searchSubmit={searchSubmit} />
				<Switch>
					{/* Shashinterest */}
					<Route exact path="/">
						<Homeboard pins={pins} />
					</Route>
					<PrivateRoute exact path="/mypage" component={MyPage} />
					<Route exact path="/explore" component={Explore} />
					<PrivateRoute
						exact
						path="/history"
						component={() => <History getPhotos={getPhotos} />}
					/>

					{/* Profile */}
					<PrivateRoute path="/user" component={Profile} />
					<PrivateRoute path="/update-profile" component={UpdateProfile} />

					{/* Authentication */}
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
					<Route path="/forgot-password" component={ForgotPassword} />

					{/* Pin User page */}
					<Route exact path="/mypage/:id" component={PinUserDetail} />

					{/* Pin page */}
					<Route exact path="/:id" component={PinDetail} />
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default App;
