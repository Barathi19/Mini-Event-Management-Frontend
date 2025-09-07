"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IEvent, IRegisterEvent } from "@/interface";
import { GetAllEvents, RegisterForEvent } from "@/services/event.service";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/lib/utils";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const initaialValues: IRegisterEvent = {
  email: "",
  name: "",
};

export default function Events() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [eventRegisterFormValues, setEventRegisterFormValues] =
    useState(initaialValues);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await GetAllEvents();
      setEvents(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventRegisterFormValues((pre) => ({ ...pre, [name]: value }));
  };

  const handleModal = (open: boolean, event: IEvent) => {
    setEventRegisterFormValues(initaialValues);
    setSelectedEvent(open ? event : null);
  };

  const handleRegister = async (eventId: string) => {
    try {
      const { email, name } = eventRegisterFormValues;

      if (name.trim() === "" || email.trim() === "") {
        return toast.error("Fill all the fields");
      }

      if (email && !EMAIL_REGEX.test(email.trim())) {
        return toast.error("Invalid Email");
      }

      await RegisterForEvent(eventId, eventRegisterFormValues);
      toast.success("Registered successfully");
      fetchEvents();
      setSelectedEvent(null);
    } catch (err) {
      errorHandler(err);
    }
  };

  if (loading) return <p className="text-center py-8">Loading events...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card
          key={event._id}
          className="bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition-shadow rounded-lg"
        >
          <CardHeader>
            <CardTitle className="text-indigo-600">{event.name}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.location}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.startTime} - {event.endTime}
            </p>
          </CardHeader>

          <CardContent className="flex justify-between items-center">
            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
              Booked: {event.booked}
            </Badge>
            <Badge
              className={
                event.slotsLeft <= 5
                  ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                  : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              }
            >
              Slots Left: {event.slotsLeft}
            </Badge>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Dialog
              open={selectedEvent?._id === event._id}
              onOpenChange={(open) => handleModal(open, event)}
            >
              <DialogTrigger asChild>
                <Button
                  disabled={event.slotsLeft === 0}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Register
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register for {event.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                      value={eventRegisterFormValues.name}
                      name="name"
                      onChange={handleFormChange}
                      className="border-gray-300 dark:border-gray-600 dark:bg-neutral-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={eventRegisterFormValues.email}
                      onChange={handleFormChange}
                      className="border-gray-300 dark:border-gray-600 dark:bg-neutral-800"
                    />
                  </div>
                  <Button
                    onClick={() => handleRegister(event._id)}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Submit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="ml-2 cursor-pointer"
              onClick={() => router.push(`/events/${event._id}`)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
