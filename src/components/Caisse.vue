<template>
  <div>
    <div>
      <font-awesome-icon icon="piggy-bank" size="lg"/>&nbsp;&nbsp;
      <strong>{{ caisse }}</strong>
    </div>
    <div id="rewards" class="row">
      <div class="col s6 m3">
        <strong>1er :</strong>
        {{ part_1st }}
      </div>
      <div class="col s6 m3">
        <strong>2ème :</strong>
        {{ part_2nd }}
      </div>
      <div class="col s6 m3">
        <strong>3ème :</strong>
        {{ part_3rd }}
      </div>
      <div class="col s6 m3">
        <strong>Bar :</strong>
        {{ part_bar }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caisse',
  props: [
    'caisse',
    'part_1st',
    'part_2nd',
    'part_3rd',
    'part_bar',
  ],
};
</script>
