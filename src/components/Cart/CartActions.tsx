import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { addItem, removeItem, updateQuantity } from "app/cart";
import { useAppDispatch } from "app/hooks";
import { CartItem } from "types/Cart";

export interface CartActionsProps {
  cartItem?: CartItem;
  productId?: string;
}

const CartActions: React.FC<CartActionsProps> = ({ cartItem, productId }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (productId) {
      dispatch(addItem({ productId, quantity: 1 }));
    }
  };

  const handleQuantityUpdate = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem({ id: id }));
  };

  return (
    <Box>
      {!cartItem ? (
        <Button variant="contained" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      ) : (
        <>
          <IconButton
            onClick={() =>
              handleQuantityUpdate(cartItem.id, cartItem.quantity - 1)
            }
          >
            <Remove />
          </IconButton>
          {cartItem.quantity}
          <IconButton
            onClick={() =>
              handleQuantityUpdate(cartItem.id, cartItem.quantity + 1)
            }
          >
            <Add />
          </IconButton>
          <Button
            variant="outlined"
            onClick={() => handleRemoveFromCart(cartItem.id!)}
          >
            Remove
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartActions;
