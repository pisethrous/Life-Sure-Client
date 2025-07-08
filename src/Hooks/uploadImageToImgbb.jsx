import axios from "axios";

const uploadImageToImgbb = async (imageFile) => {
 
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_API_KEY}`,
      formData
    );

    const data = res.data;
    if (data.success) {
      return data.data.url; 
    } else {
      throw new Error("Image upload failed");
    }
  } catch (err) {
    throw new Error("Image upload error: " + err.message);
  }
};

export default uploadImageToImgbb;
