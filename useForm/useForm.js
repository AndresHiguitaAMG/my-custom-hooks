import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const handleOnChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetForm = () => {
    setFormState(initialForm);
  }

  return {
    ...formState,
    formState,
    handleOnChange,
    handleResetForm,
  };
};
