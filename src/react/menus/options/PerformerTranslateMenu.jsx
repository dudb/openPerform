
import { Popover, ListGroup, ListGroupItem, OverlayTrigger, Table } from 'react-bootstrap';

import Icon from 'react-fa';

import NumberInput from '../../inputs/NumberInput';

class PerformerOptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }
  render() {
    const popoverTop = (
      <Popover id="performer-options-popover" title="Translate">
        <ListGroup>
          <ListGroupItem>
            <h6>Position</h6>
          </ListGroupItem>
          <ListGroupItem>
            <Table id="positionOffsetTable">
              <tbody>
                <tr>
                  <td align="center">
                    <NumberInput min={-100} max={100} onChange={this.props.updateOffsetX} id="offsetXInput" value={this.props.offset.x}/>
                    <span>X</span>
                  </td>
                  <td align="center">
                    <NumberInput min={-100} max={100} onChange={this.props.updateOffsetY} id="offsetYInput" value={this.props.offset.y}/>
                    <span>Y</span>
                  </td>
                  <td align="center">
                    <NumberInput min={-100} max={100} onChange={this.props.updateOffsetZ} id="offsetZInput" value={this.props.offset.z}/>
                    <span>Z</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroupItem>
          <ListGroupItem>
            <h6>Rotation</h6>
          </ListGroupItem>
          <ListGroupItem>
            <Table id="rotationOffsetTable">
              <tbody>
                <tr>
                  <td align="center">
                    <NumberInput min={0} max={Math.PI*2} onChange={this.props.updateRotationX} id="rotationXInput" value={this.props.rotation.x}/>
                    <span>X</span>
                  </td>
                  <td align="center">
                    <NumberInput min={0} max={Math.PI*2} onChange={this.props.updateRotationY} id="rotationYInput" value={this.props.rotation.y}/>
                    <span>Y</span>
                  </td>
                  <td align="center">
                    <NumberInput min={0} max={Math.PI*2} onChange={this.props.updateRotationZ} id="rotationZInput" value={this.props.rotation.z}/>
                    <span>Z</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroupItem>
          <ListGroupItem>
            <h6>Delay</h6>
          </ListGroupItem>
          <ListGroupItem>
            <Table>
              <tbody>
                <tr>
                  <td><NumberInput min={-100} max={100} onChange={this.props.updateDelay} id="delayInput" value={this.props.delay}/></td>
                </tr>
              </tbody>
            </Table>
          </ListGroupItem>
        </ListGroup>
      </Popover>
    );
    return (
      <OverlayTrigger
          trigger={['click', 'focus']}
          rootClose
          placement="top"
          overlay={popoverTop}
        >
        <Icon name="cog" />
      </OverlayTrigger>
    );
  }
}

module.exports = PerformerOptionsMenu;
