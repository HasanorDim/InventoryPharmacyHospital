import supabase from "../config/supabase.js";

export const addingProduct = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("Name: ", name);
    return res.status(200).json();
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};
