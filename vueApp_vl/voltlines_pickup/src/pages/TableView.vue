<template>
<div style="text-align: left">
    <label>SearchBy:</label><input v-model="searchTerm" />
  </div>
  <table-lite
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</template>



<script>
  import { defineComponent, reactive, ref, computed } from "vue";
  import TableLite from "../components/TableLite.vue";
  import {enrichedPassengerData} from '../data/eventBus'


export default {
  name: "TableView",
  components: { TableLite },
  setup() {
    const searchTerm = ref(""); // Search text
    // Fake data
    const data = reactive([]);
    data.push(...enrichedPassengerData)
    console.log(data)
    // Table config
    const table = reactive({
      columns: [
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Pickup Point Order",
          field: "pickUpPointOrder",
          width: "10%",
          sortable: true,
        },
        {
          label: "Trip Duration",
          field: "tripDuration",
          width: "15%",
          sortable: true,
        },
      ],
      rows: computed(() => {
        return data
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    return {
      searchTerm,
      table,
    };
  },
  data() {
    return {
      enrichedPassengerData,
    };
  },
  mounted() {
    console.log(enrichedPassengerData)
  },
  methods:{

    }

};

</script>