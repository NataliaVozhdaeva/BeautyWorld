import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import OrderPage from './pages/orders';
import MastersPage from './pages/Masters';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import {AuthProvider} from './contexts/authContext';
import PrivateRoute from './components/privateRoute';


function App() {
	
  return (

	<Router>
	<AuthProvider>  
		<div className="container">
			<header>
				<h2>Beauty Salon</h2>
				<NavBar />
			</header>

			<main>
			<Switch>
				<PrivateRoute exact path="/">
					<HomePage />
				</PrivateRoute>

				<PrivateRoute path="/masters">
					<MastersPage />
				</PrivateRoute>

				<PrivateRoute path="/orders">
					<OrderPage />
				</PrivateRoute>
				
				<Route path="/login">
					<LoginPage />
				</Route>

				<Route path="*">
					<NotFoundPage />
				</Route>
			</Switch>
			</main>	
		</div>
	</AuthProvider>  
	</Router>
	
  );
}

export default App;



/*const mokData = [
		{id: 1,
		name: 'Краснова Ирина',
		position: 'Мастер ногтевого сервиса',
		photo: 'krasnova.png'
		},
		
		{id: 2,
		name: 'Калилова Жанна',
		position: 'Визажист',
		photo: 'kalilova.png'
		},
		
		{id: 3,
		name: 'Киселева Алина',
		position: 'Парикмахер',
		photo: 'kiseleva.png'
		},
		
		{id: 4,
		name: 'Иванова Елена',
		position: 'Мастер ногтевого сервиса',
		photo: 'ivanova.png'
		},
	];*/