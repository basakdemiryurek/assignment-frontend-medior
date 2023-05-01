import { Box } from "@mui/material";
import { useAppSelector } from "app/hooks";
import {
  StyledStack,
  StyledItem,
} from "components/StyledComponents/StyledComponents";
import React from "react";
import CartActions from "./CartActions";

const Cart: React.FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products).products;

  const cartItems = items.map((item) => {
    const product = products.find((product) => product.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  return (
    <Box>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <StyledStack>
          {cartItems.map((cartItem) => (
            <StyledItem key={cartItem.id}>
              <h4>{cartItem.product?.name}</h4>
              <CartActions cartItem={cartItem} />
            </StyledItem>
          ))}
        </StyledStack>
      )}
    </Box>
  );
};

export default Cart;
