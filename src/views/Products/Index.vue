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
                <div v-if="delete_modal" style="width: 80%; display: flex; justify-content: center; position: absolute; margin-top: 16%;">
                    <div class="card" style="width: 320px; z-index: 21;">
                        <div class="card-body">
                            <div style="display: flex; justify-content: center;">
                                <span style="margin-bottom: 20px;">{{ $t('delete.remove') }}</span>
                            </div>
                            <div style="display: flex; justify-content: space-around;">
                                <button @click="deleteFunc" class="btn btn-danger">{{ $t('delete.yes') }}</button>
                                <button @click="closeModal" class="btn btn-warning">{{ $t('delete.no') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/product/create" class="btn btn-primary">
                            <span class="fas fa-tshirt"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div style="padding-top: 25px;">
                        <my-tabs @getProduct="fetchProductsByCategory">
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
                                                    <th>{{ this.$t('product.functions') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInShowPage(product.id)">
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
                                                        <router-link :to="'/product/edit/'+product.id" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                                        <a class="ms-3" style="color: red;" @click="deleteModal(product.id)" @click.stop><i class="fa fa-trash"></i></a>
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
                                                    <th>{{ this.$t('product.functions') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInShowPage(product.id)">
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
                                                        <router-link :to="'/product/edit/'+product.id" class="ms-3"><i class="fa fa-edit" @click.stop></i></router-link>
                                                        <a class="ms-3" style="color: red;" @click="deleteModal(product.id)"><i class="fa fa-trash" @click.stop></i></a>
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
                                                    <th>{{ this.$t('product.functions') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInShowPage(product.id)">
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
                                                        <router-link :to="'/product/edit/'+product.id" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                                        <a class="ms-3" style="color: red;" @click="deleteModal(product.id)" @click.stop><i class="fa fa-trash"></i></a>
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
                                                    <th>{{ this.$t('product.functions') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="product in products" :key="product.id" class="products_url" @click="pushInShowPage(product.id)">
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
                                                        <router-link :to="'/product/edit/'+product.id" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                                        <a class="ms-3" style="color: red;" @click="deleteModal(product.id)" @click.stop><i class="fa fa-trash"></i></a>
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
        async pushInShowPage(id) {
            this.$router.push(`/product/show/${id}`)
        },

        async fetchProductsByCategory(num) {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+`/product/findByCategory/${num}`);
                this.products = res.data.products;
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(process.env.VUE_APP_LOCAL+`/product/remove/${this.product_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.product.deleted'));

                if (res.data != 200) this.$toast.error('Internal server error');

                setTimeout(() => {
                        location.reload();
                }, 1000 );
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        deleteModal (id) {
            this.product_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.fetchProductsByCategory(1)
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