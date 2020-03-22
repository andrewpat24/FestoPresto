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

  const singleMarkup = (() => (
    <a
      className="artist-card-link"
      href={songkick_url}
      target="_blank"
    >
      <div className="artist-card">
        <div
          className="artist-image"
          style={{ backgroundImage: `url(${artistImage})` }}
        ></div>
        <div className="artist-info">
          <div className="artist-name">{artist_name}</div>
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

  return (
    <div>
      {singleMarkup}
    </div>
  );
};

export default ArtistCard;
