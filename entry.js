function requireAll(r) {
    r.keys().forEach(r);
}

module.exports = {
    entry: requireAll(require.context('./app/', true, /\.js$/)),
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ]
    }
};
