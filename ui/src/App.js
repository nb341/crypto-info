import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore} from './redux/configureStore';
const store = configureStore();
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <Main/>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
