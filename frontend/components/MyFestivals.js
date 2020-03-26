import React from 'react';
import { connect } from 'react-redux';
// Components
import CardView from './CardView';
import Loading from './Loading';
import Attribution from './Attribution';
// Services
import { myFestivals } from '../services/events';

class MyFestivals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      loading: true
    };

    props.spotify_uid ? this.loadMyFestivals(props.spotify_uid) : '';
  }

  loadMyFestivals = async () => {
    const spotify_uid = this.props.spotify_uid;
    const response_myFestivals = await myFestivals(spotify_uid);

    console.log(response_myFestivals.data.followedFestivals);
    this.setState({
      festivals: response_myFestivals.data.followedFestivals
    });
  };

  generateCardView = () => {
    return <span>Test</span>;
  };

  render() {
    return (
      <section className="my-festivals-container" component="MyFestivals">
        <div className="my-festivals">
          <div className="my-festivals-header-container">
            <div className="my-festivals-header">
              <h1 className="uk-heading-medium uk-text-center white-text">
                Your Festivals
              </h1>
            </div>
          </div>
          <div className="my-festivals-body-container">
            <div className="my-festivals-body">
              {!this.state.festivals ? (
                <Loading />
              ) : (
                <CardView
                  cardType="event"
                  colWidth="4"
                  cards={this.state.festivals}
                />
              )}
            </div>
          </div>
        </div>
        <Attribution />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { spotify_uid: state.auth.uid };
};

export default connect(mapStateToProps)(MyFestivals);
