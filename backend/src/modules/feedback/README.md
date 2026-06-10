# Feedback Certificates

## Production Setup

1. Run `backend/supabase/feedback.sql` in the Supabase SQL editor.
   - Creates `feedback_submissions`.
   - Creates a private `certificates` storage bucket if it does not exist.

2. Make sure the backend env has a Supabase key that can read/write the `certificates` bucket.
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - Optional: `CERTIFICATES_BUCKET=certificates`

3. Upload mapped certificates once:

```bash
cd backend
npm run certificates:upload
```

The upload script uploads the 52 mapped certificates from:

```text
certificates/certificates_png
```

It intentionally does not map or upload the two unused certificates:

```text
Certificate for OC (39).png
Certificate for OC (40).png
```

## Runtime Flow

1. User submits `/feedback`.
2. Backend matches by normalized email.
3. If no email mapping exists, backend only falls back to exact normalized name for recipients whose Excel email is blank.
4. Backend downloads the mapped PNG from the private Supabase Storage bucket.
5. Backend sends it as an email attachment.
6. Backend best-effort logs the submission in `feedback_submissions`.
