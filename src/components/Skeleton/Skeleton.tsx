import { Skeleton } from "@mui/material";

const ProductSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant="rectangular" animation="wave" />
      <Skeleton variant="rectangular" animation="wave" />
      <Skeleton variant="rectangular" animation="wave" />
    </>
  );
};

export default ProductSkeleton;
