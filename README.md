# Module Template

A tiny module template.

# Usage

```shell
$ pnpm start # start in development

$ pnpm build # build in production
```

# Commit message

```typescript
/** extends @commitlint/config-conventional */

['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];
```

# Build

```typescript
output: [
  {
    file: pkg.main,
    format: 'commonjs',
    sourcemap: false,
    banner: getBanner(),
  },
  {
    dir: 'dist/esm',
    format: 'esm',
    sourcemap: false,
    banner: getBanner(),
  },
];
```
