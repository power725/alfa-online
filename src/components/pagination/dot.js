import React, { Component } from 'react';
import {
  Animated
} from 'react-native';
import styles from './pagination.style';
import { COLOR } from '@constants';

class Dot extends Component {
  static defaultProps = {
    currentItem: 0
  }

  state = {
    backgroundColor: COLOR.PAGINATION_DOT
  }

  constructor(props) {
    super(props);
  }

  setNativeProps(nextProps) {
    const { active: nextActive } = nextProps;
    const { active } = this.props;

    this.setState({
      backgroundColor: nextActive ? COLOR.PAGINATION_DOT_ACTIVE : COLOR.PAGINATION_DOT
    })
  }

  render() {
    return (
      <Animated.View
        style={[styles.paginatiionDot, { backgroundColor: this.state.backgroundColor }]}
      />
    );
  }
}

export default Dot;
