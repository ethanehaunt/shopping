import React,{ useState, useEffect, useCallback } from 'react';
import useFetch from "./../services/useFetch";
import AddItems from "./AddItems";
import {Card,CardBody,Table,TableHead,TableBody,Icon } from "./../styles/shopping";

function RenderItem({item,load,setLoad,handleShow}) {

  const [isnew, setisnew] = useState(item.isnew);
  const [updateItem, updateInventoryData] = useState(null);
  
  const removeFromInventory = (item_id) => {
    useFetch('removeitem/'+item_id,'DELETE',null,updateInventoryData);
    setLoad(!load);
  }

  const toggleItemData = (ischecked,id,typedata) =>{
    
    let updatedetails = {_id:id};
    updatedetails[typedata] = ischecked;
    useFetch('updateitem','POST',updatedetails,updateInventoryData);
    setLoad(!load);
  }

  return (
       <tr>      
          <td className="w-10">
           <img src={item.image} className="img-fluid z-depth-0" alt='...'  />
          </td>
          <td>          
            <div className="d-flex flex-column">
              <span>{item.product}</span>
              <small className="text-muted">{item.company}</small>
            </div>
          </td>
          <td>{item.color}</td>
          <td>{item.price}</td>        
          <td>{item.rating}</td>        
          <td>
            <div className="form-check">
              <input className="form-check-input mt-1" type="checkbox" id="isnew" checked={item.isnew} onChange={(e)=>toggleItemData(e.target.checked,item._id,'isnew')}/>
            </div>
          </td>        
          <td>
            <div className="form-check">
              <input className="form-check-input mt-1" type="checkbox" id="isbestseller" checked={item.isbestseller} onChange={(e)=>toggleItemData(e.target.checked,item._id,'isbestseller')}/>
            </div>
          </td>
          <td>
            <div className="form-check form-switch pt-2">
              <input className="form-check-input mt-1" type="checkbox" id="inStock" checked={item.inStock} onChange={(e)=>toggleItemData(e.target.checked,item._id,'inStock')}/>
              <label className="form-check-label" htmlFor="inStock">In Stock</label>
            </div>
          </td>        
          <td>
            <span className='c-pointer p-2 text-info' onClick={() => handleShow(item)}>
              <Icon className='fa fa-edit me-1'></Icon>Edit
            </span>
            <span className='c-pointer p-2 text-danger' onClick={() => removeFromInventory(item._id)}>
              <Icon className='fa fa-trash me-1'></Icon>Remove
            </span>            
          </td>        
        </tr> 
      
    )

}


const Inventory = ({isLoading,setIsLoading}) => {
  
  const [itemList,setItemList] = useState(null);
  const [item,setItem] = useState(null);
  const [load,setLoad] = useState(true);
  const [show, setShow] = useState(false);

  const handleShow = (item) => { setItem(item); setShow(true);};
  
  
  useEffect(() => {    
    setIsLoading(true);
    useFetch("items",'GET',null,setItemList);
    setIsLoading(false);
  }, [load]); 
 
  return (
    <div className="container-fluid d-flex flex-column justify-content-center p-2 py-4" hidden={isLoading}>
      <div className="d-flex justify-content-between">
        <h2 className="font-weight-bold mb-3">Inventory</h2>
        <div>
          <button className="btn btn-primary btn-rounded" onClick={()=>handleShow(null)}>
            <i className="fas fa-plus me-2" aria-hidden="true"></i> Add New Item
          </button>
        </div>
      </div>
      
      <AddItems show={show} setShow={setShow} load={load} item={item} setLoad={setLoad}/>

      <Card className="border w-100 m-auto">
        <CardBody className="d-flex justify-content-center p-0 overflow-auto">
          <Table className="table">
            <TableHead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Color</th>
                <th>Price</th>
                <th>Rating</th>
                <th>New</th>
                <th>Bestseller</th>
                <th>In Stock</th>
                <th>Action</th>
              </tr>
            </TableHead>
            <TableBody>
              {itemList && itemList.map((item,index) => <RenderItem key={index} item={item} load={load} handleShow={handleShow} setLoad={setLoad}/> )}
            </TableBody>
          </Table>
        </CardBody>        
      </Card>
    </div>      
  );
}

export default Inventory;
