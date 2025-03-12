import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmails } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function EmailList() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const {
    data: emails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["emails"],
    queryFn: getEmails,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading emails: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {emails?.map((email) => (
        <div
          key={email.id}
          className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
            !email.isRead ? "bg-blue-50" : ""
          } ${selectedEmail === email.id ? "ring-2 ring-blue-500" : ""}`}
          onClick={() =>
            setSelectedEmail(email.id === selectedEmail ? null : email.id)
          }
        >
          <div className="flex flex-col items-center gap-2">
            <button className="text-gray-400 hover:text-yellow-400">
              <Star className="h-5 w-5" />
            </button>
            {email.priority > 7 && (
              <Badge variant="destructive" className="px-1.5">
                High
              </Badge>
            )}
            {email.priority > 4 && email.priority <= 7 && (
              <Badge variant="default" className="px-1.5">
                Med
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`font-semibold truncate ${
                  !email.isRead ? "font-bold" : ""
                }`}
              >
                {email.from.split("<")[0].trim()}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {formatDistanceToNow(email.date, { addSuffix: true })}
              </span>
            </div>

            <h4 className="text-sm font-medium truncate mb-1">
              {email.subject}
            </h4>

            <p className="text-sm text-gray-600 line-clamp-2">
              {email.snippet}
            </p>

            <div className="flex gap-2 mt-2">
              {email.isDirect && (
                <Badge variant="outline" className="text-xs">
                  Direct
                </Badge>
              )}
              {!email.isRead && (
                <Badge variant="secondary" className="text-xs">
                  Unread
                </Badge>
              )}
            </div>
          </div>

          <div>
            <button className="text-gray-400 hover:text-blue-500">
              <Clock className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
