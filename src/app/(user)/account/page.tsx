import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Quan trọng: Cần import CSS để Toast hoạt động!
import { UserProfile } from "./components/UserProfile";

export default function Page() {
  return (
    <>
      <main>
        <UserProfile />
      </main>

      {/* Thêm ToastContainer vào đây */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
