<template>
	<div class="delete-modal">
		<h6>Sure you want to delete?</h6>
		<div class="flex gap-4">
			<button @click="$emit('confirmDelete')">yes</button>
			<button @click="$emit('cancelDelete')">no</button>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
	defineEmits<{
		confirmDelete: [];
		cancelDelete: [];
	}>();
</script>

<style scoped>
	.delete-modal {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
