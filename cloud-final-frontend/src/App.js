import './App.css';
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b372',
                },
            }}
        >
            <BrowserRouter>
                <Switch>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/game" element={<GamePage />}></Route>
                </Switch>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
