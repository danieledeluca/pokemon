import CardsView from '@/views/CardsView.vue';
import CardView from '@/views/CardView.vue';
import SetsView from '@/views/SetsView.vue';
import SetView from '@/views/SetView.vue';
import SpritesView from '@/views/SpritesView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
