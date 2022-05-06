import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { parse } from "path";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import {  addBasketItemAsync, removeBasketItemAsync, setBasket } from "../Basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetail(){
   // const {basket,setBasket,removeItem} = useStoreContext();
   const {basket,status} = useAppSelector(state => state.basket);
   const dispatch = useAppDispatch();
   const {id} = useParams<{id:string}>();
   const product = useAppSelector(state=>productSelectors.selectById(state, id!));
   const {status: productStatus} = useAppSelector(state => state.catalog);
   // const [product,setProduct] = useState<Product | null>(null);
   // const [loading,setLoading] = useState(true);
    const [quantity,setQuantity] = useState(0);
  //  const [submitting,setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(()=>{
      if(item) setQuantity(item.quantity);
       if(!product) dispatch(fetchProductAsync(parseInt(id!)));
       /* agent.Catalog.details(id==undefined ? 0 : parseInt(id))
        .then(response => setProduct(response))
        .catch(error=> console.log(error.response))
        .finally(()=> setLoading(false));*/
    },[id,item,dispatch,product])

    function handleInputChange(event: any){
       if(event.target.value >= 0){
        setQuantity(parseInt (event.target.value));
      }
    }
    function handleUpdateCart(){
       // setSubmitting(true);
        if(!item || quantity > item.quantity){
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId:product?.id!,quantity: updatedQuantity}))
            /* agent.Basket.addItem(product?.id!,updatedQuantity)
            .then(basket => dispatch(setBasket(basket)))
            //.then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(()=> setSubmitting(false))*/      
        }
        else{
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
           /* agent.Basket.deleteItem(product?.id!,updatedQuantity)
            .then(()=> dispatch(removeItem({productId: product?.id!,quantity: updatedQuantity})))
            //.then(()=> removeItem(product?.id!,updatedQuantity))
            .catch(error => console.log(error))
            .finally(()=> setSubmitting(false));
            */
        }
    }

    if(productStatus.includes('pending')) return <LoadingComponent message="Loading Product Detail..."/>
    if(!product) return <h3>Product Not Found</h3>

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='secondary'>
                    ${(product.price /100).toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Desciption</TableCell> 
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell> 
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell> 
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell> 
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
        
        <Grid container spacing={2}>
            <Grid item xs={6}>
               <TextField variant="outlined"
                        onChange={handleInputChange}
                        type='number'
                        label='Quantity in cart'
                        fullWidth
                        value={quantity}
               />
            </Grid>
            <Grid item xs={6}>
               <LoadingButton
               disabled={item?.quantity === quantity || (!item && quantity === 0)}
               loading={status.includes('pending'+item?.productId)}
               onClick={handleUpdateCart}
               sx={{height: '55px'}}
               color='primary'
               size='large'
               variant='contained'
               fullWidth
               >
                   {item ? 'Update Quantity' : 'Add to Cart'}
               </LoadingButton>
            </Grid>
        
        </Grid>

            </Grid>

        </Grid>
    )
}