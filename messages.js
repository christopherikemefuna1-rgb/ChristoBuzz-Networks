import { supabase } from './supabase.js';

// Send message (1-on-1 or group)
export async function sendMessage(receiverOrGroup, content){
    if(!content) return;

    let receiver_id = null, group_id = null;

    // Simple check: if starts with "group-" it's a group message
    if(receiverOrGroup.startsWith("group-")) {
        group_id = receiverOrGroup.replace("group-", "");
    } else {
        receiver_id = receiverOrGroup;
    }

    const { data, error } = await supabase.from('messages').insert([{
        sender_id: supabase.auth.user().id,
        receiver_id,
        group_id,
        content
    }]);

    if(error) console.error(error);
}

// Real-time message fetch
export function fetchMessages(callback){
    supabase.from('messages').on('INSERT', payload => {
        callback(payload.new);
    }).subscribe();
}
