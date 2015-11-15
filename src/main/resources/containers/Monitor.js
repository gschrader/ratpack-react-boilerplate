import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, ProgressBar, Row, Col} from 'react-bootstrap';
import List, { Item } from '../components/List';
import Countdown from 'countdown';
import prettyBytes from 'pretty-bytes';

class Monitor extends Component {

    render() {
        if (this.props.last) {
            var usedpct = Math.round((this.props.last.used / this.props.last.total) * 100);
            var freepct = Math.round((this.props.last.free / this.props.last.total) * 100);
            var gctime = Countdown(0, this.props.last.gc).toString();
            var gcTimeStr = this.props.last.gc + ' ms ' + (gctime ? '(' + gctime + ')' : '');
            var cpupct = Math.round(this.props.last.cpu * 100);

            return (
                <div className="container">
                    <h1>Monitor</h1>

                    <Panel header="Overview">
                        <List>
                            <Item label="Uptime" value={Countdown(0, this.props.last.uptime).toString()}/>
                            <Item label="GC Time" value={gcTimeStr}/>
                            <Item label="CPU"> <ProgressBar now={cpupct} label="%(percent)s%"/></Item>
                        </List>

                    </Panel>

                    <Panel header="Heap">
                        <Row>
                            <Col md={6}>
                                <List>
                                    <Item label="Used" value={prettyBytes(this.props.last.used)}/>
                                    <Item label="Free" value={prettyBytes(this.props.last.free)}/>
                                    <Item label="Total" value={prettyBytes(this.props.last.total)}/>
                                    <Item label="Max" value={prettyBytes(this.props.last.max)}/>
                                </List>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ProgressBar>
                                    <ProgressBar bsStyle="danger" now={usedpct} key={1} label="%(percent)s%"/>
                                    <ProgressBar bsStyle="success" now={freepct} key={2} label="%(percent)s%"/>
                                </ProgressBar>
                            </Col>
                        </Row>
                    </Panel>

                </div>)
        } else {
            return false;
        }
    }
}

function mapStateToProps(state) {
    const {jvm} = state;
    return {
        last: (jvm && jvm.jvm) ? jvm.jvm.last : null
    };
}

export default connect(
    mapStateToProps
)(Monitor);
