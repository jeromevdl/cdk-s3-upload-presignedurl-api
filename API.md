# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### S3UploadPresignedUrlApi <a name="S3UploadPresignedUrlApi" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi"></a>

#### Initializers <a name="Initializers" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer"></a>

```typescript
import { S3UploadPresignedUrlApi } from 'cdk-s3-upload-presignedurl-api'

new S3UploadPresignedUrlApi(scope: Construct, id: string, props?: IS3UploadSignedUrlApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps">IS3UploadSignedUrlApiProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps">IS3UploadSignedUrlApiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.isConstruct"></a>

```typescript
import { S3UploadPresignedUrlApi } from 'cdk-s3-upload-presignedurl-api'

S3UploadPresignedUrlApi.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.restApi">restApi</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | *No description.* |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPool">userPool</a></code> | <code>any</code> | *No description.* |
| <code><a href="#cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPoolClient">userPoolClient</a></code> | <code>any</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `restApi`<sup>Required</sup> <a name="restApi" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.restApi"></a>

```typescript
public readonly restApi: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

---

##### `userPool`<sup>Optional</sup> <a name="userPool" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPool"></a>

```typescript
public readonly userPool: any;
```

- *Type:* any

---

##### `userPoolClient`<sup>Optional</sup> <a name="userPoolClient" id="cdk-s3-upload-presignedurl-api.S3UploadPresignedUrlApi.property.userPoolClient"></a>

```typescript
public readonly userPoolClient: any;
```

- *Type:* any

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IS3UploadSignedUrlApiProps <a name="IS3UploadSignedUrlApiProps" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps"></a>

- *Implemented By:* <a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps">IS3UploadSignedUrlApiProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.allowedOrigins">allowedOrigins</a></code> | <code>string[]</code> | Optional CORS allowedOrigins. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.apiGatewayProps">apiGatewayProps</a></code> | <code>any</code> | Optional user provided props to override the default props for the API Gateway. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingBucketObj">existingBucketObj</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | Optional bucket where files should be uploaded to. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingUserPoolObj">existingUserPoolObj</a></code> | <code>aws-cdk-lib.aws_cognito.UserPool</code> | Optional Cognito User Pool to secure the API. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.expiration">expiration</a></code> | <code>number</code> | Optional expiration time in second. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Optional log retention time for Lambda and API Gateway. |
| <code><a href="#cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.secured">secured</a></code> | <code>boolean</code> | Optional boolean to specify if the API is secured (with Cognito) or publicly open. |

---

##### `allowedOrigins`<sup>Optional</sup> <a name="allowedOrigins" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.allowedOrigins"></a>

```typescript
public readonly allowedOrigins: string[];
```

- *Type:* string[]
- *Default:* ['*']

Optional CORS allowedOrigins.

Should allow your domain(s) as allowed origin to request the API

---

##### `apiGatewayProps`<sup>Optional</sup> <a name="apiGatewayProps" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.apiGatewayProps"></a>

```typescript
public readonly apiGatewayProps: any;
```

- *Type:* any
- *Default:* Default props are used

Optional user provided props to override the default props for the API Gateway.

---

##### `existingBucketObj`<sup>Optional</sup> <a name="existingBucketObj" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingBucketObj"></a>

```typescript
public readonly existingBucketObj: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket
- *Default:* Default Bucket is created

Optional bucket where files should be uploaded to.

Should contains the CORS properties

---

##### `existingUserPoolObj`<sup>Optional</sup> <a name="existingUserPoolObj" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.existingUserPoolObj"></a>

```typescript
public readonly existingUserPoolObj: UserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.UserPool
- *Default:* Default User Pool (and User Pool Client) are created

Optional Cognito User Pool to secure the API.

You should have created a User Pool Client too.

---

##### `expiration`<sup>Optional</sup> <a name="expiration" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.expiration"></a>

```typescript
public readonly expiration: number;
```

- *Type:* number
- *Default:* 300

Optional expiration time in second.

Time before the presigned url expires.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* one week

Optional log retention time for Lambda and API Gateway.

---

##### `secured`<sup>Optional</sup> <a name="secured" id="cdk-s3-upload-presignedurl-api.IS3UploadSignedUrlApiProps.property.secured"></a>

```typescript
public readonly secured: boolean;
```

- *Type:* boolean
- *Default:* true

Optional boolean to specify if the API is secured (with Cognito) or publicly open.

---

