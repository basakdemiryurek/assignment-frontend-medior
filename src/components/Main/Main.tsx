import styled from "styled-components";
import { useCallback, useEffect } from "react";
import ProductList from "components/ProductList/ProductList";
import ProductCard from "components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { api } from "app/api";
import { setProducts } from "app/products";
import { setTags } from "app/tags";
import Cart from "components/Cart/Cart";
import RecentlyReviwed from "components/RecentlyReviwed/RecentlyReviwed";
import ProductSkeleton from "components/Skeleton/Skeleton";
import Header from "components/Header/Header";

const App = styled.div`
  display: grid;
  grid-template:
    "products product-view cart" 50%
    "products product-view recent" 50%/ 300px 1fr 300px;
  height: 100vh;

  .products {
    grid-area: products;
    background-color: #faedcd;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-view {
    grid-area: product-view;
    padding: 20px;
    background-color: #fefae0;
  }

  .cart {
    grid-area: cart;
    background-color: #e9edc9;
    padding: 10px;
  }

  .recent-products {
    grid-area: recent;
    background-color: #ccd5ae;
    padding: 10px;
  }
`;

export const Main = () => {
  const dispatch = useAppDispatch();

  const [getFruits, { isLoading: fruitsLoading }] = api.useLazyGetFruitsQuery();
  const [getVegetables, { isLoading: vegetablesLoading }] =
    api.useLazyGetVegetablesQuery();
  const [getFruitTags, { isLoading: fruitTagsLoading }] =
    api.useLazyGetFruitTagsQuery();
  const [getVegetableTags, { isLoading: vegetableTagsLoading }] =
    api.useLazyGetVegetableTagsQuery();

  const fetchProductsAndTags = useCallback(async () => {
    const [
      { data: fruits },
      { data: vegetables },
      { data: fruitTags },
      { data: vegetableTags },
    ] = await Promise.all([
      getFruits(),
      getVegetables(),
      getFruitTags(),
      getVegetableTags(),
    ]);

    dispatch(setProducts([...(fruits ?? []), ...(vegetables ?? [])]));
    dispatch(setTags([...(fruitTags ?? []), ...(vegetableTags ?? [])]));
  }, [getFruits, getVegetables, getFruitTags, getVegetableTags, dispatch]);

  const { selectedProduct, products } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (products.length === 0) {
      fetchProductsAndTags();
    }
  }, [fetchProductsAndTags, products]);

  console.log("wtf");
  const isLoading =
    fruitsLoading ||
    vegetablesLoading ||
    fruitTagsLoading ||
    vegetableTagsLoading;

  return (
    <App>
      <div className="products">
        <Header title="Our Products" />
        {isLoading ? <ProductSkeleton /> : <ProductList />}
      </div>
      <div className="product-view">{selectedProduct && <ProductCard />}</div>
      <div className="cart">
        <Header title="Shopping Cart" />
        <Cart />
      </div>
      <div className="recent-products">
        <Header title="Recently Reviewed" />
        <RecentlyReviwed />
      </div>
    </App>
  );
};
