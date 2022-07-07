import { React,useState,useEffect } from 'react';
import { useParams,Link } from "react-router-dom";
import useFetch from "./../services/useFetch";
import {Breadcrumb,BreadcrumbItem,Badge,Card,CardBody,CardImage,Icon} from "./../styles/shopping";

function RenderRating(props)
{
  let stars = [];
  let rating = Number(props.rating);
  let rest = (5-rating);

  for (var i = 0; i < rating; i++) 
    stars.push(<Icon key={i} className="fas fa-star text-warning" />)
  
  if (rest > 0) 
    for (var j = 0; j <rest; j++) 
      stars.push(<Icon key={rating+j} className="far fa-star text-muted" />)

  return (<>{stars}</>)
}

function ItemDetails({item,toggleLoad})
{
  const [addMyCart, addIntoMyCartData] = useState(null);  
  const addToCart = (itemid) => {
    useFetch('addtocart','POST',{itemid:itemid},addIntoMyCartData);
    toggleLoad();
  }

  return (
    <Card className="border w-100">
      <CardBody className="row m-0 p-2">
        <div className="col-md-6 col-sm-12">
          <CardImage src={"../../"+item.image} position='top' alt='...' />
        </div>
        <div className="col-md-6 col-sm-12 text-md-left p-2">
          <div className="row m-0">
            <div className="col-md-8 col-sm-12 ps-0">
              <div className="d-flex flex-row">
                <h4 className="h2-responsive text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">{item.product}</h4>
                <div className="ms-1">
                  {item.isbestseller && <Badge className="badge-danger product mx-1">Bestseller</Badge>}
                  {item.isnew && <Badge className="badge-info product mx-1">New</Badge>}
                </div>
              </div>
              <small className="text-muted">{item.company}</small>            
            </div>
            <div className="col-md-4 col-sm-12 px-0 text-center">
              <button className="btn btn-primary btn-rounded" onClick={() => addToCart(item._id)} >
                <i className="fas fa-shopping-cart mr-2" aria-hidden="true"></i> Add to cart
              </button>
            </div>
          </div>
          <h3 className="d-flex flex-column text-center text-md-left my-4">
            <span className="text-success">
              Rs. <strong>{item.price}</strong>
            </span>
            <div> 
              <RenderRating key={'rating'+item._id} rating={item.rating}/>  
            </div>       
          </h3>        
          <div className="font-weight-normal">          
            <p className="ml-xl-0 ml-4">{item.description}</p>
            <p className="ml-xl-0 ml-4"><strong>Color: </strong>{item.color}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function RenderItemDetails({toggleLoad}) {

  const params = useParams();
  const [itemDetails, setData] = useState(null);

  useEffect(() => {
    useFetch("items/_id="+params._id,'GET',null,setData);
  }, []);

  
  return (
    <div className="d-flex flex-column p-4">      
      
      <Breadcrumb className="mb-1">
        <BreadcrumbItem> 
          <Link to='/src'>Products</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Product Details</BreadcrumbItem>
      </Breadcrumb>

      <h2 className="font-weight-bold mb-3">Product Details</h2>
      <div className="row m-0 mb-4">
        {itemDetails && itemDetails.map((item) => <ItemDetails key={item._id} item={item} toggleLoad={toggleLoad}/>)}
      </div>
    </div>
  );
  
}
