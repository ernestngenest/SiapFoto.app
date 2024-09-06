import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyImages } from "../features/fetchImage/fetchImage.js";
import MyPhoto from "./MyPhoto";

export default function MyImages() {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.list);

  useEffect(() => {
    dispatch(fetchMyImages());
  }, [dispatch]);

  console.log(images, "ini image");
  return (
    <div className="relative mb-7 w-full">
      <div className="flex justify-center mt-12">
        <p className="text-2xl font-semibold">My Images Result</p>
      </div>
      <div className="flex flex-wrap gap-3 mt-5">
        {images.length > 0 ? (
          images.map(el => {
            return <MyPhoto key={el.id} image={el} />;
          })
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}
