import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import BasketPage from "../../features/Basket/BasketPage";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../Store/configureStore";
import { setBasket } from "../../features/Basket/basketSlice";



function App() {
//const{setBasket} = useStoreContext();
const dispatch = useAppDispatch();
const[loading,setLoading] = useState(true);

useEffect(()=>{
  const buyerId = getCookie('buyerId');
  if(buyerId){
    agent.Basket.get()
    .then(basket => dispatch(setBasket(basket)))
    //.then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false));
  }
  else{
    setLoading(false);
  }
},[/*setBasket*/dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  let theme = createTheme({
    palette:{
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
    
  })
  function handleThemeChange(){
    setDarkMode(!darkMode)
  }

  if(loading) return <LoadingComponent message='Initializing app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar/>
    <CssBaseline />
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
     <Container>
     <Routes>
     <Route path='/' element={<HomePage />} />
     <Route path = '/catalog' element={<Catalog />}/> 
     <Route path= '/catalog/:id' element={<ProductDetail />}/> 
     <Route path='/about' element={<AboutPage />}/>
     <Route path='/contact' element={<ContactPage />}/>
     <Route path='/basket' element={<BasketPage />}/>
     <Route path='/checkout' element={<CheckoutPage />}/>
     </Routes>
     </Container>
    </ThemeProvider>
  );
}

export default App;
