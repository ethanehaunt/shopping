import Cookies from 'universal-cookie';

const useFetch = (url,method,request_body,setData) => {
  
  url = '/'+url;
  const cookies = new Cookies();
  const requestOptions = { method: method,headers: {'Content-Type': 'application/json','Authentication':cookies.get('user_token')}};

   if (request_body)
    requestOptions["body"] = JSON.stringify(request_body);

  return fetch(url,requestOptions)
         .then(res => res.text())
         .then(data => setData(JSON.parse(data)));
};

export default useFetch;