<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-layout-menu-mobile :closeSideBar="closeSideBar"></company-layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to='/warehouse/products' class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive" style="overflow: hidden;">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th style="font-size: 20px;">{{ this.$t('product.attributes') }}</th>
                                        <th style="font-size: 20px;">{{ this.$t('product.informations') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0" >
                                    <tr v-if="this.warehouse.product_id">
                                        <th>{{ this.$t('warehouse.product') }}:</th>
                                        <td>{{ this.warehouse.product_id.name }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.price">
                                        <th>{{ this.$t('warehouse.price') }}:</th>
                                        <td>{{ this.warehouse.price }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.name">
                                        <th>{{ this.$t('warehouse.name') }}:</th>
                                        <td>{{ this.warehouse.name }}</td>
                                    </tr>
                                    <tr v-if=" this.category_name">
                                        <th>{{ this.$t('warehouse.category') }}:</th>
                                        <td>{{ this.category_name }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.size_id">
                                        <th>{{ this.$t('warehouse.size') }}:</th>
                                        <td>{{ this.warehouse.size_id.name }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.color_id">
                                        <th>{{ this.$t('warehouse.color') }}:</th>
                                        <td>{{ this.warehouse.color_id.name }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.quantity">
                                        <th>{{ this.$t('warehouse.count') }}:</th>
                                        <td>{{ this.warehouse.quantity }}</td>
                                    </tr>
                                    <tr v-if="this.warehouse.price">
                                        <th>{{ this.$t('warehouse.price') }}:</th>
                                        <td>{{ this.warehouse.price }}</td>
                                    </tr>    
                                    <tr v-if="this.warehouse.manufacture_country">
                                        <th>{{ this.$t('warehouse.manufacture_country') }}:</th>
                                        <td>{{ this.warehouse.manufacture_country }}</td>
                                    </tr>
                                    <tr  v-if="this.warehouse.material_composition">
                                        <th>{{ this.$t('warehouse.material_composition') }}:</th>
                                        <td>{{ this.warehouse.material_composition }}</td>
                                    </tr>
                                    <tr  v-if="this.warehouse.description">
                                        <th>{{ this.$t('warehouse.description') }}:</th>
                                        <td>{{ this.warehouse.description }}</td>
                                    </tr>
                                    <tr  v-if="this.warehouse.status">
                                        <th>{{ this.$t('warehouse.status') }}:</th>
                                        <span v-if="this.warehouse.status == 1" class="badge bg-label-success me-1">Active</span>
                                        <span v-else-if="this.warehouse.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                    </tr>
                                    <tr v-if="this.warehouse.images">
                                        <th>{{ this.$t('warehouse.images') }}:</th>
                                        <td v-if="this.warehouse.images.length > 0" class="row">
                                            <div class="me-2 col-lg-3 col-md-4 col-sm-6" v-for="image in this.warehouse.images">
                                                <img class="img-fluid" width="250px" height="250px" :src="image" alt="Product Image">
                                            </div>
                                        </td>
                                        <td v-else>
                                            <td>{{ this.$t('warehouse.images_not_found') }}.</td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            warehouse: {},
            category_name: "",
            delete_modal: false,
            warehouse_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getWarehouse () {
            try {
                const res = await axios.get('http://localhost:8000/api/warehouse/find/'+this.warehouse_id);
                
                this.warehouse = res.data.warehouse;
                this.category_name = res.data.category[0].name;

                console.log(this.warehouse.product_id.name, this.warehouse.name,  
                this.category_name, this.warehouse.size_id.name, this.warehouse.color_id.name,
                this.warehouse.price, this.warehouse.quantity, this.warehouse.manufacture_country,  
                this.warehouse.material_composition, this.warehouse.description, this.warehouse.status, this.warehouse.images);
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getWarehouse();
    }
}
</script>