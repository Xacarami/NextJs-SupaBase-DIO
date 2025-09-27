import { supabase } from ".";

export const getPosts = async () => {
    const {data} = await supabase.from("posts").select("*");

    if(data){
        return data;
    }

    return []
}