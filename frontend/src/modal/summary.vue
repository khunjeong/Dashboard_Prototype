<template>
  <div class="modal-container">
    <div class="modal-back" @click="close"></div>
    <div class="modal-content summary-content">
      <div class="summary-title">{{ name.toUpperCase() }} Zone</div>

      <div class="row">
        <div class="col-md-3">
          <Card>
            <CardAvatarTitle
              slot="title"
              mainTitle="Real-time Visitors"
              icon="users"
              location="left"
            />
            <div slot="body" class="card-body">
              <Count :value="realCount" />
            </div>
          </Card>
        </div>
        <div class="col-md-3">
          <Card>
            <CardAvatarTitle
              slot="title"
              mainTitle="Daily Visitors"
              icon="user"
              type="secondary"
              location="left"
            />
            <div slot="body" class="card-body">
              <Count :value="dailyCount" />
            </div>
          </Card>
        </div>
        <div class="col-md-3">
          <Card>
            <CardAvatarTitle
              slot="title"
              mainTitle="Returning Visitor"
              icon="calendar"
              type="third"
              location="left"
            />
            <div slot="body" class="card-body">
              <Count :value="revisitorCount" />
            </div>
          </Card>
        </div>
        <div class="col-md-3">
          <Card>
            <CardAvatarTitle
              slot="title"
              mainTitle="Residence Time"
              icon="retweet"
              type="fourth"
              location="left"
            />
            <div slot="body" class="card-body">
              <Count :value="residenceTimeCount" unit="m" />
            </div>
          </Card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="Environment Sensors" />
            <div slot="body" class="card-body no-padding">
              <EnvironmentItem
                v-for="(environment, index) in environments"
                :key="index"
                :icon="environment.icon"
                :title="environment.title"
                :value="environment.value"
                :unit="environment.unit"
                :status="environment.status"
              />
            </div>
          </Card>
        </div>
        <div class="col-md-6">
          <Card>
            <CardTitle slot="title" title="Daily Visitor Line Chart" />
            <div slot="body" class="card-body">
              <ModalLineChart
                :zone="this.$props.name"
                :rangeLeft="this.selectRangeLeft"
                :rangeRight="this.selectRangeRight"
              />
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
import CardAvatarTitle from "./../components/card/avatar-title.vue";
import Count from "./../components/count.vue";
import EnvironmentItem from "./../components/environment-item.vue";
import ModalLineChart from "./../components/modal-line-chart.vue";
import _api from "./../services/api.service";

@Component({
  components: {
    Card,
    CardTitle,
    CardAvatarTitle,
    Count,
    EnvironmentItem,
    ModalLineChart,
  },
  props: {
    name: {
      type: String,
      default: "a",
    },
  },
})
export default class SummaryModal extends Vue {
  public realCount: number = 0;
  public dailyCount: number = 0;
  public revisitorCount: number = 0;
  public residenceTimeCount: number = 0;

  public environments: {
    mixture_id: number;
    icon: string;
    title: string;
    value: number;
    unit: string;
    status: string;
  }[] = [
    {
      mixture_id: 2,
      icon: "thermometer-half",
      title: "온도",
      value: 0,
      unit: "℃",
      status: "success",
    },
    {
      mixture_id: 3,
      icon: "tint",
      title: "습도",
      value: 0,
      unit: "%",
      status: "danger",
    },
    {
      mixture_id: 5,
      icon: "industry",
      title: "미세먼지",
      value: 0,
      unit: "㎍/㎥",
      status: "success",
    },
    {
      mixture_id: 6,
      icon: "smog",
      title: "초미세먼지",
      value: 0,
      unit: "㎍/㎥",
      status: "danger",
    },
    {
      mixture_id: 4,
      icon: "wind",
      title: "CO2",
      value: 0,
      unit: "ppm",
      status: "success",
    },
    {
      mixture_id: 12,
      icon: "atom",
      title: "tvoc",
      value: 0,
      unit: "ppb",
      status: "danger",
    },
  ];

  public rangeLeft = {
    a: [0, 80000],
    b: [0, 100000],
    c: [0, 50000],
    d: [0, 60000],
    e: [0, 50000],
  };

  public rangeRight = {
    a: [1000, 4000],
    b: [1000, 5000],
    c: [1000, 3000],
    d: [3000, 4000],
    e: [2000, 3000],
  };

  public selectRangeLeft = this.rangeLeft["a"];
  public selectRangeRight = this.rangeRight["a"];

  mounted() {
    this.selectRangeLeft = this.rangeLeft[this.$props.name];
    this.selectRangeRight = this.rangeRight[this.$props.name];
    this.getEnvironments();
    this.getVisitors(this.$props.name);
  }

  public async getVisitors(zone: string) {
    try {
      const results: any[] = await _api.getVisitorDatasZone(zone);
      this.realCount = results.filter((item) => item.mixture_id === 1)[0].data;
      this.dailyCount = results.filter((item) => item.mixture_id === 7)[0].data;
      this.revisitorCount = results.filter(
        (item) => item.mixture_id === 15
      )[0].data;
      this.residenceTimeCount = results.filter(
        (item) => item.mixture_id === 9
      )[0].data;
    } catch (e) {}
  }

  public async getEnvironments() {
    try {
      const results: any[] = await _api.getEnvironmentDatas();
      this.environments.forEach((environment) => {
        environment.value = results.filter(
          (item) => item.mixture_id === environment.mixture_id
        )[0].data;
      });
    } catch (e) {}
  }

  public close(): void {
    (this as any).destroy();
  }
}
</script>

<style lang="scss" scoped>
.summary-content {
  width: 1100px;
  height: 720px;
  background-color: map-get($colors, background);
  padding: 20px;
}
.summary-title {
  color: map-get($colors, info);
  font-size: 2rem;
  font-weight: 200;
  margin: 0 0 20px 0;
}
</style>
