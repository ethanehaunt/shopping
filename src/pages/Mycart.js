import React,{ useState,useEffect,memo }  from 'react';
import { Link } from "react-router-dom";
import useFetch from "./../services/useFetch";
import {RemoveBtn} from "./../styles/shopping";
import {Icon,Card,CardBody,CardFooter,Button,Table,TableHead,TableBody } from "./../styles/shopping";

function RenderMyCart({mycart,toggleLoad})
{
  const [removeItem, removeFromMyCartData] = useState(null);
    
  const removeFromCart = (cart_id) => {
    useFetch('removefromcart/'+cart_id,'DELETE',null,removeFromMyCartData);
  }

  if(removeItem && !removeItem.error)
  {
    removeFromMyCartData(null);
    toggleLoad(); 
  }

  return(
    <>
      { mycart.productdetails && mycart.productdetails[0] &&
      <tr>      
        <td className="w-10">
         <img src={"."+mycart.productdetails[0].image} className="img-fluid z-depth-0" alt='...'  />
        </td>
        <td>          
          <div className="d-flex flex-column">
            <span>{mycart.productdetails[0].product}</span>
            <small className="text-muted">{mycart.productdetails[0].company}</small>
          </div>
        </td>
        <td>{mycart.productdetails[0].color}</td>
        <td>{mycart.productdetails[0].price}</td>
        <td>{mycart.qty}</td>
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

const CurrentDate = () => {

  const date = new Date();
  const month = date.getMonth()+1;

  return `${date.getFullYear()}-${month.length>1?month:'0'+month}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:00`;
}


const Mycart = ({load,toggleLoad}) => {
  
  const [myCartList, setMyCartData] = useState([]);
  const [messageData, setMessageData] = useState("message to send for scheduling");
  const [phoneNumber, setPhoneNumber] = useState("9163214034");
  const [scheduled, setScheduled] = useState(CurrentDate());
  const [messageStatus, setMessageStatus] = useState("");

  useEffect(() => {
    useFetch("mycart",'GET',null,setMyCartData); 
  }, [load]);

  const messageFromMyCart = () => {
    useFetch('message/','POST',{message:messageData,phonenumber:phoneNumber,scheduled_at:scheduled.replace("T"," ")+":00"},messageStatus);
  }

  return (
    <div className="d-flex flex-column m-4">
      <div className="d-flex justify-content-between">
        <h2 className="font-weight-bold mb-3">My Cart</h2>
        <div>
          <div className="input-group mb-3">
            <input type="text" className="form-control w-38" placeholder="Recipient's Message" value={messageData} onChange={(e) => setMessageData(e.target.value)}/>
            <input type="text" className="form-control w-20" placeholder="Recipient's Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="datetime-local" className="form-control w-24" placeholder="Recipient's Phone Number" value={scheduled} onChange={(e) => setScheduled
              (e.target.value)}/>
           
            <button className="btn btn-primary btn-rounded" onClick={() => messageFromMyCart()}>
              Message My Cart <i className="fas fa-angle-right right ms-2" aria-hidden="true"></i>
            </button>
          </div>

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
  );
  
}

export default memo(Mycart);
