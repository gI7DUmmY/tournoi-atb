<template>
  <div id="app">
    <div class="container">
      <!-- Titre -->
      <div class="row">
        <h2 class="center-align">
          <img
            src="./assets/media/figure-bleue.jpg"
            alt="fig-blue"
            height="55px"
            width="auto">
          Tournoi ATB
          <img
            src="./assets/media/figure-rouge.jpg"
            alt="fig-red"
            height="55px"
            width="auto">
        </h2>
        <div class="center-align"  id="top">
          <img
            class="circle"
            src="./assets/media/cropped-ATB-white.png"
            alt="logo-club"
            height="60px"
            width="auto">
        </div>
      </div><!-- end .row Titre -->

      <!-- Inscription -->
      <div class="row">
        <form class="col s12" @submit.prevent="ajouter(player)">
            <div class="input-field col s6">
              <i class="material-icons prefix"><font-awesome-icon icon="user"/></i>
              <input
                v-model="player"
                type="text"
                id="input-player"
                class="validate"
                placeholder="pseudo"
                autofocus>
              <label for="input-player" class="active">Joueur à inscrire</label>
              <button
                class="waves-effect waves-light btn"
                type="submit">
                Inscrire
              </button>
            </div>
        </form>
      </div><!-- end .row Inscription -->

      <!-- Masqué si aucun inscrit -->
      <div class="row" v-if="joueurs.length > 0">
        <!-- infos / tarif -->
        <div class="row">
          <!-- eslint-disable-next-line -->
          Total: <strong>{{encaisse}}</strong> encaiss&eacute;(s) / <strong>{{total}}</strong> inscrit(s)
          <div class="col s12">
            Tarif (€/personne):
            <div class="input-field inline">
              <input type="number" v-model="tarif" name="tarif">
            </div>
          </div>
        </div><!-- end .row infos / tarif -->

        <!-- Caisse et boutons -->
        <div class="row">
          <!-- eslint-disable-next-line -->
          <font-awesome-icon icon="piggy-bank" size="lg"/>&nbsp;&nbsp;<strong>{{bank}} €</strong><br>
          <button id="vider" @click="vider" class="waves-effect waves-light btn red lighten-1">
            Vider
          </button>
          <button
            id="copy"
            class="waves-effect waves-light btn green lighten-1"
            v-clipboard:copy="toClipboard"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <i class="material-icons left"><font-awesome-icon icon="copy"/></i>Copier Liste
          </button>
        </div><!-- end .row caisse et boutons -->

        <!-- Tableau des inscrits -->
        <table id="tableau" class="striped centered">
          <thead>
            <tr>
              <th>Suppr.</th>
              <th>Pseudo</th>
              <th @click="toggle" id="filtre">
                encaiss&eacute;&nbsp;&nbsp;<font-awesome-icon :icon="eye_icon" size="lg" />
              </th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="joueur in liste" :key="joueur.id" :hidden="joueur.hidden"
            :class="[
              { 'light-green': joueur.payed },
              { 'darken-3': joueur.payed },
              { 'grey-text': joueur.payed },
              { 'text-lighten-4': joueur.payed }
            ]">
              <td>
                <a :class="[joueur.payed ? 'disabled' : '', 'btn-flat']">
                  <font-awesome-icon @click="suppr(joueur.id)" icon="trash" size="lg" />
                </a>
              </td>
              <td>{{joueur.nom}}</td>
              <td>
                <div class="switch">
                  <label>
                    Non&nbsp;
                    <input v-model="joueur.payed" type="checkbox" @click="compte(joueur.payed)">
                    <span class="lever"></span>&nbsp;Oui
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="fixed-action-btn">
          <a href="#top" class="btn-floating btn-small waves-effect waves-light teal lighten-1">
            <font-awesome-icon icon="angle-up" />
          </a>
        </div>
      </div><!-- end .row si aucun inscrit -->
    </div><!-- end .container -->
  </div><!-- end #app -->
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    joueurs: [],
    player: null,
    encaisse: 0,
    tarif: 5,
    filtered: false,
    clear: false,
  }),
  computed: {
    total() {
      return this.joueurs.length;
    },
    liste() {
      return this.joueurs.slice().reverse();
    },
    toClipboard() {
      let res = '';
      this.joueurs.forEach((el) => {
        const j = el;
        res = `${res}${j.nom};`;
      });
      return res;
    },
    eye_icon() {
      if (this.filtered) {
        return 'eye-slash';
      }
      return 'eye';
    },
    bank() {
      return this.encaisse * this.tarif;
    },
  },
  methods: {
    ajouter(pseudo) {
      if (pseudo) {
        this.joueurs.push({
          id: Date.now(), nom: pseudo, payed: false, hidden: false,
        });
        this.player = '';
      }
    },
    suppr(id) {
      this.joueurs = this.joueurs.filter(t => id !== t.id);
    },
    vider() {
      // eslint-disable-next-line
      this.clear = confirm('Effacer la liste?');
      if (this.clear === true) {
        this.joueurs = [];
        this.encaisse = 0;
        this.filtered = false;
        this.clear = false;
      }
    },
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
    compte(paye) {
      if (paye === false) {
        this.encaisse += 1;
      } else this.encaisse -= 1;
    },
    onCopy(e) {
      // eslint-disable-next-line
      alert('Les pseudos sont dans le presse-papiers :\n' + e.text);
    },
    onError(e) {
      // eslint-disable-next-line
      alert('Failed to copy texts' + e);
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Libre Baskerville";
  src: local("Libre Baskerville"),
    url("./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf")
      format("truetype"),
    url("./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf")
      format("truetype"),
    url("./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf")
      format("truetype");
}

@font-face {
  font-family: "Libre Franklin";
  src: local("Libre Franklin"),
    url("./assets/fonts/Libre_Franklin/LibreFranklin-Medium.ttf")
      format("truetype"),
    url("./assets/fonts/Libre_Franklin/LibreFranklin-Bold.ttf")
      format("truetype"),
    url("./assets/fonts/Libre_Franklin/LibreFranklin-Italic.ttf")
      format("truetype");
}

body {
  font-family: "Libre Franklin";
}

h2 {
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
}

strong {
  font-family: "Libre Franklin";
  font-weight: bolder;
  color: dodgerblue;
}

button {
  margin: 10px 5px;
}

#tableau {
  margin-bottom: 25px;
}

#filtre {
  cursor: pointer;
}

@media (max-width: 450px) {
  h2 {
    font-size: 2.4rem;
    font-family: "Libre Baskerville", serif;
    font-weight: bold;
  }
}

</style>
