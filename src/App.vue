<template>
  <div class="h-screen bg-routine-dark text-routine-black">
    <main class="container">
      <section class="max-w-3xl py-28">
        <RoutineInput></RoutineInput>
        <RoutineCompletionBox></RoutineCompletionBox>
      </section>
    </main>
  </div>
</template>

<script setup>
import RoutineInput from '~/components/RoutineInput.vue'
import RoutineCompletionBox from '~/components/RoutineCompletionBox.vue'
</script>

<style></style>
