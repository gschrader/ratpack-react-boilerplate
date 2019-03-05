import React from 'react';
import {Card, Col, ProgressBar, Row} from 'react-bootstrap';
import Countdown from 'countdown';
import bytes from 'bytes';
import {useWs} from "./hooks";

const Item = props => (
    <Row>
        <Col md={4}>
            <strong>{props.label}</strong>
        </Col>
        <Col md={8}>
            {props.value}
            {props.children}
        </Col>
    </Row>
);

function Monitor() {
    const [data, disconnected] = useWs('/api/jvmws', localStorage.getItem('jv_jwt'));

    if (data && !disconnected) {
        var usedpct = Math.round((data.used / data.total) * 100);
        var freepct = Math.round((data.free / data.total) * 100);
        var gctime = Countdown(0, data.gc).toString();
        var gcTimeStr = data.gc + ' ms ' + (gctime ? '(' + gctime + ')' : '');
        var cpupct = Math.round(data.cpu * 100);

        return (
            <div className="container">
                <h1>Monitor</h1>

                <Card>
                    <Card.Header>Overview</Card.Header>
                    <Card.Body>
                        <Item label="Uptime" value={Countdown(0, data.uptime).toString()}/>
                        <Item label="GC Time" value={gcTimeStr}/>
                        <Item label="CPU"> <ProgressBar active now={cpupct} label={`${cpupct}%`}/></Item>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Heap</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Item label="Used" value={bytes(data.used)}/>
                                <Item label="Free" value={bytes(data.free)}/>
                                <Item label="Total" value={bytes(data.total)}/>
                                <Item label="Max" value={bytes(data.max)}/>
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
        return React.Fragment;
    }
}

export default Monitor;
