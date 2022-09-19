import { Outlet, Link } from "react-router-dom";
import { Fragment , useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../resource/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import './navigation.styles.scss';

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext)
	const {isCartOpen, setIsCartOpen} = useContext(CartContext);
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
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>Shop</Link>
					{ 
		  				currentUser ? (<span className='nav-link' onClick={signOutHandler}>Sign Out</span>) : (<Link className='nav-link' to='/auth'>Sign In</Link>)
					}
					<CartIcon/>
                </div>
				{ isCartOpen && <CartDropdown/>}
			</div>

			<Outlet/>
		</Fragment>
	);
}

export default Navigation;