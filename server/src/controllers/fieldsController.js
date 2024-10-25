import * as fieldsService from "../services/fieldsService.js";

export const getAllFields = async (req, res) => {
  try {
    const fields = await fieldsService.getAllFields();
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ "Error getting fields": error });
  }
};
