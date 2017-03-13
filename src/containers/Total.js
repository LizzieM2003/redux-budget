import React, { Component } from 'react';
import { connect } from 'react-redux';

class Total extends Component {
  render() {
    return (
      <div className="total-div col-xs-6 col-xs-offset-3">
        <h2>Total: {this.props.total.toFixed(2)}</h2>
      </div>
    )
  }
}

function mapStateToProps({ total }) {
  return { total };
}

export default connect(mapStateToProps)(Total);
