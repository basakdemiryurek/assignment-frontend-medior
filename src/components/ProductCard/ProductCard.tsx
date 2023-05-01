import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import TagChip from "components/TagChip/TagChip";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CartActions from "components/Cart/CartActions";
import { productReviwed } from "app/recentlyReviewed";

const ProductCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct: product } = useAppSelector(
    (state) => state.products
  );
  const tags = useAppSelector((state) => state.tags).tags.filter((item) =>
    product?.tags?.includes(item.id)
  );
  const cartItem = useAppSelector((state) => state.cart).items?.find(
    (item) => item.productId === product?.id
  );
  const productId = product?.id ?? "";

  useEffect(() => {
    if (productId) {
      dispatch(productReviwed(productId));
    }
  }, [productId, dispatch]);

  if (!product) return <></>;

  return (
    <Card>
      <CardHeader
        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
        title={product.name}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {product.description}
        {product.tags && (
          <Box sx={{ mt: "15px" }}>
            {tags.map((tag) => (
              <TagChip key={tag?.id} tag={tag} />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <CartActions cartItem={cartItem} productId={productId} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
