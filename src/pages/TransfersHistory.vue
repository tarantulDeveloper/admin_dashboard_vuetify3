<template>
    <div v-if="error">
        <error :error="error"/>
    </div>
    <div v-else>
        <v-table
        fixed-header
        height="300px"
        >
        <thead>
            <tr>
                <th class="text-left">
                    {{$t('transactions.senderReceiver')}}
                </th>
                <th class="text-left">
                    {{$t('transactions.amount')}}
                </th>
                <th class="text-left">
                    {{$t('transaction_requests.created_at')}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in transactions"
            :key="item.name"
            >
            <td>{{ item.email }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.createdAt }}</td>
        </tr>
        </tbody>
        </v-table>
    </div>
</template>

<script>

import Error from "@/components/Error.vue";
import TransferHistoryService from "@/service/transfer-history-service";

export default {
    name: 'TransfersHistory',
    components: {
        Error
    },
    data() {
        return {
            transactions: [],
            error: null
        }
    },
    async created() {
        try {
            const rawTransactions = await TransferHistoryService.fetchAllTransactions();
            this.transactions = rawTransactions.map(transaction => {
                return {
                    email: transaction.email,
                    amount: transaction.amount,
                    createdAt: new Date(transaction.createdAt).toLocaleString()
                };
            });
        } catch(error) {
            this.error = error.response.data.message;
        }
    }
}

</script>