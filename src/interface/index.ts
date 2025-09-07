export interface IEvent {
  _id: string;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  slotsLeft: number;
  booked: number;
}

export interface IRegisterEvent {
  name: string;
  email: string;
}

export interface ICreateEvent {
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

export interface IEvenAttendee {
  _id: string;
  name: string;
  email: string;
  eventId: string;
}

export interface IEvenAttendeeListResponse {
  data: IEvenAttendee[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
}
