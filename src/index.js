import React,{ useState,useEffect }  from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Cookies from 'universal-cookie';

//css styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//to toggle theme 
import {ThemeProvider} from "styled-components";
import { useDarkMode } from "./services/useDarkMode";
import { GlobalStyles } from "./styles/lib/globalStyles";
import { lightTheme, darkTheme } from "./styles/lib/themes";

//pages
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Items from './pages/Items.js';
import Header from './pages/Header.js';
import ItemDetails from './pages/ItemDetails.js';
import Mycart from './pages/Mycart.js';
import Inventory from './pages/Inventory.js';
import NoPage from './pages/NoPage.js';

export default function App() {

  const cookies = new Cookies();
  const [isadmin,setIsAdmin] = useState(null);
  const [load, setLoad] = useState(0);
  const [theme, themeToggler] = useDarkMode();
  
  const toggleLoad = () => { setLoad(!load) };

  useEffect(() => {
  
    if(cookies.get('user_isadmin'))
      setIsAdmin(JSON.parse(cookies.get('user_isadmin')));
 
  });

  return (
    <ThemeProvider theme={(theme == 'dark') ? darkTheme : lightTheme}>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/src" element={<Header load={load} theme={theme} themeToggler={themeToggler} />}> }
            <Route index element={isadmin ? <Inventory/> : <Items toggleLoad={toggleLoad}/>} />
            <Route path="/src/items/:_id" element={<ItemDetails toggleLoad={toggleLoad}/>} />
            <Route path="/src/mycart" element={<Mycart load={load} toggleLoad={toggleLoad} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
