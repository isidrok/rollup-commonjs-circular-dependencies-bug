import cjs from '@rollup/plugin-commonjs';
export default {
    input: 'src/a.js',
    output: {
        format: 'es',
        dir: 'dist',
        chunkFileNames: '[name].js',
    },
    manualChunks(id){
        // if(id === '\0commonjsHelpers.js'){return 'helpers';}
        if(id.endsWith('b.js')){return 'b'}
        if(id.endsWith('c.js')){return 'c'}
    },
    plugins: [
        cjs(),
    ]
}