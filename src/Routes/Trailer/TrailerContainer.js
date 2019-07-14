import React from "react";
import TrailerPresenter from "./TrailerPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: Object,
      error: null,
      loading: true,
      pathname: pathname,
      isMovie: pathname.includes("m"),
      trailerId: ""
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find AnyThing" });
    } finally {
      this.setState({
        loading: false,
        result,
        trailerId: result.videos.results[0].key
      });
    }
  }

  async componentWillReceiveProps(props) {
    const {
      location: { pathname }
    } = props;
    this.state.result.videos.results.filter(
      rs =>
        rs.key === pathname.substring(23) &&
        this.setState({
          trailerId: rs.key
        })
    );
  }

  render() {
    const { result, loading, error, pathname, trailerId } = this.state;
    return (
      <TrailerPresenter
        result={result}
        loading={loading}
        error={error}
        pathname={pathname}
        trailerId={trailerId}
      />
    );
  }
}
