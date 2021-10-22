import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axios from 'axios';

// Update UserPoolId ClientId and ApiGatewayUrl here ->
/* -> */ const UserPoolId = 'eu-central-1_5GAtE4aWc';
/* -> */ const ClientId = '32aci46j0ehqkvif3acie3t1b9';
/* -> */ const ApiGatewayUrl = 'https://djghfplweg.execute-api.eu-central-1.amazonaws.com/prod/';

const userPool = new CognitoUserPool({
  UserPoolId: UserPoolId,
  ClientId: ClientId,
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      accessToken: '',
      isAuthenticated: false,
      isLoginFailed: false,
      files: [],
    };
  };

  onSuccess = (result) => {
    this.setState({
      accessToken: result.idToken.jwtToken,
      isAuthenticated: true,
      isLoginFailed: false,
    });
  };

  onFailure = (error) => {
    this.setState({
      isAuthenticated: false,
      isLoginFailed: true,
      statusCode: '',
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    let cognitoUser = new CognitoUser({
      Username: this.state.username,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: this.state.username,
      Password: this.state.password,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: this.onSuccess,
        onFailure: this.onFailure,
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          userAttributes['email'] = 'email@aws.com';
          cognitoUser.completeNewPasswordChallenge(this.state.password, userAttributes, this);
        },
    });
  };

  onDrop = (files) => {
    let file = files[0];

    // GET pre-signed URL
    axios.get(ApiGatewayUrl+'?contentType='+file.type, {headers: {Authorization: this.state.accessToken}}).then((response) => {
      console.log(response);
      // PUT request to the pre-signed URL
      axios.put(response.data.uploadURL, file).then((response) => {
        this.setState({
          statusCode: response.status,
          name: file.name,
          size: file.size,
        });
      });
    });
  };

  render() {
    return (
      <div>
        <h2>Login with your Cognito credentials to upload files</h2>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} placeholder='username' /><br />
          <input type='password' value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} placeholder='password' /><br />
          <input type='submit' value='Login' />
        </form>
        <p style={{color: 'red', display: this.state.isLoginFailed ? 'block' : 'none'}}>Credentials incorrect</p>
        <div style={{display: this.state.isAuthenticated ? 'block' : 'none'}}>
          <Dropzone onDrop={this.onDrop}>
            <p>Click to select a file</p>
          </Dropzone>
          <p>File {this.state.name} would be uploaded to S3 bucket as "UploadedFile"</p>
          <p>Wait a little bit to get a Status Code: {this.state.statusCode}</p>
          <p>Uploaded file size in Bytes: {this.state.size} </p>
          </div>
      </div>
    );
  };
};
