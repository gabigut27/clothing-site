import {Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';
import {ReactComponent as SiteLogo} from '../../assets/home-icon-silhouette-svgrepo-com.svg';
import '../navigation/navigation.styles.scss'
const Navigation=()=>{
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
            <Link className='nav-link' to='/sign-in'>
                Sign In
            </Link>

          </div>
        </div>
        <Outlet />
      </Fragment>
  
    )
  }
  export default Navigation;