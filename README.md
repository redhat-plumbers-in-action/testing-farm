# Testing Farm

Typesafe access to [Testing Farm's REST API](https://testing-farm.gitlab.io/api/).

## API

### Creating the API instance

```typescript
import TestingFarmAPI from "testing-farm";

const api = new TestingFarmAPI("https://api.dev.testing-farm.io/v0.1");
await api.about();
```

### Request a New Test

documentation of - [`POST /requests`](https://testing-farm.gitlab.io/api/#operation/requestsPost)

```typescript
const request = { /* https://testing-farm.gitlab.io/api/#operation/requestsPost */ }

const response = await api.newRequest(request);
```

### Test Request Details

documentation of - [`GET /requests`](https://testing-farm.gitlab.io/api/#operation/requestsGet)

```typescript
const details = await api.requestDetails('test-id');
```

### Composes Public Ranch

documentation of - [`GET /composes`](https://testing-farm.gitlab.io/api/#operation/composesGetPublic)

```typescript
const composes = await api.composes();
```

### Composes

documentation of - [`GET /composes/{ranch}`](https://testing-farm.gitlab.io/api/#operation/composesGet)

```typescript
const composes = await api.ranchComposes('public');
```

### About Testing Farm

documentation of - [`GET /about`](https://testing-farm.gitlab.io/api/#operation/aboutGet)

```typescript
const about = await api.about();
```
