import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  api,
  useAddVegetableMutation,
  useDeleteVegetableMutation,
  useUpdateVegetableMutation,
} from "app/api";
import ProductModal from "components/ProductModal/ProductModal";
import ProductTable from "components/ProductTable/ProductTable";
import { useState, useEffect } from "react";
import { Vegetable } from "types/Vegetable";

export const Vegetables = () => {
  const [getTags, { data: tags }] = api.useLazyGetVegetableTagsQuery();
  const [getVegetables, { data: vegetables, isLoading: vegetablesLoading }] =
    api.useLazyGetVegetablesQuery();

  useEffect(() => {
    getVegetables();
    getTags();
  }, [getTags, getVegetables]);

  const [vegetable, setVegetable] = useState<Vegetable>();
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);

  const [updateVegetable, { isLoading: updateLoading }] =
    useUpdateVegetableMutation();
  const [addVegetable, { isLoading: addLoading }] = useAddVegetableMutation();
  const [deleteVegetable] = useDeleteVegetableMutation();

  const handleSave = async (vegetable: Vegetable, tags: string[]) => {
    if (vegetable.id) {
      await updateVegetable({ ...vegetable, tags });
    } else {
      await addVegetable({ ...vegetable, tags });
    }
    handleProductModalClose();
    getVegetables();
  };

  const handleEdit = (vegetable: Vegetable) => {
    setVegetable(vegetable);
    setProductModalOpen(true);
  };

  const handleDelete = async (vegetable: Vegetable) => {
    await deleteVegetable(vegetable).unwrap();
    getVegetables();
  };

  const handleProductModalClose = () => {
    setVegetable(undefined);
    setProductModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setProductModalOpen(true)}
        startIcon={<Add />}
        sx={{ position: "absolute", right: 0 }}
      >
        Add Vegetable
      </Button>

      <ProductTable
        products={vegetables}
        tags={tags}
        type="vegetable"
        loading={vegetablesLoading}
        onEdit={handleEdit}
        onRemove={handleDelete}
      />

      <ProductModal
        open={productModalOpen}
        type="vegetable"
        product={vegetable}
        productTags={vegetable?.tags}
        selectableTags={tags}
        loading={updateLoading || addLoading}
        onSave={handleSave}
        onClose={handleProductModalClose}
      />
    </div>
  );
};
