'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [skillteach, setSkillTeach] = useState('');
  const [skilllearn, setSkillLearn] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAuthor, setFavoriteAuthor] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [favoritePlace, setFavoritePlace] = useState('');
  const [email, setEmail] = useState('');

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
          body: JSON.stringify({
            username,
            password,
            email,
            skillteach,
            skilllearn,
          }),
        });

        const responsepref = await fetch('/api/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            favoriteColor,
            favoriteAuthor,
            favoriteFood,
            favoritePlace,
          }),
        });

        const data: RegisterResponseBody = await response.json();

        console.log('data', data);
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <label>
        {' '}
        Password:{' '}
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        My Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <h2>Choose a subject you would like to teach:</h2>
      <label>
        Math
        <input
          type="radio"
          name="optionteach"
          value="Math"
          onChange={(e) => {
            setSkillTeach(e.target.value);
          }}
        />
      </label>
      <label>
        Science
        <input
          type="radio"
          name="optionteach"
          value="Science"
          onChange={(e) => setSkillTeach(e.target.value)}
        />
      </label>
      <label>
        Literature
        <input
          type="radio"
          name="optionteach"
          value="Literature"
          onChange={(e) => setSkillTeach(e.target.value)}
        />
      </label>
      <label>
        Web Development
        <input
          type="radio"
          name="optionteach"
          value="Web Development"
          onChange={(e) => setSkillTeach(e.target.value)}
        />
      </label>

      <h2>Choose a subject you would like to learn:</h2>
      <label>
        Math
        <input
          type="radio"
          name="optionlearn"
          value="Math"
          onChange={(e) => setSkillLearn(e.target.value)}
        />
      </label>
      <label>
        Science
        <input
          type="radio"
          name="optionlearn"
          value="Science"
          onChange={(e) => setSkillLearn(e.target.value)}
        />
      </label>
      <label>
        Literature
        <input
          type="radio"
          name="optionlearn"
          value="Literature"
          onChange={(e) => setSkillLearn(e.target.value)}
        />
      </label>
      <label>
        Web Development
        <input
          type="radio"
          name="optionlearn"
          value="Web Development"
          onChange={(e) => setSkillLearn(e.target.value)}
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
              value={favoriteColor}
              onChange={(event) => setFavoriteColor(event.target.value)}
            />
          </label>
        </li>
        <li>
          <label>
            {' '}
            Who's your favorite author?
            <input
              value={favoriteAuthor}
              onChange={(event) => setFavoriteAuthor(event.target.value)}
            ></input>
          </label>
        </li>
        <li>
          <label>
            {' '}
            What's your favorite food?
            <input
              value={favoriteFood}
              onChange={(event) => setFavoriteFood(event.target.value)}
            ></input>
          </label>
        </li>
        <li>
          <label>
            {' '}
            What's your favorite place?
            <input
              value={favoritePlace}
              onChange={(event) => setFavoritePlace(event.target.value)}
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
