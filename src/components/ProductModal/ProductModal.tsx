import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Product } from "types/Product";
import { Tag } from "types/Tag";
import { DEFAULT_PRODUCT, TITLES } from "constants/product-constants";
import styled from "styled-components";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";

export interface ProductModalProps {
  open: boolean;
  type: "fruit" | "vegetable";
  product?: Product;
  productTags?: string[];
  selectableTags?: Tag[];
  loading?: boolean;
  onSave: (product: Product, tags: string[]) => void;
  onClose: () => void;
}

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  .action-panel {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  type,
  product,
  productTags,
  selectableTags,
  loading,
  onSave,
  onClose,
}) => {
  const currentProduct = product || DEFAULT_PRODUCT;

  const [selectedTags, setSelectedTags] = useState<string[]>(productTags || []);

  const title = TITLES[type];

  const formik = useFormik({
    initialValues: product || DEFAULT_PRODUCT,
    onSubmit: (values) => {
      onSave(values, selectedTags);
    },
  });

  useEffect(() => {
    formik.resetForm({ values: product || DEFAULT_PRODUCT });
    setSelectedTags(productTags || []);
  }, [product, productTags, open, formik]);

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: currentProduct.name,
          description: currentProduct.description,
          tags: selectedTags,
          isArchived: currentProduct.isArchived ?? false,
        }}
        validationSchema={object().shape({
          name: string().required("Required"),
          description: string().required("Required"),
        })}
        onSubmit={(values) => {
          const updatedProduct: Product = {
            id: currentProduct.id,
            name: values.name,
            description: values.description,
            isArchived: values.isArchived,
          };
          onSave(updatedProduct, values.tags);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h3>Add {title}</h3>
            <TextField
              label="Title"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              required
            />
            <TextField
              label="Description"
              name="description"
              value={values.description}
              multiline
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              required
            />
            <h4>Tags</h4>
            <div style={{ display: "flex" }}>
              {selectableTags?.map((tag) => (
                <FormControlLabel
                  key={tag.id}
                  control={
                    <Checkbox
                      checked={values.tags.includes(tag.id)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={tag.id}
                      name="tags"
                    />
                  }
                  label={tag.name}
                />
              ))}
            </div>
            {product?.id && (
              <>
                <Divider />
                <FormControlLabel
                  key={product.id}
                  checked={values.isArchived}
                  control={
                    <Checkbox
                      checked={values.isArchived}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.isArchived}
                      name="isArchived"
                    />
                  }
                  label="Archived"
                />
              </>
            )}
            <div className="action-panel">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={!dirty || isSubmitting || !isValid}
                loading={loading}
              >
                {product ? "Edit" : "Add"} {title}
              </LoadingButton>
              <Button onClick={onClose} variant="outlined" color="primary">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProductModal;
