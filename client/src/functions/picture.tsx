import axios from "axios";

const apiKey = "39657932-9a857906b3681a2e45901ee24"; // รหัส API ของ Unsplash
const URL = `https://pixabay.com/api/?key=${apiKey}&category=backgrounds&image_type=photo&per_page=50`;

export const getRandomPhotos = async () => {
  try {
    return await axios.get(URL);
  } catch (err) {
    console.log(err);
  }
};
