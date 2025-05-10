import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { CSSObjectWithLabel, SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { addCategory } from "../slices/categoriesSlice";
import { store, useAppDispatch, useAppSelector } from "../store";
import { Category, OptionType, Transaction } from "../types/entities";
import { newCategoryKey } from "../utils/const";
import { generatePleasantColor } from "../utils/generatePleasantColor";
import { parseDateEx } from "../utils/parseDateEx";
import { prepareOptions } from "../utils/prepareOptions";

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

interface FormState {
  amount: string;
  description: string;
  date: string;
  categoryId: string;
}

const customStyles = {
  option: (
    base: CSSObjectWithLabel,
    state: { data: OptionType; isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...base,
    backgroundColor: state.data.color || (state.isFocused ? "#eee" : undefined),
    color: state.data.color ? "white" : "black",
  }),
  singleValue: (
    base: CSSObjectWithLabel,
    state: { data: OptionType }
  ): CSSObjectWithLabel => ({
    ...base,
    backgroundColor: state.data.color,
    color: state.data.color ? "white" : base.color,
    padding: "2px 6px",
    borderRadius: "4px",
  }),
};

export const TransactionForm: FC<TransactionFormProps> = ({
  onAddTransaction,
}) => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<FormState>({
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  });
  const defaultCategories = useAppSelector((state) => state.categories);
  const defaultCategoriesOptions = defaultCategories.map(prepareOptions);
  const [categoriesOptions, setCategoriesOptions] = useState(
    defaultCategoriesOptions
  );
  const selectedOption = categoriesOptions.find(
    (option) => option.value === formState.categoryId
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line prefer-const
    let { amount, description, date, categoryId } = formState;

    const numericAmount = parseFloat(amount);

    if (!numericAmount || !description || !date) {
      alert("Please fill out all fields correctly.");
      return;
    }

    if (categoryId === newCategoryKey) {
      if (!selectedOption || !selectedOption.label) {
        alert("Please select a category.");
        return;
      }
      const newCategory: Category = {
        id: uuidv4(),
        name: selectedOption.label,
        color: selectedOption.color
      };
      categoryId = newCategory.id;
      dispatch(addCategory(newCategory));
      const newDefaultCategoriesOptions = store
        .getState()
        .categories.map(prepareOptions);
      setCategoriesOptions(newDefaultCategoriesOptions);
    }

    onAddTransaction({
      amount: numericAmount,
      description,
      date,
      isDone: false,
      trueDate: parseDateEx(date),
      categoryId,
    });

    setFormState({ amount: "", description: "", date: "", categoryId });
  };

  const handleCreateOption = (newValue: string): void => {
    const newOption = {
      value: newCategoryKey,
      label: newValue,
      color: generatePleasantColor(),
    };
    setCategoriesOptions([...defaultCategoriesOptions, newOption]);
    setFormState((prev) => ({
      ...prev,
      categoryId: newCategoryKey,
    }));
  };

  const handleCategoryChange = (newOption: SingleValue<OptionType>): void => {
    const selectedValue = newOption?.value ?? "";
    setFormState((prev) => ({
      ...prev,
      categoryId: selectedValue,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        name="amount"
        value={formState.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-1/5 p-2 border rounded"
      />
      <input
        type="text"
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-2/5 p-2 border rounded"
      />
      <input
        type="text"
        name="date"
        value={formState.date}
        onChange={handleChange}
        placeholder="Date (dd/mm)"
        className="w-1/5 p-2 border rounded"
      />
      <CreatableSelect
        options={categoriesOptions}
        className="w-1/5"
        placeholder="Select categories"
        styles={customStyles}
        onCreateOption={handleCreateOption}
        onChange={handleCategoryChange}
        value={selectedOption}
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        <FontAwesomeIcon icon={faAdd} />
      </button>
    </form>
  );
};
