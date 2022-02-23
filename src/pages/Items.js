import React,{ useState, useEffect, useCallback,memo } from 'react';
import { Outlet, Link } from "react-router-dom";
import useFetch from "./../services/useFetch";
import { useDebouncedCallback } from 'use-debounce';
import { Card,CardTitle,CardBody,CardImage,CardFooter,Badge,Button,Table,TableHead,TableBody,Icon } from "./../styles/shopping";

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

function Item({item,toggleLoad})
{
  const [addMyCart, addIntoMyCartData] = useState(null);
  
  const addToCart = (itemid) => {
    useFetch('addtocart','POST',{itemid:itemid},addIntoMyCartData);
    toggleLoad();
  }

  return (
    <Card className="col-md-3 col-sm-12 m-1 border p-0">
      <CardBody className="p-2">
        <CardImage src={item.image} position='top' alt='...' />
        <div className="d-flex flex-column text-center">
          <CardTitle className="text-center mb-0">{item.product}</CardTitle>
          <div className='d-flex justify-content-center'>
            <div>{item.isbestseller && <Badge className="badge-danger product mx-1">Bestseller</Badge>}</div>
            <div>{item.isNew && <Badge className="badge-info mx-1">New</Badge>}</div>
          </div>
        </div>
        <div className="text-muted text-center"><small>{item.company}</small></div>
        <div className='text-center'>
          <RenderRating key={'rating'+item._id} rating={item.rating}/>
        </div>
      </CardBody>
      <CardFooter className='text-muted d-flex justify-content-between px-3'>
        <div className='text-muted h3 d-flex align-items-baseline pt-1'>Rs. {item.price}</div>
        <div className='d-flex flex-row'>
          <Link to={"/src/items/"+item._id} >
            <div title="View Details">
              <Icon className="fas fa-eye px-2"/>
            </div>
          </Link>
          <Link to="" onClick={() => addToCart(item._id)}>
            <div title="Add to Cart">
              <Icon className="fas fa-shopping-cart px-2"/>
            </div>              
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

const Items = ({toggleLoad}) =>{
  
  const [itemList,setItemList] = useState(null);
  const [categoryList,setCategoryList] = useState(null);
  const [searchItem,setSearchItem] = useState("");
  const [category,setCategory] = useState("");

  const debounceSearchItems = useDebouncedCallback((value) => {setSearchItem(value)},2000);
  const debounceSearchCategory = useDebouncedCallback((value) => {setCategory(value)},2000);
  
  useEffect(() => {
    useFetch('category','GET',null,setCategoryList);
  }, []); 
  
  useEffect(() => {
    
    let searchlist = "";
    if (category)
      searchlist += "company="+category

    if (searchItem)
    {
      if (searchlist)
        searchlist += "+";
      searchlist += "product="+searchItem;
    }
    
    useFetch("items/"+searchlist,'GET',null,setItemList);
    toggleLoad();
  }, [searchItem,category]); 
 
  return (
    <div className="container-fluid d-flex flex-column justify-content-center p-2 py-4">
      <div className='input-group mb-3'>        
        <select className='form-control' onChange={(e) => debounceSearchCategory(e.target.value)}>
          <option value=''>All Category</option>
          {categoryList && categoryList.map((e) => <option key={e} value={e}>{e}</option> )}
        </select>     
        <input type='text' className="form-control w-75" placeholder="Search here your items..." onChange={(e) => debounceSearchItems(e.target.value)}  />
      </div>
      <div className="row m-0">{itemList && itemList.map((item) => item.inStock && <Item key={item._id} item={item} toggleLoad={toggleLoad} />)}</div> 
    </div>      
  );
}

export default memo(Items);