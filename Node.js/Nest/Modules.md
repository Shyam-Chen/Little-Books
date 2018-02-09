## Modules (模組)

```ts
import { Module } from '@nestjs/common';

@Module({
  // configure here
})
export class <NAME_HERE>Module {}
```

```ts
// properties
interface ModuleMetadata {
  imports?: NestModule[] | any[];
  controllers?: any[];
  components?: Controller[] | any[];
  exports?: any[];
}
```
