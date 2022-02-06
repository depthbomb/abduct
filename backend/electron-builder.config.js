module.exports = {
	appId: 'net.caprine.abduct',
	productName: 'abduct',
	copyright: 'Copyright © 2022 Caprine Logic',
	asar: true,
	directories: {
		output: '../build'
	},
	files: [
		'dist/*',
		'../frontend/dist',
		'package.json',
		'!dist/3rdpartylicenses.txt',
		'!**/*.ts',
		'!*.map',
		'!package-lock.json',
		'!yarn.lock'
	],
	extraResources: [
		{
			from: '../resources/ffmpeg.exe',
			to: './bin/ffmpeg.exe'
		}
	],
	asarUnpack: [],
	win: {
		icon: '../resources/icon.ico'
	},
	portable: {
		artifactName: 'abduct.exe',
		splashImage: '../resources/splash.bmp'
	},
	mac: {
		icon: 'dist/assets/icons',
		target: [
			'dmg'
		]
	},
	linux: {
		icon: 'dist/assets/icons',
		target: [
			'AppImage'
		]
	}
};
