import React from "react";
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";

class CardView extends React.Component {
  // cardTypes: 'event' : 'artist' - Must be defined
  // cards are an array of objects
  // colWidth is from 1 to 4

  constructor(props) {
    super(props);
    this.state = { ...props, resolvedCards: [] };
    this.resolveCardList(this.state.cards);
  }

  // Cards come in as a promise, we need to resolve the promise to access card data.
  resolveCardList(unresolvedCards) {
    unresolvedCards.then(resolvedCards => {
      this.setState({
        resolvedCards
      });
    });
  }

  render() {
    const { cardType, resolvedCards, colWidth = 4 } = this.state;
    const cssClasses = `uk-child-width-1-${colWidth}@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-grid`;

    return (
      <div className={cssClasses} uk-grid="">
        {cardType === "event"
          ? resolvedCards.map(cardItem => {
              return <EventCard {...cardItem} key={cardItem._id} />;
            })
          : resolvedCards.map(cardItem => {
              return <ArtistCard {...cardItem} key={cardItem._id} />;
            })}
      </div>
    );
  }
}

export default CardView;
