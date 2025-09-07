"use client";

import { useState, useEffect, useCallback } from "react";
import { IEvenAttendee } from "@/interface";
import { GetEvenAttendeeList } from "@/services/event.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { errorHandler } from "@/lib/utils";

export default function AttendeesPage() {
  const params = useParams();
  const eventId = params?.eventId as string;

  const [attendees, setAttendees] = useState<IEvenAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAttendees = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const res = await GetEvenAttendeeList(eventId, page);
        setAttendees(res.data);
        setTotalPages(res.meta.total);
      } catch (err) {
        errorHandler(err, "Failed to load attendees");
      } finally {
        setLoading(false);
      }
    },
    [eventId]
  );

  useEffect(() => {
    fetchAttendees(page);
  }, [fetchAttendees, page]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Attendees</h1>

      {loading ? (
        <p>Loading attendees...</p>
      ) : attendees.length === 0 ? (
        <p>No attendees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((a) => (
                <tr
                  key={a._id}
                  className="odd:bg-gray-50 even:bg-white dark:odd:bg-neutral-800 dark:even:bg-neutral-900"
                >
                  <td className="px-4 py-2">{a.name}</td>
                  <td className="px-4 py-2">{a.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}
