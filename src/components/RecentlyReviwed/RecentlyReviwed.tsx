import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setSelectedProduct } from "app/products";
import {
  StyledItem,
  StyledStack,
} from "components/StyledComponents/StyledComponents";

const RecentlyReviwed: React.FC = () => {
  const dispatch = useAppDispatch();

  const { recentlyReviwedProducts } = useAppSelector(
    (state) => state.recentlyViewed
  );
  const { products } = useAppSelector((state) => state.products);

  const recentProducts = recentlyReviwedProducts.map((item) =>
    products.find((product) => product.id === item)
  );

  const handleProductClick = (productId: string) =>
    dispatch(setSelectedProduct(productId));

  return (
    <Box>
      {recentProducts.length === 0 ? (
        <p>You haven't reviwed any product yet.</p>
      ) : (
        <StyledStack>
          {recentProducts?.map(
            (item) =>
              item && (
                <StyledItem
                  key={item.id}
                  onClick={() => {
                    handleProductClick(item.id);
                  }}
                >
                  {item?.name}
                </StyledItem>
              )
          )}
        </StyledStack>
      )}
    </Box>
  );
};

export default RecentlyReviwed;
