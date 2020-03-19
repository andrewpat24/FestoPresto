import React from 'react';

export const ArtistCard = props => {
  const { artist_name, songkick_url, followers, img, genres } = props;

  const artistImage = !!img ? img : '/images/uikit-test-img.jpg';
  const genre = !!genres ? genres[0] : 'No genre';
  const readableFollowerCount = (followers => {
    let response = '';

    if (!followers) {
      return 'No data';
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

  const desktopMarkup = (() => (
    <a
      className="artist-card-link desktop-card-artist-markup uk-visible@s"
      href={songkick_url}
      target="_blank"
    >
      <div className="uk-card uk-card-default artist-card">
        <div className="uk-card-media-top">
          <img className="artist-image" src={artistImage} />
        </div>
        <div className="uk-card-body">
          <div className="card-title-area uk-flex-center uk-flex">
            <h3 className="uk-card-title artist-title">{artist_name}</h3>
          </div>
          {!!genres || !!followers ? (
            <div className="card-detail-area uk-flex uk-flex-center">
              <div className="col-left">{genre}</div>
              <div className="col-right">{readableFollowerCount}</div>
            </div>
          ) : (
            <div className="card-detail-area uk-flex uk-flex-center" />
          )}
        </div>
      </div>
    </a>
  ))();

  const mobileMarkup = (() => (
    <a
      className="artist-card-link mobile-card-artist-markup uk-hidden@s"
      href={songkick_url}
      target="_blank"
    >
      <div className="flex-grid uk-border-rounded">
        <div
          className="col uk-background-cover"
          style={{ backgroundImage: `url(${artistImage})` }}
        ></div>
        <div className="big-col uk-card uk-card-body uk-card-default mobile-artist-card">
          <div className="mobile-artist-name">{artist_name}</div>
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
      {desktopMarkup} {mobileMarkup}
    </div>
  );
};

export default ArtistCard;
