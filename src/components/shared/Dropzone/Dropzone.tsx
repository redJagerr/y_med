import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdAddPhotoAlternate } from 'react-icons/md';

import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { FileWithPreview } from '@/types';

import styles from './Dropzone.module.scss';

interface DropzoneProps {
  setSelectedImages: (files: FileWithPreview[]) => void;
  full?: boolean;
}

const cx = bindStyles(styles);

const Dropzone = ({ setSelectedImages, full }: DropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImages(
      acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={cx('container', {
        full,
        standart: !full
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <MdAddPhotoAlternate size={46} color='inherit' />
      <p>Перетащите фото или кликните, чтобы добавить</p>
    </div>
  );
};
export default Dropzone;
