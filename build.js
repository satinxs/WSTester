const { rollup, watch } = require('rollup');
const babel = require('rollup-plugin-babel');
const commonJS = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const postCss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const closure = require('@ampproject/rollup-plugin-closure-compiler');

const isRelease = process.argv[2] === 'release';
const isWatching = process.argv[2] === 'watch';

if (isRelease)
    console.log("Release mode");

let plugins = [
    babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
            ["@babel/preset-react", {
                "pragma": "m",
                "pragmaFrag": "m.fragment",
            }]
        ]
    }),
    commonJS(),
    resolve(),
    postCss()
];

if (isRelease)
    plugins.push(closure());

const rollupOptions = {
    input: 'index.js',
    plugins,
    output: {
        file: "docs/app.js",
        format: "cjs"
    }
};

async function build() {
    try {
        console.log("Starting build.");
        let bundle = await rollup(rollupOptions);

        await bundle.write(rollupOptions.output);
    } catch (error) {
        console.error(error);
    }
};

if (isWatching) {
    const
        Koa = require('koa'),
        koa_static = require('koa-static');

    watch(rollupOptions)
        .on('event', ev => {
            if (ev.code === "BUNDLE_END")
                console.info(`Built ${ev.input} in ${ev.duration}ms`);
            else if (ev.code === "ERROR")
                console.error(ev.error);
            else if (ev.code === "FATAL")
                console.error(ev);
        });

    let app = new Koa();
    app.use(koa_static('./docs'));
    app.listen(8080, () => {
        console.info("Listening for connections on http://localhost:8080");
    });
}
else
    build();