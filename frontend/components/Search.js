import React from "react";
import CardView from "./CardView";

const osl = {
  id: "234we234red",
  name: "Outside Lands",
  location: "San Francisco",
  date: "August 10th",
  cardType: "event"
};

const snowglobe = {
  id: "gof32ref09io",
  name: "Snowglobe",
  location: "Tahoe",
  date: "December 25th",
  cardType: "event"
};

const tomorrowland = {
  id: "09324jdnvksd",
  name: "Tomorrowland",
  location: "Europe",
  date: "July 8th",
  cardType: "event"
};

const eventList = [
  osl,
  snowglobe,
  tomorrowland,
  osl,
  snowglobe,
  tomorrowland,
  osl,
  snowglobe,
  tomorrowland
];

export const Search = () => (
  <section className="search-area-container" component="Search">
    <div className="search-area">
      <CardView colWidth="4" cards={eventList} />
    </div>
  </section>
);

export default Search;
