<script>
    import router from "page";
    import MailAPI from "../MailAPI";
    import { token, user } from "../stores";

    let username = "", password = "", disabled = false;

    async function triggerLogin() {
        disabled = true;

        let response = await MailAPI.login(username, password);

        if (response.ok) {
            $token = await response.json();

            $user = {
                name: username,
                pass: password
            }

            console.log($token);
            console.log($user);

            router('/profile');
		} else {
            disabled = false;

			console.log('I AM AN ERROR');
		}
    }
</script>

<style>
    .container {
        width: 100%;
        text-align: center;       
        position: absolute;
        top: 30%;
        bottom: 0;
    }
    
    input, button {
        margin: 3px;
        padding: 5px;
        width: 300px;
    }
    
    button {
        font-weight:bold;
    }
</style>
      
<form class="container" on:submit|preventDefault={triggerLogin}>
    <fieldset {disabled}>
        <input type="text" bind:value="{username}"  placeholder="Username"/>
        <br>
        <input type="password" bind:value="{password}"  placeholder="Password"/>
        <br>
        <button type="submit">LOGIN</button>
    </fieldset>
</form>
