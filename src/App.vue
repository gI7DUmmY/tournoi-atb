<template>
  <div id="app">
    <div class="container">
      <titre />
      <inscription @ajouter="ajouter" />

      <!-- Masqué si aucun inscrit -->
      <div class="row" v-if="joueurs.length > 0">
        <infos :joueurs="joueurs" @tarif="newTarif"/>

        <!-- Caisse et boutons -->
        <div class="row">
          <div>
            <font-awesome-icon icon="piggy-bank" size="lg"/>&nbsp;&nbsp;
            <strong>{{ caisse }}</strong>
          </div>
          <div id="rewards" class="row">
            <div class="col s6 m3"><strong>1er :</strong> {{ part_1st }}</div>
            <div class="col s6 m3"><strong>2ème :</strong> {{ part_2nd }}</div>
            <div class="col s6 m3"><strong>3ème :</strong> {{ part_3rd }}</div>
            <div class="col s6 m3"><strong>Bar :</strong> {{ part_bar }}</div>
          </div>

          <button
            id="vider"
            @click="vider"
            class="waves-effect waves-light btn red lighten-1"
          >
            Vider
          </button>

          <button
            id="copy"
            class="waves-effect waves-light btn green lighten-1"
            v-clipboard:copy="toClipboard"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            <i class="material-icons left">
              <font-awesome-icon icon="copy"/>
            </i>Copier Liste
          </button>
        </div><!-- end .row caisse et boutons -->

        <!-- Tableau des inscrits -->
        <table id="tableau" class="striped centered">
          <thead>
            <tr>
              <th>Suppr.</th>
              <th @click="triPseudo = !triPseudo" id="pseudo">
                Pseudo &nbsp;&nbsp;<font-awesome-icon icon="sort" size="lg"/>
              </th>
              <th @click="toggle" id="filtre">
                encaiss&eacute;&nbsp;&nbsp;<font-awesome-icon :icon="eye_icon" size="lg"/>
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
                  <font-awesome-icon @click="suppr(joueur.id)" icon="trash" size="lg"/>
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
                      @click="compte(joueur.payed)"
                    >
                    <span class="lever"></span>&nbsp;Oui
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="fixed-action-btn">
          <a href="#top" class="btn-floating btn-small waves-effect waves-light teal lighten-1">
            <font-awesome-icon icon="angle-up"/>
          </a>
        </div>
      </div><!-- end .row si aucun inscrit -->
    </div><!-- end .container -->
  </div><!-- end #app -->
</template>

<script>
import titre from '@/layouts/Titre.vue';
import inscription from '@/components/Inscription.vue';
import infos from '@/components/Infos.vue';

export default {
  name: 'app',
  data: () => ({
    joueurs: [],
    encaisse: 0,
    tarif: 5,
    filtered: false,
    clear: false,
    triPseudo: false,
  }),
  computed: {
    total() {
      return this.joueurs.length;
    },
    liste() {
      if (this.triPseudo) {
        const players = this.joueurs;
        return players.sort((a, b) => (a.nom < b.nom ? -1 : 1));
      }
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
    part_bar() {
      const bar = this.bank * 0.2;
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(bar);
      return res;
    },
    part_1st() {
      const first = this.bank * 0.5;
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(first);
      return res;
    },
    part_2nd() {
      const second = this.bank * 0.2;
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(second);
      return res;
    },
    part_3rd() {
      const third = this.bank * 0.1;
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(third);
      return res;
    },
    caisse() {
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(this.bank);
      return res;
    },
  },
  methods: {
    ajouter(pseudo) {
      if (pseudo) {
        this.joueurs.push({
          id: Date.now(),
          nom: pseudo,
          payed: false,
          hidden: false,
        });
      }
    },
    suppr(id) {
      this.joueurs = this.joueurs.filter(t => id !== t.id);
    },
    vider() {
      // eslint-disable-next-line
      this.clear = confirm("Effacer la liste?");
      if (this.clear === true) {
        this.joueurs = [];
        this.encaisse = 0;
        this.filtered = false;
        this.clear = false;
        this.triPseudo = false;
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
    newTarif(tarif) {
      this.tarif = tarif;
    },
    onCopy() {
      // eslint-disable-next-line
      M.toast({ html: this.total + " pseudos copiés !", classes: "rounded" });
    },
    onError(e) {
      // eslint-disable-next-line
      alert("Failed to copy texts" + e);
    },
  },
  components: {
    titre,
    inscription,
    infos,
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

.input-field.inline {
  margin-left: 0 !important;
}

.row .col {
  padding-left: 0rem !important;
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

#pseudo {
  cursor: pointer;
}

#filtre {
  cursor: pointer;
}

#rewards {
  margin-top: 1em;
}

#tarif {
  width: 6rem !important;
  margin-left: 1rem;
}

@media (max-width: 450px) {
  h2 {
    font-size: 2.4rem;
    font-family: "Libre Baskerville", serif;
    font-weight: bold;
  }
}
</style>
