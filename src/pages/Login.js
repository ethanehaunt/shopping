import React,{ useState,useEffect } from 'react';
import { Route,useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import useFetch from "./../services/useFetch";
import {Card,CardHeader,CardBody,Button } from "./../styles/shopping";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setloginData] = useState(null);

  const navigate = useNavigate();
  const cookies = new Cookies();
  
  useEffect(() => {
    if (cookies.get('user_token'))
     navigate("/src")   
    
  },[])

  if(loginData && loginData.user_token)
  {
    navigate('/src');
    cookies.set('user_token',loginData.user_token);
    cookies.set('user_isadmin',loginData.isadmin);
  }

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const submitLoginPanel = () => {
    useFetch('login','POST',{email:email,password:password},setloginData);    
  }

  return (
  	<div className="container-fluid m-auto p-5">
      <div className="row">
        <div className="col-md-4 col-sm-12"></div>
  	  	<Card className="col-md-4 col-sm-12 border">
  	  	  <CardHeader className="h3 text-center">shopping Login Panel</CardHeader>
  		  	<CardBody className="p-2">
  		  	    <div className="d-flex flex-column mb-4">
  		  	      <small className="text-muted">Email ID</small>
  		  	      <input type='email' className="form-control" placeholder='Enter Email ID' value={email} onKeyDown={(e)=>{if(e.key == 'Enter') submitLoginPanel()}} onChange={(e) => setEmail(e.target.value)}/>
  		  	    </div>
  		  	    <div className="d-flex flex-column mb-4">
  		  	      <small className="text-muted">Password</small>
  		  	      <input type='password' className="form-control" placeholder='Enter Password' value={password} onKeyDown={(e)=> {if(e.key == 'Enter') submitLoginPanel()}} onChange={(e) => setPassword(e.target.value)}/>
  		  	    </div>
  		        <div className="d-grid gap-2">
  			      <Button className="btn-primary" onClick={submitLoginPanel} disabled={!validateForm()}>Login</Button>
  			    </div>
  		    </CardBody>
  	    </Card>
        <div className="col-md-4 col-sm-12"></div>        
      </div>
    </div>
  );
  
};

export default Login;
