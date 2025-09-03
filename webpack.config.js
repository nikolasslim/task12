module.exports = (env = {}) => {
	const mode = env.mode || 'development';


	if (mode === 'production') {
		return require('./webpack/webpack.prod')(env);
	}
	return require('./webpack/webpack.dev')(env);
};
