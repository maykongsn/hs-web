import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login';

import './global.css';

import { AuthProvider } from "./context/auth";
import { Home } from "./pages/Home";
import { Tickets } from "./pages/Tickets";
import { Chat } from './pages/Chat';
import { PrivateRoute } from "./routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/tickets/new" element={<PrivateRoute />}>
                    <Route path="/tickets/new" element={<Tickets />} />
                </Route>
                <Route path="/chat/:code" element={<PrivateRoute />}>
                    <Route path="/chat/:code" element={<Chat />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
