import type { LightGallery } from "lightgallery/lightgallery";
import type { Photo } from "../types";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { useRef } from "react";
import LightGalleryComponent from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";


type GalleryProps = {
  photos: Photo[];
};

const Gallery = ({ photos }: GalleryProps) => {
  const lightboxRef = useRef<LightGallery | null>(null);
  return (
    <>
      <Masonry className="flex gap-4" columnClassName="" breakpointCols={2}>
        {photos.map((photo, i) => {
          return (
            <div className="relative" key={photo.src}>
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                className="my-4"
                placeholder="blur"
                blurDataURL={photo.bluredDataUrl}
              />
              <div
                className="hover: absolute inset-0 h-full w-full cursor-pointer bg-transparent hover:bg-stone-900  hover:bg-opacity-10"
                onClick={() => {
                  lightboxRef.current?.openGallery(i);
                }}
              ></div>
            </div>
          );
        })}
      </Masonry>

      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => {
          return {
            src: photo.src,
            thumb: photo.thumb,
          };
        })}
      />
    </>
  );
};

export default Gallery;
