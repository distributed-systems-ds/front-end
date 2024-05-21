import { useState, useEffect } from "react";
import CategoryServices from "../../services/categoryServices";
import FormCategory from "./formCategories";
import TableCategories from "./tableCategories";
import Footer from "../utils/footer";
import Header from "../utils/header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ModalAlert from "../utils/modalAlert";

const CrudCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [dataToEdit, setDataToEdit] = useState<any>(null);

  useEffect(() => {
    try {
      CategoryServices.getCategories().then((res) => {
        setCategories(res.data);
      });
    } catch (error) {
      ModalAlert.ModalAlertError("Error", "Error al cargar las categorías");
    }
  }, []);

  const createData = (data: any) => {
    try {
      CategoryServices.create(data).then((res) => {
        setCategories((prevCategories) => [...prevCategories, res.data]);
      });
      ModalAlert.ModalAlertSuccess("Éxito", "Categoría creada correctamente");
    } catch (error) {
      ModalAlert.ModalAlertError("Error", "Error al crear la categoría");
    }
  };

  const updateData = (data: any) => {
    try {
      let updatedCategory: any = null;
      let newCategories = categories.map((el: any) => {
        if (el.name === data.name) {
          updatedCategory = data;
          return data;
        }
        return el;
      });

      CategoryServices.update(updatedCategory).then((_res) => {
        setCategories(newCategories);
      });
      ModalAlert.ModalAlertSuccess(
        "Éxito",
        "Categoría actualizada correctamente"
      );
    } catch (error) {
      ModalAlert.ModalAlertError("Error", "Error al actualizar la categoría");
    }
  };

  const deleteData = async (data: any) => {
    try {
      await CategoryServices.deleteCategory(data);
      const filteredCategories = categories.filter(
        (el: any) => el.name !== data
      );
      setCategories(filteredCategories);
      ModalAlert.ModalAlertSuccess(
        "Éxito",
        "Categoría eliminada correctamente"
      );
    } catch (error) {
      ModalAlert.ModalAlertError(
        "Error",
        "Error al eliminar la categoría, puede que este instanciada en otro objeto"
      );
    }
  };

  return (
    <>
      <Header />
      <div className="container-add-role">
        <FormCategory
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <TableCategories
          data={categories}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </div>
      <Link to="/" style={{ textAlign: "center" }}>
        <Typography>Volver</Typography>
      </Link>
      <Footer />
    </>
  );
};

export default CrudCategory;
