import React, { useState, useRef } from "react";
import CustomModal from "../CustomModal/CustomModal";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import InputField from "../InputField/InputField";

const AiImageModal = ({ isModalOpen, setIsModalOpen, setSelectedImage }) => {
  const scroller = useRef();
  const [images, setImages] = useState([]);
  const [textPrompt, setTextPrompt] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = (direction) => {
    console.log(direction);
    console.log(imageIndex + direction);
    if (
      imageIndex + direction <= 0 &&
      imageIndex + direction > -images.length
    ) {
      setImageIndex((prev) => prev + direction);
      scroller.current.style.transform = `translateX(calc(${
        imageIndex + direction
      } * 100%))`;
    }
  };

  const generateImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/OpenAi", {
        prompt: textPrompt,
      });
      console.log(response);
      setImages((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={"Create Your Own AI Generated Image from text"}
      footer={
        <>
          <Button
            color="primary"
            onPress={generateImage}
            isDisabled={images.length >= 5}
            isLoading={isLoading}
          >
            {images.length == 0 ? "Generate" : "Regenerate"}
          </Button>
          <Button
            color="success"
            onPress={() => setSelectedImage(images[imageIndex])}
            isDisabled={images.length == 0}
          >
            Select
          </Button>
        </>
      }
    >
      <>
        {images.length != 0 ? (
          <span className="flex ">
            <span
              className="h-full self-center px-2 cursor-pointer z-10"
              onClick={() => handleScroll(1)}
            >
              <IoIosArrowBack size={30} />
            </span>
            <div className="overflow-hidden">
              <span className="flex justify-evenly" ref={scroller}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="flex min-w-[100%] max-h-[50vh] justify-center "
                  >
                    <img src={img} className="max-h-[50vh]"></img>
                  </div>
                ))}
              </span>
            </div>
            <span
              className="h-full self-center px-2 cursor-pointer z-10"
              onClick={() => handleScroll(-1)}
            >
              <IoIosArrowForward size={30} />
            </span>
          </span>
        ) : (
          ""
        )}
        <InputField
          label="Prompt"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
        />
      </>
    </CustomModal>
  );
};

export default AiImageModal;
