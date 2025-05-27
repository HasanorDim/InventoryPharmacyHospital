import supabase from "../config/supabase.js";

export const allData = async (req, res) => {
  try {
    const [medicineRes, categoriesRes, dosageRes, unitRes, storageRes] =
      await Promise.all([
        supabase.from("medicine_tb").select("*"),
        supabase.from("categories_tb").select("*"),
        supabase.from("dosageform_tb").select("*"),
        supabase.from("stockunit_tb").select("*"),
        supabase.from("storage_tb").select("*"),
      ]);

    const errorRes = [
      medicineRes.error,
      categoriesRes.error,
      dosageRes.error,
      unitRes.error,
      storageRes.error,
    ].filter(Boolean);

    if (errorRes.length > 0) {
      throw new AggregateError(errorRes, "Multiple database errors occurred");
    }
    ``;
    return res
      .status(200)
      .json({ medicineRes, categoriesRes, dosageRes, unitRes, storageRes });
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addingProduct = async (req, res) => {
  try {
    const { name, category, dosageForm, strength, stockUnit, storageType } =
      req.body;

    const { data: insertedData, error: er } = await supabase
      .from("medicine_tb")
      .insert([
        {
          medicine_name: name,
          strength,
          dosage_form: dosageForm,
          category,
          stockUnit,
          storageType,
        },
      ])
      .select();

    if (er) throw er;

    if (insertedData) {
      const { data: updatedData, error: errData } = await supabase
        .from("medicine_tb")
        .select("*");

      if (errData) throw errData;

      return res.status(200).json(updatedData);
    }
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const editProduct = async (req, res) => {
  const { name, category, dosageForm, strength, stockUnit, storageType, id } =
    req.body;

  if (
    !name.trim() ||
    !category.trim() ||
    !dosageForm.trim() ||
    !strength.trim() ||
    !stockUnit.trim() ||
    !storageType.trim()
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const { data: editedData, error: dataEr } = await supabase
      .from("medicine_tb")
      .update({
        medicine_name: name,
        category,
        dosage_form: dosageForm,
        strength,
        stockUnit,
        storageType,
      })
      .eq("id", id)
      .select();

    if (dataEr) throw dataEr;

    if (editedData) {
      const { data: newData, error: newDataError } = await supabase
        .from("medicine_tb")
        .select("*");

      if (newDataError) throw newDataError;

      return res.status(200).json(newData);
    }
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const { data: deletedData, error } = await supabase
      .from("medicine_tb")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) throw error;

    if (deletedData) {
      const { data, error: er } = await supabase
        .from("medicine_tb")
        .select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from adding unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addingCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const { data: insertedData, error: er } = await supabase
      .from("categories_tb")
      .insert([
        {
          name: name,
          description,
        },
      ])
      .select();

    if (er) throw er;

    if (insertedData) {
      const { data: getData, error: dataErr } = await supabase
        .from("categories_tb")
        .select("*");

      if (dataErr) throw dataErr;

      return res.status(200).json(getData);
    }
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const editCategory = async (req, res) => {
  const { name, description, id } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const { data: editedData, error: dataEr } = await supabase
      .from("categories_tb")
      .update({ name, description })
      .eq("id", id)
      .select();

    if (dataEr) throw dataEr;

    if (editedData) {
      const { data: newData, error: newDataError } = await supabase
        .from("categories_tb")
        .select("*");

      if (newDataError) throw newDataError;

      return res.status(200).json(newData);
    }
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    const { data: deletedData, error } = await supabase
      .from("categories_tb")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) throw error;

    if (deletedData) {
      const { data, error: er } = await supabase
        .from("categories_tb")
        .select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from adding unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addDosageForm = async (req, res) => {
  const { name, requiresStrength } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "Name fields is required" });
  }
  try {
    const { data: insertedData, error: er } = await supabase
      .from("dosageform_tb")
      .insert([
        {
          form_name: name,
          is_strength_require: requiresStrength,
        },
      ])
      .select();

    if (er) throw er;

    if (insertedData) {
      const { data: updatedData, error: ErrData } = await supabase
        .from("dosageform_tb")
        .select("*");

      if (ErrData) console.log("Error: ", ErrData);

      return res.status(200).json(updatedData);
    }
  } catch (error) {
    console.log("Error from adding Dosage: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const editDosage = async (req, res) => {
  const { name, requiresStrength, id } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const { data: editedData, error: dataEr } = await supabase
      .from("dosageform_tb")
      .update({ form_name: name, is_strength_require: requiresStrength })
      .eq("id", id)
      .select();

    if (dataEr) throw dataEr;

    if (editedData) {
      const { data: newData, error: newDataError } = await supabase
        .from("dosageform_tb")
        .select("*");

      if (newDataError) throw newDataError;

      return res.status(200).json(newData);
    }
  } catch (error) {
    console.log("Error from adding product: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteDosage = async (req, res) => {
  const { id } = req.body;

  try {
    const { data: deletedData, error } = await supabase
      .from("dosageform_tb")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) throw error;

    if (deletedData) {
      const { data, error: er } = await supabase
        .from("dosageform_tb")
        .select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from deleteDosage: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addUnit = async (req, res) => {
  const { name } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "fields is required" });
  }
  try {
    const { data: addedData, error: er } = await supabase
      .from("stockunit_tb")
      .insert([
        {
          name,
        },
      ])
      .select("*");

    if (er) throw er;

    if (addedData) {
      const { data, error: er } = await supabase
        .from("stockunit_tb")
        .select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from adding unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteUnit = async (req, res) => {
  const { id } = req.body;
  try {
    const { data: deletedData, error } = await supabase
      .from("stockunit_tb")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) throw error;

    if (deletedData) {
      const { data, error: er } = await supabase
        .from("stockunit_tb")
        .select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from adding unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const addStorage = async (req, res) => {
  const { name } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: "fields is required" });
  }
  try {
    const { data: addedData, error: er } = await supabase
      .from("storage_tb")
      .insert([
        {
          name,
        },
      ])
      .select("*");

    if (er) throw er;

    if (addedData) {
      const { data, error: er } = await supabase.from("storage_tb").select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from adding unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteStorage = async (req, res) => {
  const { id } = req.body;
  try {
    const { data: deletedData, error } = await supabase
      .from("storage_tb")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) throw error;

    if (deletedData) {
      const { data, error: er } = await supabase.from("storage_tb").select("*");

      if (er) throw er;

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error from deleteStorage unit: ", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};
