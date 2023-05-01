import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TagChip from "components/TagChip/TagChip";
import { useState } from "react";
import { Tag } from "types/Tag";
import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setSelectedProduct } from "app/products";
import { Vegetable } from "types/Vegetable";
import { Fruit } from "types/Fruit";
import styled from "styled-components";

const SearchPanel = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { products, selectedProduct } = useAppSelector(
    (state) => state.products
  );
  const { tags } = useAppSelector((state) => state.tags);

  const setSelectedProductId = (productId: string) =>
    dispatch(setSelectedProduct(productId));

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setSelectedProductId("");
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setSelectedProductId("");
  };

  const handleProductSelect = (productId: string) => {
    selectedProduct?.id === productId
      ? setSelectedProductId("")
      : setSelectedProductId(productId);
  };

  const mapProductWithTags = (product: Fruit | Vegetable, tags: Tag[]) => ({
    ...product,
    tags: tags.filter((tag) => product.tags?.includes(tag.id)),
  });

  const mappedProducts = products
    .filter((item) => !item.isArchived)
    .map((product) => mapProductWithTags(product, tags));

  const filteredProducts = mappedProducts?.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some((tag) =>
          tag.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (selectedTags.length === 0 ||
        product.tags?.some((tag: Tag) => selectedTags.includes(tag.id)))
  );

  return (
    <>
      <SearchPanel>
        <TextField
          variant="outlined"
          defaultValue=""
          onChange={debounce(handleSearchChange, 250)}
          label="Search"
        />
        <div>
          {tags?.map((tag) => (
            <TagChip
              key={tag.id}
              tag={tag}
              onClick={handleTagClick}
              selected={selectedTags.includes(tag.id)}
            />
          ))}
        </div>
      </SearchPanel>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>No Product Found</TableCell>
              </TableRow>
            )}
            {filteredProducts?.map((product) => (
              <TableRow
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                selected={selectedProduct?.id === product.id}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell sx={{ width: 100 }}>
                  {product.tags?.map((tag) => (
                    <TagChip key={tag.id} tag={tag} />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductList;
