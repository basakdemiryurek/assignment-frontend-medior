import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Vegetable } from "types/Vegetable";
import { Fruit } from "types/Fruit";
import { Tag } from "types/Tag";
import TagChip from "components/TagChip/TagChip";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { TITLES } from "constants/product-constants";
import Header from "components/Header/Header";
import styled from "styled-components";

export interface ProductTableProps {
  products: Fruit[] | Vegetable[] | undefined;
  type: "fruit" | "vegetable";
  tags?: Tag[];
  loading?: boolean;
  onEdit: (product: Fruit | Vegetable) => void;
  onRemove: (product: Fruit | Vegetable) => void;
}

const TablePanel = styled.div`
  display: flex;
  justify-content: center;

  .table {
    min-width: 650px;
    max-width: 1200px;
    border: 1px solid rgba(224, 224, 224, 1);
  }

  thead {
    background-color: #f8ead8;
  }

  .action-panel: {
    display: flex;
  }
`;

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  tags,
  type,
  loading,
  onEdit,
  onRemove,
}) => {
  const title = TITLES[type];

  return (
    <>
      <Header title={`${title}s`} />
      <TablePanel>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!products && !loading && `No ${title}s Found`}
            {loading && `${title}s loading...`}
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="product">
                  {product.name}
                </TableCell>
                <TableCell sx={{ width: 500 }}>{product.description}</TableCell>
                <TableCell>
                  {tags &&
                    product.tags?.map((tagId) => {
                      const tag = tags.find((item) => item.id === tagId);
                      return tag ? <TagChip tag={tag} key={tag.id} /> : <></>;
                    })}
                </TableCell>
                <TableCell>
                  <div className="action-panel">
                    <IconButton onClick={() => onEdit(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onRemove(product)}>
                      <Delete />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TablePanel>
    </>
  );
};

export default ProductTable;
