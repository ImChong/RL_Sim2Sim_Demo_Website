import { createApp } from 'vue';
import vuetify from '@/plugins/vuetify';
import ParkourMobileHost from '@/views/ParkourMobileHost.vue';

createApp(ParkourMobileHost).use(vuetify).mount('#app');
