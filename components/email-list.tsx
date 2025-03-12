import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmails } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
