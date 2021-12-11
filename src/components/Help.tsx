import React from 'react';
import { ReactElement } from 'react';

const Help = (): ReactElement => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Help me</p>
      <p>
        <b>Training</b> - Training has a minimal delay of 1hr and a max of accumulation of
        up to 12hrs to earn experience for your hero. Once they have enough experience,
        they can be leveled up
      </p>
      <p>
        <b>Battling</b> - Your hero can battle players on other teams to start earning
        points for you and your team. If you lose the battle you and your team will lose
        points if you were the attacker. Defenders lose no points.
      </p>
      {/* <button>
        <Link to="/">Take me home</Link>
      </button> */}
    </div>
  );
};

export default Help;
