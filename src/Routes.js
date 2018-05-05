import App from './App';
import Auth from './components/Auth';
import MainPage from './components/MainPage';
import Quiz from './components/Quiz';
const Routes = {
    App: {screen: App},
    Login: {screen: Auth},
    MainPage: {screen: MainPage},
    Quiz: {screen: Quiz}
};

export default Routes;
