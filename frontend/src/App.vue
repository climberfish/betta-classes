<script setup>
import Tarefa from './components/Tarefa.vue';
  import { reactive, computed, ref } from 'vue';

  const novaTarefa = ref('');

const tarefas = reactive([
  { id: 1, feita: false, nome: 'Acordar' },
  { id: 2, feita: false, nome: 'Trabalhar' },
  { id: 3, feita: false, nome: 'Lavar louça' },
  { id: 4, feita: false, nome: 'Dormir' },
]);

const tarefasAFazer = computed(
  () => tarefas.filter(
    (tarefa) => tarefa.feita === false
  )
);
const tarefasConcluidas = computed(
  () => tarefas.filter(
    (tarefa) => tarefa.feita === true
  )
);

function concluirTarefa(idTarefa) {
  const tarefa = tarefas.find((tarefa) => tarefa.id === idTarefa);
  tarefa.feita = true;
}
function desfazerTarefa(idTarefa) {
  const tarefa = tarefas.find((tarefa) => tarefa.id === idTarefa);
  tarefa.feita = false;
}
  function adicionarTarefa() {
    tarefas.push({ id: tarefas.lenght, feita: false, nome: novaTarefa.value })
  }
</script>

<template>
  <header>
    <h1>Lista de tarefas</h1>
  </header>

  <p>
    <input type="text" v-model="novaTarefa" />
    <button @click="adicionarTarefa">Adicionar tarefa</button>
  </p>

  <main>
    <h2>Tarefas a Fazer</h2>
    <p v-if="tarefasAFazer.length === 0">Você não tem nenhuma tarefa para fazer</p>
    <Tarefa
      v-for="(tarefa, indice) in tarefasAFazer"
      :ordem="indice + 1"
      :tarefa="tarefa"
      @clicou="concluirTarefa(tarefa.id)"
    />
    
    <h2>Tarefas Concluídas</h2>
    <p v-show="tarefasConcluidas.length === 0">Você ainda não concluiu nenhuma tarefa</p>
    <Tarefa
      v-for="(tarefa, indice) in tarefasConcluidas"
      :ordem="indice + 1"
      :tarefa="tarefa"
      @clicou="desfazerTarefa(tarefa.id)"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
