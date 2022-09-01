<template>
  <div class="modal-container">
    <div class="modal-back" @click="close"></div>
    <div class="modal-content environment-content">
      <div class="row">
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="Temperature & Humidity" />
            <div slot="body" class="card-body">
              <TemperatureChart />
            </div>
          </Card>
        </div>
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="Fine-dust & Ultrafine-dust" />
            <div slot="body" class="card-body">
              <DustChart />
            </div>
          </Card>
        </div>
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="CO2" />
            <div slot="body" class="card-body">
              <CoChart />
            </div>
          </Card>
        </div>
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="TVOC" />
            <div slot="body" class="card-body">
              <TvocChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Card from "./../components/card/card.vue";
import CardTitle from "./../components/card/title.vue";
import TemperatureChart from "./../components/temperature-chart.vue";
import DustChart from "./../components/dust-chart.vue";
import CoChart from "./../components/co-chart.vue";
import TvocChart from "./../components/tvoc-chart.vue";

@Component({
  components: {
    Card,
    CardTitle,
    TemperatureChart,
    DustChart,
    CoChart,
    TvocChart,
  },
})
export default class EnvironmentModal extends Vue {
  public close(): void {
    (this as any).destroy();
  }
}
</script>

<style lang="scss" scoped>
.environment-content {
  width: 1100px;
  height: 640px;
  background-color: map-get($colors, background);
  padding: 20px;
}
</style>
