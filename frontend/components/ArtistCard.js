import React from 'react';

export const ArtistCard = props => {
  const { artist_name, songkick_url, followers, img, genres } = props;

  const artistImage = !!img ? img : '/images/uikit-test-img.jpg';
  const genre = !!genres ? genres[0] : 'No genre';
  const readableFollowerCount = (followers => {
    let response = '';

    if (!followers) {
      return;
    }

    if (followers > 1000000) {
      response = `${Math.round(followers / 1000000)}m followers`;
    } else if (followers > 1000) {
      response = `${Math.round(followers / 1000)}k followers`;
    } else {
      response = `${followers} followers`;
    }

    return response;
  })(followers);

  const artistCardMarkup = (() => (
    <a className="card-link" href={songkick_url} target="_blank">
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${artistImage})` }}
        ></div>
        <div className="card-info">
          <div className="card-name">{artist_name}</div>
          {!!genres || !!followers ? (
            <div>
              <div>{genre}</div>
              <div>{readableFollowerCount}</div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </a>
  ))();

  return <div className="Artist-Card">{artistCardMarkup}</div>;
};

export default ArtistCard;
