import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.userName);

  if (!username) return null;

  return <div className="text hidden font-semibold md:block">{username}</div>;
}

export default Username;
