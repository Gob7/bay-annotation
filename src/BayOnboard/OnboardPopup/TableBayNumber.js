// material-ui imports
import TableCell from "@mui/material/TableCell";

export default function TableBayNumber({ box, index, boxProps, setBoxProps }) {
  //change bay no.
  const handleInputChange = (index, field, value) => {
    if (field === "id") {
      const isDuplicate = boxProps.some(
        (box, i) => i !== index && box.id === value
      );

      if (isDuplicate) {
        alert("Two bays can't have same numbers");
        return;
      }
    }
    const updatedBoxProps = [...boxProps];
    updatedBoxProps[index][field] = value;
    setBoxProps(updatedBoxProps);
  };

  return (
    <>
      <TableCell align="center">
        <input
          type="number"
          value={box.id}
          onChange={(e) =>
            handleInputChange(index, "id", parseInt(e.target.value))
          }
          className="w-12 h-10 outline-none focus:border-blue-500 focus:border-2 text-center border rounded border-gray-400"
        />
      </TableCell>
    </>
  );
}
