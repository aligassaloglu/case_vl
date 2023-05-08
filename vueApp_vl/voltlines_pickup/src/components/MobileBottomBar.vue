<template>
    <div class="bg-lime-400 min-h-width h-20 rounded-2xl flex flex-row items-center justify-center text-4xl gap-9 text-slate-700">
        <router-link to="/" class="hover:text-white cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-map-location" />
        </router-link>
        <router-link to="/table-view" class="hover:text-white cursor-pointer" >
            <font-awesome-icon icon="fa-solid fa-table" />
        </router-link>
        <router-link to="/route-details" class="hover:text-white cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-route" />
        </router-link>
    </div>
    </template>