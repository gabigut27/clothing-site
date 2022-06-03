import Home from './routes/home/home.component'
import { Routes,Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authenticaion from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App=()=> {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} /> 
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authenticaion />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
);
};
export default App;
