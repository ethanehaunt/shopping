import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const Logout = () => {

  const cookies = new Cookies();
  cookies.remove('user_token');
  cookies.remove('user_isadmin');
  
  return (

  	<div className="container row m-auto text-center">
  		<div className="col-md-12 col-sm-12 text-center mt-5 p-0">
  		  <img src={"./../img/logout.png"} className="w-25" position='top' alt='...' />
  			<h3 className="mt-4">Logout</h3>
  			<p className="d-flex justify-content-center flex-row">Click here for <Link className='nav-link p-0 ps-1' to='/'>Login</Link></p>
  		</div>
  	</div>
  );
};

export default Logout;
