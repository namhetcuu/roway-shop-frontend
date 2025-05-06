import Skeleton from "@mui/material/Skeleton";

const ProductSkeleton = () => (
    <div className="p-4">
        <Skeleton variant="rectangular" width="100%" height={250} />
        <Skeleton variant="text" width="80%" height={30} style={{ marginTop: 10 }} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 10 }} />
    </div>
);

export default ProductSkeleton; // ✅ Thêm export mặc định
