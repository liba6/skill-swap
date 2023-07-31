import { getPreferencesByUsername } from '../../../database/preferences';
import styles from './page.module.scss';

type Params = {
  params: {
    username: string;
  };
};
export default async function preferencesPage(params: Params) {
  const username = params.params.username;
  const profilePreferences = await getPreferencesByUsername(username);
  return (
    <div className={styles.div}>
      <div className="container">
        <p>Some fun facts about {params.params.username}</p>{' '}
        <p>Favorite Color: {profilePreferences?.favoriteColor}</p>
        <p>Favorite Author: {profilePreferences?.favoriteAuthor}</p>
        <p>Favorite Food: {profilePreferences?.favoriteFood}</p>
        <p>Favorite Place: {profilePreferences?.favoritePlace}</p>
      </div>
    </div>
  );
}
