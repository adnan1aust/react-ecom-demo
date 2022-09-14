import { Outlet, Link } from "react-router-dom";
import { Fragment , useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../resource/crown.svg'
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext)
	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	}
	console.log('from Navigation', currentUser)
	return(
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to='/'>
                    <CrwnLogo/>
                </Link>
                <div className="nav-link-container">
                    <Link className='nav-link' to='/shop'>Shop</Link>
					{ 
		  				currentUser ? (<span className='nav-link' onClick={signOutHandler}>Sign Out</span>) : (<Link className='nav-link' to='/auth'>Sign In</Link>)
					}
                </div>
			</div>
			<Outlet/>
		</Fragment>
	);
}

export default Navigation;