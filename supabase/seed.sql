INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
) (
    select
        '00000000-0000-0000-0000-000000000000',
        uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'test@test.com',
            crypt ('test', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
    );

/* INSERT INTO public.profiles (
    id,
    updated_at,
    username,
    full_name
) (
    select
        id,
        current_timestamp,
        'test',
        'test'
); */