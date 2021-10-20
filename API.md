# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### S3UploadSignedUrl <a name="cdk-s3-upload-signed-url.S3UploadSignedUrl"></a>

#### Initializers <a name="cdk-s3-upload-signed-url.S3UploadSignedUrl.Initializer"></a>

```typescript
import { S3UploadSignedUrl } from 'cdk-s3-upload-signed-url'

new S3UploadSignedUrl(scope: Construct, id: string, props?: IS3UploadSignedUrlProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-s3-upload-signed-url.S3UploadSignedUrl.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-s3-upload-signed-url.S3UploadSignedUrl.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-s3-upload-signed-url.S3UploadSignedUrl.parameter.props"></a>

- *Type:* [`cdk-s3-upload-signed-url.IS3UploadSignedUrlProps`](#cdk-s3-upload-signed-url.IS3UploadSignedUrlProps)

---







## Protocols <a name="Protocols"></a>

### IS3UploadSignedUrlProps <a name="cdk-s3-upload-signed-url.IS3UploadSignedUrlProps"></a>

- *Implemented By:* [`cdk-s3-upload-signed-url.IS3UploadSignedUrlProps`](#cdk-s3-upload-signed-url.IS3UploadSignedUrlProps)


#### Properties <a name="Properties"></a>

##### `allowedOrigins`<sup>Optional</sup> <a name="cdk-s3-upload-signed-url.IS3UploadSignedUrlProps.property.allowedOrigins"></a>

```typescript
public readonly allowedOrigins: string[];
```

- *Type:* `string`[]
- *Default:* ['*']

Optional CORS allowedOrigins.

Should allow your domain(s) as allowed origin

---

##### `existingBucketObj`<sup>Optional</sup> <a name="cdk-s3-upload-signed-url.IS3UploadSignedUrlProps.property.existingBucketObj"></a>

```typescript
public readonly existingBucketObj: Bucket;
```

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)
- *Default:* No bucket

Optional bucket where files should be uploaded to.

Must contains the CORS configuration (PUT method and your origin at least)

---

##### `expiration`<sup>Optional</sup> <a name="cdk-s3-upload-signed-url.IS3UploadSignedUrlProps.property.expiration"></a>

```typescript
public readonly expiration: number;
```

- *Type:* `number`
- *Default:* 300

Optional expiration time in second.

Time before the signed url expires.

---

