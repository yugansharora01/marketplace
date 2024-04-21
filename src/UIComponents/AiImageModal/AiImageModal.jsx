import React, { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import { Button } from "@nextui-org/react";
import axios from "axios";
import InputField from "../InputField/InputField";

const AiImageModal = ({ isModalOpen, setIsModalOpen, setSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [textPrompt, setTextPrompt] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/OpenAi", {
        prompt: textPrompt,
      });
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
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
        <div>
          {images.map((img,i) => (
            <div key={i}>
              <img src={img}></img>
            </div>
          ))}
        </div>
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
