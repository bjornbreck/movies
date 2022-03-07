import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/nodes";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class NodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeID: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.movies.list);
  }

  toggleNodeExpanded(node) {
    this.setState({
      expandedNodeID:
        node.id === this.state.expandedNodeID ? null : node.id,
    });
  }

  render() {
    const { movies } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Movies</strong>
        </Typography>
        {movies.list.map((movie) => (
          <Node
            movie={movie}
            key={movie.id}
            expanded={movie.id === this.state.expandedNodeID}
            toggleNodeExpanded={this.toggleNodeExpanded}
          />
        ))}
      </Box>
    );
  }
}

NodeList.propTypes = {
  actions: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
