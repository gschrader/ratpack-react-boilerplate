import React from 'react';
import {Card, Jumbotron} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import {useFetchText} from "../hooks";

function Home() {
    const [data, loading] = useFetchText("readme");

    return (
        <div className="container">
            <Jumbotron>
                <h1>Ratpack React Boilerplate</h1>

                <p>
                    The minimal dev environment to enable live-editing React components from a Ratpack server
                </p>

            </Jumbotron>

            <Card>
                {loading ? (
                    "Loading..."
                ) : (
                    <ReactMarkdown source={data}/>
                )}
            </Card>
        </div>
    );
}

export default Home;