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
      <div className="container ">
        <h2 className="h2 p-5  text-center">
          Some fun facts about {params.params.username}
        </h2>{' '}
        <h4 className="h-4 m-4 p-2">
          Favorite Color: {profilePreferences?.favoriteColor}
        </h4>
        <h4 className="h-4 m-4 p-2">
          Favorite Author: {profilePreferences?.favoriteAuthor}
        </h4>
        <h4 className="h-4 m-4 p-2">
          Favorite Food: {profilePreferences?.favoriteFood}
        </h4>
        <h4 className="h-4 m-4 p-2">
          Favorite Place: {profilePreferences?.favoritePlace}
        </h4>
      </div>
    </div>
  );
}
