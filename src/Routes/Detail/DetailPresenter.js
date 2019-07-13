import React from "react";
import PropTypes from "prop-types";
import Loader from "Components/Loader";
import styled from "styled-components";
import Helmet from "react-helmet";
import Message from "../../Components/Message";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainr = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Imdb = styled.a`
  font-weight: 500;
  color: skyblue;
`;

const Divider = styled.span`
  margin: 0px 10px;
`;

const MovieTrailer = styled.div`
  margin: 10px 0px;
  font-size: 20px;
  color: skyblue;
`;

const CompanyContainer = styled.div`
  width: 100%;
  background-color: #cacaca59;
  display: flex;
  height: 200px;
  margin-top: 20px;
`;

const Company = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 200px;
`;

const Companylogo = styled.div`
  background-image: url(${props => props.bgImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 200px;
  height: 200px;
  margin: 10px;
`;

const Companyname = styled.div`
  text-align: center;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.poster_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : ""
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../asserts/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainr>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>﹒</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>﹒</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genres, index) =>
                  index === result.genres.length - 1
                    ? genres.name
                    : `${genres.name} / `
                )}
            </Item>
            <Item>
              {result.imdb_id && (
                <>
                  <Divider>﹒</Divider>
                  <Imdb
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                  >
                    DB-link
                  </Imdb>
                </>
              )}
            </Item>
          </ItemContainr>
          <Overview>{result.overview}</Overview>
          {result.videos && (
            <MovieTrailer>
              <Link
                to={{
                  pathname: `/trailer/${result.id}`,
                  videos: result.videos.results,
                  name: result.original_title
                }}
              >
                MovieTrailer
              </Link>
            </MovieTrailer>
          )}
          {result.production_companies &&
            result.production_companies.length > 1 && (
              <CompanyContainer>
                {result.production_companies.map(company => (
                  <Company key={company.id}>
                    <Companylogo
                      bgImage={
                        company.logo_path
                          ? `https://image.tmdb.org/t/p/w200${
                              company.logo_path
                            }`
                          : require("../../asserts/noPosterSmall.png")
                      }
                    />
                    <Companyname>{company.name}</Companyname>
                  </Company>
                ))}
              </CompanyContainer>
            )}
        </Data>
      </Content>
      {error && <Message error={error} color="#e74c3c" />}
    </Container>
  );

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
