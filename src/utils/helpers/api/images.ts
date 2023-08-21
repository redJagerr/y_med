import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FileWithPath } from 'react-dropzone';

import { storage } from '@/@firebase';
import { FileWithPreview } from '@/types';

interface UploadImagesArrayParams {
  selectedImages: FileWithPreview[];
  urlPath: string;
}
interface UploadImageParams {
  urlPath: string;
  image: FileWithPath;
}

export const uploadImage = async ({ urlPath, image }: UploadImageParams) => {
  const imageRef = ref(storage, `${urlPath}/${image.path}`);
  const url = uploadBytes(imageRef, image).then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  });
  return url;
};

export const uploadImagesArray = async ({
  selectedImages,
  urlPath
}: UploadImagesArrayParams): Promise<string[]> => {
  const imagesUrlArray = await Promise.all(
    selectedImages.map(async (image) => {
      const url = await uploadImage({ urlPath, image });
      return url;
    })
  );
  return imagesUrlArray;
};
