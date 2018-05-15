import App from './App';
import Auth from './components/Auth';
import MainPage from './components/MainPage';
import Quiz from './components/Quiz';
import Admin from './components/Admin';
import QuizForm from './components/QuizForm';

const Routes = {
    App: {screen: App},
    Login: {screen: Auth},
    MainPage: {screen: MainPage},
    Quiz: {screen: Quiz},
    Admin: {screen: Admin},
    QuizForm: {screen: QuizForm}
};

export default Routes;
