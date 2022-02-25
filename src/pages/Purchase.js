import React,{ useState,useEffect,memo }  from 'react';
import { Link } from "react-router-dom";
import useFetch from "./../services/useFetch";
import {Icon,Card,Breadcrumb,BreadcrumbItem,CardHeader,CardBody,CardFooter} from "./../styles/shopping";

function RenderTotalCost(props)
{
  let total = 0;
  props.total.map((ele) =>{ if (ele.qty && ele.productdetails && ele.productdetails[0]) total += (ele.qty * ele.productdetails[0].price) });

  return (<>{total}</>);
}

const Purchase = ({load,toggleLoad,isLoading,setIsLoading}) => {

  const [myCartList, setMyCartData] = useState([]);
  const [removeitem,addRemoveDetails] = useState(null);


  const [cardtype,setCardType] = useState("credit");
  const [name,setName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvw, setCvw] = useState("");

  const validatePurchase = () => {
      
    return name.length > 0 && cardnumber.length > 0 && expiration.length > 0 && cvw.length > 0;
  }

  const validatePurchaseCard = () => {
      
    return myCartList && myCartList.length > 0;
  }  

  const submitPurchase = () => {

    let itemdetails = {cardtype:cardtype,name:name,cardnumber:cardnumber,expiration:expiration,cvw:cvw};
    console.log(itemdetails);
    useFetch("removecart",'DELETE',null,addRemoveDetails);
    toggleLoad();

  }

  useEffect(() => {
    setIsLoading(true);
    useFetch("mycart",'GET',null,setMyCartData); 
    setIsLoading(false);

  }, [load]);
  

  return (

    <div className="d-flex flex-column m-4" hidden={isLoading}>
        

          <Breadcrumb className="mb-1">
            <BreadcrumbItem> 
              <Link to='/src/mycart'>My Cart</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Purchase</BreadcrumbItem>
          </Breadcrumb>

          <h2 className="font-weight-bold mb-3">Purchase</h2>          
        
        <Card className='border w-100 m-auto' disabled={!validatePurchaseCard()}>
          <CardHeader><h4>Total Price Rs. {myCartList && <RenderTotalCost total={myCartList}/>}</h4></CardHeader>
          <CardBody>

                <div className="row mb-3">
                  
                  <div className="col-md-12 col-sm-12">
                    <label>Card Type</label>
                    <select  className="form-control" placeholder="" value={cardtype} onChange={(e) => setCardType(e.target.value)}>
                      <option value='credit'>Credit Card</option>
                      <option value='dedit'>Debit Card</option>
                      <option value='paypal'>Paypal</option>
                    </select>                                      
                  </div>                 

                </div>

                <div className="row mb-3">
                  
                  <div className="col-md-6 col-sm-12">
                    <label><span className='text-danger me-1'>*</span>Name on card</label>
                    <input type="text" className="form-control" placeholder="Full name as displayed on card" value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <label><span className='text-danger me-1'>*</span>Credit Card Number</label>
                    <input type="text" className="form-control" placeholder="Credit Card Number" value={cardnumber} onChange={(e) => setCardNumber(e.target.value)}/>                    
                  </div>

                </div>

                <div className="row mb-3">
                
                  <div className="col-md-6 col-sm-12">
                    <label><span className='text-danger me-1'>*</span>Expiration</label>
                    <input type="text" className="form-control" placeholder="Expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)}/>                    
                  </div>
                
                  <div className="col-md-6 col-sm-12">
                    <label><span className='text-danger me-1'>*</span>CVV</label>
                    <input type="text" className="form-control" placeholder="CVV" value={cvw} onChange={(e) => setCvw(e.target.value)}/>                    
                  </div>

                </div>
                


          </CardBody>
          <CardFooter className='d-flex justify-content-end'>

            <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={submitPurchase} disabled={!validatePurchase()}>Place order</button>

          </CardFooter>
        </Card>
        
      </div>
    
    
  );
};

export default Purchase;
