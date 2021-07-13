<script>
    import { createEventDispatcher } from "svelte"; 
    const dispatch = createEventDispatcher();

    export let id, from, subject, intro, seen;

    let page;

    function handleOpenMessage() {
        dispatch("openmessage", id);
    }
</script>
    
<style>
    .email {
        display: flex;
        padding: 10px;
        font-weight: bold;
        background: #ECECEC;
        margin: -1px;
    }
    .message {
        overflow: hidden;
        white-space: nowrap;
        font-size: small;
        font-weight: normal;
    }
    .email.seen {
        font-weight: normal;        
        background: #fff;
    }
    .email:hover {
        background:  #ECECEC;
    }
    .address {
        font-size: small;
    }
</style>

<div class="email" class:seen on:click|preventDefault={handleOpenMessage}>
    <div style="width: 25%">
        <div>{from.name}</div>
        <div class="address">{from.address}</div>
    </div>
    <div style="width: 75%">
        <div>{subject}</div>
        <div class="message">{intro}</div>
    </div>
    <input type="checkbox" style="display:none" bind:checked={seen}/>
</div>