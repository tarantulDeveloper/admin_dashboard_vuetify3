<template>
  <Chart
    :size="{ width: 1000, height: 500 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['month', 'total']" :barStyle="{ fill: '#90e0ef' }" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          pl: { color: '#90e0ef' },
          avg: { color: '#0096c7' },
          inc: { color: '#48cae4' },
        }"
      />
    </template>
  </Chart>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Chart, Grid, Tooltip, Bar } from "vue3-charts";
import PurchaseService from "@/service/purchase-service";

export default defineComponent({
  name: "LineChart",
  components: { Chart, Grid, Tooltip, Bar },
  setup() {
    const data = ref();
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

    onMounted(async () => {
      try {
        data.value = await PurchaseService.fetchPurchasesMonthly();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return { data, direction, margin, axis };
  },
});
</script>
