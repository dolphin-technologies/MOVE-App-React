type Point = {
	latitude: number;
	longitude: number;
};

type ArrayTwoOrMore<Point> = [Point, Point] & Array<Point>;

type RegionCoordinates = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

export const getRegionForCoordinates = (points: ArrayTwoOrMore<Point>): RegionCoordinates => {
	let minX: number, maxX: number, minY: number, maxY: number;

	((point) => {
		minX = point.latitude;
		maxX = point.latitude;
		minY = point.longitude;
		maxY = point.longitude;
	})(points[0]);

	points.map((point) => {
		minX = Math.min(minX, point.latitude);
		maxX = Math.max(maxX, point.latitude);
		minY = Math.min(minY, point.longitude);
		maxY = Math.max(maxY, point.longitude);
	});

	const midX = (minX + maxX) / 2;
	const midY = (minY + maxY) / 2;
	const deltaX = maxX - minX + 0.01;
	const deltaY = maxY - minY + 0.01;

	return {
		latitude: midX,
		longitude: midY,
		latitudeDelta: deltaX * 1.3,
		longitudeDelta: deltaY * 1.3,
	};
};
