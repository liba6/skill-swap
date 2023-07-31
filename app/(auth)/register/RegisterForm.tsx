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
    <div className={styles.body}>
      <form
        className="container"
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
        <div>
          <div className="row mb-5 ">
            <div className="col">
              <div className="form-floating ">
                <input
                  className="form-control mt-5"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  placeholder="type Username here"
                  required
                />
                <label className="form-label"> Username: </label>{' '}
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control mt-5"
                  name="password"
                  value={formValues.password}
                  type="password"
                  onChange={handleChange}
                  placeholder="type password here"
                  required
                />
                <label className="form-label"> Password: </label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control mt-5"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="type email here"
                  required
                />
                <label className="form-label">My Email:</label>
              </div>
            </div>
          </div>
          <h3>Choose a subject you would like to teach:</h3>
          <div className="d-flex justify-content-between p-2">
            <label className="form-check form-check-inline mb-5 ">
              Math
              <input
                className="form-check-input"
                type="radio"
                name="skillteach"
                value="Math"
                onChange={handleChange}
              />
            </label>
            <label className="form-check form-check-inline">
              Science
              <input
                className="form-check-input"
                type="radio"
                name="skillteach"
                value="Science"
                onChange={handleChange}
              />
            </label>
            <label className="form-check form-check-inline">
              Literature
              <input
                className="form-check-input"
                type="radio"
                name="skillteach"
                value="Literature"
                onChange={handleChange}
              />
            </label>
            <label className="form-check form-check-inline">
              Web Development
              <input
                className="form-check-input "
                type="radio"
                name="skillteach"
                value="Web Development"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <h3>Choose a subject you would like to learn:</h3>
        <div className="d-flex justify-content-between p-2">
          <label className="form-check form-check-inline mb-4 ">
            Math
            <input
              className="form-check-input"
              type="radio"
              name="skilllearn"
              value="Math"
              onChange={handleChange}
            />
          </label>
          <label className="form-check form-check-inline">
            Science
            <input
              className="form-check-input"
              type="radio"
              name="skilllearn"
              value="Science"
              onChange={handleChange}
            />
          </label>
          <label className="form-check form-check-inline">
            Literature
            <input
              className="form-check-input"
              type="radio"
              name="skilllearn"
              value="Literature"
              onChange={handleChange}
            />
          </label>
          <label className="form-check form-check-inline">
            Web Development
            <input
              className="form-check-input"
              type="radio"
              name="skilllearn"
              value="Web Development"
              onChange={handleChange}
            />
          </label>
        </div>
        <hr />
        <h3>Tell us a bit about yourself:</h3>
        <div>
          <div className="row m-4">
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control"
                  name="favoriteColor"
                  value={formValues.favoriteColor}
                  onChange={handleChange}
                  placeholder="type your favorite color"
                />
                <label className="form-label">
                  {' '}
                  What's your favorite color?
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control"
                  name="favoriteAuthor"
                  value={formValues.favoriteAuthor}
                  onChange={handleChange}
                  placeholder="type your favorite Author"
                />
                <label className="form-label">
                  {' '}
                  Who's your favorite author?
                </label>
              </div>
            </div>
          </div>
          <div className="row  m-4">
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control"
                  name="favoriteFood"
                  value={formValues.favoriteFood}
                  onChange={handleChange}
                  placeholder="type your favorite food"
                />
                <label className="form-label">
                  {' '}
                  What's your favorite food?
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control"
                  name="favoritePlace"
                  value={formValues.favoritePlace}
                  onChange={handleChange}
                  placeholder="type your favorite place"
                />
                <label className="form-label">
                  {' '}
                  What's your favorite place?
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-5 p-4 p-4 ">
          <button className="btn btn-success">Register</button>

          <button className="btn btn-warning">
            {' '}
            <a href="./login">I have an account already</a>{' '}
          </button>
        </div>
      </form>
    </div>
  );
}
