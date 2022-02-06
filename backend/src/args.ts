import tf from 'type-flag';

const args = tf({
	dev: {
		type: Boolean,
		alias: 'd',
		default: false
	}
});

export default args;
