<script>
    import { onMount } from "svelte";
    import { token, messages } from "../stores";
    import MailAPI from "../MailAPI";
    import ProfileHead from "./ProfileHead.svelte";
    import EmailInfo from "./EmailInfo.svelte";
    import router from "page";

    let response;
    $messages = [];

    function handleOpenMessage (e) {
        router('/view/' + e.detail);
    } 

    async function handleRefresh() {
        response = await MailAPI.getMessages($token);

        if (response.ok) {
            let itemList = await response.json();
            console.log(itemList);

            $messages = itemList['hydra:member'];
            console.log($messages);
            //console.log($messages[0].id);
		} else {
			console.log('asdfasdfasdf');
		}
    }

    onMount(async () => {        
        handleRefresh();
    })

    /*$: $messages = [
            {
                id: 'a1',
                from: {
                    name: 'Kurt Vios',
                    address: 'kurtjasonvios@gmail.com',
                },
                intro: "I'm using Api-Platform and React as client. I have a Forum entity which contains other objects : an author (User entity) and a",
                subject: 'Testing 1',
                seen: false
            },
            {
                id: 'a2',
                from: {
                    name: 'Kurt Vios',
                    address: 'kurtjasonvios@gmail.com',
                },
                intro: "I'm using Api-Platform and React as client. I have a Forum entity which contains other objects",
                subject: 'Testing 2',
                seen: true
            },
            {
                id: 'a3',
                from: {
                    name: 'Kurt Vios',
                    address: 'kurtjasonvios@gmail.com',
                },
                intro: "I'm using Api-Platform and React as client. I have a Forum entity",
                subject: 'Testing 3',
                seen: true
            }
        ];*/
</script>

<ProfileHead on:refresh={handleRefresh}/>
<table class="table table-hover table-fixed">
    <tbody>
    {#each $messages as message}
        <tr>
            <td>
               <EmailInfo {...message} on:openmessage={handleOpenMessage}/>
            </td>
        </tr>
    {/each}
    </tbody>
</table>