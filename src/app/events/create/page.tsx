"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { ICreateEvent } from "@/interface";
import { CreateEvent } from "@/services/event.service";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/lib/utils";

const createEventSchema = yup.object({
  name: yup.string().required("Event name is required"),
  location: yup.string().required("Location is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        return new Date(value) > new Date(startTime);
      }
    ),
  maxCapacity: yup
    .number()
    .typeError("Max capacity must be a number")
    .required("Max capacity is required")
    .positive("Must be greater than 0")
    .integer("Must be an integer"),
});

export default function CreateEventPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateEvent>({
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      name: "",
      location: "",
      startTime: "",
      endTime: "",
      maxCapacity: 0,
    },
  });

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setValue("startTime", now);
    setValue("endTime", now);
  }, [setValue]);

  const onSubmit: SubmitHandler<ICreateEvent> = async (data) => {
    setSubmitting(true);
    try {
      const payload: ICreateEvent = {
        name: data.name,
        location: data.location,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        maxCapacity: Number(data.maxCapacity),
      };

      await CreateEvent(payload);
      router.push("/");
      toast.success("Event created successfully!");
    } catch (err) {
      errorHandler(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 w-full">
        {[
          {
            label: "Name",
            type: "text",
            name: "name",
            placeholder: "Event name",
          },
          {
            label: "Location",
            type: "text",
            name: "location",
            placeholder: "Location",
          },
          { label: "Start Time", type: "datetime-local", name: "startTime" },
          { label: "End Time", type: "datetime-local", name: "endTime" },
          { label: "Max Capacity", type: "number", name: "maxCapacity" },
        ].map((field) => (
          <div className="grid gap-1 w-full" key={field.name}>
            <label className="font-medium">{field.label}</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1"
              type={field.type}
              placeholder={field.placeholder}
              suppressHydrationWarning={true}
              {...register(field.name as keyof ICreateEvent)}
            />
            <p className="text-red-500 text-sm min-h-[1.25rem]">
              {(errors[field.name as keyof ICreateEvent]?.message as string) ||
                " "}
            </p>
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 text-white py-2 rounded"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
