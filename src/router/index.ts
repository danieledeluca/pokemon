import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SetsView from '@/views/SetsView.vue';
import SetView from '@/views/SetView.vue';
import CardsView from '@/views/CardsView.vue';
import CardView from '@/views/CardView.vue';
import SpritesView from '@/views/SpritesView.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/sets',
            name: 'sets',
            component: SetsView,
        },
        {
            path: '/sets/:set_id',
            name: 'set',
            component: SetView,
        },
        {
            path: '/cards',
            name: 'cards',
            component: CardsView,
        },
        {
            path: '/cards/:card_id',
            name: 'card',
            component: CardView,
        },
        {
            path: '/sprites',
            name: 'sprites',
            component: SpritesView,
        },
    ],
});

export default router;
