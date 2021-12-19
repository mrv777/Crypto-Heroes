export const TrainingStory = () => {
  const stories = [
    'You read up on recent social media news',
    'You read a news article on Cointelegraph',
    'You practice TA on your charts',
    'You go to a local blockchain meetup',
  ];

  return stories[(stories.length * Math.random()) | 0];
};

export const ExploringStory = () => {
  const stories = [
    'You decide to explore a cryptocurrency exchange',
    'You explore a local blockchain collaboration space',
  ];

  return stories[(stories.length * Math.random()) | 0];
};
