<script>
    import { onMount } from "svelte";
    import ProfileHead from "./ProfileHead.svelte";
    import { token } from "../stores";
    import MailAPI from "../MailAPI";

    export let params;    
    let promise = Promise.resolve();

    async function loadMessage()
    {
        console.log(params.id);

        let response = await MailAPI.getMessageBody(params.id, $token);

        if (response.ok) {
            let item = await response.json();
            console.log(item);
            
            let message = {
                subject: item['subject'],
                name: item['from'].name,
                address: item['from'].address,
                text: item['text']
            };

            console.log(message);

            await MailAPI.messageSeen(params.id, $token);

            return message;
        } else {
            //console.log('asdfasdfasdf');
            throw new Error(users);
        }
    }

    onMount(async () => {
        promise = loadMessage();
    })
</script>

<style>
    .subject {
        font-weight: bold;
        font-size: large;
        background-color: #1d849e;
        padding: 10px;
    }
    .messagebody {
        padding: 10px 10px 10px 10px;
        border-bottom: solid;
        border-bottom-color: #d3d4d4;
    }
    .messagetext {
        padding: 20px 10px 10px 10px;
        font-size: 14px;
    }
    div {
        width: 100%;
    }
</style>

<ProfileHead/>
{#await promise}
    <div style="text-align: center; margin-top: 20px;">We are fetching your email...</div>
{:then message}
    <div class="subject">{message.subject}</div>
    <div class="messagebody">
        <div style="font-weight: bold;">{message.name}</div>
        <div style="font-size: small;">{message.address}</div>    
    </div>
    <div class="messagetext">{message.text}</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
