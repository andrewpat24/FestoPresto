import React from 'react';

export const ArtistCard = props => {
  const { _id, artist_name, genre, popularity, followers } = props;
  console.log(artist_name, genre);
  return (
    <div>
      <div className="uk-card uk-card-default">
        <div className="uk-card-media-top">
          <img src="/images/uikit-test-img.jpg" alt="" />
        </div>
        <div className="uk-card-body">
          <div className="card-title-area uk-flex-center uk-flex">
            <h3 className="uk-card-title ">{artist_name}</h3>
          </div>
          <div className="card-detail-area uk-flex uk-flex-center">
            <div>Popularity: {popularity}</div>
            <span className="spacer" />
            <div>Followers: {followers}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
