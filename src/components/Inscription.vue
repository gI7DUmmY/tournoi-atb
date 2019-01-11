<template>
  <!-- Inscription -->
  <div class="row">
    <form class="col s12" @submit.prevent="inscrire">
      <div class="input-field col s6">
        <i class="material-icons prefix">
          <font-awesome-icon icon="user"/>
        </i>
        <input
          v-model="player"
          type="text"
          id="input-player"
          class="validate"
          placeholder="pseudo"
          autofocus
        >
        <label for="input-player" class="active">Joueur à inscrire</label>
        <button class="waves-effect waves-light btn" type="submit">Inscrire</button>
      </div>
    </form>
  </div>
  <!-- end .row Inscription -->
</template>

<script>
export default {
  name: 'inscription',
  data: () => ({
    player: '',
  }),
  methods: {
    inscrire() {
      if (this.player !== '') {
        this.$emit('ajouter', this.player);
        this.player = '';
      }
    },
  },
};
</script>
