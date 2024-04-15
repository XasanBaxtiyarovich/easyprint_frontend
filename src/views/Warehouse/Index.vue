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
                        <div style="display: flex; margin-bottom: 15px;">
                            <router-link :to="'/warehouse/create/'+this.product_id" class="btn btn-primary">
                                <span class="fa-solid fa-warehouse"></span>
                                
                                &nbsp;
                                
                                <span class="fa fa-plus"></span>
                            </router-link>
                            <div style="display: flex; justify-content: end; width: 100%;">
                                <router-link to="/warehouse/products" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ this.$t('warehouse.warehouse') }}</th>
                                        <th>{{ this.$t('warehouse.size') }}</th>
                                        <th>{{ this.$t('warehouse.images') }}</th>
                                        <th>{{ this.$t('warehouse.price') }}</th>
                                        <th>{{ this.$t('warehouse.color') }}</th>
                                        <th>{{ this.$t('warehouse.count') }}</th>
                                        <th>{{ this.$t('cupon.updated_at') }}</th>
                                        <th>{{ this.$t('cupon.functions') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="warehouse in warehouses" :key="warehouse.id" class="products_url" @click="pushInShowPage(warehouse.id)">
                                        <td v-if="warehouse.name">
                                            <span class="fw-medium">{{ warehouse.name }}</span>
                                        </td>
                                        <td v-else>
                                            <span class="fw-medium">{{ warehouse.product_id.name }}</span>
                                        </td>
                                        <td>
                                            <span class="fw-medium">{{ warehouse.size_id.name }}</span>
                                        </td>   
                                        <td class="d-flex" v-if="warehouse.images.length > 0">
                                            <div class="me-2" v-for="image in warehouse.images">
                                                <img width="30px" :src="image">
                                            </div>
                                        </td>  
                                        <td v-else>
                                            <img width="30px" src="../../assets/img/imgNotFound.jpg">
                                        </td>
                                        <td>
                                            <span class="fw-medium">{{ warehouse.price }}</span>
                                        </td>
                                        <td>
                                            <div class="color_back" :style="'background-color:'+warehouse.color_id.code"></div>
                                        </td>
                                        <td>
                                            <span class="fw-medium">{{ warehouse.quantity }}</span>
                                        </td>
                                        <td>
                                            <span>{{ warehouse.updated_at.split('T')[0] }}</span>
                                        </td>
                                        <td>
                                            <router-link :to="'/warehouse/edit/'+warehouse.id" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(warehouse.id)" @click.stop><i class="fa fa-trash"></i></a>
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
            warehouses: [],
            warehouse_id: null,
            delete_modal: false,
            product_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInShowPage(id) {
            this.$router.push(`/warehouse/show/${id}`)
        },

        async getWarehouses () {
            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/warehouse/findByProduct/',
                {
                    product_id: this.product_id,
                    company_id: JSON.parse(localStorage.getItem('user')).company_id
                });
                
                this.warehouses = res.data.warehouses;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(process.env.VUE_APP_LOCAL+`/warehouse/remove/${this.warehouse_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.warehouse.deleted'));

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
            this.warehouse_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getWarehouses();
    }
}
</script>

<style>
.color_back {
    width: 50px;
    height: 30px;
}

.products_url {
    transition: 0.5s;
}

.products_url:hover {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>