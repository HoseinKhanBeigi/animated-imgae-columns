export interface slide {
  title: string;
  desc: string;
  name: string;
}

export interface FigureImgProps {
  dataPos: string;
  url: string;
  name: string;
  date: string;
  showContent: (e: MouseEvent, value: any) => void;
}

export interface photosState {
  entities: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photos: any[];
}

export interface photosStateTwo {
  entitiesTwo: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photosTwo: any[];
}

export interface photosStateThree {
  entitiesThree: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photosThree: any[];
}

export interface photosStateFour {
  entitiesFour: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photosFour: any[];
}
export interface photosStateFive {
  entitiesFive: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photosFive: any[];
}

export interface photosStateSix {
  entitiesSix: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photosSix: any[];
}

export interface SlideNavigationProps {
  navigation: (val: string) => void;
}
