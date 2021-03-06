import { useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import  './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/Store/configureStore';
import { fetchProductsAsync } from './features/catalog/catalogSlice';


/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('rendered');
  });

  return <App />
}


const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
  
      <Provider store={store}>
         <App />
      </Provider>
 
  </BrowserRouter>
</React.StrictMode>
 );

 /* before the react context(StoreProvider) was replaced by redux
 root.render(
  <React.StrictMode>
    <BrowserRouter>
   <StoreProvider>
      
         <App />
     
   </StoreProvider>
  </BrowserRouter>
</React.StrictMode>
 );
 */ 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
