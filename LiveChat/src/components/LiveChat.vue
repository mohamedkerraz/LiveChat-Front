<script setup>
import { useUserStore } from '@/store/userStore';

const { user } = useUserStore();
</script>

<template>
  <div>
    Utilisateur connecté : {{ user ? user.email : 'Aucun utilisateur connecté' }}
  </div>
</template>