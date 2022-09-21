import { Outlet, Link } from "react-router-dom";
import { Fragment , useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../resource/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import {NavigationContainer, LogoContainer, NavigationLinkContainer, NavLink} from './navigation.styles'

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext)
	const {isCartOpen, setIsCartOpen} = useContext(CartContext);
	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	}
	return(
		<Fragment>
			<NavigationContainer>
				<LogoContainer className="logo-container" to='/'>
                    <CrwnLogo/>
                </LogoContainer>
                <NavigationLinkContainer className="nav-links-container">
                    <NavLink to='/shop'>Shop</NavLink>
					{ 
		  				currentUser ? (<span className='nav-link' onClick={signOutHandler}>Sign Out</span>) : (<Link className='nav-link' to='/auth'>Sign In</Link>)
					}
					<CartIcon/>
                </NavigationLinkContainer>
				{ isCartOpen && <CartDropdown/>}
			</NavigationContainer>

			<Outlet/>
		</Fragment>
	);
}

export default Navigation;