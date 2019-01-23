module.exports = (api) => {
    api.cache(true)
    return ({
        presets: [require("@babel/preset-env")]
    });
}