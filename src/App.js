import './App.css';
import './assets/styles/main.css';
import Navbar from "./components/Header/Navbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import {useState} from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import useFetch from "./hooks/useFetch";
import {API_URL} from "./common/constants";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./components/PageNotFound";
const convertDataResponse = res => (
    {
        fullName: `${res.data.firstName} ${res.data.lastName}`,
        username: res.data.username,
        role: res.data.role,
    }
);

function App() {
    const [token, setToken] = useState(localStorage.getItem("TOKEN"));
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    let role = "";
    let curUsername = "";
    if (token) {
        localStorage.setItem("TOKEN", token);
        const decode = jwt_decode(token);
        role = decode.role;
        curUsername = decode.sub;
        if (decode.exp * 1000 <= Date.now()) {
            localStorage.removeItem("TOKEN");
            setToken(null);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const {
        data: account,
        setData: setAccount,
    } = useFetch(
        {},
        `${API_URL}/account/user?username=${curUsername}`,
        convertDataResponse);

    return (
        <div className="App">
            <Router>
                <Navbar showSidebar={showSidebar}
                        account={account}
                        setAccount={setAccount}
                        token={token}
                />
                <div className="grid wide">
                    <div className="row app-content justify-content-center">
                        {token &&
                            <div className={sidebar ? 'col col-lg-2 col-md-4 col-sm-2' : ''}>
                                <Sidebar sidebar={sidebar}/>
                            </div>
                        }
                        <div className={sidebar ? 'col col-lg-10 col-md-8 col-sm-10 ' : ''} style={{padding: '10px'}}>
                            <Switch>
                                <Route path='/' exact>
                                    {token ? <Home/> : <Login/>}
                                </Route>
                                <Route path='/reports'>
                                    {token ? <Reports/> : <Login/>}
                                </Route>
                                <Route path="/login" exact>
                                    <Login/>
                                </Route>
                                <Route path="/profile" exact>
                                    {token ? <Profile account={account}/> : <Login/>}
                                </Route>
                                <Route path="/inventory" exact>
                                    {token ? <PageNotFound/> : <Login/>}
                                </Route>
                                <Route path="/menu" exact>
                                    {token ? <PageNotFound/> : <Login/>}
                                </Route>
                                <Route path="/setting" exact>
                                    {token ? <PageNotFound/> : <Login/>}
                                </Route>
                                <Route path="/support" exact>
                                    {token ? <PageNotFound/> : <Login/>}
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
