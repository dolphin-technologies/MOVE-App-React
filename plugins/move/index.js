/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const { withDangerousMod, withPlugins, withAppDelegate, withMainApplication, withProjectBuildGradle } = require('@expo/config-plugins');

function withMovePod(config) {
	return withDangerousMod(config, [
		'ios',
		(cfg) => {
			const { platformProjectRoot } = cfg.modRequest;
			const podfile = resolve(platformProjectRoot, 'Podfile');
			const contents = readFileSync(podfile, 'utf-8');
			const lines = contents.split('\n');

			const indexPostInstall = lines.findIndex((line) => /post_install do \|installer\|$/.test(line));
			writeFileSync(
				podfile,
				[
					...lines.slice(0, indexPostInstall),
					`  permissions_path = '../node_modules/react-native-permissions/ios'`,
					`  pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways/Permission-LocationAlways.podspec"`,
					`  pod 'Permission-Motion', :path => "#{permissions_path}/Motion/Permission-Motion.podspec"`,
					`  pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse/Permission-LocationWhenInUse.podspec"`,
					`  pod 'Permission-LocationAccuracy', :path => "#{permissions_path}/LocationAccuracy/Permission-LocationAccuracy.podspec"`,
					`  pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications"`,
					...lines.slice(indexPostInstall),
				].join('\n')
			);

			return cfg;
		},
	]);
}

function withMoveAppDelegate(config) {
	return withAppDelegate(config, (cfg) => {
		const { modResults } = cfg;
		const { contents } = modResults;
		const lines = contents.split('\n');

		const importIndex = lines.findIndex((line) => /^#import/.test(line));
		const didLaunchIndex = lines.findIndex((line) => /application didFinishLaunchingWithOptions/.test(line));

		modResults.contents = [
			...lines.slice(0, importIndex + 1),
			`#import <ReactMoveSDK/MoveSdk.h>`,

			...lines.slice(importIndex + 1, didLaunchIndex),
			`- (BOOL)application:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions`,
			`{`,
			`  [RCTMoveSdk initIfPossibleWithLaunchOptions:launchOptions];`,
			`  return YES;`,
			`}`,
			...lines.slice(didLaunchIndex),
		].join('\n');

		return cfg;
	});
}

function withMoveMainApplication(config) {
	return withMainApplication(config, (cfg) => {
		const { modResults } = cfg;
		const { contents } = modResults;
		const lines = contents.split('\n');

		const importIndex = lines.findIndex((line) => /^package/.test(line));

		const mainApplicationIndex = lines.findIndex((line) => /^public class MainApplication extends Application implements ReactApplication {$/.test(line));

		const onCreateIndex = lines.findIndex((line) => /super.onCreate\(\)/.test(line));

		modResults.contents = [
			...lines.slice(0, importIndex + 1),
			`import in.dolph.move.sdk.NativeMoveSdkWrapper;`,
			...lines.slice(importIndex + 1, mainApplicationIndex + 1),
			`	private NativeMoveSdkWrapper sdkWrapper;`,
			...lines.slice(mainApplicationIndex + 1, onCreateIndex + 1),
			`		sdkWrapper = NativeMoveSdkWrapper.getInstance(this);`,
			`		sdkWrapper.init(this);`,
			...lines.slice(onCreateIndex + 1),
		].join('\n');

		return cfg;
	});
}

function withMoveProjectBuildGradle(config) {
	return withProjectBuildGradle(config, (cfg) => {
		const { modResults } = cfg;
		const { contents } = modResults;
		const lines = contents.split('\n');

		const mavenIndex = lines.findIndex((line) => /mavenLocal\(\)/.test(line));

		modResults.contents = [
			...lines.slice(0, mavenIndex + 1),
			`		maven {`,
			`			url "https://dolphin.jfrog.io/artifactory/move-sdk-libs-release"`,
			`			content {`,
			`				includeGroup "io.dolphin.move"`,
			`			}`,
			`		}`,
			...lines.slice(mavenIndex + 1),
		].join('\n');

		return cfg;
	});
}

function withMove(config) {
	return withPlugins(config, [withMovePod, withMoveAppDelegate, withMoveMainApplication, withMoveProjectBuildGradle]);
}

module.exports = withMove;
