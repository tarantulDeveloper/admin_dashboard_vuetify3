<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    v-if="systemUser"
  >
    <v-list-item
      :prepend-avatar="profile_photo_url"
      :title="`${firstName} ${lastName}`"
      nav
    >
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
          prepend-icon="mdi-account-box-edit-outline"
          color="purple-accent-3"
          :title="$t('update-system-user-profile-info')"
          to="/change-system-user-profile-info"
          v-if="role === 'Администратор' || role === 'Менеджер'"
      />
      <v-list-item
        prepend-icon="mdi-account-plus"
        color="purple-accent-3"
        :title="$t('register_requests')"
        to="/register-requests"
        v-if="role === 'Администратор' || role === 'Менеджер'"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group"
        color="purple-accent-3"
        :title="$t('users')"
        to="/users"
        v-if="role === 'Администратор'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-shield-crown-outline"
        color="purple-accent-3"
        :title="$t('add_system_users')"
        to="/register-admin-manager"
        v-if="role === 'Администратор'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi mdi-progress-upload"
        color="purple-accent-3"
        :title="$t('system-income')"
        to="/system-income"
        v-if="role === 'Администратор'"
      ></v-list-item>
      <v-list-item
      prepend-icon="mdi mdi-currency-btc"
      color="purple-accent-3"
      :title="$t('set_softcoin_rate')"
      to="/set_softcoin_rate"
      v-if="role === 'Администратор'"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-cash-100"
        color="purple-accent-3"
        :title="$t('currency')"
        to="/currency"
        v-if="role === 'Администратор' || role === 'Менеджер'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-swap-horizontal"
        color="purple-accent-3"
        :title="$t('transfers')"
        to="/transfer-requests"
        v-if="role === 'Администратор' || role === 'Менеджер'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box-outline"
        color="purple-accent-3"
        :title="$t('profile')"
        to="/profile"
        v-if="role === 'Пользователь'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cash-fast"
        color="purple-accent-3"
        :title="$t('transfer')"
        to="/transfer"
        v-if="role === 'Пользователь'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-history"
        color="purple-accent-3"
        :title="$t('history')"
        to="/transfers-history"
        v-if="role === 'Пользователь'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-invoice-list"
        color="purple-accent-3"
        :title="$t('new_product')"
        to="/add-product"
        v-if="role === 'Менеджер'"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-invoice-list-outline"
        color="purple-accent-3"
        title="Продукты"
        to="/products"
        v-if="role === 'Менеджер'"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-clock-time-four-outline"
          color="purple-accent-3"
          :title="$t('products')"
          to="/purchases-history"
          v-if="role === 'Пользователь'"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-file-arrow-left-right-outline"
          color="purple-accent-3"
          :title="$t('profile_update_requests')"
          to="/profile-changing-requests"
          v-if="role === 'Менеджер'"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-briefcase-plus-outline"
          color="purple-accent-3"
          :title="$t('register_dealer')"
          to="/register_dealer_by_manager"
          v-if="role === 'Менеджер'"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["role", "systemUser", "user", "profile_photo_url", "firstName", "lastName"]),
  },
};
</script>


