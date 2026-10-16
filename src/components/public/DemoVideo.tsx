"use client";

import { useRef } from "react";
import { trackSiteEvent, videoMilestones, type SiteEventName } from "@/lib/siteEvents";

// The film on /demo (src/page-components/demo.tsx), as a client component so
// the cookieless analytics (src/lib/siteEvents.ts) can see it started, reached
// half way and was watched to the end. Each is reported once per page view.
export function DemoVideo({ src, poster }: { src: string; poster: string }) {
  const started = useRef(false);
  const seen = useRef(new Set<SiteEventName>());

  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster={poster}
      className="aspect-video w-full bg-primary"
      data-testid="demo-video"
      onPlay={() => {
        if (started.current) return;
        started.current = true;
        trackSiteEvent("demo_video_started");
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        for (const name of videoMilestones(v.currentTime, v.duration, seen.current)) trackSiteEvent(name);
      }}
      onEnded={() => {
        if (!seen.current.has("demo_video_completed")) {
          seen.current.add("demo_video_completed");
          trackSiteEvent("demo_video_completed");
        }
      }}
    >
      <source src={src} type="video/mp4" />
      Din browser kan ikke afspille filmen her.{" "}
      <a href={src} className="underline">
        Hent filmen som MP4
      </a>
      .
    </video>
  );
}
