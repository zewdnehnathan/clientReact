import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { parse } from "path";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetail(){
    const {id} = useParams<{id:string}>();
    const [product,setProduct] = useState<Product | null>(null);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        agent.Catalog.details(id==undefined ? 0 : parseInt(id))
        .then(response => setProduct(response))
        .catch(error=> console.log(error.response))
        .finally(()=> setLoading(false));
    },[id])

    if(loading) return <LoadingComponent message="Loading Product Detail..."/>
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
      
            </Grid>

        </Grid>
    )
}