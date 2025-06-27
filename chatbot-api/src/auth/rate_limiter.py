import time
from collections import defaultdict

from fastapi import HTTPException, status, Request

GLOBAL_RATE_LIMIT = 30
GLOBAL_TIME_WINDOW_SECONDS = 60

# Memory storage of user requests
ip_requests = defaultdict(list)

# Throttling

def apply_rate_limit(request:Request):
  current_time = time.time()

  ip = request.client.host

    # Filter out requests older than the time window
  ip_requests[ip] = [
        t for t in ip_requests[ip] if t > current_time - GLOBAL_TIME_WINDOW_SECONDS
    ]

  if len(ip_requests[ip]) >= GLOBAL_RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
        )
  else:
        # For debugging: print current usage
        current_usage = len(ip_requests[ip])
        print(f"IP {ip}: {current_usage + 1}/{GLOBAL_RATE_LIMIT} requests used.")

  ip_requests[ip].append(current_time)
  return True
