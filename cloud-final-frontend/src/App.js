import './App.css';
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App-header">
                    <Switch>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/game" element={<GamePage />}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
