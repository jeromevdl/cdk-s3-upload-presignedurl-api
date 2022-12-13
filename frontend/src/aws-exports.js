import { Auth } from 'aws-amplify';

const awsconfig =  {
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_WOjKdlvy9',
    userPoolWebClientId: '225lk6pkqa5l2tgo87s3je374mb'
  },
  API: {
    endpoints: [
      {
         name: 'S3SignedURLAPI',
         endpoint: 'https://2koys5byc8.execute-api.eu-west-1.amazonaws.com/prod',
         custom_header: async () => {
           return { Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
         }
      }
    ]
  }
};


export default awsconfig;
