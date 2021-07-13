<script>
    import { onMount } from "svelte";
    import ProfileHead from "./ProfileHead.svelte";
    import { token } from "../stores";
    import MailAPI from "../MailAPI";
    //import { writable } from "svelte/store";
    //export const message = writable([]);

    export let params;
    let message = {};

    onMount(async () => {
        console.log(params.id);

        let response = await MailAPI.getMessageBody(params.id, $token);

        if (response.ok) {
            let item = await response.json();
            console.log(item);
            
            message = {
                subject: item['subject'],
                name: item['from'].name,
                address: item['from'].address,
                text: item['text']
            };

            //message = message;

            //message = itemList['subject'];
            //console.log(item['subject']);
            console.log(message);
            //return message;

            await MailAPI.messageSeen(params.id, $token);
		} else {
			//console.log('asdfasdfasdf');
            throw new Error(users);
		}
    })

    /*let message = {
        subject: "testing 3",
        from: {
            name: "Kurt Vios",
            address: "kurtjasonvios@gmail.com"
        },
        text: "asdfasdfasdfasdfasdf"
    }*/
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
<div class="subject">{message.subject}</div>
<div class="messagebody">
    <div style="font-weight: bold;">{message.name}</div>
    <div style="font-size: small;">{message.address}</div>    
</div>
<div class="messagetext">{message.text}</div>
