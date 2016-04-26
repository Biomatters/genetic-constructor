import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import DnD from '../../containers/graphics/dnd/dnd';
import MouseTrap from '../../containers/graphics/mousetrap';
import SvgSbol from '../../components/svgsbol';

import { inspectorToggleVisibility } from '../../actions/inspector';
import { focusForceBlocks } from '../../actions/focus';

import '../../styles/InventoryItem.css';

export class InventoryItem extends Component {
  static propTypes = {
    inventoryType: PropTypes.string.isRequired,
    item: PropTypes.shape({
      metadata: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onDrop: PropTypes.func, //can return promise (e.g. update store), value is used for onDrop in DnD registered drop target. Can pass value from promise to use for drop as payload, or undefined
    onDragStart: PropTypes.func, //transact
    onDragComplete: PropTypes.func, //commit
    onSelect: PropTypes.func, //e.g. when clicked
    forceBlocks: PropTypes.array.isRequired,
    inspectorToggleVisibility: PropTypes.func.isRequired,
    focusForceBlocks: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);
    this.mouseTrap = new MouseTrap({
      element: dom,
      mouseDrag: this.mouseDrag.bind(this),
    });
  }

  mouseDrag(event, localPosition, startPosition, distance) {
    // cancel mouse drag and start a drag and drop
    this.mouseTrap.cancelDrag();
    // get global point as starting point for drag
    const globalPoint = this.mouseTrap.mouseToGlobal(event);

    //onDragStart handler
    this.props.onDragStart && this.props.onDragStart(this.props.item);

    // start DND
    DnD.startDrag(this.makeDnDProxy(), globalPoint, {
      item: this.props.item,
      type: this.props.inventoryType,
      source: 'inventory',
    }, {
      onDrop: (target, position) => {
        if (this.props.onDrop) {
          return this.props.onDrop(this.props.item, target, position);
        }
      },
      onDragComplete: (target, position, payload) => {
        if (this.props.onDragComplete) {
          this.props.onDragComplete(payload.item, target, position);
        }
      },
    });
  }

  handleClick = () => {
    const { item, onSelect, inspectorToggleVisibility, focusForceBlocks } = this.props;

    const promise = (!!onSelect) ? onSelect(item) : Promise.resolve(item);

    promise.then(result => {
      focusForceBlocks([result]);
      inspectorToggleVisibility(true);
    });
  };

  /**
   * make a drag and drop proxy for the item
   */
  makeDnDProxy() {
    const proxy = document.createElement('div');
    proxy.className = 'InventoryItemProxy';
    proxy.innerHTML = this.props.item.metadata.name;
    const dom = ReactDOM.findDOMNode(this);
    const svg = dom.querySelector('svg');
    if (svg) {
      const svgClone = svg.cloneNode(true);
      svgClone.removeAttribute('data-reactid');
      proxy.appendChild(svgClone);
    }
    return proxy;
  }

  formatLength(length) {
    if (!length) {
      return '0 bp';
    }
    const thresh = 1000;
    const sizes = ['bp', 'kb', 'Mb', 'Gb', 'Tb'];
    const ind = Math.floor(Math.log(length) / Math.log(thresh));
    return `${parseFloat((length / Math.pow(thresh, ind))).toFixed(1)} ${sizes[ind]}`;
  }

  render() {
    const item = this.props.item;
    const imagePath = item.metadata.image;
    const isSelected = this.props.forceBlocks.indexOf(item) >= 0;

    const sequenceLength = (item.sequence && item.sequence.length) ? ` (${this.formatLength(item.sequence.length)})` : '';
    const itemName = item.metadata.name || 'Unnamed';

    return (
      <div className={'InventoryItem' +
        (!!imagePath ? ' hasImage' : '') +
        (!!isSelected ? ' selected' : '')}>
        <a className="InventoryItem-item"
           onClick={this.handleClick}>
          {item.metadata.isSBOL ? <SvgSbol symbolName={item.id} color="white"/> : null}
          <span className="InventoryItem-text">
            {itemName}
          </span>
          {!!sequenceLength && <span className="InventoryItem-textDetail">{sequenceLength}</span>}
        </a>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    forceBlocks: state.focus.forceBlocks,
  };
}, {
  focusForceBlocks,
  inspectorToggleVisibility,
})(InventoryItem);
