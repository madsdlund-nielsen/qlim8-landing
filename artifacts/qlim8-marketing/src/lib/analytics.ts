import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';

type EventType = 'click' | 'navigation' | 'form_submit' | 'feature_use';

interface AnalyticsEvent {
  eventType: EventType;
  eventName: string;
  route?: string;
  targetRoute?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

const EVENT_BUFFER: AnalyticsEvent[] = [];
const FLUSH_INTERVAL = 5000;
const MAX_BUFFER_SIZE = 20;
const MAX_METADATA_SIZE = 1000;

let flushTimeout: ReturnType<typeof setTimeout> | null = null;
let isFlushing = false;

function getCurrentRoute(): string {
  return window.location.pathname;
}

function scheduleFlush(): void {
  if (flushTimeout) {
    clearTimeout(flushTimeout);
  }
  
  flushTimeout = setTimeout(() => {
    flushTimeout = null;
    flushEvents();
  }, FLUSH_INTERVAL);
}

async function flushEvents(): Promise<void> {
  if (EVENT_BUFFER.length === 0 || isFlushing) return;

  isFlushing = true;
  const events = EVENT_BUFFER.splice(0, EVENT_BUFFER.length);
  
  try {
    const response = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to send analytics events:', response.status);
    }
  } catch (error) {
    console.error('Error sending analytics events:', error);
  } finally {
    isFlushing = false;
    if (EVENT_BUFFER.length > 0) {
      scheduleFlush();
    }
  }
}

function sanitizeMetadata(metadata?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!metadata) return undefined;
  const str = JSON.stringify(metadata);
  if (str.length > MAX_METADATA_SIZE) {
    return { truncated: true, originalSize: str.length };
  }
  return metadata;
}

function queueEvent(event: AnalyticsEvent): void {
  const sanitizedEvent = {
    ...event,
    eventName: event.eventName.slice(0, 100),
    metadata: event.metadata ? sanitizeMetadata(event.metadata) : undefined,
  };
  
  EVENT_BUFFER.push(sanitizedEvent);
  
  if (EVENT_BUFFER.length >= MAX_BUFFER_SIZE) {
    if (flushTimeout) {
      clearTimeout(flushTimeout);
      flushTimeout = null;
    }
    flushEvents();
  } else {
    scheduleFlush();
  }
}

export function trackClick(eventName: string, metadata?: Record<string, unknown>): void {
  queueEvent({
    eventType: 'click',
    eventName,
    route: getCurrentRoute(),
    timestamp: new Date().toISOString(),
    metadata,
  });
}

export function trackFeatureUse(eventName: string, metadata?: Record<string, unknown>): void {
  queueEvent({
    eventType: 'feature_use',
    eventName,
    route: getCurrentRoute(),
    timestamp: new Date().toISOString(),
    metadata,
  });
}

export function trackFormSubmit(eventName: string, metadata?: Record<string, unknown>): void {
  queueEvent({
    eventType: 'form_submit',
    eventName,
    route: getCurrentRoute(),
    timestamp: new Date().toISOString(),
    metadata,
  });
}

export function trackNavigation(fromRoute: string, toRoute: string): void {
  queueEvent({
    eventType: 'navigation',
    eventName: `Navigate: ${fromRoute} → ${toRoute}`,
    route: fromRoute,
    targetRoute: toRoute,
    timestamp: new Date().toISOString(),
  });
}

export function useRouteTracking(): void {
  const [location] = useLocation();
  const prevLocation = useRef<string | null>(null);

  useEffect(() => {
    if (prevLocation.current !== null && prevLocation.current !== location) {
      trackNavigation(prevLocation.current, location);
    }
    prevLocation.current = location;
  }, [location]);
}

export function useAnalytics() {
  const track = useCallback((eventName: string, eventType: EventType = 'click', metadata?: Record<string, unknown>) => {
    queueEvent({
      eventType,
      eventName,
      route: getCurrentRoute(),
      timestamp: new Date().toISOString(),
      metadata,
    });
  }, []);

  return { 
    track, 
    trackClick, 
    trackFeatureUse, 
    trackFormSubmit,
  };
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (EVENT_BUFFER.length > 0) {
      navigator.sendBeacon('/api/analytics/events', JSON.stringify({ events: EVENT_BUFFER }));
    }
  });
}
