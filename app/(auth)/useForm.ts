import { ChangeEvent, useState } from 'react';

type FormValues = {
  username: string;
  password: string;
  skillteach: string;
  skilllearn: string;
  favoriteColor: string;
  favoriteAuthor: string;
  favoriteFood: string;
  favoritePlace: string;
  email: string;
};

type RegisterData = {
  username: string;
  password: string;
  email: string;
  skillteach: string;
  skilllearn: string;
};

type PreferencesData = {
  username: string;
  favoriteColor: string;
  favoriteAuthor: string;
  favoriteFood: string;
  favoritePlace: string;
};

// type ChangeFormValues = (
//   formValues: FormValues,
//   event: ChangeEvent<HTMLInputElement>,
// ) => void;


// type UseFormReturn = [FormValues, handleChange, RegisterData, PreferencesData];
type UseFormReturn = [FormValues, (event: ChangeEvent<HTMLInputElement>) => void, RegisterData, PreferencesData];


export const useForm = (): UseFormReturn => {
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
