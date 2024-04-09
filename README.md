# Testing Farm

[![npm version][npm-status]][npm] [![Tests][test-status]][test] [![Linters][lint-status]][lint] [![CodeQL][codeql-status]][codeql] [![codecov][codecov-status]][codecov]

[npm]: https://www.npmjs.com/package/testing-farm
[npm-status]: https://badgen.net/npm/v/testing-farm

[test]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/tests.yml/badge.svg

[lint]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/lint.yml
[lint-status]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/lint.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/testing-farm/actions/workflows/codeql-analysis.yml/badge.svg

[codecov]: https://app.codecov.io/gh/redhat-plumbers-in-action/testing-farm
[codecov-status]: https://codecov.io/github/redhat-plumbers-in-action/testing-farm/branch/main/graph/badge.svg?token=EqTfXgwKz2

Typesafe access to [Testing Farm's REST API](https://api.dev.testing-farm.io/redoc).

## API

### Creating the API instance

```typescript
import TestingFarmAPI from "testing-farm";

const api = new TestingFarmAPI("https://api.dev.testing-farm.io/v0.1");
await api.about();
```

### List a Test Requests

documentation of - [`GET /requests`](https://api.dev.testing-farm.io/redoc#operation/get_test_requests_v0_1_requests_get)

```typescript
const queryParams = { /* https://api.dev.testing-farm.io/redoc#operation/get_test_requests_v0_1_requests_get */ }

const requests: Requests[] = await api.requests(queryParams);
const requests: unknown = await api.requests(queryParams, false);
```

### Request a New Test

documentation of - [`POST /requests`](https://api.dev.testing-farm.io/redoc#operation/request_a_new_test_v0_1_requests_post)

```typescript
const request = { /* https://api.dev.testing-farm.io/redoc#operation/request_a_new_test_v0_1_requests_post */ }

const response: NewRequestResponse = await api.newRequest(request);
const response: unknown = await api.newRequest(request, false);
const response: unknown = await.unsafeNewRequest(request);
```

### Test Request Details

documentation of - [`GET /requests/{request_id}`](https://api.dev.testing-farm.io/redoc#operation/test_request_details_v0_1_requests__request_id__get)

```typescript
const details: Request = await api.requestDetails('test-id');
const details: unknown = await api.requestDetails('test-id', false);
```

### Cancel a Test Request

documentation of - [`DELETE /requests/{request_id}`](https://api.dev.testing-farm.io/redoc#operation/delete_test_request_v0_1_requests__request_id__delete)

```typescript
const response: CancelRequestResponse = await cancelRequest('test-id');
const response: unknown = await cancelRequest('test-id', false);
```

### Composes Public Ranch

documentation of - [`GET /composes`](https://api.dev.testing-farm.io/redoc#operation/supported_composes_v0_1_composes_get)

```typescript
const composes: Composes = await api.composes();
const composes: unknown = await api.composes(false);
```

### Composes

documentation of - [`GET /composes/{ranch}`](https://api.dev.testing-farm.io/redoc#operation/supported_composes_v0_1_composes_get)

```typescript
const composes: Composes = await api.ranchComposes('public');
const composes: unknown = await api.ranchComposes('public', false);
```

### About Testing Farm

documentation of - [`GET /about`](https://api.dev.testing-farm.io/redoc#operation/get_about_v0_1_about_get)

```typescript
const about: About = await api.about();
const about: unknown = await api.about(false);
```
