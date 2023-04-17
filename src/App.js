import './App.css';
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import MainPage from './pages/MainPage';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b372',
                },
            }}
        >
            <div className='App'>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/game" element={<GamePage />}></Route>
                        <Route path="/main" element={<MainPage />}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}

export default App;
