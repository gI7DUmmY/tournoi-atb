<template>
  <div id="app">
    <div class="container">
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
      </div><!-- end .row -->

      <div class="row">
        <form class="col s12" @submit.prevent="ajouter(player)">
            <div class="input-field col s6">
              <input
                v-model="player"
                type="text"
                id="input-player"
                class="validate"
                placeholder="pseudo">
              <label for="pseudo">Joueur à inscrire</label>
              <button
                class="waves-effect waves-light btn"
                type="submit">
                Inscrire
              </button>
            </div>
        </form>
      </div><!-- end .row -->

      <div class="row" v-if="joueurs.length > 0">
        <p>Total: <strong>{{total}}</strong> joueur(s)</p>
        <button id="vider" @click="vider" class="waves-effect waves-light btn red lighten-1">
          Vider
        </button>
        <table id="tableau" class="striped centered">
          <thead>
            <tr>
              <th>Suppr.</th>
              <th>Pseudo</th>
              <th @click="toggle" id="filtre">
                Payé&nbsp;&nbsp;<font-awesome-icon :icon="eye_icon" size="lg" />
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
              <td><i @click="suppr(joueur.id)" class="material-icons small">delete</i></td>
              <td>{{joueur.nom}}</td>
              <td>
                <div class="switch">
                  <label>
                    Non&nbsp;
                    <input v-model="joueur.payed" type="checkbox">
                    <span class="lever"></span>&nbsp;Oui
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <div class="fixed-action-btn">
          <a href="#top" class="btn-floating btn-small waves-effect waves-light teal lighten-1">
            <i class="material-icons">keyboard_arrow_up</i>
          </a>
        </div>
      </div><!-- end .row -->
    </div><!-- end .container -->
  </div><!-- end #app -->
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    joueurs: [
    ],
    player: null,
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
    eye_icon() {
      if (this.filtered) {
        return 'eye-slash';
      }
      return 'eye';
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

i:hover {
  cursor: pointer;
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
