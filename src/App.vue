<template>
  <div id="app">
    <div class="container">
      <h2 class="center-align">
        <img src="./assets/media/figure-bleue.jpg" alt="fig-blue" height="55px" width="auto">
        Tournoi ATB
        <img src="./assets/media/figure-rouge.jpg" alt="fig-red" height="55px" width="auto">
      </h2>
      <div class="center-align"  id="top">
        <img class="circle" src="./assets/media/cropped-ATB-white.png" alt="logo-club" height="60px" width="auto">
      </div>
      <div class="row">
        <form class="col s12" @submit.prevent="ajouter(player)">
          <div class="row">
            <div class="input-field col s6">
              <input v-model="player" type="text" id="input-player" class="validate" placeholder="pseudo">
              <label for="pseudo">Joueur à inscrire</label>
              <button class="waves-effect waves-light btn" type="submit">Inscrire</button>
              &nbsp;<button @click="vider" class="waves-effect waves-light btn red lighten-1">Vider</button>
            </div>
          </div>
        </form>
      </div>

      <div class="row" v-if="joueurs.length > 0">
        <table class="striped centered">
          <thead>
            <tr>
              <th>Suppr.</th>
              <th>Pseudo</th>
              <th>Payé</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="pseudo in joueurs" :key="pseudo.id">
              <td><i @click="suppr(pseudo)" class="material-icons small">delete</i></td>
              <td>{{pseudo}}</td>
              <td>
                <div class="switch">
                  <label>
                    Non&nbsp;<input type="checkbox"><span class="lever"></span>&nbsp;Oui
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <div class="fixed-action-btn">
          <a href="#top" class="btn-floating btn-large waves-effect waves-light teal lighten-1">
            <i class="material-icons">keyboard_arrow_up</i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      joueurs: [],
      player: null,
    }
  },
  methods: {
    ajouter(pseudo) {
      if (pseudo) {
        this.joueurs.push(pseudo);
        this.joueurs = this.joueurs.reverse();
        this.player = '';
      }
    },
    suppr(pseudo) {
      this.joueurs = this.joueurs.filter((t) => {
        return pseudo !== t;
      });
    },
    vider() {
      this.joueurs = [];
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

i:hover {
  cursor: pointer;
}

#input-player {
  margin-bottom: 20px;
}
</style>
