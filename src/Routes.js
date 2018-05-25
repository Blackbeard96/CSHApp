import App from './App';
import Auth from './components/Auth';
import MainPage from './components/MainPage';
import Quiz from './components/QuizPage';
import Admin from './components/Admin';
import QuizForm from './components/QuizForm';
import QuizControl from './components/QuizControlPage';

const Routes = {
    App: {screen: App},
    Login: {screen: Auth},
    MainPage: {screen: MainPage},
    Quiz: {screen: Quiz},
    Admin: {screen: Admin},
    QuizForm: {screen: QuizForm},
    QuizControl: {screen: QuizControl}
};

export default Routes;
