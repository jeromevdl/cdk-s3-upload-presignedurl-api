import React, { useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import { withAuthenticator, Button, Heading, Card, Text } from '@aws-amplify/ui-react';
import { useDropzone } from 'react-dropzone';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';

const apiName = 'S3SignedURLAPI';

const baseStyle = {
  flex: 1,
  width: '50%',
  display: 'inline-block',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 3,
  borderRadius: 8,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop: props.onDrop, accept: {'image/*': []}});


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

function App({ signOut, user }) {

  const [file, setFile] = useState();
  const [status, setStatus] = useState();
  const [objectKey, setObjectKey] = useState('');
  const [uploadURL, setUploadURL] = useState('');
  const [error, setError] = useState('');


  const onDrop = (files) => {
    let file = files[0];

    API.get(apiName, '/', {
      queryStringParameters: {
        'contentType': file.type
      }
    })
    .then((response) => {
      setObjectKey(response.key);
      setUploadURL(response.uploadURL);
      axios.put(response.uploadURL, file, {
        headers: {
          'content-type': file.type
        }
      }).then((response) => {
        setFile(file);
        setStatus(response.status);
      }).catch((error) => {
        setStatus(error.status);
        setError(error);
        console.error(error);
      });
    })
    .catch((error) => {
      setError(error);
      console.error(error);
    });
  };

  return (
    <div className="App">
      <Heading level={2} >
        Hello {user.username} <br/>
        <Button onClick={signOut}>Sign out</Button>
      </Heading>

      <div style={{textAlign: 'center', padding: '20px'}}>
        <Card variation="elevated" style={{width:'90%', display:'inline-block', textAlign: 'center'}}>
          <StyledDropzone onDrop={onDrop}/>
          <br/>
          { status && status === 200 ? (
            <div>
              <h3>Your file was successfully uploaded:</h3>
                <Text><b>File name</b>: {file.name}</Text>
                <Text><b>File size</b>: {file.size}</Text>
                <Text><b>File type</b>: {file.type}</Text><br/>
              <h3>The following URL was used</h3>: (cannot be used twice)
                <Text>{uploadURL}</Text><br/>
              <h3>Your file is stored in S3 with the key:</h3>
                <Text>{objectKey}</Text>
            </div>
            ) : error ? (<span style={{'color':'red'}}> {error}</span>) : (<></>)
            }
        </Card>
      </div>


    </div>
  );
}

export default withAuthenticator(App);
