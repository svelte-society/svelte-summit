<script>
	const tableRows = [
		{
			tz: '',
			country: '',
			start: '',
		}
	];
</script>

<table>
	<thead>
		<tr>
			<th>Timezone</th>
			<th>Country</th>
			<th>Start Time</th>
		</tr>
	</thead>
	<tbody>
		{#each tableRows as { tz, country, start } (start)}
			<tr>
				<td>{tz}</td>
				<td>{country}</td>
				<td>{start}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		background-color: var(--background-dark);
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid #2c0c0d;
		font-size: 10px;
		text-transform: uppercase;
	}
	thead tr {
		border: 1px solid #2c0c0d;
	}
	tbody tr:nth-child(odd) {
		background-color: var(--background-super-dark);
	}
	th, td {
		padding: 4px 8px;
		text-align: left;
	}
</style>
