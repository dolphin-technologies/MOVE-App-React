import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, Platform, NativeSyntheticEvent } from 'react-native';
import MapView, { LatLng, Marker, Point, Polyline } from 'react-native-maps';
import { useTranslation } from 'react-i18next';

import { getRegionForCoordinates } from '@utils/getRegionForCoordinates';
import { EndPointMarker, OrangePin, RedPin, StartPointMarker } from '@components/common/Icons';
import { DrivingEvent, TimelineDetails, TripPoint } from '@store/features/timeline/timelineSlice';
import { getDistanceBetweenCoordsInKm } from '@utils/getDistanceBetweenCoordsInKm';
import { Colors, Metrics, Typography } from '@styles/index';

import { PANEL } from './ScorePanel/ScorePanel';
import OverLimitPolylines from './OverLimitPolylines';

type TimelineMapProps = {
	timelineDetails: TimelineDetails;
	activeScorePanel: PANEL;
};

type PolylinePressEvent = NativeSyntheticEvent<{
	action: 'polyline-press';
	id?: string;
	coordinate?: LatLng;
	position?: Point;
}>;

const TimelineMap = ({ timelineDetails, activeScorePanel }: TimelineMapProps) => {
	const { t } = useTranslation();
	const [tooltipConf, setTooltipConf] = useState<TripPoint | null>(null);
	const [timelineIdForSpeedTab, setTimelineIdForSpeedTab] = useState<number>();
	const mapRef = useRef<MapView | null>(null);
	const { tripPoints, drivingEvents } = timelineDetails;

	const closeTooltip = () => setTooltipConf(null);

	useEffect(() => {
		return () => {
			mapRef.current = null;
		};
	}, []);

	const region = useMemo(() => {
		const region = getRegionForCoordinates([
			{ latitude: +tripPoints[0].lat, longitude: +tripPoints[0].lon },
			{ latitude: +tripPoints[tripPoints.length - 1].lat, longitude: +tripPoints[tripPoints.length - 1].lon },
		]);
		mapRef.current?.animateToRegion(region, 600);

		return region;
	}, [tripPoints]);

	useEffect(closeTooltip, [tripPoints]);

	useEffect(() => {
		if (timelineIdForSpeedTab === timelineDetails.id || activeScorePanel !== PANEL.SPEED) {
			return;
		}
		setTimelineIdForSpeedTab(timelineDetails.id);
	}, [activeScorePanel, timelineIdForSpeedTab, timelineDetails]);

	const polylinePressHandler = ({ nativeEvent }: PolylinePressEvent) => {
		if (activeScorePanel !== PANEL.SPEED) {
			return;
		}

		const pressCoordLat = nativeEvent.coordinate?.latitude;
		const pressCoordLon = nativeEvent.coordinate?.longitude;

		if (!pressCoordLat || !pressCoordLon) {
			return;
		}

		mapRef.current?.animateCamera({ center: { latitude: pressCoordLat, longitude: pressCoordLon } });

		const nearestPoint = tripPoints.reduce<{ point: TripPoint; distance: number }>(
			(acc, point) => {
				const distanceBetween = getDistanceBetweenCoordsInKm(+point.lat, +point.lon, pressCoordLat, pressCoordLon);
				if (acc.distance <= distanceBetween) {
					return acc;
				}
				return { point: point, distance: distanceBetween };
			},
			{ point: tripPoints[0], distance: getDistanceBetweenCoordsInKm(+tripPoints[0].lat, +tripPoints[0].lon, pressCoordLat, pressCoordLon) }
		);

		setTooltipConf(nearestPoint.point);
	};

	const renderDrivingEventText = useCallback(
		(event: DrivingEvent): string => {
			let text = '';
			switch (event.value) {
				case 1:
					text += `${t('txt_moderate')} `;
					break;
				case 2:
					text += `${t('txt_fast')} `;
					break;
				case 3:
					text += `${t('txt_extreme')} `;
			}
			switch (event.type) {
				case 'ACC':
					text += t('txt_eco1');
					break;
				case 'BRK':
					text += t('txt_braking');
					break;
				case 'CRN':
					text += t('txt_cornering');
			}
			return text;
		},
		[t]
	);

	const polylineCoords = useMemo(() => tripPoints.map(({ lat, lon }) => ({ latitude: +lat, longitude: +lon })), [tripPoints]);

	return (
		<MapView style={styles.initialStyle} initialRegion={region} ref={mapRef}>
			<Marker coordinate={{ latitude: +tripPoints[0].lat, longitude: +tripPoints[0].lon }}>
				<View style={styles.routeMarkers}>
					<StartPointMarker />
				</View>
			</Marker>
			<Marker coordinate={{ latitude: +tripPoints[tripPoints.length - 1].lat, longitude: +tripPoints[tripPoints.length - 1].lon }}>
				<View style={styles.routeMarkers}>
					<EndPointMarker />
				</View>
			</Marker>
			{timelineIdForSpeedTab === timelineDetails.id && tooltipConf && activeScorePanel === PANEL.SPEED ? (
				<Marker coordinate={{ latitude: +tooltipConf.roadLat, longitude: +tooltipConf.roadlon }} centerOffset={{ x: 0, y: -Metrics.normalize(45) }} style={styles.hintMarker} onPress={closeTooltip}>
					<View style={styles.tooltipContainer}>
						<Text style={styles.popupText}>{`${t('txt_current_speed')} ${tooltipConf.speed}km/h`}</Text>
						{tooltipConf.speedLimit ? <Text style={styles.popupText}>{`${t('txt_speed_limit')} ${tooltipConf.speedLimit}km/h`}</Text> : null}
					</View>
					<View style={styles.tooltipArrow}></View>
				</Marker>
			) : null}
			<Polyline coordinates={polylineCoords} strokeColor={Colors.GREEN} strokeWidth={3} tappable={true} onPress={polylinePressHandler} />
			{timelineIdForSpeedTab === timelineDetails.id && <OverLimitPolylines tripPoints={tripPoints} visible={activeScorePanel === PANEL.SPEED} />}
			{activeScorePanel === PANEL.SAFENESS &&
				drivingEvents.map((event, eventIndex) => (
					<Marker key={eventIndex} style={styles.safenessMarker} centerOffset={{ x: 0, y: -Metrics.normalize(30) }} coordinate={{ latitude: +event.lat, longitude: +event.lon }}>
						<View style={[styles.safenessMarkerTextBox, { backgroundColor: event.value === 1 ? Colors.ORANGE : Colors.RED }]}>
							<Text style={styles.safenessMarkerText}>{renderDrivingEventText(event)}</Text>
						</View>
						{event.value === 1 ? <OrangePin /> : <RedPin />}
					</Marker>
				))}
		</MapView>
	);
};

