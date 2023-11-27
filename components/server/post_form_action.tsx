import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import PostForm from "../client/PostForm";

export default async function PostFormAction() {
  async function submitPost(formData: FormData) {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.auth.getUser();
    const { user } = data;

    const post = String(formData.get("post"));

    if (!post) return;
    if (!user) return;

    const { data: postData, error } = await supabase.from("posts").insert({
      user_id: user.id,
      text: post,
      id: randomUUID(),
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  return <PostForm submitPost={submitPost} />;
}
