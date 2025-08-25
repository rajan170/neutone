"use client";

import {
  CreditCard,
  Clock,
  Loader2,
  RefreshCcw,
  Search,
  XCircle,
  Zap,
  Music,
  Play,
  Upload,
  EyeOff,
  MoreHorizontal,
  Download,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { getPlayUrl } from "~/actions/generate";
import { renameSong, setPublishedStatus } from "~/actions/song";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { RenameDialog } from "./rename-dialog";
import { useRouter } from "next/navigation";

export interface Track {
  id: string;
  title: string;
  createdAt: Date;
  instrumental: boolean;
  prompt: string | null;
  lyrics: string | null;
  describedLyrics: string | null;
  fullDescribedSong: string | null;
  thumbnailUrl: string | null;
  playUrl: string | null;
  status: string | null;
  createdByUserName: string | null;
  published: boolean;
}

export default function TracksList({ tracks }: { tracks: Track[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingTrackId, setloadingTrackId] = useState<string | null>(null);
  const [publishingTrackId, setPublishingTrackId] = useState<string | null>(
    null,
  );
  const [trackToRename, setTrackToRename] = useState<Track | null>(null);
  const router = useRouter();

  const handleTrackRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleTrackSelect = async (trackId: string) => {
    if (loadingTrackId) return;

    setloadingTrackId(trackId);

    const playUrl = await getPlayUrl(trackId);

    setloadingTrackId(null);

    console.log(playUrl);
  };

  const handlePublishToggle = async (
    trackId: string,
    currentPublished: boolean,
  ) => {
    if (publishingTrackId) return;

    setPublishingTrackId(trackId);

    try {
      await setPublishedStatus(trackId, !currentPublished);
      toast.success(
        currentPublished
          ? "Track unpublished successfully!"
          : "Track published successfully!",
      );
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      toast.error("Failed to update publish status. Please try again.");
    } finally {
      setPublishingTrackId(null);
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.prompt?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks"
              className="pl-10"
            />
          </div>
          <Button
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="border-1 border-black"
            onClick={handleTrackRefresh}
          >
            {isRefreshing ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => {
              switch (track.status) {
                case "processing":
                case "queued":
                  return (
                    <div
                      key={track.id}
                      className="group relative overflow-hidden rounded-2xl border border-indigo-200/40 bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-violet-50/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-indigo-700/40 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-violet-950/40"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-400/10 via-blue-400/5 to-violet-400/10" />

                      {/* Content */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 shadow-md dark:from-indigo-800 dark:to-blue-800">
                          <Clock
                            className="h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-300"
                            style={{ animationDuration: "3s" }}
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                              {track.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200">
                                <div className="flex space-x-1">
                                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
                                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
                                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"></div>
                                </div>
                                Processing
                              </span>
                            </div>
                          </div>

                          {/* Song Details */}
                          <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm dark:bg-slate-900/40">
                            <div className="space-y-2 text-sm">
                              {track.prompt && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                    Style:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.prompt}
                                  </span>
                                </div>
                              )}
                              {track.fullDescribedSong && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                    Theme:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.fullDescribedSong.length > 50
                                      ? `${track.fullDescribedSong.substring(0, 50)}...`
                                      : track.fullDescribedSong}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-indigo-500 dark:text-indigo-400">
                                  {track.instrumental
                                    ? "🎵 Instrumental"
                                    : "🎤 With Vocals"}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(
                                    track.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-300">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                            Generating your masterpiece... Usually takes 1-2
                            minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                case "failed":
                  return (
                    <div
                      key={track.id}
                      className="group relative overflow-hidden rounded-2xl border border-red-200/40 bg-gradient-to-br from-red-50/60 via-rose-50/40 to-pink-50/60 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:border-red-800/40 dark:from-red-950/30 dark:via-rose-950/20 dark:to-pink-950/30"
                    >
                      {/* Glitch Effect */}
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-red-500/5 to-transparent" />

                      {/* Content */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-rose-100 shadow-md dark:from-red-900 dark:to-rose-900">
                          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                              {track.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-200">
                              <XCircle className="h-3 w-3" />
                              Generation Failed
                            </span>
                          </div>

                          {/* Song Details */}
                          <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm dark:bg-slate-900/40">
                            <div className="space-y-2 text-sm">
                              {track.prompt && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-red-600 dark:text-red-400">
                                    Style:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.prompt}
                                  </span>
                                </div>
                              )}
                              {track.fullDescribedSong && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-red-600 dark:text-red-400">
                                    Theme:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.fullDescribedSong.length > 50
                                      ? `${track.fullDescribedSong.substring(0, 50)}...`
                                      : track.fullDescribedSong}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-red-500 dark:text-red-400">
                                  {track.instrumental
                                    ? "🎵 Instrumental"
                                    : "🎤 With Vocals"}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(
                                    track.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button className="group/btn inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-rose-600 hover:shadow-lg active:scale-95 dark:from-red-600 dark:to-rose-700">
                            <RefreshCcw className="h-4 w-4 transition-transform group-hover/btn:rotate-180" />
                            Retry Generation
                          </button>
                        </div>
                      </div>
                    </div>
                  );

                case "no-credits":
                  return (
                    <div
                      key={track.id}
                      className="group relative overflow-hidden rounded-2xl border border-amber-200/40 bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-amber-700/40 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-orange-950/40"
                    >
                      {/* Premium Glow Effect */}
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-orange-400/10" />

                      {/* Content */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-orange-200 shadow-md dark:from-amber-700 dark:to-orange-700">
                          <CreditCard className="h-6 w-6 animate-pulse text-amber-700 dark:text-amber-200" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                              {track.title}
                            </h3>
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-800 dark:text-amber-200">
                              Credits Needed
                            </span>
                          </div>

                          {/* Song Details */}
                          <div className="rounded-lg border border-amber-100/50 bg-white/70 p-3 backdrop-blur-sm dark:border-amber-800/30 dark:bg-slate-900/50">
                            <div className="space-y-2 text-sm">
                              {track.prompt && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-amber-600 dark:text-amber-400">
                                    Style:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.prompt}
                                  </span>
                                </div>
                              )}
                              {track.fullDescribedSong && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-amber-600 dark:text-amber-400">
                                    Theme:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.fullDescribedSong.length > 50
                                      ? `${track.fullDescribedSong.substring(0, 50)}...`
                                      : track.fullDescribedSong}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-amber-500 dark:text-amber-400">
                                  {track.instrumental
                                    ? "🎵 Instrumental"
                                    : "🎤 With Vocals"}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(
                                    track.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                            <div className="relative flex items-center gap-2">
                              <Zap className="h-4 w-4 animate-pulse" />
                              Unlock with Premium
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );

                case "failed":
                  return (
                    <div
                      key={track.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:border-slate-700/50 dark:from-slate-950/40 dark:via-gray-950/30 dark:to-slate-900/40"
                    >
                      {/* Subtle Error Animation */}
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-red-500/5 to-transparent opacity-50" />

                      {/* Error Indicators */}
                      <div className="absolute top-3 right-3 h-2 w-2 animate-ping rounded-full bg-red-400/60" />

                      {/* Content */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-gray-100 shadow-md dark:from-slate-800 dark:to-gray-800">
                          <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {track.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                              <XCircle className="h-3 w-3" />
                              Failed
                            </span>
                          </div>

                          {/* Song Details */}
                          <div className="rounded-lg border border-slate-100/50 bg-white/70 p-3 backdrop-blur-sm dark:border-slate-800/30 dark:bg-slate-900/50">
                            <div className="space-y-2 text-sm">
                              {track.prompt && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-slate-600 dark:text-slate-400">
                                    Style:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.prompt}
                                  </span>
                                </div>
                              )}
                              {track.fullDescribedSong && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-slate-600 dark:text-slate-400">
                                    Theme:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.fullDescribedSong.length > 50
                                      ? `${track.fullDescribedSong.substring(0, 50)}...`
                                      : track.fullDescribedSong}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {track.instrumental
                                    ? "🎵 Instrumental"
                                    : "🎤 With Vocals"}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(
                                    track.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                              Server error or invalid parameters
                            </div>
                            <button className="group/btn inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-slate-700 hover:to-slate-800 hover:shadow-lg active:scale-95">
                              <RefreshCcw className="h-4 w-4 transition-transform group-hover/btn:rotate-180" />
                              Retry
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                default:
                  return (
                    <div
                      key={track.id}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-200/40 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-emerald-300/60 hover:bg-gradient-to-br hover:from-emerald-100/90 hover:via-green-100/80 hover:to-teal-100/90 hover:shadow-xl dark:border-emerald-700/40 dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40 dark:hover:border-emerald-600/60 dark:hover:from-emerald-900/50 dark:hover:via-green-900/40 dark:hover:to-teal-900/50"
                      onClick={() => handleTrackSelect(track.id)}
                    >
                      {/* Success Glow Effect */}
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-emerald-400/10 via-green-400/5 to-teal-400/10" />

                      {/* Hover Glow Ring */}
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-teal-400/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Content */}
                      <div className="relative flex items-start gap-4">
                        <div className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                          {track.thumbnailUrl ? (
                            <Image
                              src={track.thumbnailUrl}
                              width={80}
                              height={80}
                              alt={track.title}
                              unoptimized
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800">
                              <Music className="h-6 w-6 animate-pulse rounded-full" />
                            </div>
                          )}

                          <div className="absolute inset-0 rounded-xl bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <div className="flex h-full w-full items-center justify-center">
                              <div className="group/play relative">
                                {loadingTrackId === track.id ? (
                                  <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-black/30 shadow-lg backdrop-blur-sm">
                                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                                  </div>
                                ) : (
                                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-xl">
                                    <Play className="h-6 w-6 fill-white text-white transition-transform duration-200 group-hover/play:scale-110" />
                                    {/* Pulse ring */}
                                    <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/40" />
                                    <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                              {track.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200">
                              ✓ Ready to Play
                            </span>
                          </div>

                          {/* Song Details */}
                          <div className="rounded-lg border border-emerald-100/50 bg-white/70 p-3 backdrop-blur-sm dark:border-emerald-800/30 dark:bg-slate-900/50">
                            <div className="space-y-2 text-sm">
                              {track.prompt && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    Style:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.prompt}
                                  </span>
                                </div>
                              )}
                              {track.fullDescribedSong && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    Theme:
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {track.fullDescribedSong.length > 50
                                      ? `${track.fullDescribedSong.substring(0, 50)}...`
                                      : track.fullDescribedSong}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-emerald-500 dark:text-emerald-400">
                                  {track.instrumental
                                    ? "🎵 Instrumental"
                                    : "🎤 With Vocals"}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                  {new Date(
                                    track.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Publish/Unpublish Button */}
                        <div className="flex items-center justify-end">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              void handlePublishToggle(
                                track.id,
                                track.published,
                              );
                            }}
                            disabled={publishingTrackId === track.id}
                            variant="outline"
                            size="sm"
                            className={`w-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
                              track.published
                                ? "border-red-300 bg-red-50 text-red-700 shadow-sm hover:bg-red-100 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950/70"
                                : "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
                            }`}
                          >
                            {publishingTrackId === track.id ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-xs font-medium">
                                  {track.published
                                    ? "Unpublishing..."
                                    : "Publishing..."}
                                </span>
                              </div>
                            ) : track.published ? (
                              <div className="flex items-center gap-2">
                                <EyeOff className="h-4 w-4" />
                                <span className="text-xs font-semibold">
                                  Unpublish
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                <span className="text-xs font-semibold">
                                  Publish
                                </span>
                              </div>
                            )}
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 w-full border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm hover:scale-105 hover:bg-emerald-100 active:scale-95 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  const playUrl = await getPlayUrl(track.id);
                                  window.open(playUrl, "_blank");
                                }}
                              >
                                Download
                                <Download className="h-4 w-4" />
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setTrackToRename(track);
                                }}
                              >
                                Rename
                                <Pencil className="h-4 w-4" />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  );
              }
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-2 pt-20 text-center">
              <Music className="mt-4 mb-4 h-10 w-10 animate-pulse" />
              <h2 className="text-2xl font-bold">No songs created yet.</h2>
              <p className="text-muted-foreground mt-4 mb-4 text-sm">
                {searchQuery
                  ? "No tracks match your search."
                  : "Create a song to get started."}
              </p>
            </div>
          )}
        </div>
      </div>
      {trackToRename && (
        <RenameDialog
          track={trackToRename}
          onClose={() => setTrackToRename(null)}
          onRename={(trackId, newTitle) => {
            void renameSong(trackId, newTitle);
          }}
        />
      )}
    </div>
  );
}