export default TimelineMap;

const styles = StyleSheet.create({
	initialStyle: {
		width: Metrics.wp(100),
		height: '100%',
	},
	hintMarker: {
		height: Metrics.normalize(90),
		justifyContent: 'flex-end',
	},
	popupText: {
		...Typography.p,
	},
	routeMarkers: {
		width: Metrics.normalize(14),
		height: Metrics.normalize(14),
		backgroundColor: Colors.GREEN,
		borderRadius: Metrics.normalize(7),
		justifyContent: 'center',
		alignItems: 'center',
	},
	tooltipContainer: {
		backgroundColor: Colors.WHITE,
		padding: Metrics.normalize(10),
		borderRadius: Metrics.normalize(10),

		zIndex: 1,
	},
	tooltipArrow: {
		display: 'flex',
		alignSelf: 'center',
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderTopWidth: Metrics.normalize(15),
		borderRightWidth: Metrics.normalize(15),
		borderLeftWidth: Metrics.normalize(15),
		borderTopColor: Colors.WHITE,
		borderRightColor: 'transparent',
		borderLeftColor: 'transparent',
	},
	safenessMarker: {
		height: Metrics.normalize(60),
		alignItems: 'center',
	},
	safenessMarkerTextBox: {
		height: Metrics.normalize(25),
		borderRadius: Metrics.normalize(13),
		borderWidth: 1,
		borderColor: Colors.WHITE,
		paddingHorizontal: Metrics.normalize(8),
		marginBottom: Metrics.normalize(4),
		justifyContent: 'center',
	},
	safenessMarkerText: {
		...Typography.p,
		fontSize: Metrics.normalize(9),
		color: Colors.WHITE,
		lineHeight: Metrics.normalize(9),
	},
});
