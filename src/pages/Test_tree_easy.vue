<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 400px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
          :nodes="simple"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected"
            default-expand-all
            >
            <template v-slot:default-header="scope">
            {{scope.key}}
            <q-btn >
              |123
            </q-btn>

            </template>
          </q-tree>

        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Relax Hotel">
            <div class="text-h4 q-mb-md">Welcome</div>
            <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
            <p>Lorem ipsum dolor sit, </p>
          </q-tab-panel>

          <q-tab-panel name="Food">
            <div class="text-h4 q-mb-md">Food</div>
            <p>Lorem ipsum dolor sit, </p>
            <p>Lorem ipsum dolor sit, </p>
          </q-tab-panel>

          <q-tab-panel name="Room service">
            <div class="text-h4 q-mb-md">Room service</div>
            <p>Lorem ipsum dolor sit,</p>
            <p>Lorem ipsum dolor sit, </p>
            <p>Lorem ipsum dolor sit,</p>
          </q-tab-panel>

          <q-tab-panel name="Room view">
            <div class="text-h4 q-mb-md">Room view</div>
            <p>Lorem ipsum dolor sit, </p>
            <p>Lorem ipsum dolor sit,</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      splitterModel: 50,
      selected: 'Food',
      simple: [
        {
          label: 'Relax Hotel',
          children: [
            {
              label: 'RRR',
              icon: 'restaurant_menu',
              children: [
                {
                  label: 'TTT',
                  icon: 'restaurant_menu'
                },
                {
                  label: ' service',
                  icon: 'room_service'
                },
                {
                  label: ' view',
                  icon: 'photo'
                }
              ]
            },
            {
              label: 'Room service',
              icon: 'room_service'
            },
            {
              label: 'Room view',
              icon: 'photo'
            }
          ]
        }
      ]
    }
  }
}
</script>
