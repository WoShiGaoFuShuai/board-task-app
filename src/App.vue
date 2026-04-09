<template>
	<section class="flex h-screen">
		<Sidebar />
		<RouterView class="flex-1 overflow-y-auto" />
	</section>
</template>

<script
	setup
	lang="ts"
>
	import Sidebar from './widgets/sidebar/ui/Sidebar.vue';
</script>
