import React from 'react';
import { Polyline } from 'react-native-maps';

import { TripPoint } from '@store/features/timeline/timelineSlice';

type OverLimitPolylinesProps = {
	tripPoints: Array<TripPoint>;
	visible: boolean;
};

const OverLimitPolylines = ({ tripPoints, visible }: OverLimitPolylinesProps) => {
	const polylines = tripPoints.reduce<Array<Array<TripPoint>>>((acc, coord, index, coordArr) => {
		if (coord.colour === 'GREEN') {
			return acc;
		}

		const lastPolyline = acc[acc.length - 1];
		const lastPolylineTripPoint = lastPolyline && lastPolyline[lastPolyline.length - 1];
		const prevTripPoint = coordArr[index - 1];

		if (!acc.length || lastPolylineTripPoint.time !== prevTripPoint.time || lastPolylineTripPoint.colour !== coord.colour) {
			acc.push([coord]);
			return acc;
		}

		lastPolyline.push(coord);

		return acc;
	}, []);

	const connectedPolylines = polylines.map((polyline) => {
		if (polyline.length !== 1) {
			return polyline;
		}

		const tripPointIndex = tripPoints.indexOf(polyline[0]);
		const prevTripPoint = tripPoints[tripPointIndex - 1];
		const nextTripPoint = tripPoints[tripPointIndex + 1];
		if (prevTripPoint && nextTripPoint) {
			return [{ ...prevTripPoint, colour: polyline[0].colour }, polyline[0], nextTripPoint];
		}

		if (!prevTripPoint && !nextTripPoint) {
			return polyline;
		}

		return prevTripPoint ? [{ ...prevTripPoint, colour: polyline[0].colour }, polyline[0]] : [polyline[0], nextTripPoint];
	});

	return (
		<>
			{connectedPolylines.map((polyline, index) => (
				<Polyline
					key={index}
					coordinates={polyline.map((polylinePoint) => ({ latitude: +polylinePoint.lat, longitude: +polylinePoint.lon }))}
					strokeColor={visible ? polyline[0].colour.toLowerCase() : '#00000000'}
					strokeWidth={3}
				/>
			))}
		</>
	);
};

export default OverLimitPolylines;
