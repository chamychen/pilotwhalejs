<template>
  <div>
    <v-text-field isSubheader subheaderWidth='200' prepend-icon='people' label="First Name" box outline outlineExpend color="red"></v-text-field>
    <v-select isSubheader subheaderWidth='200' label="First Name" outline></v-select>
    <v-combobox isSubheader subheaderWidth='200' label="First Name" outline></v-combobox>
    <v-textarea isSubheader subheaderWidth='200' label="First Name" outline></v-textarea>
    <v-radio-group :items="[{text:' a',value:1},{text:'b',value:2}]" label="abcd" type="radio"></v-radio-group>
    <v-data-table :headers=" h" itemKey="key" :items="items" show-select v-model="c">
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    h: [{ text: 'fieldList_key', value: 'key' }],
    items: [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
    c: [{ key: 'a' }, { key: 'c' }]
  })
}
</script>