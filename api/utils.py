from functools import wraps
from datetime import datetime, timedelta

def cache_response(time: timedelta):
    ''' caches the response until time has passed. '''
    def decorator(f):
        cached_response = None
        cached_until = None

        @wraps(f)
        def new_f(*args, **kwargs):
            nonlocal cached_response
            nonlocal cached_until
            if cached_response is None or cached_until < datetime.utcnow():
                cached_response = f(*args, **kwargs)
                cached_until = datetime.utcnow() + time
            
            return cached_response

        return new_f

    return decorator
