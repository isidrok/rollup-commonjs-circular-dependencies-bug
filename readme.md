# rollup-commonjs-circular-dependencies-bug

Issue: https://github.com/rollup/plugins/issues/591

## Reproduction

'src' folder has three cjs modules, 'a', 'b' and 'c'. The relation between them is as follows:

```
a -> c
a -> b
b -> c
```

When building those using rollup with the commonjs plugin, `\0commonjsHelpers.js` creates a circular dependency between modules 'b' and 'c' in order to export the `createCommonjsModule` function, as can be seen in folder 'dist'.

This __only__ happens when using `manualChunks` to generate one chunk for each module:

```js
manualChunks(id){
    if(id.endsWith('b.js')){return 'b'}
    if(id.endsWith('c.js')){return 'c'}
}
```

No circular references are generated if defining the chunks in the input even when using `preserveEntrySignatures: false`. In this cases Rollup is able to avoid generatiog circular dependencies.

