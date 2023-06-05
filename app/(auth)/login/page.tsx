import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage(props: Props) {
  console.log('props', props);
  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
