import React from 'react';
import EventCard from './EventCard';
import ArtistCard from './ArtistCard';

const CardView = props => {
  const { section, cardType, cards, colWidth = 4 } = props;
  const cssClasses = `uk-child-width-1-${colWidth}@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-grid`;
  console.log(cards);
  return (
    <div className={cssClasses} uk-grid="">
      {cardType === 'event'
        ? cards.map(cardItem => {
            return <EventCard {...cardItem} key={section + cardItem.id} />;
          })
        : cards.map(cardItem => {
            return <ArtistCard {...cardItem} key={section + cardItem._id} />;
          })}
    </div>
  );
};

export default CardView;
