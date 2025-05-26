import React, { FC, FormEvent, useState } from "react";

interface RenamePlanFormProps {
  currentName: string;
  onSubmit: (newName: string) => void;
}

export const RenamePlanForm: FC<RenamePlanFormProps> = ({ currentName, onSubmit }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (newName.trim()) {
      onSubmit(newName);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Plan Name
        </label>
        <input
          type="text"
          value={newName}
          onChange={(e): void => setNewName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter new plan name"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Rename
      </button>
    </form>
  );
};
