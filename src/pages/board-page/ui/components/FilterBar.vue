<template>
	<SearchInput v-model="model" />
</template>

<script
	setup
	lang="ts"
>
	import { SearchInput } from '@shared/ui/SearchInput';

	const model = defineModel<string>({ default: '' });
</script>

<style scoped>
</style>
