import React from 'react';

export const ArtistCard = props => {
  const { artist_name, songkick_url, followers, img, genres } = props;

  const artistImage = !!img ? img : '/images/uikit-test-img.jpg';
  const genre = !!genres[0] ? genres[0] : 'No genre';
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

  if (!genres[0] && !followers) {
  }

  return (
    <div>
      <a className="artist-card-link" href={songkick_url} target="_blank">
        <div className="uk-card uk-card-default artist-card">
          <div className="uk-card-media-top">
            <img className="artist-image" src={artistImage} />
          </div>
          <div className="uk-card-body">
            <div className="card-title-area uk-flex-center uk-flex">
              <h3 className="uk-card-title artist-title">{artist_name}</h3>
            </div>
            {!!genres[0] || !!followers ? (
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
    </div>
  );
};

export default ArtistCard;
