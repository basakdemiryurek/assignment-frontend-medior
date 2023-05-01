import { Chip } from "@mui/material";
import { TAG_COLORS } from "constants/product-constants";
import { Tag } from "types/Tag";

export interface TagChipProps {
  tag: Tag;
  selected?: boolean;
  onClick?: (id: string) => void;
}


const TagChip: React.FC<TagChipProps> = ({ tag, selected, onClick }) => {
  return (
    <Chip
      label={tag.name}
      clickable={!!onClick}
      onClick={() => onClick?.(tag.id)}
      sx={{
        backgroundColor: TAG_COLORS[tag.slug],
        color: "white",
        m: "3px",
        height: 20,
        border: selected ? "2px solid #0277fe" : "none",
      }}
    />
  );
};

export default TagChip;
