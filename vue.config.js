module.exports = {
  transpileDependencies: ["vue-meta"],
  publicPath:
    process.env.NODE_ENV === "production" ? "/metroid-dread-tracker/" : "/",
};
