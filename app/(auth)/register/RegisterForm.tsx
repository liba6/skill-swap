'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import { useForm } from '../useForm';
import styles from './page.module.scss';

export default function RegisterForm() {
  const [formValues, handleChange, registerData, preferencesData] = useForm();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });

        const responsepref = await fetch('/api/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferencesData),
        });

        const data: RegisterResponseBody = await response.json();
        console.log('body', data);

        const datapref: string = await responsepref.json();

        alert(datapref);
        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        router.push(`/profile/${data.user.username}`);
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <label>
        {' '}
        Username:{' '}
        <input
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
      </label>
      <label>
        {' '}
        Password:{' '}
        <input
          name="password"
          value={formValues.password}
          type="password"
          onChange={handleChange}
        />
      </label>
      <label>
        My Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </label>
      <h2>Choose a subject you would like to teach:</h2>
      <label>
        Math
        <input
          type="radio"
          name="skillteach"
          value="Math"
          onChange={handleChange}
        />
      </label>
      <label>
        Science
        <input
          type="radio"
          name="skillteach"
          value="Science"
          onChange={handleChange}
        />
      </label>
      <label>
        Literature
        <input
          type="radio"
          name="skillteach"
          value="Literature"
          onChange={handleChange}
        />
      </label>
      <label>
        Web Development
        <input
          type="radio"
          name="skillteach"
          value="Web Development"
          onChange={handleChange}
        />
      </label>

      <h2>Choose a subject you would like to learn:</h2>
      <label>
        Math
        <input
          type="radio"
          name="skilllearn"
          value="Math"
          onChange={handleChange}
        />
      </label>
      <label>
        Science
        <input
          type="radio"
          name="skilllearn"
          value="Science"
          onChange={handleChange}
        />
      </label>
      <label>
        Literature
        <input
          type="radio"
          name="skilllearn"
          value="Literature"
          onChange={handleChange}
        />
      </label>
      <label>
        Web Development
        <input
          type="radio"
          name="skilllearn"
          value="Web Development"
          onChange={handleChange}
        />
      </label>
      <hr></hr>
      <h3>Tell us a bit about yourself:</h3>
      <ul>
        <li>
          <label>
            {' '}
            What's your favorite color?
            <input
              name="favoriteColor"
              value={formValues.favoriteColor}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <label>
            {' '}
            Who's your favorite author?
            <input
              name="favoriteAuthor"
              value={formValues.favoriteAuthor}
              onChange={handleChange}
            ></input>
          </label>
        </li>
        <li>
          <label>
            {' '}
            What's your favorite food?
            <input
              name="favoriteFood"
              value={formValues.favoriteFood}
              onChange={handleChange}
            ></input>
          </label>
        </li>
        <li>
          <label>
            {' '}
            What's your favorite place?
            <input
              name="favoritePlace"
              value={formValues.favoritePlace}
              onChange={handleChange}
            ></input>
          </label>
        </li>
      </ul>
      <div>
        <button>Register</button>
      </div>
    </form>
  );
}
