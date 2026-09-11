<template>
    <UFooter
        class="border-t border-t-accented"
        :ui="{
            container: 'max-lg:py-4',
            center: 'max-lg:mt-0',
            left: 'max-lg:mt-0',
        }"
    >
        <p class="text-center text-sm text-muted">
            &copy; {{ new Date().getFullYear() }} - Daniele De Luca - Thanks to
            <ULink to="https://www.tcgdex.net/" target="_blank">
                TCGdex
            </ULink> and <ULink to="https://pokeapi.co/" target="_blank">
                PokéAPI
            </ULink> for all the data.
        </p>
    </UFooter>
</template>
