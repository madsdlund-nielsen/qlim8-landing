import { test } from "node:test";
import assert from "node:assert/strict";
import {
  dmaMilestone,
  isAutomated,
  pathOf,
  readAttribution,
  referrerHostOf,
  SITE_EVENT_NAMES,
  videoMilestones,
  type SiteEventName,
} from "./siteEvents.ts";
import { clientIp, copenhagenDay, isBotUserAgent, visitorHash } from "./siteVisitor.ts";

test("readAttribution: ?ref=, utm_* and the referrer host, trimmed and bounded", () => {
  assert.deepEqual(
    readAttribution(
      "https://qlim8.com/demo?ref=linkedin&utm_source=li&utm_medium=social&utm_campaign=q4-launch",
      "https://www.linkedin.com/feed/",
    ),
    { ref: "linkedin", utmSource: "li", utmMedium: "social", utmCampaign: "q4-launch", referrerHost: "www.linkedin.com" },
  );
  assert.equal(readAttribution(`https://qlim8.com/?ref=${"x".repeat(500)}`, "").ref?.length, 120);
  assert.deepEqual(readAttribution("not a url", "https://google.com/"), {
    ref: null,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    referrerHost: null,
  });
});

test("referrerHostOf: our own site and a missing referrer are not a source", () => {
  assert.equal(referrerHostOf("https://qlim8.com/priser", "qlim8.com"), null);
  assert.equal(referrerHostOf("", "qlim8.com"), null);
  assert.equal(referrerHostOf("garbage", "qlim8.com"), null);
  assert.equal(referrerHostOf("https://lnkd.in/abc", "qlim8.com"), "lnkd.in");
});

test("pathOf: the pathname only, never the query or fragment", () => {
  assert.equal(pathOf("https://qlim8.com/demo?ref=linkedin#film"), "/demo");
  assert.equal(pathOf("https://qlim8.com"), "/");
  assert.equal(pathOf("::"), "/");
});

test("dmaMilestone: first topic, half way and all ten, each once", () => {
  assert.equal(dmaMilestone(0, 1, 10), "dma_started");
  assert.equal(dmaMilestone(1, 2, 10), null);
  assert.equal(dmaMilestone(4, 5, 10), "dma_halfway");
  assert.equal(dmaMilestone(5, 6, 10), null);
  assert.equal(dmaMilestone(9, 10, 10), "dma_completed");
  assert.equal(dmaMilestone(3, 3, 10), null);
  assert.equal(dmaMilestone(5, 4, 10), null);
});

test("videoMilestones: half way and the end, reported once each", () => {
  const seen = new Set<SiteEventName>();
  assert.deepEqual(videoMilestones(10, 140, seen), []);
  assert.deepEqual(videoMilestones(71, 140, seen), ["demo_video_halfway"]);
  assert.deepEqual(videoMilestones(80, 140, seen), []);
  assert.deepEqual(videoMilestones(139, 140, seen), ["demo_video_completed"]);
  assert.deepEqual(videoMilestones(139, 140, seen), []);
  // Seeking straight to the end reports both.
  assert.deepEqual(videoMilestones(140, 140, new Set()), ["demo_video_halfway", "demo_video_completed"]);
  // Before the metadata has loaded the duration is NaN.
  assert.deepEqual(videoMilestones(1, Number.NaN, new Set()), []);
});

test("the event names are unique", () => {
  assert.equal(new Set(SITE_EVENT_NAMES).size, SITE_EVENT_NAMES.length);
});

test("isAutomated: a webdriver is not a visitor", () => {
  assert.equal(isAutomated({ webdriver: true }), true);
  assert.equal(isAutomated({ webdriver: false }), false);
  assert.equal(isAutomated(undefined), false);
});

test("visitorHash: stable within a Copenhagen day, different across days and salts", () => {
  const morning = new Date("2026-10-16T06:00:00Z");
  const evening = new Date("2026-10-16T21:30:00Z"); // 23:30 in Copenhagen (CEST)
  const nextDay = new Date("2026-10-16T22:30:00Z"); // 00:30 the 17th in Copenhagen
  const a = visitorHash("1.2.3.4", "Mozilla/5.0", morning, "salt");
  assert.match(a, /^[a-f0-9]{32}$/);
  assert.equal(visitorHash("1.2.3.4", "Mozilla/5.0", evening, "salt"), a);
  assert.notEqual(visitorHash("1.2.3.4", "Mozilla/5.0", nextDay, "salt"), a);
  assert.notEqual(visitorHash("1.2.3.5", "Mozilla/5.0", morning, "salt"), a);
  assert.notEqual(visitorHash("1.2.3.4", "Mozilla/5.0", morning, "other salt"), a);
  assert.equal(copenhagenDay(nextDay), "2026-10-17");
  // The in-memory salt: stable within a process and day.
  assert.equal(visitorHash("1.2.3.4", "UA", morning), visitorHash("1.2.3.4", "UA", morning));
});

test("clientIp: X-Real-IP first, then the first X-Forwarded-For hop", () => {
  assert.equal(clientIp(new Headers({ "x-real-ip": "9.9.9.9", "x-forwarded-for": "1.1.1.1" })), "9.9.9.9");
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "1.1.1.1, 10.0.0.1" })), "1.1.1.1");
  assert.equal(clientIp(new Headers()), null);
});

test("isBotUserAgent: crawlers, previews and scripts are dropped, browsers are not", () => {
  assert.equal(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"), true);
  assert.equal(isBotUserAgent("LinkedInBot/1.0 (compatible; Mozilla/5.0)"), true);
  assert.equal(isBotUserAgent("curl/8.4.0"), true);
  assert.equal(isBotUserAgent("Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/120.0"), true);
  assert.equal(isBotUserAgent(null), true);
  assert.equal(
    isBotUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]"),
    false,
  );
  assert.equal(
    isBotUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36"),
    false,
  );
});
