import React from "react";
import CardView from "./CardView";
import { getEvents } from "../services/events";

class Search extends React.Component {
  async getAllEvents() {
    const events = await getEvents();
    return events.data;
  }

  render() {
    const events = this.getAllEvents();
    return (
      <section className="search-area-container" component="Search">
        <div className="search-area">
          <CardView cardType="event" colWidth="4" cards={events} />
        </div>
      </section>
    );
  }
}

export default Search;
