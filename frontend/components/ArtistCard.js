import React from 'react';

export const ArtistCard = props => {
  const { _id, artist_name, songkick_url, popularity, followers, img } = props;
  console.log(img);
  const artistImage = !!img ? img : '/images/uikit-test-img.jpg';
  return (
    <div>
      <a href={songkick_url} target="_blank">
        <div className="uk-card uk-card-default">
          <div className="uk-card-media-top">
            <img className="artist-image" src={artistImage} />
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
      </a>
    </div>
  );
};

export default ArtistCard;
