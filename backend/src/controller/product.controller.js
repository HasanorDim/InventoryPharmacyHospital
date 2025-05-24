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

export const dataCategory = async (req, res) => {
  try {
    const { data: insertedData, error: er } = await supabase
      .from("categories_tb")
      .select("*");

    if (er) throw er;

    return res.status(200).json(insertedData);
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addingCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name.trim() || !description.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const { error: er } = await supabase.from("categories_tb").insert([
      {
        name: name,
        description,
      },
    ]);

    if (er) throw er;

    return res.status(200).json();
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};
export const addDosageForm = async (req, res) => {
  const { name, requiresStrength } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const { error: er } = await supabase.from("dosageform_tb").insert([
      {
        form_name: name,
        is_strength_require: requiresStrength,
      },
    ]);

    if (er) throw er;

    return res.status(200).json();
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const dataDosageForm = async (req, res) => {
  try {
    const { data: insertedData, error: er } = await supabase
      .from("dosageform_tb")
      .select("*");

    if (er) throw er;

    return res.status(200).json(insertedData);
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};
