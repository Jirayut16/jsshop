import { Skeleton } from "antd";

export const SkeletonCard = () => {
  return (
    <div className="w-full h-[60vh] rounded-md overflow-hidden">
      <Skeleton.Avatar
        shape="square"
        style={{ width: 210, height: "40vh" }}
        active
      ></Skeleton.Avatar>
      <Skeleton.Input
        size="small"
        style={{ width: 210, marginTop: 10 }}
        active
      ></Skeleton.Input>

      <div className="flex flex-row gap-2 mt-2 mb-2">
        <Skeleton.Button
          size="small"
          style={{ width: 80 }}
          active
        ></Skeleton.Button>
        <Skeleton.Input
          size="small"
          style={{ width: 10 }}
          active
        ></Skeleton.Input>
      </div>
      <Skeleton.Input
        size="small"
        style={{ width: 210, height: "40px" }}
        active
      ></Skeleton.Input>
    </div>
  );
};
export const SkeletonCardLarge = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col  items-center rounded-md overflow-hidden">
      <Skeleton.Avatar
        shape="square"
        style={{ width: 210, height: "40vh" }}
        active
      ></Skeleton.Avatar>

      <div className="flex flex-row gap-2 mt-2 mb-2">
        <Skeleton.Button
          size="small"
          style={{ width: 80 }}
          active
        ></Skeleton.Button>
        <Skeleton.Input
          size="small"
          style={{ width: 10 }}
          active
        ></Skeleton.Input>
      </div>
      <Skeleton.Input
        size="small"
        style={{ width: 210, height: "40px" }}
        active
      ></Skeleton.Input>
    </div>
  );
};
