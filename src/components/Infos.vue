<template>
  <!-- infos / tarif -->
  <div class="row">
    Total:
    <strong>{{ encaisse }}</strong> encaiss&eacute;(s) /
    <strong>{{ total }}</strong> inscrit(s)
    <div class="col s12">
      <div class="input-field inline">
        Tarif (€/personne) :&nbsp;
        <input
          type="number"
          v-model="tarif"
          name="tarif"
          id="tarif"
          min="0"
          @change="$emit('tarif', tarif)"
        >
      </div>
    </div>
  </div>
  <!-- end .row infos / tarif -->
</template>

<script>
export default {
  name: 'infos',
  props: [
    'joueurs',
    'encaisse',
  ],
  data: () => ({
    tarif: 5,
  }),
  computed: {
    // nombre de joueurs inscrits
    total() {
      return this.joueurs.length;
    },
  },
};
</script>
