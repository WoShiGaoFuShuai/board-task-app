<template>
	<section class="flex h-screen">
		<Sidebar />
		<RouterView class="flex-1 overflow-y-auto bg-depth-2" />
	</section>
</template>

<script
	setup
	lang="ts"
>
	import { Sidebar } from '@widgets/sidebar';
</script>
