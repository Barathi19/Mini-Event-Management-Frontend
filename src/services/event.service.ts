import { ApiInstance } from "@/api";
import { API_CONSTANT } from "@/constant/api.constant";
import { ICreateEvent, IEvenAttendeeListResponse, IEvent, IRegisterEvent } from "@/interface";

export const GetAllEvents = async (): Promise<IEvent[]> => {
  const response = await ApiInstance.get(API_CONSTANT.event);
  return response.data;
};

export const RegisterForEvent = async (
  eventId: string,
  payload: IRegisterEvent
) => {
  await ApiInstance.post(API_CONSTANT.registerEvent(eventId), payload);
};

export const GetEvenAttendeeList = async (
  eventId: string,
  page: number = 1,
  limit: number = 10
): Promise<IEvenAttendeeListResponse> => {
  const response = await ApiInstance.get(
    API_CONSTANT.getAttendees(eventId, page, limit)
  );
  return response.data;
};

export const CreateEvent = async (payload: ICreateEvent) => {
  await ApiInstance.post(API_CONSTANT.event, payload);
};
