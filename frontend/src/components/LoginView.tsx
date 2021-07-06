import React from 'react';

import { Result } from 'neverthrow';
import { Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';

import { resolveRESTCall } from '../utils';

import './LoginView.css';

interface ApiTest {
  blah: string
}

interface Props extends RouteComponentProps {}

interface State {
  apiValue: ApiTest
}

export default class LoginView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      apiValue : {
        blah : ""
      }
    };
  }

  async componentDidMount() {
    const result: Result<ApiTest, Error> = await resolveRESTCall<ApiTest>('/');
    
    result
      .map(res => {
        this.setState({ apiValue : res });

        return null; // necessary to silence warning
      })
      .mapErr(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className='mainbody'>
          <Row>
            <h1>
              Login
            </h1>
          </Row>

          <Row>
            <div>
              {this.state.apiValue.blah}
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}