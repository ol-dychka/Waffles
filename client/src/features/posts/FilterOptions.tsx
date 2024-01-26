import { useState } from "react";
import StyledBox from "../../components/StyledBox";
import { Box, Button, ButtonGroup, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import { Category, FilterPredicate } from "../../models/Post";
import { ArrowDropDownOutlined } from "@mui/icons-material";

type Props = {
  disabled?: boolean;
};

const FilterOptions = ({ disabled }: Props) => {
  const {
    postStore: { predicate, setPredicate },
  } = useStore();

  const [byCategory, setByCategory] = useState(
    predicate.has(FilterPredicate.Category)
  );

  const handleSetPredicate = (
    newPredicate: FilterPredicate,
    value?: Category
  ) => {
    if (
      (predicate.has(newPredicate) && // all except category check
        newPredicate !== FilterPredicate.Category) ||
      (predicate.has(FilterPredicate.Category) && // category check
        predicate.get(FilterPredicate.Category) === value)
    ) {
      setPredicate(FilterPredicate.All);
    } else {
      setPredicate(newPredicate, value);
    }
  };

  return (
    <StyledBox mb="0.5rem" sx={disabled ? { pointerEvents: "none" } : {}}>
      <ButtonGroup variant="text" color="secondary" fullWidth>
        <Button
          onClick={() => handleSetPredicate(FilterPredicate.IsFollowed)}
          sx={{
            color: predicate.has(FilterPredicate.IsFollowed)
              ? "primary.main"
              : "secondary.contrastText",
          }}
        >
          Followed
        </Button>
        <Button
          onClick={() => handleSetPredicate(FilterPredicate.IsLiked)}
          sx={{
            color: predicate.has(FilterPredicate.IsLiked)
              ? "primary.main"
              : "secondary.contrastText",
            padding: "0",
          }}
        >
          Likes
        </Button>
        <Button
          onClick={() => setByCategory(!byCategory)}
          sx={{
            color: predicate.has(FilterPredicate.Category)
              ? "primary.main"
              : "secondary.contrastText",
          }}
        >
          Categories
          <ArrowDropDownOutlined sx={{ fontSize: "1rem" }} />
        </Button>
      </ButtonGroup>
      <Divider />
      {byCategory && (
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap"
        >
          {Object.keys(Category).map((filter) => (
            <Button
              key={filter}
              onClick={() =>
                handleSetPredicate(
                  FilterPredicate.Category,
                  Category[filter as Category]
                )
              }
              sx={{
                color:
                  predicate.get(FilterPredicate.Category) ===
                  Category[filter as Category]
                    ? "primary.main"
                    : "secondary.contrastText",
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      )}
    </StyledBox>
  );
};
export default observer(FilterOptions);
