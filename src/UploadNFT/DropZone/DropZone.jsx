"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../../img";

const DropZone = ({ title, setFileUrl, setFile }) => {
  const [image, setImage] = useState(images.upload);
  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(URL.createObjectURL(acceptedFile[0]));
    setFile(acceptedFile[0]);
    setImage(URL.createObjectURL(acceptedFile[0]));
    console.log(URL.createObjectURL(acceptedFile[0]));
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
    multiple: false,
  });
  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={image}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{"Drag & drop file"}</p>
          <p>{"or Browse media on your device"}</p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
