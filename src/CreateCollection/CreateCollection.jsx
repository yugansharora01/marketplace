"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineHttp } from "react-icons/md";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

//INTERNAL IMPORT
import Style from "./CreateCollection.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";
import InputField from "@/UIComponents/InputField/InputField";
import TextArea from "@/UIComponents/TextArea/TextArea";
import CustomModal from "@/UIComponents/CustomModal/CustomModal";

const CreateCollection = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useUser();
  const [isCollectionCreated, setIsCollectionCreated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [collection, setCollection] = useState({
    CollectionName: "",
    Owner: "MetaRivals",
    BannerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrCCUOb7jgI-J7qrlrDj2jlmoOsa4PvCyUg0bj9tCusE56o0liRmgwTEFwScxEgt5pugM&usqp=CAU",
    ProfileImage:
      "https://styles.redditmedia.com/t5_2stnc/styles/communityIcon_uyjx15y39lm91.jpg",
    Category: "",
    Description: "",
    Chain: "Ethereum",
    Website: "",
    TotalVolume: 0,
    CreatedAt: Date.now(),
  });

  const OnCreate = async () => {
    try {
      setLoading(true);
      console.log(collection);
      const response = await axios.post("/api/Collections", collection);
      setIsCollectionCreated(true);
      console.log("Success submission", response.data);
    } catch (error) {
      console.log("Collection submit failed ", error?.response?.data);
      setIsCollectionCreated(false);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    console.log(state.userData);
    console.log(state.userData._id);
    setCollection({
      ...collection,
      Owner: state.userData._id,
    });
  }, [state.userData]);

  return (
    <div className={Style.upload}>
      <InputField
        label="Banner Image IPFS link"
        placeholder="Banner Image"
        value={collection.BannerImage}
        onChange={(e) =>
          setCollection({ ...collection, BannerImage: e.target.value })
        }
      />
      <InputField
        label="Profile Image IPFS link"
        placeholder="Profile Image"
        value={collection.ProfileImage}
        onChange={(e) =>
          setCollection({ ...collection, ProfileImage: e.target.value })
        }
      />
      <InputField
        label="Collection Name"
        placeholder="Collection Name"
        value={collection.CollectionName}
        onChange={(e) =>
          setCollection({ ...collection, CollectionName: e.target.value })
        }
      />
      <InputField
        label="Category"
        placeholder="Category"
        value={collection.Category}
        onChange={(e) =>
          setCollection({ ...collection, Category: e.target.value })
        }
      />

      <InputField
        label="website"
        placeholder="website"
        value={collection.Website}
        onChange={(e) =>
          setCollection({ ...collection, Website: e.target.value })
        }
        icon={<MdOutlineHttp />}
      />
      <TextArea
        label="Description"
        placeholder="something about collection in few words"
        value={collection.Description}
        onChange={(e) =>
          setCollection({ ...collection, Description: e.target.value })
        }
      />

      <div className={Style.upload_box_btn}>
        <MyCustomButton
          btnName="Create"
          handleClick={OnCreate}
          classStyle={Style.upload_box_btn_style}
          btnProps={{ isLoading: loading }}
        />
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={
            isCollectionCreated
              ? "Collection Created Successfully!!"
              : "Unable to Create Collection"
          }
          footer={
            isCollectionCreated ? (
              <Button color="primary" onPress={() => Router.push("/profile")}>
                Go to Profile
              </Button>
            ) : (
              ""
            )
          }
        >
          {isCollectionCreated ? (
            <p>You can view your created collection in your profile</p>
          ) : (
            <p>Unable to Create Collection please try again </p>
          )}
        </CustomModal>
      </div>
    </div>
  );
};

export default CreateCollection;
