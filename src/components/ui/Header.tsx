import React from 'react';
import { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../../contexts/playerContext';

export const MenuButton = ({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: string | ReactElement | ReactElement[];
  disabled?: boolean;
}) => (
  <button onClick={onClick} disabled={disabled} className={`buttons`}>
    {children}
  </button>
);

type Props = {
  disableNavBar?: boolean;
};

const Header = ({ disableNavBar }: Props): ReactElement => {
  let navigate = useNavigate();
  const context = useContext(PlayerContext);

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleLogOut = () => {
    context.signOut();
    navigate('/');
  };

  return (
    <div className="h-16 bg-gray-700 flex px-3">
      <MenuButton disabled={disableNavBar} onClick={() => handleClick('/')}>
        Home
      </MenuButton>
      <MenuButton disabled={disableNavBar} onClick={() => handleClick('/shop')}>
        Shop
      </MenuButton>{' '}
      <MenuButton disabled={disableNavBar} onClick={() => handleClick('/leaderboards')}>
        Leaderboards
      </MenuButton>
      <div className="flex-1"></div>
      {/* <MenuButton disabled={disableNavBar} onClick={() => handleClick('/profile')}>
        Profile
      </MenuButton> */}
      <MenuButton disabled={disableNavBar} onClick={() => handleClick('/help')}>
        Help
      </MenuButton>
      <MenuButton disabled={disableNavBar} onClick={() => handleLogOut()}>
        Logout
      </MenuButton>
    </div>
  );
};

export default Header;
