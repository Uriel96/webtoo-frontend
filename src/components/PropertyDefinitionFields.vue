<template>
  <sui-form @submit.prevent.stop="() => {}" style="margin: 2px">
    <sui-form-field>
      <label>Name</label>
      <input v-model="propertyDef.name" placeholder="My Property">
    </sui-form-field>
    <sui-form-field>
      <label>Value Type</label>
      <sui-dropdown
        selection
        fluid
        floating
        placeholder="Type"
        v-model="propertyDef.type"
        @input="() => { propertyDef.defaultValue = undefined; propertyDef.dummy = undefined; }"
        :options="types"
      ></sui-dropdown>
    </sui-form-field>
    <sui-form-field>
      <label>Default Value</label>
      <component :is="fieldComponent" v-model="propertyDef.defaultValue" placeholder="Empty"/>
    </sui-form-field>
    <sui-form-field>
      <label>Dummy</label>
      <component :is="fieldComponent" v-model="propertyDef.dummy" placeholder="Empty"/>
    </sui-form-field>
  </sui-form>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { types } from '@/configuration/propertyType';
import { PropertyDefinition } from '@/models';

@Component
export default class PropertyDefinitionFields extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinition;
  public types = types;

  get fieldComponent() {
    const type = this.types.find((x) => x.value === this.propertyDef.type);
    if (!type) {
      return;
    }
    return type.field;
  }
}
</script>

<style scoped>
</style>
