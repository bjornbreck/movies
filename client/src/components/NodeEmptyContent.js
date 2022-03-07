import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
} from "@material-ui/core";

const NodeEmptyContent = ({ movie }) => {
  return (
    <>
      {movie.loading ? (
        <Typography>Loading</Typography>
      ) : (
        <Typography>Sorry we're unable to retrieve any quotes at this time. Please try again later</Typography>
      )}
    </>
  )
};

NodeEmptyContent.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    online: PropTypes.bool,
    title: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
};

export default NodeEmptyContent;
