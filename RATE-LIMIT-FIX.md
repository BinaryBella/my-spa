# Rate Limiting Fix - 429 Error Resolution

## Problem
The app was receiving **429 "Too Many Requests"** errors from the DummyJSON API due to:
1. Multiple simultaneous API requests on page load
2. Aggressive retry logic making 2-3 rapid attempts after 429 errors
3. Short cache duration (5 minutes) causing frequent refetches
4. No request deduplication - same data fetched multiple times

## Solution Implemented

### 1. Centralized API Utility (`src/utils/api.ts`)
Created a shared utility module with:
- **Rate Limiting**: Enforces minimum 1-second delay between API calls
- **Request Deduplication**: Prevents multiple identical requests by reusing pending requests
- **Exponential Backoff**: Retries with 5s, 10s, 20s delays on 429 errors
- **Centralized Caching**: Reusable cache helpers for all components

### 2. Updated Components
All API-consuming components now use the centralized utility:
- ✅ `useProducts.ts` - Product fetching with 30-minute cache
- ✅ `FilterBar.vue` - Category fetching with 24-hour cache
- ✅ `ProductDetailView.vue` - Product details with 30-minute cache

### 3. Cache Duration Changes
- Products: 5 minutes → **30 minutes**
- Product details: 10 minutes → **30 minutes**
- Categories: 24 hours (unchanged, but now uses shared utility)

### 4. Key Features
- **Global rate limiter** prevents any API call within 1 second of the previous one
- **Request deduplication** ensures identical URLs share the same request
- **Better error handling** with more informative messages
- **Logging** for debugging rate limit issues

## Expected Results
- ✅ No more 429 errors under normal usage
- ✅ Faster page loads due to request deduplication
- ✅ Reduced API calls by 80%+ due to longer cache
- ✅ Better user experience with proper retry handling

## Testing
1. Clear localStorage: `localStorage.clear()` in browser console
2. Refresh the page - should load without 429 errors
3. Navigate around - most content should load from cache
4. Check console logs for API call patterns

## Future Enhancements
- Consider implementing IndexedDB for larger cache storage
- Add cache invalidation controls for users
- Implement service worker for offline capabilities
- Add visual indicators when data is loading from cache vs API
