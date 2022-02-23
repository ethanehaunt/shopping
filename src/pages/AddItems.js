import React,{ useState, useEffect } from 'react';
import useFetch from "./../services/useFetch";
import Modal from 'react-bootstrap/Modal';
import {Button} from "./../styles/shopping";


const AddItems = ({item,show,setShow,load,setLoad}) => {
  
  const [additem,addItemDetails] = useState(null);

  const [product,setProduct] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [rating, setRating] = useState("");
  const [isNew, setNew] = useState(true);
  const [isbestseller, setBestseller] = useState(false);
  const [inStock, setStock] = useState(true);
  const [image, setImage] = useState("avatar.jpg");


  useEffect(() => {

    setProduct(item?item.product:"");
    setCompany(item?item.company:"");
    setDescription(item?item.description:"");
    setPrice(item?item.price:"");
    setColor(item?item.color:"");
    setRating(item?item.rating:"");
    setNew(item?item.isNew:true);
    setBestseller(item?item.isbestseller:false);
    setStock(item?item.inStock:true);
    setImage(item?item.image:"avatar.jpg");

  }, [item]);
  

  const handleClose = () => setShow(false);
  
  const submitAddItem = () =>{
    
    let itemdetails = {_id:item?item._id:undefined,product:product,company:company,description:description,price:price,color:color,rating:rating,isNew:isNew,isbestseller:isbestseller,inStock:inStock,image:image};
    useFetch((item?"update":"add")+"item",'POST',itemdetails,addItemDetails);

  }

  const validateAddItems = () => {
    return product.length > 0 && company.length > 0 && price.length > 0 && color.length > 0 && rating.length > 0;
  }
  
  if(additem && !additem.error)
  {
    handleClose();
    addItemDetails(null);
    setLoad(!load);
  }
  
  
 
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item?'Edit':'Add'} Item {item?(": "+item.product):""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

           <div className="d-flex flex-row w-100 mb-3">
             <div className="d-flex flex-column w-100 me-2">
               <small className="text-muted"><span className='text-danger me-1'>*</span>Name</small>
               <input type='text' className="form-control" placeholder='Item Name' value={product} onChange={(e) => setProduct(e.target.value)}/>
             </div>

             <div className="d-flex flex-column w-100">
               <small className="text-muted"><span className='text-danger me-1'>*</span>Company</small>
               <input type='text' className="form-control" placeholder='Company Name' value={company} onChange={(e) => setCompany(e.target.value)}/>
             </div>
           </div>           

           <div className="d-flex justify-content-between w-100 mb-3">
             <div className="d-flex flex-column w-100 me-2">
               <small className="text-muted"><span className='text-danger me-1'>*</span>Price</small>
               <input type='number' className="form-control" placeholder='Item Price' value={price} onChange={(e) => setPrice(e.target.value)}/>
             </div>

             <div className="d-flex flex-column w-100 me-2">
               <small className="text-muted"><span className='text-danger me-1'>*</span>Color</small>
               <input type='text' className="form-control" placeholder='Item Color' value={color} onChange={(e) => setColor(e.target.value)}/>
             </div>

             <div className="d-flex flex-column w-100">
               <small className="text-muted"><span className='text-danger me-1'>*</span>Rating</small>
               <input type='number' className="form-control" placeholder='Item Rating' value={rating} onChange={(e) => setRating(e.target.value)}/>
             </div>
           </div>

           <div className="d-flex flex-column mb-3">
             <small className="text-muted">Description</small>
             <textarea className="form-control" placeholder='Item Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
           </div>

           <div className='d-flex justify-content-between w-100 mb-3 px-1'>
               <div className="form-check pt-2">
                <input className="form-check-input mt-1" type="checkbox" id="isNew" checked={isNew} onChange={(e)=>setNew(e.target.checked)}/>
                <label className="form-check-label" htmlFor="isNew">is New</label>
              </div>
              <div className="form-check pt-2">
                <input className="form-check-input mt-1" type="checkbox" id="isbestseller" checked={isbestseller} onChange={(e)=>setBestseller(e.target.checked)}/>
                <label className="form-check-label" htmlFor="isbestseller">is Bestseller</label>
              </div>
              <div className="form-check pt-2">
                <input className="form-check-input mt-1" type="checkbox" id="inStock" checked={inStock} onChange={(e)=>setStock(e.target.checked)}/>
                <label className="form-check-label" htmlFor="inStock">In Stock</label>
              </div>
           </div>          

           <div className="d-flex flex-column mb-3">
             <small className="text-muted">Image</small>
             <input className="form-control" placeholder='Item Image' value={image} onChange={(e) => setImage(e.target.value)}/>
           </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger btn-sm" onClick={handleClose}>Cancel</Button>
          <Button className="btn btn-primary btn-sm" onClick={submitAddItem} disabled={!validateAddItems()}>Add</Button>
        </Modal.Footer>
      </Modal>     
  );
}

export default AddItems;