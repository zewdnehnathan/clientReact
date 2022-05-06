import { useEffect } from "react";
import ProductList from "./ProductList";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";



export default function Catalog(){
   // const [products,setProducts] = useState<Product[]>([]);
   const products = useAppSelector(productSelectors.selectAll);
   const dispatch = useAppDispatch();
   const {productsLoaded,status} = useAppSelector(state=>state.catalog);
   //const [loading,setLoading] = useState(true);

  useEffect(() => { 
   if(!productsLoaded) dispatch(fetchProductsAsync());
   /* agent.Catalog.list().then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))*/
  }, [productsLoaded,dispatch])

  if(status.includes('pending')) return <LoadingComponent message="Loading Products..."/>

    return (
        <>
    <ProductList products={products}/>
      </>
    )
}