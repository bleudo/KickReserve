import React from "react";
import { FaFutbol } from "react-icons/fa";

const FieldSelector = ({ fields, selectedField, onFieldChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-green-700 mb-2 flex items-center">
        <FaFutbol className="mr-2 text-green-600" />
        Seleccione el campo
      </label>
      <select
        value={selectedField}
        onChange={(e) => onFieldChange(e.target.value)}
        className="p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500 transition duration-300 w-full sm:w-auto bg-white text-green-800"
      >
        <option value="">Todos los campos</option>
        {fields.map((field) => (
          <option key={field.id} value={field.field_id}>
            {field.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FieldSelector;
