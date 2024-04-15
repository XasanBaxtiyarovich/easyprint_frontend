<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-mobile-layout-menu :closeSideBar="closeSideBar"></company-mobile-layout-menu>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="padding-top: 25px;">
                        <my-tabs @getProduct="getSub">
                            <template v-slot:tab1>
                                <div class="content-wrapper">
                                    <div class="table-responsive text-nowrap">
                                        <table class="table card-table">
                                            <thead>
                                                <tr>
                                                    <th>{{ this.$t('product.name') }}</th>
                                                    <th>{{ this.$t('product.image') }}</th>
                                                    <th>{{ this.$t('product.price') }}</th>
                                                    <th>{{ this.$t('product.status') }}</th>
                                                    <th>{{ this.$t('product.material_composition') }}</th>
                                                    <th>{{ this.$t('product.manufacturer_country') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0" >
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInCreatePage(product.id)">
                                                    <td>
                                                        <span class="fw-medium">{{ product.name }}</span>
                                                    </td>        
                                                    <td class="d-flex">
                                                        <div class="me-2" v-for="image in product.images">
                                                            <img width="30px" :src="image">
                                                        </div>
                                                    </td>            
                                                    <td>
                                                        <span class="fw-medium">{{ product.price }}</span>
                                                    </td>  
                                                    <td>
                                                        <span v-if="product.status == 1" class="badge bg-label-success me-1">Active</span>
                                                        <span v-else-if="product.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                                    </td>      
                                                    <td>
                                                        <span >{{ product.material_composition }}</span>
                                                    </td>
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:tab2>
                                <div class="content-wrapper">
                                    <div class="table-responsive text-nowrap">
                                        <table class="table card-table">
                                            <thead>
                                                <tr>
                                                    <th>{{ this.$t('product.name') }}</th>
                                                    <th>{{ this.$t('product.image') }}</th>
                                                    <th>{{ this.$t('product.price') }}</th>
                                                    <th>{{ this.$t('product.status') }}</th>
                                                    <th>{{ this.$t('product.material_composition') }}</th>
                                                    <th>{{ this.$t('product.manufacturer_country') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInCreatePage(product.id)">
                                                    <td>
                                                        <span class="fw-medium">{{ product.name }}</span>
                                                    </td>        
                                                    <td class="d-flex">
                                                        <div class="me-2" v-for="image in product.images">
                                                            <img width="30px" :src="image">
                                                        </div>
                                                    </td>            
                                                    <td>
                                                        <span class="fw-medium">{{ product.price }}</span>
                                                    </td>  
                                                    <td>
                                                        <span v-if="product.status == 1" class="badge bg-label-success me-1">Active</span>
                                                        <span v-else-if="product.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                                    </td>      
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:tab3>
                                <div class="content-wrapper">
                                    <div class="table-responsive text-nowrap">
                                        <table class="table card-table">
                                            <thead>
                                                <tr>
                                                    <th>{{ this.$t('product.name') }}</th>
                                                    <th>{{ this.$t('product.image') }}</th>
                                                    <th>{{ this.$t('product.price') }}</th>
                                                    <th>{{ this.$t('product.status') }}</th>
                                                    <th>{{ this.$t('product.material_composition') }}</th>
                                                    <th>{{ this.$t('product.manufacturer_country') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInCreatePage(product.id)">
                                                    <td>
                                                        <span class="fw-medium">{{ product.name }}</span>
                                                    </td>        
                                                    <td class="d-flex">
                                                        <div class="me-2" v-for="image in product.images">
                                                            <img width="30px" :src="image">
                                                        </div>
                                                    </td>            
                                                    <td>
                                                        <span class="fw-medium">{{ product.price }}</span>
                                                    </td>  
                                                    <td>
                                                        <span v-if="product.status == 1" class="badge bg-label-success me-1">Active</span>
                                                        <span v-else-if="product.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                                    </td>      
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:tab4>
                                <div class="content-wrapper">
                                    <div class="table-responsive text-nowrap">
                                        <table class="table card-table">
                                            <thead>
                                                <tr>
                                                    <th>{{ this.$t('product.name') }}</th>
                                                    <th>{{ this.$t('product.image') }}</th>
                                                    <th>{{ this.$t('product.price') }}</th>
                                                    <th>{{ this.$t('product.status') }}</th>
                                                    <th>{{ this.$t('product.material_composition') }}</th>
                                                    <th>{{ this.$t('product.manufacturer_country') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInCreatePage(product.id)">
                                                    <td>
                                                        <span class="fw-medium">{{ product.name }}</span>
                                                    </td>        
                                                    <td class="d-flex">
                                                        <div class="me-2" v-for="image in product.images">
                                                            <img width="30px" :src="image">
                                                        </div>
                                                    </td>            
                                                    <td>
                                                        <span class="fw-medium">{{ product.price }}</span>
                                                    </td>  
                                                    <td>
                                                        <span v-if="product.status == 1" class="badge bg-label-success me-1">Active</span>
                                                        <span v-else-if="product.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                                    </td>      
                                                    <td>
                                                        <span>{{ product.material_composition }}</span>
                                                    </td>
                                                    <td>
                                                        <span>{{ product.manufacturer_country }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </template>
                        </my-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            products: [],
            product_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInCreatePage(id) {
            this.$router.push(`/warehouse/${id}`)
        },

        async getSub(num) {
            const res = await axios.get(process.env.VUE_APP_LOCAL+'/product/findByCategory/'+num);
                
            this.products = res.data.products;
            console.log(this.products);
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getSub(1)
    }
}
</script>

<style>
.products_url {
    transition: 0.5s;
}

.products_url:hover {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>