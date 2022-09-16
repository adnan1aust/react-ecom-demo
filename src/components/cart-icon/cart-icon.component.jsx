import './cart-icon-styles.scss';
import { ReactComponent as ShoppingBagIcon } from '../../resource/shopping-bag.svg';

const CartIcon= () => {
    return(
        <div className='cart-icon-container'>
            <ShoppingBagIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;