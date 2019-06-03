<template>
<!-- Tableau des inscrits -->
  <table id="tableau" class="striped centered">
    <thead>
      <tr>
        <th>Suppr.</th>
        <th @click="triPseudo = !triPseudo" id="pseudo">Pseudo &nbsp;&nbsp;
          <font-awesome-icon icon="sort" size="lg"/>
        </th>
        <th @click="toggle" id="filtre">encaiss&eacute;&nbsp;&nbsp;
          <font-awesome-icon :icon="eye_icon" size="lg"/>
        </th>
      </tr>
    </thead>
    <tbody id="tbody">
      <tr
        v-for="joueur in liste"
        :key="joueur.id"
        :hidden="joueur.hidden"
        :class="[
                { 'light-green': joueur.payed },
                { 'darken-3': joueur.payed },
                { 'grey-text': joueur.payed },
                { 'text-lighten-4': joueur.payed }
              ]"
      >
        <td>
          <a :class="[joueur.payed ? 'disabled' : '', 'btn-flat']">
            <font-awesome-icon @click="$emit('suppr', joueur.id)" icon="trash" size="lg"/>
          </a>
        </td>
        <td>{{joueur.nom}}</td>
        <td>
          <div class="switch">
            <label>
              Non&nbsp;
              <input
                v-model="joueur.payed"
                type="checkbox"
                @click="$emit('compte', joueur.payed)"
              >
              <span class="lever"></span>&nbsp;Oui
            </label>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'tableau',
  props: ['joueurs'],
  data: () => ({
    triPseudo: false,
    filtered: false,
  }),
  computed: {
    liste() {
      const players = this.joueurs;
      if (this.triPseudo) {
        return players.sort((a, b) => (a.nom < b.nom ? -1 : 1));
      }
      // on affiche le dernier inscrit en tete du tableau par defaut
      return players.reverse();
    },
    eye_icon() {
      if (this.filtered) {
        return 'eye-slash';
      }
      return 'eye';
    },
  },
  methods: {
    // bascule filtre des joueurs qui ont paye
    toggle() {
      this.filtered = !this.filtered;
      if (this.filtered) {
        this.joueurs.forEach((joueur) => {
          const jo = joueur;
          if (jo.payed) {
            jo.hidden = true;
          }
        });
      } else {
        this.joueurs.forEach((joueur) => {
          const jo = joueur;
          if (jo.hidden) {
            jo.hidden = false;
          }
        });
      }
    },
  },
};
</script>
