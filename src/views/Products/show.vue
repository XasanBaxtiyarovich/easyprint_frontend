<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu/>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/product/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
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
                                    <tr>
                                        <th>{{ this.$t('product.name') }}:</th>
                                        <td>{{ this.product.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('product.material_composition') }}:</th>
                                        <td>{{ this.product.material_composition }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('product.manufacturer_country') }}:</th>
                                        <td>{{ this.product.manufacturer_country }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('product.price') }}:</th>
                                        <td>{{ this.product.price }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('product.status') }}:</th>
                                        <span v-if="product.status == 1" class="badge bg-label-success me-1">Active</span>
                                        <span v-else-if="product.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('product.image') }}:</th>
                                        <td class="row">
                                            <div class="me-2 col-lg-3 col-md-4 col-sm-6" v-for="image in product.images">
                                                <img class="img-fluid" width="250px" height="250px" :src="image" alt="Product Image">
                                            </div>
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
            product: {},
            delete_modal: false,
            product_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getProduct () {
            try {
                const res = await axios.get('http://localhost:8000/api/product/find/'+this.product_id);
                
                console.log(res);
                this.product = res.data.product;
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getProduct();
    }
}
</script>