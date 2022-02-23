import React, { useState,useEffect } from 'react';
import { Outlet, Link,useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import useFetch from "./../services/useFetch";
import useWindowSize from "./../services/useWindowSize";
import ThemeToggler from "./Toggler"
import {Navbar,NavbarNav,NavbarBrand,ToggleNavbarButton,ToggleNavbar,ToggleNavItem,ToggleNavbarItem,Badge,Icon} from "./../styles/shopping";

export default function Header({load,theme,themeToggler}) {

  const navigate = useNavigate();
  const cookies = new Cookies();
  const isadmin = JSON.parse(cookies.get('user_isadmin'))
  const width = useWindowSize();
  const [auth, setAuthDetails] = useState(null);
  const [shownav, setShownav] = useState(true);
  const [myCartList, setMyCartData] = useState([]);

  const toggleNavbar = () => { setShownav(!shownav);}

  useEffect(() => {

    if(cookies.get('user_token'))      
    { 
      useFetch("mycart",'GET',null,setMyCartData); 
    }
  }, [load]);

  useEffect(() => { useFetch("auth",'GET',null,setAuthDetails); }, []);

  useEffect(() => { (width <= "430") ? setShownav(false):setShownav(true)  }, [width]);


  if(auth && !auth.authentication)
    navigate('/logout');

  return (
    <>
      <Navbar>
        <NavbarNav className='d-flex justify-content-between px-2'>
          <div className="d-flex flex-row w-100">
            
            <ToggleNavbarButton onClick={toggleNavbar}>
              <i className="fas fa-bars"></i>
            </ToggleNavbarButton>

            <ToggleNavItem className="d-flex flex-row w-100">
              <Link className='nav-link mx-2' to='/src'><NavbarBrand>Shopping</NavbarBrand></Link>
              
              <ToggleNavbar show={shownav}>
                  
                  <ToggleNavbarItem>
                    { !isadmin && <Link className='nav-link' to='/src'><Icon className="fas fa-home pe-1"/>Home</Link> }
                    { isadmin && <Link className='nav-link' to='/src'><Icon className="fas fa-poll-h pe-1"/>Inventory</Link>}
                    
                    { !isadmin &&
                      <Link className='nav-link' to='/src/myCart'><Icon className="fas fa-shopping-cart pe-1"/>My Cart
                        {myCartList && <Badge Notification Rounded className='bg-danger'>{myCartList.length}</Badge>}
                      </Link> 
                    }
                    
                  </ToggleNavbarItem>

                  <ToggleNavbarItem>
                    <ThemeToggler theme={theme} toggleTheme={themeToggler} />
                    <Link className='nav-link' to='/logout'><Icon className="fas fa-sign-out-alt pt-1 pe-1"/>Logout</Link>
                  </ToggleNavbarItem>

              </ToggleNavbar>

            </ToggleNavItem>            
          </div>          
        </NavbarNav>
      </Navbar>
      <Outlet />
    </>
  );
}

