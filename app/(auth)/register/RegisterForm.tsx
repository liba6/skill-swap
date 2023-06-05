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
          body: JSON.stringify({ username, password, skillteach, skilllearn }),
        });

        console.log('response', response);
        const data: RegisterResponseBody = await response.json();
        console.log('data', data);

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
      <p>Choose a subject you would like to teach:</p>
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

      {/* <p>{skillteach}</p> */}
      <p>Choose a subject you would like to learn:</p>
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
      {/* <p>{skilllearn}</p> */}
      <div>
        <button>Register</button>
      </div>
    </form>
  );
}
