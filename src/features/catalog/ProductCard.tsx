import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import { addBasketItemAsync } from "../Basket/basketSlice";

interface Props {
    product:Product
}

export default function ProductCard({product}:Props){
  // const [loading,setLoading] = useState(false);
  const {status} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();
   // const {setBasket} = useStoreContext(); 
   var BC = "";

   /*function handleAddItem(productId: number){
     setLoading(true);
     agent.Basket.addItem(productId)
     .then(res => {
      dispatch(setBasket(res))
     // setBasket(res);
      BC = res.buyerId;
      let date = new Date();
      date.setTime(date.getTime()+(24*60*60*1000));
      document.cookie = "buyerId="+BC+"; expires="+date.toUTCString()+"; SameSite=None; Secure";
      console.log(document.cookie);
      })
     .catch(error => console.log(error))
     .finally(()=> setLoading(false));

   }*/

    return(
    <Card >
        <CardHeader 
        avatar={
            <Avatar sx={{bgcolor:'secondary.main'}}>
                {product.name.charAt(0).toUpperCase()}
            </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
            sx:{fontWeight:'bold', color: 'primary.main'}
        }}
        />
      <CardMedia
        sx={{height: 140, backgroundSize: 'contain', bgcolor:'primary.light'}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes('pendingAddItem'+product.id)} onClick={()=> dispatch(addBasketItemAsync({productId: product.id}))/*handleAddItem(product.id)*/} size="small">Add To Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}