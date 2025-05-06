import Skeleton from "@mui/material/Skeleton";

const SkeletonSkeleton = () => (
    <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
            <Skeleton variant="text" width="100%" height={20} className="mb-2" />
            <Skeleton variant="text" width="80%" height={15} className="mb-2" />
            <Skeleton variant="text" width="60%" height={20} />
        </div>
    </div>
);

export default SkeletonSkeleton; // ✅ Thêm export mặc định
