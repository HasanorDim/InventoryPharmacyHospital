import supabase from "../config/supabase.js";

export const addingProduct = async (req, res) => {
  try {
    const { name, category, dosageForm, strength, stockUnit } = req.body;

    const { data: insertedData, error: er } = await supabase
      .from("medicine_tb")
      .insert([
        {
          medicine_name: name,
          strength,
          dosage_form: dosageForm,
          category,
          stockUnit,
        },
      ]);

    if (er) throw er;

    return res.status(200).json();
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};
