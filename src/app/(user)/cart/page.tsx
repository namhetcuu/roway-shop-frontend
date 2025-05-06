'use client';
import CartSummary from './components/CartSummary';
import { CartItem } from './components/CartItem';
const CartPage = () => {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-center space-x-10'>
                <CartItem /> {/* Giỏ hàng hiển thị */}
                <CartSummary 
                /> {/* Tóm tắt giỏ hàng */}
            </div>
        </div>
    );
};

export default CartPage;
