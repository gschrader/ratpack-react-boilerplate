import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Col, ProgressBar, Row} from 'react-bootstrap';
import Countdown from 'countdown';
import bytes from 'bytes';

const Item = props => (
    <Row>
        <Col md={4}>
            <strong>{props.label}</strong>
        </Col>
        <Col md={8}>
            {props.value}
        </Col>
    </Row>
);

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

                    <Card>
                        <Card.Header>Overview</Card.Header>
                        <Card.Body>
                            <Item label="Uptime" value={Countdown(0, this.props.last.uptime).toString()}/>
                            <Item label="GC Time" value={gcTimeStr}/>
                            <Item label="CPU"> <ProgressBar active now={cpupct} label={`${cpupct}%`}/></Item>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Heap</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Item label="Used" value={bytes(this.props.last.used)}/>
                                    <Item label="Free" value={bytes(this.props.last.free)}/>
                                    <Item label="Total" value={bytes(this.props.last.total)}/>
                                    <Item label="Max" value={bytes(this.props.last.max)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ProgressBar>
                                        <ProgressBar variant="danger" now={usedpct} key={1} label={`${usedpct}%`}/>
                                        <ProgressBar variant="success" now={freepct} key={2} label={`${freepct}%`}/>
                                    </ProgressBar>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

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
