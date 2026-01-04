import { supabase } from './supabase.js';

// Create a marketplace item
window.createItem = async () => {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    if(!name || !price) return;

    const user = supabase.auth.user();
    if(!user) return alert('Login required');

    const feePercentage = 5; // 5% fee
    const fee = (price * feePercentage) / 100;

    await supabase.from('marketplace').insert([
        { user_id: user.id, name, price, fee, created_at: new Date() }
    ]);

    document.getElementById('item-name').value='';
    document.getElementById('item-price').value='';
};
