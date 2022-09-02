export interface slide {
  title: string;
  desc: string;
  name: string;
}

export interface photosState {
  entities: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
  photos: any[];
}

export interface SlideNavigationProps {
  navigation: (val: string) => void;
}
