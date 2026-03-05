CREATE TABLE `connection_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`spot_id` text NOT NULL,
	`success` integer NOT NULL,
	`error_detail` text,
	`automation_log` text,
	`device_info` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pattern_bundle_versions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`version` integer NOT NULL,
	`published_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `portal_patterns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`spot_id` text NOT NULL,
	`name` text NOT NULL,
	`name_ja` text NOT NULL,
	`airport_code` text DEFAULT '',
	`country` text NOT NULL,
	`ssids` text NOT NULL,
	`portal_type` text NOT NULL,
	`tier` text DEFAULT 'free' NOT NULL,
	`pattern_data` text NOT NULL,
	`pattern_version` integer DEFAULT 1 NOT NULL,
	`last_verified` text,
	`is_active` integer DEFAULT true NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portal_patterns_spot_id_unique` ON `portal_patterns` (`spot_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `spot_id_idx` ON `portal_patterns` (`spot_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`subscription_tier` text DEFAULT 'free' NOT NULL,
	`subscription_expires_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);