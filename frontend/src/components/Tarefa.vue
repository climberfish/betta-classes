<script setup>
    const props = defineProps(['ordem', 'tarefa'])
</script>

<template>
    <div>
        <input
            :id="props.tarefa.id"
            type="checkbox"
            :checked="props.tarefa.feita"
            @click.prevent="$emit('clicou')"
        />
        <label :for="props.tarefa.id">
            Tarefa {{ props.ordem }} - {{ props.tarefa.nome }}
        </label>
    </div>
</template>
