<template>
  <!-- infos / tarif -->
  <div class="row no-bot">
    <div class="col s12">
      Total:
      <strong>{{ encaisse }}</strong> encaiss&eacute;(s) /
      <strong>{{ total }}</strong> inscrit(s)
      <button
        class="btn-flat btn-small waves-effect waves-blue-grey blue-grey lighten-4"
        @click="showMontants = !showMontants"
      >
        montants
        <i class="material-icons right" v-if="showMontants === false">
          <font-awesome-icon icon="angle-double-down" size="sm" />
        </i>
        <i class="material-icons right" v-if="showMontants === true">
          <font-awesome-icon icon="angle-double-up" size="sm" />
        </i>
      </button>
    </div>

    <div class="col s12" v-show="showMontants">
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

        <div>
          <div class="col s2">%1er</div>
          <div class="col s2">%2nd</div>
          <div class="col s2">%3eme</div>
          <div class="col s2">%Club</div>
          <div class="col s2">%Bar</div>
        </div>
        <br>

        <!-- % des gains -->
        <div>
          <div class="input-field col s2">
            <input
              v-model="r1"
              id="ratio1st"
              type="number"
              class="validate"
              @change="$emit('1er', r1)"
            >
          </div>
          <div class="input-field col s2">
            <input
              id="ratio2nd"
              v-model="r2"
              type="number"
              class="validate"
              @change="$emit('2nd', r2)"
            >
          </div>
          <div class="input-field col s2">
            <input
              id="ratio3rd"
              v-model="r3"
              type="number"
              class="validate"
              @change="$emit('3eme', r3)"
            >
          </div>
          <div class="input-field col s2">
            <input
              id="ratioClub"
              v-model="rClub"
              type="number"
              class="validate"
              @change="$emit('club', rClub)"
            >
          </div>
          <div class="input-field col s2">
            <input
              id="ratioBar"
              v-model="rBar"
              type="number"
              class="validate"
              @change="$emit('bar', rBar)"
            >
          </div>
        </div>
        <!-- end .row % des gains -->
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
    'ratio1st',
    'ratio2nd',
    'ratio3rd',
    'ratioClub',
    'ratioBar',
  ],
  data: () => ({
    tarif: 5,
    r1: 0,
    r2: 0,
    r3: 0,
    rClub: 0,
    rBar: 0,
    showMontants: false,
  }),
  computed: {
    // nombre de joueurs inscrits
    total() {
      return this.joueurs.length;
    },
  },
  created() {
    this.r1 = this.ratio1st;
    this.r2 = this.ratio2nd;
    this.r3 = this.ratio3rd;
    this.rClub = this.ratioClub;
    this.rBar = this.ratioBar;
  },
};
</script>

<style scoped>
.no-bot {
  margin-bottom: 0px;
}
</style>
