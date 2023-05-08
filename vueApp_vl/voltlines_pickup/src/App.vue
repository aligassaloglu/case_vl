<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
  <main class="flex relative min-h-screen w-100">
    <div class="w-1/12 min-h-full p-4 max-[1205px]:w-36 max-md:hidden">
      <SideBar/>
    </div>
    <div class="min-h-full w-11/12 p-4 max-md:min-w-full max-[1205px]:w-full max-md:p-2">
      <router-view v-slot="{Component}">
        <keep-alive include="MapView">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <div class="absolute bottom-0 left-0 right-0 p-2 md:hidden">
        <MobileBottomBar/>
      </div>
    </div>
  </main>
</template>

<script>

  import SideBar from './components/SideBar.vue';
  import MobileBottomBar from './components/MobileBottomBar.vue';
  export default{
    name: "Home",
    components: {
      SideBar,
      MobileBottomBar
    },
    data() {
      return {
        user: "alii"
      }
    },
  }
</script>
