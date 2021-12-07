import React from 'react';
import { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../../contexts/playerContext';

export const MenuButton = ({
  onClick,
  children,
  disabled,
  classNames,
}: {
  onClick: () => void;
  children?: string | ReactElement | ReactElement[];
  disabled?: boolean;
  classNames?: string;
}) => (
  <button onClick={onClick} disabled={disabled} className={`${classNames}`}>
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
    <div className="h-12 lg:h-16 flex px-3 max-w-screen-xl m-auto">
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons homeIcon"
        onClick={() => handleClick('/')}></MenuButton>
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons shopIcon"
        onClick={() => handleClick('/shop')}></MenuButton>{' '}
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons scoreIcon"
        onClick={() => handleClick('/leaderboards')}></MenuButton>
      <div className="flex-1 self-center">{context.playerStatus}</div>
      {/* <MenuButton disabled={disableNavBar} onClick={() => handleClick('/profile')}>
        Profile
      </MenuButton> */}
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons helpIcon"
        onClick={() => handleClick('/help')}></MenuButton>
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons logoutIcon"
        onClick={() => handleLogOut()}></MenuButton>
    </div>
  );
};

export default Header;
