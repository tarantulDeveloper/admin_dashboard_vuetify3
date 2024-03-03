<template>
  <div class="linechartDiv">
    <Chart
      :size="{ width: 1000, height: 400 }"
      :data="chartData"
      :margin="margin"
      :direction="direction"
      :axis="axis"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Area
          :dataKeys="['month', 'total']"
          type="monotone"
          :areaStyle="{ fill: 'url(#grad)' }"
        />
        <Line
          :dataKeys="['month', 'total']"
          type="monotone"
          :lineStyle="{
            stroke: '#d500f9',
          }"
        />
        <Marker
          v-if="marker"
          :value="1000"
          label="Mean."
          color="green"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <defs>
          <linearGradient id="grad" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#c9fcff" stop-opacity="1" />
            <stop offset="100%" stop-color="#d500f9" stop-opacity="0.9" />
          </linearGradient>
        </defs>
      </template>

      <template #widgets>
        <Tooltip
          borderColor="#c9fcff"
          :config="{
            total: { color: '#4c9ca1' },
            month: { color: '#d500f9' },
          }"
        />
      </template>
    </Chart>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Chart, Grid, Line, Tooltip, Area, Marker } from "vue3-charts";
export default defineComponent({
  name: "LineChart",
  components: { Chart, Grid, Line, Tooltip, Area, Marker },
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    });

    return { direction, margin, axis };
  },
});
</script>
