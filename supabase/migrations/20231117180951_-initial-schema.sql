create table "public"."bookmarks" (
    "id" uuid not null,
    "user_id" uuid,
    "post_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."hashtags" (
    "id" uuid not null,
    "name" text not null
);


create table "public"."likes" (
    "id" uuid not null,
    "user_id" uuid not null,
    "post_id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."post_hashtag" (
    "post_id" uuid not null,
    "hashtag_id" uuid not null
);


create table "public"."posts" (
    "id" uuid not null,
    "text" text not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "username" text,
    "full_name" text
);


create table "public"."replies" (
    "id" uuid not null,
    "text" text not null,
    "user_id" uuid not null,
    "post_id" uuid,
    "reply_id" uuid
);

CREATE UNIQUE INDEX bookmark_unique ON public.bookmarks USING btree (user_id, post_id);

CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree (id);

CREATE UNIQUE INDEX hashtags_pkey ON public.hashtags USING btree (id);

CREATE UNIQUE INDEX like_unique ON public.likes USING btree (user_id, post_id);

CREATE UNIQUE INDEX likes_pkey ON public.likes USING btree (id);

CREATE UNIQUE INDEX post_hashtag_pkey ON public.post_hashtag USING btree (post_id, hashtag_id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX replies_pkey ON public.replies USING btree (id);

alter table "public"."bookmarks" add constraint "bookmarks_pkey" PRIMARY KEY using index "bookmarks_pkey";

alter table "public"."hashtags" add constraint "hashtags_pkey" PRIMARY KEY using index "hashtags_pkey";

alter table "public"."likes" add constraint "likes_pkey" PRIMARY KEY using index "likes_pkey";

alter table "public"."post_hashtag" add constraint "post_hashtag_pkey" PRIMARY KEY using index "post_hashtag_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."replies" add constraint "replies_pkey" PRIMARY KEY using index "replies_pkey";

alter table "public"."bookmarks" add constraint "bookmark_unique" UNIQUE using index "bookmark_unique";

alter table "public"."bookmarks" add constraint "bookmarks_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_post_id_fkey";

alter table "public"."bookmarks" add constraint "bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_user_id_fkey";

alter table "public"."likes" add constraint "like_unique" UNIQUE using index "like_unique";

alter table "public"."likes" add constraint "likes_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_post_id_fkey";

alter table "public"."likes" add constraint "likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_user_id_fkey";

alter table "public"."post_hashtag" add constraint "post_hashtag_hashtag_id_fkey" FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE not valid;

alter table "public"."post_hashtag" validate constraint "post_hashtag_hashtag_id_fkey";

alter table "public"."post_hashtag" add constraint "post_hashtag_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."post_hashtag" validate constraint "post_hashtag_post_id_fkey";

alter table "public"."posts" add constraint "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."posts" validate constraint "posts_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."replies" add constraint "replies_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."replies" validate constraint "replies_post_id_fkey";

alter table "public"."replies" add constraint "replies_reply_id_fkey" FOREIGN KEY (reply_id) REFERENCES replies(id) ON DELETE CASCADE not valid;

alter table "public"."replies" validate constraint "replies_reply_id_fkey";

alter table "public"."replies" add constraint "replies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."replies" validate constraint "replies_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$function$
;