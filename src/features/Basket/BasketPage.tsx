import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";


export default function BasketPage(){
  const {basket,setBasket,removeItem}= useStoreContext();
  const [status,setStatus] = useState({
      loading: false,
      name: ''
  });

   function handleAddItem(productId: number, name: string){
       setStatus({loading:true,name});
    agent.Basket.addItem(productId)
    .then(basket => setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setStatus({loading:false,name:''}))
   }

   function handleRemoveItem(productId:number, quantity=1,name:string){
       setStatus({loading:true,name});
       agent.Basket.deleteItem(productId,quantity)
       .then(()=> removeItem(productId,quantity))
       .catch((errorr)=> console.log(errorr))
       .finally(()=>setStatus({loading:false,name:''})) 
   }

    if(basket==null) return <Typography variant='h3'>Your basket is empty</Typography>

    return(
        <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                      <img src={item.pictureUrl} alt={item.name} style = {{height:50,marginRight:20}} />
                      <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.price/100}</TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status.loading && status.name === 'rem'+item.productId} onClick={()=>handleRemoveItem(item.productId,1,'rem'+item.productId)} color='error'>
                  <Remove/>    
                  </LoadingButton>    
                    {item.quantity}
                    <LoadingButton loading={status.loading && status.name === 'rem'+item.productId} onClick={()=>handleAddItem(item.productId,'add'+item.productId)} color='secondary'>
                  <Add />    
                  </LoadingButton> 
                </TableCell>
                <TableCell align="right">{item.price/100 * item.quantity}</TableCell>
                <TableCell align="right">
                    <LoadingButton loading={status.loading && status.name === 'del'+item.productId} onClick={()=>handleRemoveItem(item.productId,item.quantity,'rem'+item.productId)} color='error'>
                       <Delete/>
                    </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6} >
              <BasketSummary />
          </Grid>
      </Grid>
      </>
    )
}
