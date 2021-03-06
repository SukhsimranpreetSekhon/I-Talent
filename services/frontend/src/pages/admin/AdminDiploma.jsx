import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import DiplomaTable from "../../components/admin/diplomaTable/DiplomaTable";

const AdminDiploma = () => (
  <AdminLayout displaySideBar type="diplomas">
    <DiplomaTable />
  </AdminLayout>
);

export default AdminDiploma;
