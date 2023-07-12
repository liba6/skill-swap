import { ChangeEvent, useState } from 'react';

export const useForm = (): ((
  formValues: {
    username: string;
    password: string;
    skillteach: string;
    skillearn: string;
    favoriteColor: string;
    favoriteAuthor: string;
    favoriteFood: string;
    favoritePlace: string;
    email: string;
  },
  event: ChangeEvent<HTMLInputElement>,
) => void) => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    skillteach: '',
    skilllearn: '',
    favoriteColor: '',
    favoriteAuthor: '',
    favoriteFood: '',
    favoritePlace: '',
    email: '',
  });
  const registerData = {
    username: formValues.username,
    password: formValues.password,
    email: formValues.email,
    skillteach: formValues.skillteach,
    skilllearn: formValues.skilllearn,
  };

  const preferencesData = {
    username: formValues.username,
    favoriteColor: formValues.favoriteColor,
    favoriteAuthor: formValues.favoriteAuthor,
    favoriteFood: formValues.favoriteFood,
    favoritePlace: formValues.favoritePlace,
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  return [formValues, handleChange, registerData, preferencesData];
};
