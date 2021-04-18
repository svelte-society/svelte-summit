<script>
	export let data;
	import { Hero } from "../../components/Hero";
	import Question from "../../components/Question.svelte";
	import Sponsors from "../../components/Sections/Sponsors.svelte";
	import CallForPeople from "../../components/Sections/CallForPeople.svelte";
	import Speakers from "../../components/Sections/Speakers.svelte";
	import SignUp from "../../components/Sections/SignUp.svelte";
	import FAQ from "../../components/Sections/FAQ.svelte";
	import StartTimes from "../../components/StartTimes.svelte";
	import Footer from "../../components/Sections/Footer.svelte";
</script>

<svelte:head>
	<title>Svelte Summit 2020</title>
	<link rel="canonical" href="https://sveltesummit.com/" />

	<!-- Primary Meta Tags -->
	<title>Svelte Summit is a FREE whole-day online event.</title>
	<meta
		name="title"
		content="Svelte Summit is a FREE whole-day online event."
	/>
	<meta
		name="description"
		content="Svelte Summit is an online JavaScript event focused on Svelte and its community taking place on April 25th 2021."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sveltesummit.com/" />
	<meta
		property="og:title"
		content="Svelte Summit is a FREE whole-day online event."
	/>
	<meta
		property="og:description"
		content="Svelte Summit is an online JavaScript event focused on Svelte and its community taking place on April 25th 2021."
	/>
	<meta
		property="og:image"
		content="https://sveltesummit.com/images/metatagimg-spring.png"
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://sveltesummit.com/" />
	<meta
		property="twitter:title"
		content="Svelte Summit is a FREE whole-day online event."
	/>
	<meta
		property="twitter:description"
		content="Svelte Summit is an online JavaScript event focused on Svelte and its community taking place onApril 25th 2021."
	/>
	<meta
		property="twitter:image"
		content="https://sveltesummit.com/images/metatagimg-spring.png"
	/>
</svelte:head>

<Hero />
<!-- <Live videoId="vHHLLJA0b70" /> -->
<Sponsors sponsors={data.sponsors} />
<Speakers talks={data.speakers} />
<CallForPeople />
<SignUp />
<FAQ>
	<Question title="What is this?">
		Svelte Summit is an event dedicated to Svelte and everything that is
		happening in the community. You'll be able to tune in to a full day of talks
		and discussions all while chatting to other Svelthusiasts on the Discord
		server.
	</Question>
	<Question title="When is it? What time?">
		<b>April 25th, 2021, 2:00pm (14:00) London time.</b> The event will last
		for about 5-6 hours (including breaks). For your convenience, here's a
		sample of start times across the globe.
		<StartTimes />
	</Question>
	<Question title="Will it be recorded?">
		Absolutely! You'll find it on the Svelte Society <a
			rel="noreferrer"
			target="_blank"
			href="https://youtube.com/sveltesociety">YouTube channel</a
		> once the event has been finished.
	</Question>
	<Question title="How do I watch it?">
		Once the day arrives, tune in to the Svelte Society <a
			rel="noreferrer"
			target="_blank"
			href="https://youtube.com/sveltesociety">YouTube channel</a
		> and start watching. We'll also make sure to post a notice at the top of this
		page if you forget where to go.
	</Question>
	<Question title="Can you remind me when the date gets closer?">
		Yes, <a
			rel="noreferrer"
			href="https://emailoctopus.com/lists/a3d49b32-0df8-11eb-a3d0-06b4694bee2a/forms/subscribe"
			target="_blank"
		>
			enter your email here.
		</a>
	</Question>
</FAQ>
<Footer />
