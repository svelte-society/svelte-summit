<script>
	const timezones = [
		{ tz: 'PDT', country: 'San Francisco', start: '6:00 am' },
		{ tz: 'MDT', country: 'Salt Lake City', start: '7:00 am' },
		{ tz: 'CDT', country: 'Chicago', start: '8:00 am' },
		{ tz: 'CDT', country: 'Mexico City', start: '8:00 am' },
		{ tz: 'EDT', country: 'New York City', start: '9:00 am' },
		{ tz: 'CLT', country: 'Santiago', start: '9:00 am' },
		{ tz: 'ART', country: 'Buenos Aires', start: '10:00 am' },
		{ tz: 'BRT', country: 'São Paulo', start: '10:00 am' },
		{ tz: 'GMT', country: 'Reykjavik', start: '1:00 pm' },
		{ tz: 'GMT', country: 'Accra', start: '1:00 pm' },
		{ tz: 'BST', country: 'London', start: '2:00 pm' },
		{ tz: 'CEST', country: 'Paris', start: '3:00 pm' },
		// { tz: 'CEST', country: 'Berlin', start: '3:00 pm' },
		// { tz: 'CEST', country: 'Warsaw', start: '3:00 pm' },
		{ tz: 'EET', country: 'Cairo', start: '3:00 pm' },
		{ tz: 'SAST', country: 'Johannesburg', start: '3:00 pm' },
		{ tz: 'MSK', country: 'Moscow', start: '4:00 pm' },
		{ tz: 'IDT', country: 'Jerusalem', start: '4:00 pm' },
		{ tz: 'IST', country: 'Chennai', start: '6:30 pm' },
		{ tz: 'ICT', country: 'Hanoi', start: '8:00 pm' },
		{ tz: 'WIB', country: 'Jakarta', start: '8:00 pm' },
		{ tz: 'SGT', country: 'Singapore', start: '9:00 pm' },
		{ tz: 'HKT', country: 'Hong Kong', start: '9:00 pm' },
		{ tz: 'AWST', country: 'Perth', start: '9:00 pm' },
		{ tz: 'JST', country: 'Tokyo', start: '10:00 pm' },
		{ tz: 'AEST', country: 'Sydney', start: '11:00 pm' },
	];
</script>

<div class="timezones">
	{#each timezones as { tz, country, start }, index (start)}
		<div class="zone index-{index}">
			{country} ({tz})<br>{start}
		</div>
	{/each}
</div>

<style>
	.timezones {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(auto, 175px));
		grid-gap: 8px;
		grid-column: 1 / 3; 
	}
	.zone {
		padding: 8px 12px;
		background-color: #2c0c0d;
		border: 1px solid #2c0c0d;
		border-radius: 4px;
		color: var(--rosebud);
	}
	.index-10 {
		background-color: var(--background);
	}
</style>
