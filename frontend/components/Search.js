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
    console.log(events);
    return (
      <section className="search-area-container" component="Search">
        <div className="search-area">
          <CardView colWidth="4" cards={events} />
        </div>
      </section>
    );
  }
}

// export const Search = async () => {
//   const events = await getEvents();
//   // console.log(events.data);

//   return (

//   );
// };

export default Search;
