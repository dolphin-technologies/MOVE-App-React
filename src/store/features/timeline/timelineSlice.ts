import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';

import { logout } from '../runtime/runtimeSlice';

export enum Activity {
	WALKING = 'WALKING',
	IDLE = 'IDLE',
	TRAM = 'TRAM',
	TRAIN = 'TRAIN',
	METRO = 'METRO',
	PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
	CAR = 'CAR',
	CYCLING = 'CYCLING',
}

export type TimelineType = {
	averageSpeedKmh: number;
	distanceMeters: number;
	durationMinutes: number;
	endAddress: string;
	endTs: string;
	id: number;
	startAddress: string;
	startTs: string;
	type: Activity;
	scores: Scores;
};

export type Scores = {
	safeness: number;
	distraction: number;
	speed: number;
	total: number;
};

export type TripPoint = {
	time: string;
	lat: string;
	lon: string;
	roadLat: string;
	roadlon: string; // TODO: fix typo in api
	altitude: number;
	speed: number;
	speedLimit: number;
	colour: 'GREEN' | 'YELLOW' | 'RED';
	wayType: string;
};

export type DrivingEvent = {
	lat: number;
	lon: number;
	value: 1 | 2 | 3;
	type: 'ACC' | 'BRK' | 'CRN';
	isoTime: string;
};

export type DistractionEvent = {
	durationMinutes: number;
	endIsoTime: string;
	startIsoTime: string;
	type: 'PH_HHELD' | 'SWP_TYPE';
};

export type DistractionDetails = {
	distractedPhoneHandheldMinutes: number;
	distractionFreeMinutes: number;
	totalDistractedMinutes: number;
};

export type SectionDistance = {
	green: number;
	yellow: number;
	red: number;
};

export type TimelineDetails = {
	id: number;
	type: string;
	startLat: number;
	startLon: number;
	startAddress: string;
	endLat: number;
	endLon: number;
	endAddress: string;
	scores: Scores;
	distanceMeters: number;
	averageSpeedKmh: number;
	durationMinutes: number;
	nextTripId?: number;
	previousTripId?: number;
	tripPoints: Array<TripPoint>;
	distractionDetails: DistractionDetails;
	distractionEvents: Array<DistractionEvent>;
	sectionDistance: SectionDistance;
	drivingEvents: Array<DrivingEvent>;
	startTs: string;
	endTs: string;
};

export type TimelineBaseListType = {
	timelineItemBaseList: Array<TimelineType>;
};

export type TimelineDetailsType = {
	tripDetail: TimelineDetails;
};

type getTimelinePayload = {
	data: {
		from: number;
		to: number;
	};
};
type getTimelineDetailsPayload = {
	data: {
		timelineId: number;
	};
};
export const getTimeline = createAction<getTimelinePayload>('getTimeline');
export const getTimelineDetails = createAction<getTimelineDetailsPayload>('getTimelineDetails');

export type TimelineState = {
	timelineLoaded: boolean;
	timeline: Array<TimelineType>;
	timelineDetails: TimelineDetails | null;
};

const initialState: TimelineState = {
	timeline: [],
	timelineLoaded: false,
	timelineDetails: null,
};

const timeline = createSlice({
	name: 'timeline',
	initialState,
	reducers: {
		setTimeline: (state, { payload }: PayloadAction<TimelineBaseListType>) => {
			state.timeline = payload.timelineItemBaseList;
			state.timelineLoaded = true;
		},
		setTimelineDetails: (state, { payload }: PayloadAction<TimelineDetailsType>) => {
			state.timelineDetails = payload.tripDetail;
			state.timelineLoaded = true;
		},
		setTimelineLoaded: (state, { payload }: PayloadAction<boolean>) => {
			state.timelineLoaded = payload;
		},
	},
	extraReducers: {
		[logout.type]: () => {
			return { ...initialState };
		},
	},
});

export const { setTimeline, setTimelineLoaded, setTimelineDetails } = timeline.actions;

export default timeline.reducer;
