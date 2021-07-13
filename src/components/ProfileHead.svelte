<script>
    import { user } from "../stores";
    import { createEventDispatcher } from "svelte"; 
    const dispatch = createEventDispatcher();

    function handleRefresh() {
        //console.log($user);
        //router('/profile');
        dispatch("refresh");
    }
    /*$user = {
        name: "qwerty@northsixty.com",
        pass: "asdf"
    }*/
</script>

<style>
    .header{
        display: flex;
        text-align: center;
        justify-content: space-between;
        padding: 10px;
        background-color: #166C81;
        font-size: x-large;
        font-weight: bold;
        color: #fff;
        width: 100%;
    }

    button {
        font-size: medium;
        font-weight: bold;
        width: 150px;
        height: 40px;
    }
</style>

<div class="header">
    <span>{$user.name}</span>
    <span>
        <button type="button" class="btn btn-dark" on:click={handleRefresh}>Refresh</button>
    </span>
</div>