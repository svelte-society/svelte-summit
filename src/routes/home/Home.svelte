<script>
	export let data;
	import { Hero } from "../../components/Hero";
	import Question from "../../components/Question.svelte";
	import Sponsors from "../../components/Sections/Sponsors.svelte";
	import CallForPeople from "../../components/Sections/CallForPeople.svelte";
	import Speakers from "../../components/Sections/Speakers.svelte";
	import SignUp from "../../components/Sections/SignUp.svelte";
	import FAQ from "../../components/Sections/FAQ.svelte";
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
		<a
			rel="noreferrer"
			target="_blank"
			href="https://www.timeanddate.com/worldclock/fixedtime.html?iso=20201018T140000&p1=tz_gmt"
			>April 25th, 2021
		</a> We will aim to do what we did last time and have talks all throughout the
		day. An exact starting time not yet been decided on but we can tell you that
		the event will go on for about 5-6 hours (including breaks).
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
			href="https://forms.gle/6PBKXng9jfrvxjhX8"
			target="_blank"
		>
			enter your email here.
		</a>
	</Question>
</FAQ>
<Footer />
