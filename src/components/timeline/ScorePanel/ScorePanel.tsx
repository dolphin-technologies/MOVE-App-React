import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import i18next from 'i18next';

import { TimelineDetails } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

import Overview from './Overview';
import Distraction from './Distraction';
import Safeness from './Safeness';
import Speed from './Speed';

type ScorePanelProps = {
	timelineDetails: TimelineDetails;
	onPanelChange: (a: PANEL) => void;
};

export enum PANEL {
	OVERVIEW = 'Overview',
	DISTRACTION = 'Distraction',
	SAFENESS = 'Safeness',
	SPEED = 'Speed',
}

const panelNamesMap = {
	Overview: i18next.t('btn_overview'),
	Distraction: i18next.t('btn_distraction'),
	Safeness: i18next.t('btn_safeness'),
	Speed: i18next.t('btn_speed'),
};

const panelNames = Object.values(PANEL);

const ScorePanel = ({ timelineDetails, onPanelChange }: ScorePanelProps) => {
	const [activePanel, setActivePanel] = useState<PANEL>(PANEL.OVERVIEW);
	const { scores, drivingEvents, sectionDistance } = timelineDetails;
	const onPress = (panelName: PANEL) => () => {
		onPanelChange(panelName);
		setActivePanel(panelName);
	};

	return (
		<View style={styles.container}>
			<View style={styles.panelItems}>
				{panelNames.map((panelName, index) => (
					<Pressable style={[styles.panelItemWrapper, activePanel === panelName && styles.activePanelItem]} key={index} onPress={onPress(panelName)}>
						<Text style={[Typography.b, activePanel === panelName && styles.activePanelItemText]}>{panelNamesMap[panelName]}</Text>
					</Pressable>
				))}
			</View>

			<View>
				{activePanel === PANEL.OVERVIEW && <Overview scores={scores} />}
				{activePanel === PANEL.DISTRACTION && <Distraction timelineDetails={timelineDetails} />}
				{activePanel === PANEL.SAFENESS && <Safeness score={scores.safeness} drivingEvents={drivingEvents} />}
				{activePanel === PANEL.SPEED && <Speed score={scores.speed} sectionDistance={sectionDistance} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.WHITE,
		borderTopLeftRadius: Metrics.normalize(10),
		borderTopEndRadius: Metrics.normalize(10),
		position: 'relative',
		zIndex: 100,
		top: Metrics.normalize(-10),
	},
	panelItems: {
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
	panelItemWrapper: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.LIGHT_GREY,
		flex: 1,
		alignItems: 'center',
		paddingVertical: Metrics.normalize(16),
	},
	activePanelItem: {
		borderBottomColor: Colors.GREEN,
	},
	activePanelItemText: {
		color: Colors.GREEN,
	},
});

export default ScorePanel;
