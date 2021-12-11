import { Provider } from 'react-redux';
import configureStore from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './Navbar';
import Main from './Main';
import jwtDecode from "jwt-decode";
import { setCurrentUser } from '../store/actions/auth';

const store = configureStore();

// if there is a token in localStorage
if (localStorage.jwtToken) {
    try {
        // jwtDecode will decode the payload in the token, which is the user object we need
        // using the try block, we prevent manual tampering of the token
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
    }
    catch (error) {
        // if there is an error, we clear the user in redux
        store.dispatch(setCurrentUser({}))
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Navbar />
            <Main />
        </Router>
    </Provider>
)

export default App;