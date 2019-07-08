import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    topRated: null,
    popualr: null,
    airingToday: null,
    loading: true,
    error: null
  };

  render() {
    const { topRated, popualr, airingToday, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popualr={popualr}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    );
  }
}
