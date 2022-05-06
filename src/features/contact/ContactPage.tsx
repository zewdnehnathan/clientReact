import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    const dispatch = useAppDispatch();//useDispatch();
    const {data, title} = useAppSelector((state) => state.counter); //useSelector((state:CounterState) => state); 
    return(
        <>
        <Typography variant='h2'>
            {title}
        </Typography>
        <Typography variant='h5'>
        Data is : {data} 
      </Typography>
      <ButtonGroup>
          <Button onClick={() => dispatch(increment(1))} variant="contained" color="primary">Increment</Button>
          <Button onClick={() => dispatch(decrement(1))} variant="contained" color="secondary">Decrement</Button>
          <Button onClick={() => dispatch(decrement(5))} variant="contained" color="secondary">Decrement by</Button>
      </ButtonGroup>
    </>
    )
}