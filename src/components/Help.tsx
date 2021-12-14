import React from 'react';
import { ReactElement } from 'react';

const Help = (): ReactElement => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Help me</p>
      <p className="mb-4">
        <b>Training</b> - Training has a minimal delay of 1hr and a max of accumulation of
        up to 12hrs to earn experience for your hero. Once they have enough experience,
        they can be leveled up
      </p>
      <p className="mb-4">
        <b>Battling</b> - Your hero can battle players on other teams to start earning
        points for you and your team. If you lose the battle you and your team will lose
        points if you were the attacker. Defenders lose no points.
      </p>
      <p className="mb-4">
        <b>Exploring</b> - Your hero can explore the world looking for items and earn a
        little experience.
      </p>
      <p className="mb-4">
        <b>Studying</b> - Your hero can study other blockchains to become more powerful
        when fighting heroes from that team.
      </p>
      <p className="mb-4">
        <b>Level Up</b> - Your hero can level up by clicking the arrow by their level when
        they have enough experience. At level 1 they can set a name, at level 2 they pick
        a team, and after that one stat is picked to improve with the level. At all levels
        HP is increased
      </p>
      {/* <button>
        <Link to="/">Take me home</Link>
      </button> */}
    </div>
  );
};

export default Help;
