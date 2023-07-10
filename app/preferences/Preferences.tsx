'use client';
import { FormEvent, useState } from 'react';

// just for practicing rest api and later, sending api data to db
export default function Preferences() {
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [favoritePlace, setFavoritePlace] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('api/prefernces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        favoriteColor,
        favoriteAnimal,
        favoriteFood,
        favoritePlace,
      }),
    });
    const data = await response.json();
    alert(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          {' '}
          What's your favorite color?
          <input
            value={favoriteColor}
            onChange={(event) => setFavoriteColor(event.target.value)}
          />
        </label>
        <label>
          {' '}
          What's your favorite animal?
          <input
            value={favoriteAnimal}
            onChange={(event) => setFavoriteAnimal(event.target.value)}
          ></input>
        </label>
        <label>
          {' '}
          What's your favorite food?
          <input
            value={favoriteFood}
            onChange={(event) => setFavoriteFood(event.target.value)}
          ></input>
        </label>
        <label>
          {' '}
          What's your favorite place?
          <input
            value={favoritePlace}
            onChange={(event) => setFavoritePlace(event.target.value)}
          ></input>
        </label>
        <h1>These are my awesome unique preferences:</h1>
        <h2>{`Favorite color is ${favoriteColor}`}</h2>
        <h2>{`Favorite animal is ${favoriteAnimal}`}</h2>
        <h2>{`Favorite food is ${favoriteFood}`}</h2>
        <h2>{`Favorite place is ${favoritePlace}`}</h2>
        <button>Submit</button>
      </form>
    </>
  );
}
