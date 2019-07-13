import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  display: flex;
`;

const VideoPlayer = styled.div``;

const VideoListContainer = styled.div``;
const VideoList = styled.div``;

const TrailerPresenter = ({ name, videos, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color="#fff" />
  ) : (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Container>
        <VideoPlayer />
        <VideoListContainer>
          {videos.map(video => (
            <VideoList key={video.key}>{video.name}</VideoList>
          ))}
        </VideoListContainer>
      </Container>
    </>
  );

TrailerPresenter.propTypes = {
  name: PropTypes.string,
  video: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default TrailerPresenter;
