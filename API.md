# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### S3UploadPresignedUrlApi <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi"></a>

#### Initializers <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer"></a>

```typescript
import { S3UploadPresignedUrlApi } from 'cdk-s3-upload-presignedurl-api'

new S3UploadPresignedUrlApi(scope: Construct, id: string, props?: IS3UploadSignedUrlApiProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.parameter.props"></a>

- *Type:* [`cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps`](#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApi`<sup>Required</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.restApi"></a>

```typescript
public readonly restApi: RestApi;
```

- *Type:* [`@aws-cdk/aws-apigateway.RestApi`](#@aws-cdk/aws-apigateway.RestApi)

---

##### `userPool`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPool"></a>

```typescript
public readonly userPool: any;
```

- *Type:* `any`

---

##### `userPoolClient`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPoolClient"></a>

```typescript
public readonly userPoolClient: any;
```

- *Type:* `any`

---




## Protocols <a name="Protocols"></a>

### IS3UploadSignedUrlApiProps <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps"></a>

- *Implemented By:* [`cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps`](#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps)


#### Properties <a name="Properties"></a>

##### `allowedOrigins`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.allowedOrigins"></a>

```typescript
public readonly allowedOrigins: string[];
```

- *Type:* `string`[]
- *Default:* ['*']

Optional CORS allowedOrigins.

Should allow your domain(s) as allowed origin to request the API

---

##### `apiGatewayProps`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.apiGatewayProps"></a>

```typescript
public readonly apiGatewayProps: any;
```

- *Type:* `any`
- *Default:* Default props are used

Optional user provided props to override the default props for the API Gateway.

---

##### `existingBucketObj`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingBucketObj"></a>

```typescript
public readonly existingBucketObj: Bucket;
```

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)
- *Default:* Default Bucket is created

Optional bucket where files should be uploaded to.

---

##### `existingUserPoolObj`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingUserPoolObj"></a>

```typescript
public readonly existingUserPoolObj: UserPool;
```

- *Type:* [`@aws-cdk/aws-cognito.UserPool`](#@aws-cdk/aws-cognito.UserPool)
- *Default:* Default User Pool (and User Pool Client) are created

Optional Cognito User Pool to secure the API.

You should have created a User Pool Client too.

---

##### `expiration`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.expiration"></a>

```typescript
public readonly expiration: number;
```

- *Type:* `number`
- *Default:* 300

Optional expiration time in second.

Time before the presigned url expires.

---

##### `secured`<sup>Optional</sup> <a name="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.secured"></a>

```typescript
public readonly secured: boolean;
```

- *Type:* `boolean`
- *Default:* true

Optional boolean to specify if the API is secured (with Cognito) or publicly open.

---

