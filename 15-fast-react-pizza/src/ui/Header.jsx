import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/UserName';

function Header() {
  return (
    <header className="items-centerborder-b flex justify-between border-stone-500 bg-yellow-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
