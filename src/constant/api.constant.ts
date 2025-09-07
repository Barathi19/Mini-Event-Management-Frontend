export const API_CONSTANT = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  event: "/events",
  registerEvent: (eventId: string) => `/events/${eventId}/register`,
  getAttendees: (eventId: string, page?: number, limit?: number) =>
    `/events/${eventId}/attendees?page=${page}&limit=${limit}`,
};
