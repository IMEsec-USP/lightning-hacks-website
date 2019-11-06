from functools import wraps
from datetime import datetime, timedelta

FORCE_REFRESH_AMOUNT = 5

def cache_response(time: timedelta):
    ''' caches the response until time has passed. '''
    def decorator(f):
        cache_used_times = 0
        cached_response = None
        cached_until = None

        @wraps(f)
        def new_f(*args, **kwargs):
            nonlocal cached_response
            nonlocal cached_until
            nonlocal cache_used_times
            if cached_response is None or cached_until < datetime.utcnow() or cache_used_times > FORCE_REFRESH_AMOUNT:
                cached_response = f(*args, **kwargs)
                cached_until = datetime.utcnow() + time
                cache_used_times = 0
            
            cache_used_times += 1
            return cached_response

        return new_f

    return decorator
