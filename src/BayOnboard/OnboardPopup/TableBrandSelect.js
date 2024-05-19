// material-ui imports
import TableCell from "@mui/material/TableCell";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// options
const brandsOptions = ["Zivame", "Clovia", "Amanté", "Jockey"];

export default function TableBrandSelect({ box, setBoxProps }) {
  // change brand wrt bay
  const handleBrandChange = (id, newBrand) => {
    setBoxProps((prevBoxProps) =>
      prevBoxProps.map((item) =>
        item.id === id ? { ...item, brand: newBrand } : item
      )
    );
  };

  return (
    <>
      <TableCell align="center">
        <FormControl
          size="small"
          sx={{
            width: "106px",
          }}
          fullWidth
        >
          <InputLabel>Select</InputLabel>
          <Select
            value={box.brand}
            label="Select"
            onChange={(e) => handleBrandChange(box.id, e.target.value)}
          >
            {brandsOptions.map((brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </>
  );
}
