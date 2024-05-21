import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

interface IProps {
  el: any;
  setDataToEdit: any;
  owns: any;
}

const TableOrderItems: React.FC<IProps> = ({ el, setDataToEdit, owns }) => {
  let { userEmail, status, total, items } = el;
  return (
    <TableRow sx={{ textAlgin: "center" }}>
      <TableCell style={{ textAlign: "center" }}>{userEmail}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{status}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{total}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{items}</TableCell>
      {owns && (
        <TableCell style={{ textAlign: "center" }}>
          <Button onClick={() => setDataToEdit(el)}>Editar</Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableOrderItems;
