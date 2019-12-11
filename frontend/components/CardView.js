import React from "react";
import Card from "./Card";

export const CardView = props => {
  const cssClasses = `uk-child-width-1-${props.colWidth}@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-grid`;
  const cards = props.cards ? props.cards : [];

  return (
    <div className={cssClasses} uk-grid="">
      {cards.map(cardItem => {
        return <Card {...cardItem} key={cardItem.id} />;
      })}
    </div>
  );
};

export default CardView;
