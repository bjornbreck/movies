import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import NodeEmptyContent from "./NodeEmptyContent";

const Node = ({ movie, expanded, toggleNodeExpanded }) => {
  const nodeTitle = movie.loading ? 'Loading' : !movie.online ? 'Unknown' : movie.title;
  const nodeId = movie.loading ? 'Loading' : !movie.id ? 'Unknown' : movie.id;

  const classes = useStyles();
  return (
    <Accordion
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(movie)}
    >
      <AccordionSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {nodeTitle}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {nodeId}
            </Typography>
          </Box>
          <Status loading={movie.loading} online={movie.online} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.itemRow}>
          {!movie.online && (
            <NodeEmptyContent movie={movie} />
          )}
          {movie.quotes && movie.quotes.map((item) => (
            <Box className={classes.itemCol}>
              <Typography className={classes.movieQuoteId}>{item.id}</Typography>
              <Typography>{item.attributes.data}</Typography>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
    textTransform: 'capitalize'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  itemCol: {
    backgroundColor: '#DBDBDB',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  offlineMovieTItle: {
    textTransform: 'capitalize'
  },
  movieQuoteId: {
    color: 'blue'
  },
}));

Node.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    online: PropTypes.bool,
    title: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
