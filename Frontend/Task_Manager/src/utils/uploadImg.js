import { API_PATHS } from "./apiPath.js";
import axiosInstance from "./axiosInstance.js";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  //Append image
  formData.append("img", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error uploading image", err);
    throw err;
  }
};

export default uploadImage;
