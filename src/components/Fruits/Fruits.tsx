import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  api,
  useAddFruitMutation,
  useDeleteFruitMutation,
  useUpdateFruitMutation,
} from "app/api";
import ProductModal from "components/ProductModal/ProductModal";
import ProductTable from "components/ProductTable/ProductTable";
import { useState, useEffect } from "react";
import { Fruit } from "types/Fruit";

export const Fruits = () => {
  const [getTags, { data: tags }] = api.useLazyGetFruitTagsQuery();
  const [getFruits, { data: fruits, isLoading: fruitsLoading }] =
    api.useLazyGetFruitsQuery();

  useEffect(() => {
    getFruits();
    getTags();
  }, [getFruits, getTags]);

  const [fruit, setFruit] = useState<Fruit>();
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);

  const [updateFruit, { isLoading: updateLoading }] = useUpdateFruitMutation();
  const [addFruit, { isLoading: addLoading }] = useAddFruitMutation();
  const [deleteFruit] = useDeleteFruitMutation();

  const handleSave = async (fruit: Fruit, tags: string[]) => {
    if (fruit.id) {
      await updateFruit({ ...fruit, tags });
    } else {
      await addFruit({ ...fruit, tags });
    }
    await getFruits();
    handleProductModalClose();
  };

  const handleEdit = (fruit: Fruit) => {
    setFruit(fruit);
    setProductModalOpen(true);
  };

  const handleDelete = async (fruit: Fruit) => {
    await deleteFruit(fruit).unwrap();
    getFruits();
  };

  const handleProductModalClose = () => {
    setFruit(undefined);
    setProductModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setProductModalOpen(true)}
        startIcon={<Add />}
        sx={{ position: "absolute", right: 0 }}
      >
        Add Fruit
      </Button>

      <ProductTable
        products={fruits}
        tags={tags}
        type="fruit"
        loading={fruitsLoading}
        onEdit={handleEdit}
        onRemove={handleDelete}
      />
      {productModalOpen && (
        <ProductModal
          open={productModalOpen}
          type="fruit"
          product={fruit}
          productTags={fruit?.tags}
          selectableTags={tags}
          loading={updateLoading || addLoading}
          onSave={handleSave}
          onClose={handleProductModalClose}
        />
      )}
    </div>
  );
};
