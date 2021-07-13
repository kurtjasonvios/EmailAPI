<script>
	import router from "page";
	import Profile from './components/Emails.svelte';
	import Login from './components/Login.svelte'; 
	import EmailBody from './components/EmailBody.svelte'; 
	import { user } from "./stores";

	let page;
	let params;

	router('/login', () => page = Login);
	router('/profile', () => page = Profile);
	router('/view', () => page = EmailBody);
	router('/view/:id',(ctx, next) => {
		params = ctx.params
		next()}, () => (page = EmailBody));
	
	// testing lang ni. haha. 
	// wala ni gamit. 
	// always ni sa else mosulod
	console.log($user);
	$: if ($user.length !== 0) {
		router('/profile');
	}
	else {
		router('/login');
	}

	//$: router('/login');
	//$: router('/profile');	

	router.start();	
</script>

<svelte:component this={page} params="{params}"/>