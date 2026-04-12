<template>
	<div><span>{{ column.title }}</span></div>
</template>

<script
	setup
	lang="ts"
>
	import type { Column } from '../model/types.ts';

	defineProps<{
		column: Column;
	}>();
</script>

<style scoped>
</style>
