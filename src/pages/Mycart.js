import React,{ useState,useEffect,memo }  from 'react';
import { Link } from "react-router-dom";
import useFetch from "./../services/useFetch";
import Loader from "./Loader";
import {RemoveBtn} from "./../styles/shopping";
import {Icon,Card,CardBody,CardFooter,Button,Table,TableHead,TableBody } from "./../styles/shopping";

function RenderMyCart({mycart,toggleLoad})
{
  const [removeItem, removeFromMyCartData] = useState(null);
    
  const removeFromCart = (cart_id) => {
    useFetch('removefromcart/'+cart_id,'DELETE',null,removeFromMyCartData);
    toggleLoad(); 

  }

  const updateMycart = (productid,qty) => {

    useFetch('updatemycart','POST',{productid:productid,qty:Number(qty)},removeFromMyCartData);
    toggleLoad(); 

  }

  return(
    <>
      { mycart.productdetails && mycart.productdetails[0] &&
      <tr>      
        <td className="w-10">
         <img src={mycart.productdetails[0].image} className="img-fluid z-depth-0" alt='...'  />
        </td>
        <td>          
          <div className="d-flex flex-column">
            <span>{mycart.productdetails[0].product}</span>
            <small className="text-muted">{mycart.productdetails[0].company}</small>
          </div>
        </td>
        <td>{mycart.productdetails[0].color}</td>
        <td>{mycart.productdetails[0].price}</td>
        <td className='w-15'><input type="number" className="form-control" value={mycart.qty} onChange={(e)=> updateMycart(mycart.productid,e.target.value)}/></td>
        <td>{mycart.productdetails[0].price * mycart.qty}</td>
        <td className="w-15">
          <span className='c-pointer p-2 text-danger' onClick={() => removeFromCart(mycart._id)}>
            <Icon className="fas fa-trash me-1"></Icon>Remove
          </span>
        </td>
      </tr> }
    </>            
  )
}

function RenderTotalCost(props)
{
  let total = 0;
  props.total.map((ele) =>{ if (ele.qty && ele.productdetails && ele.productdetails[0]) total += (ele.qty * ele.productdetails[0].price) });

  return (<>{total}</>);
}


const Mycart = ({load,toggleLoad}) => {
  
  const [isLoading,setIsLoading] = useState(true);
  const [myCartList, setMyCartData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    useFetch("mycart",'GET',null,setMyCartData); 
    setIsLoading(false);

  }, [load]);


  return (

    <>
    {isLoading && <Loader />}

    {!isLoading && 

      <div className="d-flex flex-column m-4">
        <div className="d-flex justify-content-between">
          <h2 className="font-weight-bold mb-3">My Cart</h2>
          <div>
            <Link className="btn btn-primary btn-rounded" to='/src/purchase'>
              Complete purchase <i className="fas fa-angle-right right ms-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <Card className="border w-100 m-auto">
          <CardBody className="d-flex justify-content-center p-0 overflow-auto">
            <Table className="table">
              <TableHead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </TableHead>
              <TableBody>
                {myCartList && myCartList.map((mycart) => <RenderMyCart key={mycart._id} mycart={mycart} toggleLoad={toggleLoad}/>)}
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter>
            <div className='h5 d-flex justify-content-end'>Total Rs. {myCartList && <RenderTotalCost total={myCartList}/>}</div>
          </CardFooter>
        </Card>
      </div>
    }
    </>
  );
  
}

export default memo(Mycart);
