<template>
  <div id="root">
    <Title />
    <div class="row">
      <div class="col-md-3">
        <Card>
          <CardAvatarTitle
            slot="title"
            mainTitle="Real-time Visitors"
            icon="users"
            location="center"
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
            location="center"
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
            location="center"
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
            location="center"
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
          <CardTitle slot="title" title="Device Map" />
          <div slot="body" class="card-body">
            <Map />
          </div>
        </Card>
      </div>
      <div class="col-md-6">
        <div class="row" style="display: flex;">
          <div class="col-md-6">
            <Card>
              <CardTitle slot="title" title="Zone Visitor Percentage Chart" />
              <div slot="body" class="card-body">
                <PieChart />
              </div>
            </Card>
          </div>
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
                  @click="openPopup"
                  style="cursor: pointer;"
                />
              </div>
            </Card>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Card>
              <CardTitle slot="title" title="Zone Move Bar Chart" />
              <div slot="body" class="card-body">
                <BarChart />
              </div>
            </Card>
          </div>
          <div class="col-md-12">
            <Card>
              <CardTitle slot="title" title="Daily Visitor Line Chart" />
              <div slot="body" class="card-body">
                <LineChart />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>


    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import Title from './components/title.vue';
import Card from './components/card/card.vue';
import CardTitle from './components/card/title.vue';
import CardAvatarTitle from './components/card/avatar-title.vue';
import Count from './components/count.vue';
import EnvironmentItem from './components/environment-item.vue';
import Map from './components/map.vue';
import LineChart from './components/line-chart.vue';
import PieChart from './components/pie-chart.vue';
import BarChart from './components/bar-chart.vue';
import EnvironmentModal from './modal/environment.vue';
import _api from './services/api.service';

@Component({
  components: {
    Title,
    Card,
    CardTitle,
    CardAvatarTitle,
    Count,
    EnvironmentItem,
    Map,
    PieChart,
    LineChart,
    BarChart
  }
})
export default class App extends Vue {

  public realCount: number = 0;
  public dailyCount: number = 0;
  public revisitorCount: number = 0;
  public residenceTimeCount: number = 0;

  public environments: { mixture_id: number, icon: string, title: string, value: number, unit: string, status: string }[] = [
    { mixture_id: 2, icon: 'thermometer-half', title: '온도', value: 0, unit: '℃', status: 'success' },
    { mixture_id: 3, icon: 'tint', title: '습도', value: 0, unit: '%', status: 'danger' },
    { mixture_id: 5, icon: 'industry', title: '미세먼지', value: 0, unit: '㎍/㎥', status: 'success' },
    { mixture_id: 6, icon: 'smog', title: '초미세먼지', value: 0, unit: '㎍/㎥', status: 'danger' },
    { mixture_id: 4, icon: 'wind', title: 'CO2', value: 0, unit: 'ppm', status: 'success' },
    { mixture_id: 12, icon: 'atom', title: 'TVOC', value: 0, unit: 'ppb', status: 'danger' },
  ];

  public interval: any;

  mounted() {
    this.getVisitors();
    this.getEnvironments();
    this.interval = setInterval(() => {
      this.getVisitors();
      this.getEnvironments();
    }, 1000 * 60 * 5);
  }

  public async getVisitors() {
    try {
      const results: any[] = await _api.getVisitorDatas();
      this.realCount = results.filter((item) => item.mixture_id === 1)[0].data;
      this.dailyCount = results.filter((item) => item.mixture_id === 7)[0].data;
      this.revisitorCount = results.filter((item) => item.mixture_id === 15)[0].data;
      this.residenceTimeCount = results.filter((item) => item.mixture_id === 9)[0].data;
    } catch(e) {

    }
  }

  public async getEnvironments() {
    try {
      const results: any[] = await _api.getEnvironmentDatas();
      this.environments.forEach((environment) => {
        environment.value = results.filter((item) => item.mixture_id === environment.mixture_id)[0].data;
      });
    } catch(e) {

    }
  }

  public openPopup() {
    (this as any).$modal.open(EnvironmentModal, {}, 'up-down');
  }


  destroyed() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped>
</style>
