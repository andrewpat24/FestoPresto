import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const EventCard = props => {
  const { id, displayName, numPerformers, start } = props;
  console.log(start);
  const startDate = start.date ? start.date : start;
  const date = moment(startDate).format('MMM Do');
  const eventPageUrl = `/event/${id}`;

  const eventCardMarkup = (() => (
    <div className="card">
      <div className="card-header">{displayName}</div>
      <div className="card-info">
        <div>
          <div className="card-name">{date}</div>
          <div className="card-name">{numPerformers} performers</div>
        </div>
      </div>
    </div>
  ))();

  return (
    <Link to={eventPageUrl} style={{ textDecoration: 'none' }}>
      {eventCardMarkup}
    </Link>
  );
};

// <div className="uk-card uk-card-default uk-card-hover">
//         <div className="uk-card-body">
//           <div className="card-title-area uk-flex-center uk-flex">
//             <h3 className="uk-card-title ">{displayName}</h3>
//           </div>
//           <div className="card-detail-area uk-flex uk-flex-center">
//             <div>{date}</div>
//             <span className="spacer" />
//             <div>{numPerformers} Performers</div>
//           </div>
//         </div>
//       </div>

export default EventCard;
