import React, { Component } from 'react';
import {
  Animated,
  View
} from 'react-native';
import styles from './pagination.style';
import Dot from './dot';
import _ from 'lodash';

class Pagination extends Component {
  static defaultProps = {
    currentItem: 0
  }

  constructor(props) {
    super(props);

    this.currentItem = props.currentItem;
  }

  dotRefs = [];

  setNativeProps(nextProps) {
    const { currentItem: nextCurrentItem } = nextProps;
    const { currentItem } = this;

    if (currentItem != nextCurrentItem) {
      if (this.dotRefs[nextCurrentItem]) {
        this.dotRefs[currentItem].setNativeProps({ active: false });
        this.dotRefs[nextCurrentItem].setNativeProps({ active: true });
        this.currentItem = nextCurrentItem;
      }
    }
  }

  render() {
    var { pages, currentItem } = this.props;

    return (
      <View
        style={styles.paginationContainer}>
        {
          _.map(pages, (day, index) => {
            return (
              <Dot
                key={index}
                ref={(ref) => this.dotRefs[index] = ref}
                active={index == currentItem} />
            );
          })
        }
      </View>
    );
  }
}

export default Pagination;
