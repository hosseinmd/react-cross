import React, { PureComponent, memo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { dimensions, platform, useFlattenStyle } from "@react-cross/utility";

/**
 * ios slide behavior for all platform
 * @class
 * @typedef {object} props
 * @prop {()=> void} close
 * @prop {Array} dataSource
 * @prop {number} selectedIndex
 * @prop {React.PureComponent<{data: any,index: number,isDownPlay2: boolean,isSelected: boolean,isDownPlay1: boolean}>} ItemComponent
 * @prop {string} highlightColor
 * @prop {number} itemHeight
 * @prop {number} wrapperHeight
 * @prop {number} highlightBorderWidth
 * @prop {import("react-native").ViewStyle} style
 * @prop {import("react-native").ViewStyle} wrapperStyle
 * @extends {PureComponent<props>}
 */
export class ScrollPicker extends PureComponent {
  constructor(props) {
    super(props);

    this.itemHeight = this.props.itemHeight || 30;
    this.wrapperHeight =
      this.props.wrapperHeight ||
      (this.props.style ? this.props.style.height : 0) ||
      this.itemHeight * 5;
    this.selectedIndex = this.props.selectedIndex || 0;
  }
  selectedIndex = 0;

  componentDidMount() {
    if (this.props.selectedIndex) {
      setTimeout(() => {
        this.scrollToIndex(this.props.selectedIndex);
      }, 0);
    }
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  getScrollRef = sview => {
    this.sview = sview;
  };

  render() {
    let { header, footer } = this._renderPlaceHolder();
    let highlightWidth =
      (this.props.style ? this.props.style.width : 0) || dimensions.width;
    let highlightColor = this.props.highlightColor || "#333";
    let wrapperStyle = StyleSheet.flatten([
      {
        backgroundColor: "#fafafa",
        overflow: "hidden",
      },
      this.props.wrapperStyle,
      {
        height: this.wrapperHeight,
      },
    ]);

    let highlightStyle = {
      position: "absolute",
      top: (this.wrapperHeight - this.itemHeight) / 2,
      height: this.itemHeight,
      width: highlightWidth,
      borderTopColor: highlightColor,
      borderBottomColor: highlightColor,
      borderTopWidth: this.props.highlightBorderWidth || 2,
      borderBottomWidth: this.props.highlightBorderWidth || 2,
    };

    return (
      <View style={wrapperStyle}>
        <View style={highlightStyle} />
        <ScrollView
          ref={this.getScrollRef}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={this._onScroll}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}
        >
          {header}
          {this.props.dataSource.map(this._renderItem)}
          {footer}
        </ScrollView>
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return index.toString();
  };

  _renderPlaceHolder() {
    let h = (this.wrapperHeight - this.itemHeight) / 2;
    let header = <View style={{ height: h, flex: 1 }} />;
    let footer = <View style={{ height: h, flex: 1 }} />;
    return { header, footer };
  }
  listOfItemSet = {};
  ItemContainer = memo(({ index, item }) => {
    const [selectedIndex, SetSelectedIndex] = useState(this.selectedIndex);

    this.listOfItemSet[index] = SetSelectedIndex;

    const isSelected = selectedIndex == index;
    const isDownPlay1 =
      selectedIndex == index - 1 || selectedIndex == index + 1;
    const isDownPlay2 = !isSelected && !isDownPlay1;

    const ItemComponent = this.props.ItemComponent;

    const flatten_container = useFlattenStyle(
      [styles.itemWrapper, { height: this.itemHeight }],
      [this.itemHeight],
    );
    return (
      <View style={flatten_container}>
        <ItemComponent
          data={item}
          index={index}
          isSelected={isSelected}
          isDownPlay1={isDownPlay1}
          isDownPlay2={isDownPlay2}
        />
      </View>
    );
  });

  _renderItem = (item, index) => {
    const ItemContainer = this.ItemContainer;
    return <ItemContainer item={item} index={index} key={index} />;
  };

  getIndexFromNativeEvent = e => {
    let y = 0;
    let h = this.itemHeight;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    return Math.round(y / h);
  };

  _onScroll = e => {
    const selectedIndex = this.getIndexFromNativeEvent(e);
    this.selectedIndex != selectedIndex && this.refreshItems(selectedIndex);
  };

  _scrollFix(e) {
    // using scrollTo in ios, onMomentumScrollEnd will be invoked
    if (platform.isiOS) {
      this.isScrollTo = true;
    }

    let selectedIndex = this.getIndexFromNativeEvent(e);

    this.scrollToIndex(selectedIndex);
    // onValueChange
    if (this.props.onValueChange) {
      let selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }
  _onScrollBeginDrag = () => {
    this.dragStarted = true;
    if (platform.isiOS) {
      this.isScrollTo = false;
    }
    this.timer && clearTimeout(this.timer);
  };
  _onScrollEndDrag = e => {
    this.dragStarted = false;
    // if not used, event will be garbaged
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this._scrollFix(_e, "timeout");
      }
    }, 10);
  };
  _onMomentumScrollBegin = e => {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  };
  _onMomentumScrollEnd = e => {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(e);
    }
  };
  setSelectedIndexToItem(index, selectedIndex) {
    this.listOfItemSet[selectedIndex] &&
      this.listOfItemSet[selectedIndex](index);
  }
  refreshItems(index) {
    this.setSelectedIndexToItem(index, this.selectedIndex);
    this.setSelectedIndexToItem(index, this.selectedIndex - 1);
    this.setSelectedIndexToItem(index, this.selectedIndex + 1);
    this.setSelectedIndexToItem(index, index);
    this.setSelectedIndexToItem(index, index - 1);
    this.setSelectedIndexToItem(index, index + 1);
    this.selectedIndex = index;
  }
  scrollToIndex(index) {
    this.refreshItems(index);
    this.selectedIndex = index;
    this.sview.scrollTo({ y: this._getItemOffset(index), animated: true });
  }
  _getItemOffset = index => this.itemHeight * index;

  getSelected() {
    return this.props.dataSource[this.selectedIndex];
  }
}

let styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
