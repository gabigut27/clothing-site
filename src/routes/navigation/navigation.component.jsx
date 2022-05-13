import {Fragment, useContext} from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {ReactComponent as SiteLogo} from '../../assets/home-icon-silhouette-svgrepo-com.svg';
import '../navigation/navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation=()=>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  

  // console.log(currentUser);
    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <SiteLogo className='logo'/>
          </Link>  
          
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {
              currentUser ? <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
              :  <Link className='nav-link' to='/auth'>
                Sign In
            </Link>
            }
            <CartIcon />
           

          </div>
          { isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
  
    )
  }
  export default Navigation;