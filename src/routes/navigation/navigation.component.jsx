import {Fragment, useContext} from 'react';
import { Outlet, Link } from 'react-router-dom';
import {ReactComponent as SiteLogo} from '../../assets/home-icon-silhouette-svgrepo-com.svg';
import '../navigation/navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation=()=>{
  const { currentUser, setCurrentUser } = useContext(UserContext);
  
  const signOutHandler = async () => {

    await signOutUser();
    setCurrentUser(null);
  }
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
              currentUser ? <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
              :  <Link className='nav-link' to='/auth'>
                Sign In
            </Link>
            }
           

          </div>
        </div>
        <Outlet />
      </Fragment>
  
    )
  }
  export default Navigation;