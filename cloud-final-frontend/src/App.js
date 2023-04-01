import './App.css';
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" element={<HomePage />}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
