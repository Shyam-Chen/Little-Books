# Pulumi

---

### Table of Contents

---

## Caddy Server

```ts
import * as k8s from '@pulumi/kubernetes';

const appLabels = { app: 'caddy' };

const deployment = new k8s.apps.v1.Deployment('caddy', {
  spec: {
    selector: { matchLabels: appLabels },
    replicas: 1,
    template: {
      metadata: { labels: appLabels },
      spec: { containers: [{ name: 'caddy', image: 'caddy:2-alpine' }] },
    },
  },
});

export const name = deployment.metadata.name;
```

## Knative Serving

```ts
import * as k8s from '@pulumi/kubernetes';
```
