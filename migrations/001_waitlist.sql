CREATE TABLE IF NOT EXISTS waitlist_entries (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 full_name varchar(100) NOT NULL,
 email varchar(254) UNIQUE NOT NULL CHECK (email = lower(trim(email))),
 phone varchar(30),
 interest text NOT NULL CHECK (interest IN ('Patient','Doctor','Pharmacy Partner')),
 location varchar(100),
 consent_at timestamptz NOT NULL DEFAULT now(),
 policy_version text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS waitlist_rate_limits (
 key text PRIMARY KEY,
 hits integer NOT NULL,
 expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS waitlist_rate_limits_expiry ON waitlist_rate_limits(expires_at);
