import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const EventCard = props => {
  const { id, displayName, numPerformers, start } = props;
  const date = moment(start.date).format('MMM Do');
  const eventPageUrl = `/event/${id}`;
  return (
    <Link to={eventPageUrl}>
      <div className="uk-card uk-card-default uk-card-hover">
        <div className="uk-card-body">
          <div className="card-title-area uk-flex-center uk-flex">
            <h3 className="uk-card-title ">{displayName}</h3>
          </div>
          <div className="card-detail-area uk-flex uk-flex-center">
            <div>{date}</div>
            <span className="spacer" />
            <div>{numPerformers} Performers</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
