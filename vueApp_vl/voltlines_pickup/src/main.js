import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory } from 'vue-router'
import mitt from 'mitt';
import './index.css'
import MapView from './pages/MapView.vue'
import RouteInfo from './pages/RouteInfo.vue'
import PageNotFound from './pages/PageNotFound.vue'
import TableView from './pages/TableView.vue'
/* import the fontawesome core */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            name: 'MapView',
            component: MapView,
            meta: { keepAlive: true } // Add the meta property
        },
        {
            path: '/table-view',
            name: 'TableView',
            component: TableView
        },
        {
            path: '/route-details',
            name: 'RouteInfo',
            component: RouteInfo
        },
        {
            path: '/:catchAll(.*)*',
            name: "PageNotFound",
            component: PageNotFound,
        },
    ]
})
library.add(faUserSecret, faLocationPin, faLocationDot, faMapLocation, faTable, faRoute)
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router).use(VueSweetalert2).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
