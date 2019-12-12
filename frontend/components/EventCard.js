import React from "react";
import moment from "moment";

export const EventCard = props => {
  const { _id, name, location, event_date } = props;
  const date = moment(event_date[0]).format("MMM Do");

  return (
    <div>
      <div className="uk-card uk-card-default">
        <div className="uk-card-media-top">
          <img src="/images/uikit-test-img.jpg" alt="" />
        </div>
        <div className="uk-card-body">
          <div className="card-title-area uk-flex-center uk-flex">
            <h3 className="uk-card-title ">{name}</h3>
          </div>
          <div className="card-detail-area uk-flex uk-flex-center">
            <div>{location}</div>
            <span className="spacer" />
            <div>{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
