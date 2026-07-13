import type Product from '../types/Product';

interface CartItem extends Pick<
  Product,
  'id' | 'name' | 'category' | 'highlight' | 'description' | 'price' | 'brand' | 'type'
> {
  quantity: number;
}

export default CartItem;
