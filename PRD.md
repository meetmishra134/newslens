# Project Requirement Document (PRD)

## Newslens- An AI Powered News Aggregator

### 1. Overview

NewsLens is an AI-powered news aggregation platform that collects articles from multiple trusted publishers, groups them by story, compares viewpoints, summarizes information, and helps users understand current events without bias.

## **Features of Newslens**

1. Personalised feed by categories, country, language
2. Browse all news with filters
3. Explore page (outside your interests)
4. Trending page (sorted by read count)
5. Single article view
6. Multi-source normalization (GNews + Currents API)
7. Cron job fetching every 30 minutes
8. AI summary per article
9. Bookmarks (save / unsave articles)
10. Reading history (auto-tracked on article open)
11. Reading streak (daily consecutive reads)
12. Comments (add, edit, delete on any article)
13. Onboarding (pick categories, country, language)
14. User profile (streak, stats, reading calendar)
15. Preferences settings (update categories, country, language)
16. Google OAuth + Email OTP login (Clerk)

**Database Collections**

- User
- Article
- NewsSource
- Bookmark
- ReadHistory
- Comment
- Session

### Technical Specifications

#### -> API Endpoints

**HealthCheck Route**

- `GET /api/v1/healthCheck`- It us used to check whether the backend is working or not.

**Auth Routes** (`/api/v1/auth/`)

- `POST /api/v1/auth/sync`- Create or update user in Postgres after Clerk login. Called once immediately after auth completes on frontend.

- `POST /api/v1/auth/logout`-
  /api/auth/logout
  Invalidate session. Deletes all session records for user from DB.

**Users Routes** (`/api/v1/users/`)

- `GET /api/v1/users/me`- Get current user profile, preferences, and streak. Used on every app load to hydrate the frontend store.

- `PATCH /api/v1/users/me`- Update user preferences. Used in onboarding and settings page. All fields optional.

- `POST /api/v1/users/me`- Delete the user and the data related to it

- `GET /api/v1/users/stats`- Get profile stats for the profile page. Aggregated data, not raw records.

- `GET /api/v1/users/calander

**Bookmarks Routes** (`/api/v1/bookmarks`)

- `GET /api/v1/bookamarks`- All bookmarks for current user with full article data. Sorted by savedAt desc.

- `POST /api/v1/bookmarks`- Save an article. Returns 409 if already bookmarked — frontend uses this to toggle the bookmark icon stat

- `DELETE /api/v1/bookmarks/:articleId`- Remove a bookmark by articleId (not bookmark ID). Simpler for frontend — it always knows the articleId.

**Comments Routes** (`/api/v1/comments/`)

- ` GET /api/v1/comments/:articleId`- All comments for an article with user info. Sorted by createdAt desc.

- `POST /api/v1/comments/:articleId`- Post a new comment on an article. Validates content is not empty and under 500 chars.

- `PATCH /api/v1/comments/:commentId` - Edit own comment. Returns 403 if user does not own the comment.

- `DELETE /api/v1/comments/:commentId` - Delete own comment. Returns 403 if user does not own the comment.

**News Feed & Discovery Routes** (`/api/v1/news/`)

- `GET /api/v1/news/feed` - Personalised feed filtered by user's saved categories, country, language. Cached in Redis per user for 5 minutes.

- `GET /api/v1/news/explore` - Articles from categories the user has NOT selected. Drives the Explore page.

- `GET /api/v1/news/` - Browse all news with manual filters. Used when user wants to override their preferences temporarily.

- `GET /api/v1/news/trending` - Top articles sorted by read_count in the last 24 hours. Same for every user. Cached 30 min.

- `GET /api/v1/news/:articleId` - Single article by ID. Used on the article detail page. Cached per article for 1 hour.

- `POST /api/v1/news/articleId/read` - Mark article as read. Increments read_count, saves to read_history, updates streak. Called automatically when article page loads.

- `GET /api/v1/news/:articleId/summary` - Get or generate AI summary. Checks Redis → Postgres → OpenAI in that order. Caches permanently after first generation.

**Sources Routes** (`/api/v1/sources/`)

- `GET /api/v1/sources` - List all active news sources. Used on onboarding and settings to show where articles come from.
