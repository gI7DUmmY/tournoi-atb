<template>
  <div id="app">
    <div class="container">
      <titre />
      <inscription @ajouter="ajouter" />

      <!-- Masqué si aucun inscrit -->
      <div class="row" v-if="joueurs.length">
        <infos
          :joueurs="joueurs"
          :encaisse="encaisse"
          :ratio1st="ratio1st"
          :ratio2nd="ratio2nd"
          :ratio3rd="ratio3rd"
          :ratioClub="ratioClub"
          :ratioBar="ratioBar"
          @tarif="newTarif"
          @1er="newRatio1er"
          @2nd="newRatio2nd"
          @3eme="newRatio3rd"
          @club="newRatioClub"
          @bar="newRatioBar"
        />

        <!-- Caisse et boutons -->
        <div class="row">
          <caisse
            :caisse="caisse"
            :part_1st="part_1st"
            :part_2nd="part_2nd"
            :part_3rd="part_3rd"
            :part_club="part_club"
            :part_bar="part_bar"
          />

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
        </div>
        <!-- end .row caisse et boutons -->

        <!-- Tableau des inscrits -->
        <tableau :joueurs="joueurs" @suppr="suppr" @compte="compte" />

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
import tableau from '@/components/Tableau.vue';
import caisse from '@/components/Caisse.vue';

export default {
  name: 'app',
  components: {
    titre,
    inscription,
    infos,
    tableau,
    caisse,
  },
  data: () => ({
    joueurs: [],
    encaisse: 0,
    tarif: 5,
    clear: false,
    ratio1st: 50,
    ratio2nd: 30,
    ratio3rd: 20,
    ratioClub: 0,
    ratioBar: 0,
  }),
  computed: {
    // chaine a copier pour import dans kickertools
    toClipboard() {
      let res = '';
      this.joueurs.forEach((el) => {
        const j = el;
        res = `${res}${j.nom};`;
      });
      return res;
    },
    // total dans la caisse
    bank() {
      return this.encaisse * this.tarif;
    },
    // dotation du bar
    part_bar() {
      const bar = this.bank * (this.ratioBar / 100);
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(bar);
      return res;
    },
    // dotation du club
    part_club() {
      const club = this.bank * (this.ratioClub / 100);
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(club);
      return res;
    },
    // dotation de la 1ere place
    part_1st() {
      const first = this.bank * (this.ratio1st / 100);
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(first);
      return res;
    },
    // dotation de la 2nde place
    part_2nd() {
      const second = this.bank * (this.ratio2nd / 100);
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(second);
      return res;
    },
    // dotation de la 3eme place
    part_3rd() {
      const third = this.bank * (this.ratio3rd / 100);
      const res = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      })
        .format(third);
      return res;
    },
    // total de la caisse format monnaie
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
    // inscrire un joueur
    ajouter(pseudo) {
      if (pseudo) {
        this.joueurs.push({
          id: Date.now(),
          nom: pseudo,
          payed: false,
          hidden: false,
        });
        localStorage.setItem('tableau', JSON.stringify(this.joueurs));
      }
    },
    // supprimer un joueur
    suppr(id) {
      this.joueurs = this.joueurs.filter(t => id !== t.id);
      localStorage.setItem('tableau', JSON.stringify(this.joueurs));
    },
    // vider le tableau des inscrits
    vider() {
      // eslint-disable-next-line
      this.clear = confirm("Effacer la liste?");
      if (this.clear === true) {
        this.joueurs = [];
        this.encaisse = 0;
        this.filtered = false;
        this.clear = false;
        this.triPseudo = false;
        localStorage.setItem('tableau', this.joueurs);
      }
    },
    // compte le nombre de paiements
    compte(paye) {
      if (paye === false) {
        this.encaisse += 1;
      } else this.encaisse -= 1;
    },
    // actualise le tarif d'inscription
    newTarif(tarif) {
      this.tarif = Math.abs(tarif);
    },
    // actualise la part de la 1ere place
    newRatio1er(r1) {
      this.ratio1st = Math.abs(parseFloat(r1));
    },
    // actualise la part de la 2nd place
    newRatio2nd(r2) {
      this.ratio2nd = Math.abs(parseFloat(r2));
    },
    // actualise la part de la 3eme place
    newRatio3rd(r3) {
      this.ratio3rd = Math.abs(parseFloat(r3));
    },
    // actualise la part Club
    newRatioClub(rClub) {
      this.ratioClub = Math.abs(parseFloat(rClub));
    },
    // actualise la part Bar
    newRatioBar(rBar) {
      this.ratioBar = Math.abs(parseFloat(rBar));
    },
    // toast de confirmation
    onCopy() {
      // eslint-disable-next-line
      M.toast({ html: this.joueurs.length + " pseudos copiés !", classes: "rounded" });
    },
    onError(e) {
      // eslint-disable-next-line
      alert("Failed to copy texts" + e);
    },
  },
  created() {
    // chargement des joueurs du localStorage
    if (localStorage.getItem('tableau')) {
      this.joueurs = JSON.parse(localStorage.getItem('tableau'));
    }
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
