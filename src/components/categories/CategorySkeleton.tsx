import { Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  return (
    <div className="flex items-center flex-shrink-0 bg-gray-100 p-4 rounded-2xl shadow-sm w-60">
      {/* Phần nội dung text */}
      <div className="flex flex-col space-y-3 w-2/3">
        <Skeleton variant="text" width={120} height={25} />
        <Skeleton variant="rounded" width={90} height={35} />
      </div>

      {/* Hình ảnh danh mục */}
      <Skeleton variant="circular" width={96} height={96} className="rounded-full" />
    </div>
  );
};

export default CategorySkeleton;
