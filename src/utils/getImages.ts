import lqip from "lqip-modern";
import { createApi } from "unsplash-js";
import { Photo } from "../types";

async function getDataUrl(url: string) {
  const imgData = await fetch(url);

  const arrayBufferData = await imgData.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
}

const getImages = async (
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> => {
  const mappedPhotos: Photo[] = [];

  const photos = await cli.search.getPhotos({
    query: query,
    page: 1,
    perPage: 10,
  });

  if (photos.type === "success") {
    const photosArr = photos.response.results.map((d, i) => {
      return {
        src: d.urls.full,
        thumb: d.urls.thumb,
        width: d.width,
        height: d.height,
        alt: d.alt_description ?? `ocean-img-${i}`,
      };
    });

    const photosArrWithDataUrl: Photo[] = [];

    for (const photo of photosArr) {
      const dataUrl = await getDataUrl(photo.src);
      photosArrWithDataUrl.push({
        ...photo,
        bluredDataUrl: dataUrl,
      });
    }

    mappedPhotos.push(...photosArrWithDataUrl);
  } else {
    console.error("could not get oceans");
  }

  return mappedPhotos;
};

export default getImages;
