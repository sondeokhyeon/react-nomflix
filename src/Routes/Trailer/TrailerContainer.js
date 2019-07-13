import React from "react";
import TrailerPresenter from "./TrailerPresenter";

export default class extends React.Component {
  state = {
    name: null,
    videos: null,
    error: null,
    loading: true
  };
  async componentDidMount() {
    try {
      this.setState({
        videos: this.props.location.videos,
        name: this.props.location.name
      });
    } catch {
      this.setState({
        error: "Error occurred"
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { name, videos, loading, error } = this.state;
    return (
      <TrailerPresenter
        name={name}
        videos={videos}
        loading={loading}
        error={error}
      />
    );
  }
}
