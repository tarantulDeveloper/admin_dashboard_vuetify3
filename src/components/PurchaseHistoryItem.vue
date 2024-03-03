<template>
  <v-card>
    <v-card-title>{{ item.productName }}</v-card-title>
    <v-card-text>
      <div>{{$t("history_purchase.quantity")}}: {{ item.quantity }}</div>
      <div>{{ $t("history_purchase.cost") }}: {{ item.cost }}</div>
      <div>{{ $t("history_purchase.email") }}: {{ item.email }}</div>
      <div>{{ $t("history_purchase.date") }}: {{ formatDate(item.createdAt) }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
      };
      return date.toLocaleDateString(undefined, options);
    }

  }
};
</script>
